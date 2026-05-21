"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ButtonParam from "@/components/Filter/UI/ButtonSelectParam";
import Button from "@/components/UI/Button";
import Range from "@/components/Filter/UI/Range";
import FilterModal from "@/components/Filter/UI/FilterModal";
import { ChevronRight } from "@/icons/ChevronRight";
import styles from "./Filter.module.css";

const ROOM_OPTIONS = ["1", "2", "3"];

export const DEFAULT_FILTERS = {
  rooms: [],
  priceRange: [0, 17],
  areaFrom: "",
  areaTo: "",
  floorFrom: "",
  floorTo: "",
  floorFeatures: [],
};

// Controlled mode: onFiltersChange + filters are passed from parent (ApartmentsCatalog).
// Standalone mode: no props → manages own state, "Показать" navigates to /apartments.
const Filter = ({
  filters: externalFilters,
  onFiltersChange,
  onReset,
  matchingCount = null,
} = {}) => {
  const router = useRouter();
  const isControlled = Boolean(onFiltersChange);

  const [internalFilters, setInternalFilters] = useState(DEFAULT_FILTERS);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const filters = isControlled ? externalFilters : internalFilters;

  const updateFilter = (key, value) => {
    if (isControlled) {
      onFiltersChange(key, value);
    } else {
      setInternalFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleReset = () => {
    if (isControlled) {
      onReset?.();
    } else {
      setInternalFilters(DEFAULT_FILTERS);
    }
  };

  const toggleRoom = (room) => {
    const next = filters.rooms.includes(room)
      ? filters.rooms.filter((r) => r !== room)
      : [...filters.rooms, room];
    updateFilter("rooms", next);
  };

  const handleShowClick = () => {
    if (!isControlled) {
      router.push("/apartments");
    }
  };

  const buttonLabel =
    matchingCount !== null
      ? `Показать предложения · ${matchingCount}`
      : "Показать предложения";

  return (
    <>
      <div className="mb-6 mt-12 grid gap-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          {/* Mobile */}
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr] xl:hidden">
            <Button
              text="Фильтры"
              size="md"
              variant="outline"
              icon
              iconUrl="/chevron-arrow.svg"
              iconAlt=""
              iconClassName="h-5 w-5"
              fullWidth
              onClick={() => setIsFilterModalOpen(true)}
            />
            <Button
              text={buttonLabel}
              size="md"
              variant="accent"
              fullWidth
              onClick={handleShowClick}
            />
          </div>

          {/* Desktop */}
          <div className="hidden xl:flex xl:flex-wrap xl:items-start xl:gap-2 xl:gap-y-4">
            {ROOM_OPTIONS.map((room) => (
              <ButtonParam
                key={room}
                text={room}
                onButtonClick={({ value, isActive }) => {
                  const next = isActive
                    ? [...filters.rooms, value]
                    : filters.rooms.filter((r) => r !== value);
                  updateFilter("rooms", next);
                }}
                activeParams={filters.rooms}
              />
            ))}

            <Range
              values={filters.priceRange}
              onChange={(val) => updateFilter("priceRange", val)}
              className={styles.filterRange}
            />

            <Button
              text="Ещё фильтры"
              size="md"
              variant="outline"
              iconImport={ChevronRight}
              iconClassName="w-5 h-5 rotate-270"
              onClick={() => setIsFilterModalOpen(true)}
            />
          </div>

          <div className="hidden xl:block">
            <Button
              text={buttonLabel}
              size="md"
              variant="accent"
              onClick={handleShowClick}
            />
          </div>
        </div>

        {filters.rooms.length > 0 ? (
          <div className="hidden flex-wrap gap-2 xl:flex">
            {filters.rooms.map((room) => (
              <button
                key={room}
                type="button"
                onClick={() => toggleRoom(room)}
                className="flex h-10 items-center gap-2 rounded-4xl bg-accent40 px-5 text-sm text-dark transition hover:bg-accent/20"
              >
                <span>{`${room}-комнатные`}</span>
                <img src="/close.svg" alt="" className="h-4 w-4" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onFiltersChange={updateFilter}
        onReset={handleReset}
        matchingCount={matchingCount}
      />
    </>
  );
};

export default Filter;
