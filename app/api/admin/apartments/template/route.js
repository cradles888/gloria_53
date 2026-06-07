import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { requireAdmin } from "@/lib/adminAuth";

const HEADERS = [
  "Позиция",
  "ЖК",
  "Номер",
  "Комнат",
  "Площадь",
  "Этаж",
  "Подъезд",
  "Высота потолков",
  "Цена",
  "Цена за м2",
  "Тип",
  "Статус",
  "Главное фото",
  "План этажа",
  "Удобства",
];

const SAMPLE_ROWS = [
  ["1", "ЖК Раздолье", "42", 2, 55.3, 5, 2, 2.7, 7800000, 141050, "Квартира", "в продаже", "", "", "Балкон, Кондиционер"],
  ["1", "ЖК Раздолье", "43", 1, 38.1, 5, 2, 2.7, 5200000, 136483, "Студия", "в продаже", "", "", "Балкон"],
  ["1", "ЖК Раздолье", "55", 3, 78.5, 7, 2, 2.7, 10900000, 138853, "Квартира", "забронирована", "", "", "Балкон, Подогрев полов, Раздельный с/у"],
  ["2", "ЖК Раздолье", "101", 2, 60.0, 3, 1, 2.85, 8400000, 140000, "Квартира", "в продаже", "", "", ""],
];

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ws = XLSX.utils.aoa_to_sheet([HEADERS, ...SAMPLE_ROWS]);

  ws["!cols"] = HEADERS.map((h) => ({ wch: Math.max(h.length + 2, 12) }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Квартиры");

  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="apartments-template.xlsx"',
    },
  });
}
