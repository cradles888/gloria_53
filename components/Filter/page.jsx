"use client";

import { useState } from "react";
import ButtonParam from "@/components/Filter/UI/ButtonSelectParam";
import Button from "@/components/UI/Button";
import Range from "@/components/Filter/UI/Range";
import FilterModal from "@/components/Filter/UI/FilterModal";
import styles from "./Filter.module.css";

const ROOM_OPTIONS = ["1", "2", "3"];

const Filter = () => {
  const [stateParam, setStateParam] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 17]);

  const handleParamClick = (paramData) => {
    setStateParam((prev) => {
      if (paramData.isActive) {
        return [...prev, paramData.value];
      }

      return prev.filter((value) => value !== paramData.value);
    });
  };

  const toggleRoom = (room) => {
    setStateParam((prev) => {
      if (prev.includes(room)) {
        return prev.filter((value) => value !== room);
      }

      return [...prev, room];
    });
  };

  const resetRooms = () => {
    setStateParam([]);
  };

  const closeParamClick = (indexToDrop) => {
    setStateParam((prev) => prev.filter((_, index) => index !== indexToDrop));
  };

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <>
      <div className="mt-12 mb-6 grid gap-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-[auto_1fr] xl:hidden">
            <Button
              text="Фильтры"
              size="md"
              variant="outline"
              icon
              iconUrl="/chevron-arrow.svg"
              iconAlt=""
              iconClassName="h-5 w-5"
              fullWidth
              onClick={openFilterModal}
            />

            <Button
              text="Показать предложения"
              size="md"
              variant="accent"
              fullWidth
            />
          </div>

          <div className="hidden xl:flex xl:flex-wrap xl:items-start xl:gap-2 xl:gap-y-4">
            {ROOM_OPTIONS.map((room) => (
              <ButtonParam
                key={room}
                text={room}
                onButtonClick={handleParamClick}
                activeParams={stateParam}
              />
            ))}

            <Range
              values={priceRange}
              onChange={setPriceRange}
              className={styles.filterRange}
            />

            <Button
              text="Ещё фильтры"
              size="md"
              variant="outline"
              icon
              iconUrl="/chevron-arrow.svg"
              iconAlt=""
              iconClassName="h-5 w-5"
              onClick={openFilterModal}
            />
          </div>

          <div className="hidden xl:block">
            <Button text="Показать предложения" size="md" variant="accent" />
          </div>
        </div>

        {stateParam.length > 0 ? (
          <div className="hidden flex-wrap gap-2 xl:flex">
            {stateParam.map((text, index) => (
              <button
                key={`${text}-${index}`}
                type="button"
                onClick={() => closeParamClick(index)}
                className="flex h-10 items-center gap-2 rounded-4xl bg-accent40 px-5 text-sm text-dark transition hover:bg-accent/20"
              >
                <span>{`${text}-комнатные`}</span>
                <img src="/close.svg" alt="" className="h-4 w-4" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <FilterModal
        resetRooms={resetRooms}
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        selectedRooms={stateParam}
        onToggleRoom={toggleRoom}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
      />
    </>
  );
};

export default Filter;
