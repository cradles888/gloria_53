"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/UI/Button";

const STATUS_LABEL = {
  available: { text: "В продаже", cls: "bg-green-100 text-green-700" },
  reserved:  { text: "Забронирована", cls: "bg-yellow-100 text-yellow-700" },
  sold:      { text: "Продана", cls: "bg-dark10 text-dark50" },
};

const formatPrice = (value) => new Intl.NumberFormat("ru-RU").format(value);

const StatusBadge = ({ status }) => {
  const s = STATUS_LABEL[status] ?? { text: status, cls: "bg-dark10 text-dark50" };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${s.cls}`}>
      {s.text}
    </span>
  );
};

const ListView = ({ apartments }) => (
  <div className="divide-y divide-dark15">
    {apartments.map((apt) => (
      <div key={apt.id} className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
        <div>
          <p className="text-lg font-medium text-dark">
            №{apt.number} · {apt.rooms}-комн. · {apt.areaTotal} м²
          </p>
          <p className="mt-2 text-sm text-dark50">
            {apt.complexName} · позиция {apt.position || "—"} · этаж {apt.floor}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:justify-end">
          <StatusBadge status={apt.status} />
          <span className="text-sm font-medium text-dark">{formatPrice(apt.price)} ₽</span>
          <Button variant="ghost" size="sm" linkToPage={`/g53-manager/apartments/${apt.id}`}>Редактировать</Button>
          <Button variant="ghost" size="sm" linkToPage={`/apartments/${apt.id}`}>Открыть</Button>
        </div>
      </div>
    ))}
  </div>
);

const TableView = ({ apartments }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-dark15 text-left text-xs font-semibold uppercase tracking-wide text-dark40">
          <th className="px-4 py-3">№</th>
          <th className="px-4 py-3">Комнат</th>
          <th className="px-4 py-3">Площадь</th>
          <th className="px-4 py-3">Этаж</th>
          <th className="px-4 py-3">Подъезд</th>
          <th className="px-4 py-3">Позиция</th>
          <th className="px-4 py-3">ЖК</th>
          <th className="px-4 py-3">Цена, ₽</th>
          <th className="px-4 py-3">Статус</th>
          <th className="px-4 py-3"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-dark15">
        {apartments.map((apt) => (
          <tr key={apt.id} className="hover:bg-dark5 transition-colors">
            <td className="px-4 py-3 font-medium text-dark">{apt.number}</td>
            <td className="px-4 py-3 text-dark50">{apt.rooms}</td>
            <td className="px-4 py-3 text-dark50">{apt.areaTotal} м²</td>
            <td className="px-4 py-3 text-dark50">{apt.floor}</td>
            <td className="px-4 py-3 text-dark50">{apt.entrance ?? "—"}</td>
            <td className="px-4 py-3 text-dark50">{apt.position || "—"}</td>
            <td className="px-4 py-3 text-dark50">{apt.complexName}</td>
            <td className="px-4 py-3 font-medium text-dark">{formatPrice(apt.price)}</td>
            <td className="px-4 py-3"><StatusBadge status={apt.status} /></td>
            <td className="px-4 py-3">
              <div className="flex gap-2">
                <Link
                  href={`/g53-manager/apartments/${apt.id}`}
                  className="text-xs text-accent hover:underline"
                >
                  Изменить
                </Link>
                <Link
                  href={`/apartments/${apt.id}`}
                  className="text-xs text-dark40 hover:text-dark hover:underline"
                >
                  Открыть
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ApartmentsViewToggle = ({ apartments }) => {
  const [view, setView] = useState("list");

  return (
    <>
      <div className="flex items-center gap-2 border-b border-dark15 px-5 py-3 sm:px-6">
        {["list", "table"].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`h-8 rounded-full px-4 text-xs font-medium transition ${
              view === v
                ? "bg-dark text-white"
                : "border border-dark15 text-dark50 hover:border-dark hover:text-dark"
            }`}
          >
            {v === "list" ? "Список" : "Таблица"}
          </button>
        ))}
      </div>

      {view === "list" ? (
        <ListView apartments={apartments} />
      ) : (
        <TableView apartments={apartments} />
      )}
    </>
  );
};

export default ApartmentsViewToggle;
