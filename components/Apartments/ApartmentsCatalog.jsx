"use client";

import { useMemo, useState } from "react";

import Filter from "@/components/Filter/page";
import SortDropdown from "@/components/UI/SortDropdown";
import ComplexSelector from "@/components/ComplexSelector";
import MortgageInfoBlock from "@/components/MortgageInfoBlock";
import SliderSwitch from "@/components/UI/SliderSwitch";
import AppartmentCard from "@/components/UI/AppartmentCard";
import FloorPlanView from "@/components/Apartments/FloorPlanView";

export const DEFAULT_FILTERS = {
  rooms: [],
  priceRange: [0, 17],
  areaFrom: "",
  areaTo: "",
  floorFrom: "",
  floorTo: "",
  floorFeatures: [],
  buildingId: null,
};

const applyFilters = (apartments, filters) =>
  apartments.filter((apt) => {
    if (apt.status !== "available") return false;
    if (filters.buildingId !== null && apt.buildingId !== filters.buildingId) return false;

    if (filters.rooms.length > 0 && !filters.rooms.includes(String(apt.rooms))) return false;

    const priceM = apt.price / 1_000_000;
    if (priceM < filters.priceRange[0] || priceM > filters.priceRange[1]) return false;

    const area = parseFloat(apt.areaTotal);
    if (filters.areaFrom && area < parseFloat(filters.areaFrom)) return false;
    if (filters.areaTo && area > parseFloat(filters.areaTo)) return false;

    if (filters.floorFrom && apt.floor < parseInt(filters.floorFrom)) return false;
    if (filters.floorTo && apt.floor > parseInt(filters.floorTo)) return false;

    if (filters.floorFeatures.includes("Не первый") && apt.floor === 1) return false;
    if (filters.floorFeatures.includes("Не последний") && apt.floorsTotal && apt.floor >= apt.floorsTotal) return false;
    if (filters.floorFeatures.includes("Последний") && (!apt.floorsTotal || apt.floor !== apt.floorsTotal)) return false;

    return true;
  });

const ApartmentsCatalog = ({ apartments = [], complexes = [], buildings = [], initialFilters = {} }) => {
  const [selectedComplex, setSelectedComplex] = useState(
    complexes[0]?.name || "ЖК Юннатов",
  );
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, ...initialFilters });
  const [view, setView] = useState("grid");

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const complexFiltered = useMemo(
    () => apartments.filter((apt) => apt.complexName === selectedComplex),
    [apartments, selectedComplex],
  );

  const complexBuildings = useMemo(
    () => buildings.filter((b) => b.complexName === selectedComplex),
    [buildings, selectedComplex],
  );

  const handleComplexSelect = (name) => {
    setSelectedComplex(name);
    setFilters((prev) => ({ ...prev, buildingId: null }));
  };

  const filteredApartments = useMemo(
    () => applyFilters(complexFiltered, filters),
    [complexFiltered, filters],
  );

  const filteredIds = useMemo(
    () => new Set(filteredApartments.map((apt) => apt.id)),
    [filteredApartments],
  );

  return (
    <div className="container-padding mx-auto">
      <div className="my-20 text-center lg:my-30">
        <h1 className="px-4 text-4xl text-dark md:text-5xl">
          Квартиры в{" "}
          <ComplexSelector
            selectedComplex={selectedComplex}
            onSelect={handleComplexSelect}
            options={complexes}
          />
        </h1>
      </div>

      <article>
        <Filter
          filters={filters}
          onFiltersChange={updateFilter}
          onReset={resetFilters}
          matchingCount={filteredApartments.length}
          buildings={complexBuildings}
        />

        <div className="mt-6 flex items-center justify-between gap-4">
          <SortDropdown
            text="Сортировать"
            iconLink="/chevron-arrow.svg"
            iconAlt="next-to-page"
          />
          <SliderSwitch view={view} setView={setView} />
        </div>
      </article>

      <MortgageInfoBlock />

      {view === "floor" ? (
        <FloorPlanView apartments={complexFiltered} filteredIds={filteredIds} />
      ) : filteredApartments.length > 0 ? (
        <div
          className={`${
            view === "grid"
              ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
              : "grid gap-6"
          } mt-12`}
        >
          {filteredApartments.map((apartment) => (
            <AppartmentCard
              key={apartment.id}
              view={view}
              apartment={apartment}
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-4xl bg-dark10 p-8 text-center">
          <h2 className="text-2xl font-medium text-dark">Квартиры не найдены</h2>
          <p className="mt-3 text-dark60">
            Попробуйте изменить параметры фильтра или{" "}
            <button
              type="button"
              onClick={resetFilters}
              className="text-accent underline-offset-2 hover:underline"
            >
              сбросить фильтры
            </button>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default ApartmentsCatalog;
