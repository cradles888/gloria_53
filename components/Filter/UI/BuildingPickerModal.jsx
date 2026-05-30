"use client";

import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const BuildingCard = ({ building, isSelected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(building.id)}
    className={`group relative w-full overflow-hidden rounded-3xl border-2 text-left transition ${
      isSelected ? "border-accent" : "border-transparent"
    }`}
  >
    <div className="relative h-48 w-full bg-dark10 cursor-pointer">
      {building.heroImage ? (
        <img
          src={building.heroImage}
          alt={`${building.complexName} позиция ${building.position}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="text-sm text-dark40">Нет фото</span>
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <p className="text-lg font-medium">
          {building.complexName} · Позиция {building.position || building.name || `#${building.id}`}
        </p>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-white/80">
          {building.floorsTotal ? (
            <span>{building.floorsTotal} этажей</span>
          ) : null}
          {building.settlementDate ? (
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
              </svg>
              Сдача {building.settlementDate}
            </span>
          ) : null}
        </div>
      </div>
    </div>

    {isSelected && (
      <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white shadow">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )}
  </button>
);

const BuildingPickerModal = ({
  isOpen,
  onClose,
  buildings = [],
  selectedBuildingId,
  onSelect,
}) => {
  const handleSelect = (id) => {
    onSelect(selectedBuildingId === id ? null : id);
  };

  const handleApply = () => {
    onClose();
  };

  const selectedBuilding = buildings.find((b) => b.id === selectedBuildingId);

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
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <DialogPanel className="min-h-screen bg-white sm:mx-auto sm:min-h-0 sm:max-w-2xl sm:rounded-4xl sm:shadow-xl">
              <div className="sticky top-0 z-10 border-b border-dark10 bg-white/95 px-4 py-4 backdrop-blur sm:rounded-t-4xl sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <DialogTitle className="text-xl font-medium text-dark">
                      Выбор позиции
                    </DialogTitle>
                    <p className="mt-1 text-sm text-dark50">
                      Нажмите на карточку дома для выбора
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-dark10 text-2xl leading-none text-dark transition hover:bg-dark15"
                    aria-label="Закрыть"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="grid gap-4 p-4 sm:p-6">
                {buildings.map((building) => (
                  <BuildingCard
                    key={building.id}
                    building={building}
                    isSelected={selectedBuildingId === building.id}
                    onSelect={handleSelect}
                  />
                ))}

                {buildings.length === 0 && (
                  <p className="py-10 text-center text-sm text-dark50">
                    Нет доступных позиций
                  </p>
                )}
              </div>

              <div className="sticky bottom-0 z-10 border-t border-dark10 bg-white/95 px-4 py-4 backdrop-blur sm:rounded-b-4xl sm:px-6">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <button
                    type="button"
                    onClick={handleApply}
                    className="h-12 w-full rounded-4xl bg-accent px-5 text-sm font-medium text-white transition hover:bg-accent/90 active:scale-[0.98]"
                  >
                    {selectedBuilding
                      ? `Показать квартиры · позиция ${selectedBuilding.position || selectedBuilding.name}`
                      : "Показать все квартиры"}
                  </button>
                  {selectedBuildingId && (
                    <button
                      type="button"
                      onClick={() => { onSelect(null); onClose(); }}
                      className="h-12 rounded-4xl border border-dark15 px-5 text-sm font-medium text-dark transition hover:bg-dark10"
                    >
                      Сбросить
                    </button>
                  )}
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BuildingPickerModal;
