import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { FIELD_LIMITS } from "@/lib/validation";

const STATUS_MAP = {
  "в продаже": "available",
  available: "available",
  "забронирована": "reserved",
  reserved: "reserved",
  "продана": "sold",
  sold: "sold",
};

const parseDecimal = (val) => {
  if (val === null || val === undefined || val === "") return null;
  const n = parseFloat(String(val).replace(",", "."));
  return isNaN(n) ? null : n;
};

const parseInteger = (val) => {
  if (val === null || val === undefined || val === "") return null;
  const n = parseInt(String(val), 10);
  return isNaN(n) ? null : n;
};

export async function POST(request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  if (!rows.length) {
    return NextResponse.json({ error: "Таблица пустая" }, { status: 400 });
  }

  const [buildings, amenities, existingApartments] = await Promise.all([
    prisma.building.findMany({ include: { complex: true } }),
    prisma.amenity.findMany(),
    prisma.apartment.findMany({ select: { buildingId: true, number: true } }),
  ]);

  // Ключи уже существующих квартир «домId:номер» — чтобы не создавать дубликаты
  // (и относительно базы, и внутри самого загружаемого файла).
  const existingKeys = new Set(
    existingApartments.map((a) => `${a.buildingId}:${String(a.number).trim()}`),
  );

  const findBuilding = (position, complexName) => {
    if (!position) return null;
    const pos = String(position).trim();
    const cx = complexName ? String(complexName).trim().toLowerCase() : null;

    return buildings.find((b) => {
      const posMatch = b.position?.trim() === pos || b.name?.trim() === pos;
      if (!posMatch) return false;
      if (cx) return b.complex.name.toLowerCase() === cx;
      return true;
    }) ?? null;
  };


  const amenityByKey = new Map();
  for (const a of amenities) {
    amenityByKey.set(a.name.toLowerCase(), a.id);
    amenityByKey.set(a.slug.toLowerCase(), a.id);
  }

  const parseAmenityIds = (cell) => {
    const ids = String(cell || "")
      .split(",")
      .map((s) => amenityByKey.get(s.trim().toLowerCase()))
      .filter((id) => id !== undefined);
    return [...new Set(ids)];
  };

  const created = [];
  const skipped = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNum = i + 2;

    const position = row["Позиция"];
    const complexName = row["ЖК"];
    const number = String(row["Номер"] ?? "").trim();
    const rooms = parseInteger(row["Комнат"]);
    const areaTotal = parseDecimal(row["Площадь"]);
    const floor = parseInteger(row["Этаж"]);
    const price = parseInteger(row["Цена"]);

    if (!number || rooms === null || areaTotal === null || floor === null || price === null) {
      skipped.push({ row: rowNum, reason: "Пропущены обязательные поля (Номер, Комнат, Площадь, Этаж, Цена)" });
      continue;
    }

    const building = findBuilding(position, complexName);
    if (!building) {
      skipped.push({ row: rowNum, reason: `Дом с позицией «${position}» не найден` });
      continue;
    }

    const dedupeKey = `${building.id}:${number}`;
    if (existingKeys.has(dedupeKey)) {
      skipped.push({
        row: rowNum,
        reason: `Квартира №${number} в этом доме уже есть — пропущена (дубликат)`,
      });
      continue;
    }

    const pricePerSqm = parseInteger(row["Цена за м2"]);
    const entrance = parseInteger(row["Подъезд"]);
    const ceilingHeight = parseDecimal(row["Высота потолков"]);
    const layoutType = String(row["Тип"] || "Квартира").trim();
    const statusRaw = String(row["Статус"] || "").trim().toLowerCase();
    const status = STATUS_MAP[statusRaw] ?? "available";
    const mainImage = String(row["Главное фото"] || "").trim() || null;
    const planImage = String(row["План этажа"] || "").trim() || null;
    const amenityIds = parseAmenityIds(row["Удобства"]);

    const overLimit =
      rooms > FIELD_LIMITS.rooms.max ||
      floor > FIELD_LIMITS.floor.max ||
      price > FIELD_LIMITS.price.max ||
      areaTotal > FIELD_LIMITS.areaTotal.max ||
      (pricePerSqm !== null && pricePerSqm > FIELD_LIMITS.pricePerSqm.max) ||
      (entrance !== null && entrance > FIELD_LIMITS.entrance.max) ||
      (ceilingHeight !== null && ceilingHeight > FIELD_LIMITS.ceilingHeight.max);

    if (overLimit) {
      skipped.push({
        row: rowNum,
        reason:
          "Числовое значение превышает допустимый предел (цена до 2 147 483 647, площадь до 999 999,99)",
      });
      continue;
    }

    try {
      const apartment = await prisma.apartment.create({
        data: {
          buildingId: building.id,
          number,
          rooms,
          areaTotal,
          price,
          pricePerSqm: pricePerSqm ?? null,
          floor,
          entrance,
          ceilingHeight,
          layoutType,
          status,
          mainImage,
          planImage,
          amenities: {
            create: amenityIds.map((amenityId) => ({ amenityId })),
          },
        },
      });
      created.push({ row: rowNum, number: apartment.number, id: apartment.id });
      existingKeys.add(dedupeKey); // защита от дублей внутри одного файла
    } catch (err) {
      skipped.push({ row: rowNum, reason: `Ошибка создания: ${err.message}` });
    }
  }

  return NextResponse.json({ created: created.length, skipped, total: rows.length });
}
