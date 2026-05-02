"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import Button from "@/components/UI/Button";
import ButtonParam from "@/components/Filter/UI/ButtonSelectParam";
import Range from "@/components/Filter/UI/Range";

const ROOM_OPTIONS = ["1", "2", "3"];

const PROJECT_OPTIONS = [
  "Все проекты",
  "ЖК Юннатов, позиция 1",
  "ЖК Юннатов, позиция 2",
  "ЖК Юннатов, позиция 3",
];

const STATUS_OPTIONS = ["Свободные", "Забронированные", "Проданные"];

const PURCHASE_OPTIONS = [
  "Семейная ипотека",
  "Базовая ипотека",
  "Рассрочка",
  "Вторичное жильё в зачёт",
];

const FINISHING_OPTIONS = ["Без отделки", "Отделка под ключ"];

const FLOOR_OPTIONS = ["Не первый", "Не последний", "Последний"];

const FilterGroup = ({ title, children }) => {
  return (
    <div className="grid gap-4">
      <h3 className="text-base font-medium text-dark">{title}</h3>

      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};

const FilterChip = ({ text, isActive, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`
        h-10 rounded-4xl border px-5 text-sm transition
        ${
          isActive
            ? "border-accent bg-accent text-white"
            : "border-dark40 bg-white text-dark hover:border-accent hover:text-accent"
        }
      `}
    >
      {text}
    </button>
  );
};

