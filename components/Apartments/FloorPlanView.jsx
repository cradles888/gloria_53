"use client";

import Link from "next/link";

const formatPrice = (price) =>
  price ? new Intl.NumberFormat("ru-RU").format(price) : null;

const cellStyle = (status, highlighted) => {
  if (status === "available") {
    return highlighted
      ? "bg-accent text-white hover:opacity-90 cursor-pointer"
      : "bg-accent/20 text-dark50 cursor-pointer hover:bg-accent/35";
  }
  if (status === "reserved") return "bg-dark10 text-dark40 cursor-default";
  return "bg-dark5 text-dark30 cursor-default"; // sold
};

const ApartmentCell = ({ apartment, highlighted }) => {
  const cls = cellStyle(apartment.status, highlighted);

  const content = (
    <div className={`rounded-2xl p-2 transition select-none ${cls}`} style={{ minWidth: 88 }}>
      <div className="flex items-baseline justify-between gap-1 text-xs font-medium leading-tight">
        <span>{apartment.rooms}к</span>
        <span>№{apartment.number}</span>
      </div>
      {apartment.status === "available" && highlighted && apartment.price ? (
        <div className="mt-0.5 text-[10px] leading-tight">
          {formatPrice(apartment.price)}
        </div>
      ) : null}
      <div className="mt-0.5 text-[10px] leading-tight opacity-70">
        {apartment.areaTotal} м²
      </div>
    </div>
  );

  if (apartment.status !== "sold") {
    return (
      <Link href={`/apartments/${apartment.id}`} tabIndex={highlighted ? 0 : -1}>
        {content}
      </Link>
    );
  }
  return content;
};

const FloorPlanView = ({ apartments = [], filteredIds = new Set() }) => {
  if (apartments.length === 0) {
    return (
      <div className="mt-12 rounded-4xl bg-dark10 p-8 text-center">
        <p className="text-dark60">Нет квартир для отображения</p>
        <p className="mt-2 text-sm text-dark40">
          Выберите позицию в фильтре, чтобы увидеть план дома
        </p>
      </div>
    );
  }

  // Группировка: buildingId → entrance → floor → apartments[]
  const buildingsMap = new Map();

  for (const apt of apartments) {
    if (!buildingsMap.has(apt.buildingId)) {
      buildingsMap.set(apt.buildingId, {
        label: `${apt.complexName} · Позиция ${apt.buildingPosition || apt.buildingId}`,
        entrances: new Map(),
      });
    }
    const bld = buildingsMap.get(apt.buildingId);
    const ent = apt.entrance ?? 1;
    if (!bld.entrances.has(ent)) bld.entrances.set(ent, new Map());
    const floor = bld.entrances.get(ent);
    if (!floor.has(apt.floor)) floor.set(apt.floor, []);
    floor.get(apt.floor).push(apt);
  }

  return (
    <div className="mt-8 grid gap-12">
      {Array.from(buildingsMap.values()).map((building) => (
        <div key={building.label}>
          <h3 className="mb-6 text-xl font-medium text-dark">{building.label}</h3>

          <div className="flex flex-wrap items-start gap-8">
            {Array.from(building.entrances.entries())
              .sort(([a], [b]) => a - b)
              .map(([entrance, floorMap]) => {
                // Этажи сверху вниз
                const floorNums = Array.from(floorMap.keys()).sort((a, b) => b - a);
                // Максимальное кол-во квартир на этаже — определяет число столбцов
                const maxCols = Math.max(...floorNums.map((f) => floorMap.get(f).length));

                return (
                  <div key={entrance}>
                    <p className="mb-3 text-sm font-semibold text-dark50">
                      Подъезд №{entrance}
                    </p>

                    <div className="overflow-x-auto">
                      <div className="inline-block">
                        {floorNums.map((floor) => {
                          // Сортировка квартир по номеру
                          const floorApts = [...floorMap.get(floor)].sort(
                            (a, b) => Number(b.number) - Number(a.number),
                          );

                          return (
                            <div key={floor} className="mb-1 flex items-stretch gap-1">
                              {/* этаж */}
                              <div className="flex w-6 shrink-0 items-center justify-end pr-1 text-xs font-medium text-dark40">
                                {floor}
                              </div>

                              {/* Ячейки */}
                              {Array.from({ length: maxCols }).map((_, idx) => {
                                const apt = floorApts[idx];
                                return (
                                  <div key={idx} style={{ width: 96 }} className="shrink-0">
                                    {apt ? (
                                      <ApartmentCell
                                        apartment={apt}
                                        highlighted={filteredIds.has(apt.id)}
                                      />
                                    ) : (
                                      <div style={{ minHeight: 52 }} />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-4 text-xs text-dark50">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-5 rounded-sm bg-accent" />
          В продаже
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-5 rounded-sm bg-accent/20" />
          Не в фильтре
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-5 rounded-sm bg-dark10" />
          Забронирована
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-5 rounded-sm bg-dark5" />
          Продана
        </span>
      </div>
    </div>
  );
};

export default FloorPlanView;
