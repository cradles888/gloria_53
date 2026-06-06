"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ROOMS = [
  { label: "Студия", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4+", value: "4" },
];

const HeroSearch = () => {
  const router = useRouter();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const toggleRoom = (value) => {
    setSelectedRooms((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedRooms.length > 0) params.set("rooms", selectedRooms.join(","));
    if (priceFrom) params.set("priceFrom", priceFrom);
    if (priceTo) params.set("priceTo", priceTo);
    router.push(`/apartments${params.size > 0 ? `?${params}` : ""}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-4xl bg-white/95 p-5 shadow-xl backdrop-blur sm:p-6 lg:p-7"
    >
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-dark50">
          Количество комнат
        </p>
        <div className="flex flex-wrap gap-2">
          {ROOMS.map(({ label, value }) => {
            const active = selectedRooms.includes(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => toggleRoom(value)}
                className={`h-10 min-w-[52px] rounded-full border px-4 text-sm font-medium transition ${
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-dark15 text-dark hover:border-accent hover:text-accent"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-dark50">
            Бюджет, млн ₽
          </p>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="number"
                min="0"
                max="50"
                step="0.5"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                placeholder="от"
                className="h-11 w-full rounded-full border border-dark15 bg-white pl-4 pr-10 text-sm outline-none transition focus:border-accent"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-dark40">
                млн
              </span>
            </div>
            <span className="shrink-0 text-dark30">—</span>
            <div className="relative flex-1">
              <input
                type="number"
                min="0"
                max="50"
                step="0.5"
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                placeholder="до"
                className="h-11 w-full rounded-full border border-dark15 bg-white pl-4 pr-10 text-sm outline-none transition focus:border-accent"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-dark40">
                млн
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white transition hover:opacity-90 active:scale-[0.98]"
        >
          Найти квартиры
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default HeroSearch;