const FilterModal = ({
  isOpen,
  onClose,
  selectedRooms,
  resetRooms,
  onToggleRoom,
  priceRange,
  onPriceChange,
}) => {
  const [selectedProject, setSelectedProject] = useState("Все проекты");
  const [selectedStatuses, setSelectedStatuses] = useState(["Свободные"]);
  const [selectedPurchaseOptions, setSelectedPurchaseOptions] = useState([]);
  const [selectedFinishing, setSelectedFinishing] = useState([]);
  const [selectedFloors, setSelectedFloors] = useState([]);
  const [areaFrom, setAreaFrom] = useState("");
  const [areaTo, setAreaTo] = useState("");
  const [floorFrom, setFloorFrom] = useState("");
  const [floorTo, setFloorTo] = useState("");

  const toggleValue = (value, setter) => {
    setter((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }

      return [...prev, value];
    });
  };

  const resetFloor = () => {
    setFloorTo("");
    setFloorFrom("");
  };

  const resetArea = () => {
    setAreaTo("");
    setAreaFrom("");
  };

  const resetFilters = () => {
    setSelectedProject("Все проекты");
    setSelectedStatuses(["Свободные"]);
    setSelectedPurchaseOptions([]);
    setSelectedFinishing([]);
    setSelectedFloors([]);
    onPriceChange?.([0, 17]);
    resetRooms();
    resetArea();
    resetFloor();
  };

  const activeFiltersCount =
    selectedRooms.length +
    selectedStatuses.length +
    selectedPurchaseOptions.length +
    selectedFinishing.length +
    selectedFloors.length +
    (selectedProject !== "Все проекты" ? 1 : 0);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto p-0 sm:p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4 "
            enterTo="opacity-100 translate-y-0 "
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <DialogPanel className="min-h-screen bg-white sm:min-h-0 sm:rounded-4xl sm:shadow-xl">
              <div className="sticky top-0 z-10 border-b border-dark10 bg-white/95 px-4 py-4 backdrop-blur sm:rounded-t-4xl sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <DialogTitle className="text-xl font-medium text-dark">
                      Фильтры
                    </DialogTitle>

                    <p className="mt-1 text-sm text-dark50">
                      Подберите квартиру по основным параметрам
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-dark10 text-2xl leading-none text-dark transition hover:bg-dark15"
                    aria-label="Закрыть фильтры"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="grid gap-10 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr]">
                <div className="grid content-start gap-8">
                  <FilterGroup title="Основные параметры">
                    {ROOM_OPTIONS.map((room) => (
                      <FilterChip
                        key={room}
                        text={room}
                        isActive={selectedRooms.includes(room)}
                        onClick={() => onToggleRoom(room)}
                      />
                    ))}
                  </FilterGroup>

                  <div className="grid gap-4">
                    <h3 className="text-base font-medium text-dark">Цена</h3>

                    <Range
                      values={priceRange}
                      onChange={onPriceChange}
                      className="w-full max-w-none"
                      classNameBar={"mt-3 sm:mt-auto"}
                    />
                  </div>

                  <FilterGroup title="Статус квартиры">
                    {STATUS_OPTIONS.map((status) => (
                      <FilterChip
                        key={status}
                        text={status}
                        isActive={selectedStatuses.includes(status)}
                        onClick={() => toggleValue(status, setSelectedStatuses)}
                      />
                    ))}
                  </FilterGroup>
                </div>

                <div className="grid content-start gap-8">
                  <div className="grid gap-4">
                    <h3 className="text-base font-medium text-dark">Проект</h3>
                    <div
                      className="h-12 rounded-4xl content-center border border-dark40
                  bg-white px-5 text-sm text-dark
                    outline-none active:border-accent
                    transition
      hover:border-accent
      focus:border-accent focus:ring-2 focus:ring-accent/20
                    "
                    >
                      <select
                        value={selectedProject}
                        onChange={(event) =>
                          setSelectedProject(event.target.value)
                        }
                        className="w-full outline-none"
                      >
                        {PROJECT_OPTIONS.map((project) => (
                          <option
                            className="p-3 rounded-2xl"
                            key={project}
                            value={project}
                          >
                            {project}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <FilterGroup title="Условия покупки">
                    {PURCHASE_OPTIONS.map((option) => (
                      <FilterChip
                        key={option}
                        text={option}
                        isActive={selectedPurchaseOptions.includes(option)}
                        onClick={() =>
                          toggleValue(option, setSelectedPurchaseOptions)
                        }
                      />
                    ))}
                  </FilterGroup>

                  <FilterGroup title="Отделка">
                    {FINISHING_OPTIONS.map((option) => (
                      <FilterChip
                        key={option}
                        text={option}
                        isActive={selectedFinishing.includes(option)}
                        onClick={() =>
                          toggleValue(option, setSelectedFinishing)
                        }
                      />
                    ))}
                  </FilterGroup>
                </div>

                <div className="grid content-start gap-8">
                  <div className="grid gap-4">
                    <h3 className="text-base font-medium text-dark">Площадь</h3>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        placeholder="от 30 м²"
                        className="h-12 rounded-4xl border border-dark40 bg-white px-5 text-sm outline-none transition focus:border-accent"
                        value={areaFrom}
                        onChange={(event) => setAreaFrom(event.target.value)}
                      />

                      <input
                        type="number"
                        placeholder="до 90 м²"
                        className="h-12 rounded-4xl border border-dark40 bg-white px-5 text-sm outline-none transition focus:border-accent"
                        value={areaTo}
                        onChange={(event) => setAreaTo(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <h3 className="text-base font-medium text-dark">Этаж</h3>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        placeholder="от 1"
                        className="h-12 rounded-4xl border border-dark40 bg-white px-5 text-sm outline-none transition focus:border-accent"
                        value={floorFrom}
                        onChange={(event) => setFloorFrom(event.target.value)}
                      />

                      <input
                        type="number"
                        placeholder="до 7"
                        className="h-12 rounded-4xl border border-dark40 bg-white px-5 text-sm outline-none transition focus:border-accent"
                        value={floorTo}
                        onChange={(event) => setFloorTo(event.target.value)}
                      />
                    </div>
                  </div>

                  <FilterGroup title="Особенности этажа">
                    {FLOOR_OPTIONS.map((option) => (
                      <FilterChip
                        key={option}
                        text={option}
                        isActive={selectedFloors.includes(option)}
                        onClick={() => toggleValue(option, setSelectedFloors)}
                      />
                    ))}
                  </FilterGroup>
                </div>
              </div>

              <div className="sticky bottom-0 z-10 border-t border-dark10 bg-white/95 px-4 py-4 backdrop-blur sm:rounded-b-4xl sm:px-6">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <Button
                    text={
                      activeFiltersCount > 0
                        ? `Показать предложения · ${activeFiltersCount}`
                        : "Показать предложения"
                    }
                    variant="accent"
                    size="md"
                    fullWidth
                    onClick={onClose}
                  />

                  <Button
                    text="Сбросить"
                    variant="ghost"
                    size="md"
                    fullWidth
                    onClick={resetFilters}
                  />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FilterModal;
