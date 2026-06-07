// Границы числовых полей БД (PostgreSQL).
// Int — 32-битное знаковое целое; превышение приводит к ошибке вставки.
export const INT32_MAX = 2147483647;
export const DECIMAL_8_2_MAX = 999999.99; // Decimal(8,2) — площадь
export const DECIMAL_4_2_MAX = 99.99; // Decimal(4,2) — высота потолков

// Границы конкретных полей (используются и на клиенте — атрибут max, и на сервере).
export const FIELD_LIMITS = {
  rooms: { min: 0, max: 20 },
  floor: { min: 1, max: 300 },
  entrance: { min: 1, max: 99 },
  floorsTotal: { min: 1, max: 300 },
  entrancesTotal: { min: 1, max: 99 },
  price: { min: 0, max: INT32_MAX },
  pricePerSqm: { min: 0, max: INT32_MAX },
  sortOrder: { min: 0, max: INT32_MAX },
  areaTotal: { min: 0.01, max: DECIMAL_8_2_MAX },
  ceilingHeight: { min: 0, max: DECIMAL_4_2_MAX },
  lng: { min: -180, max: 180 },
  lat: { min: -90, max: 90 },
};

// Максимальная длина текстовых полей (для коротких обозначений и адресов).
export const STRING_LIMITS = {
  position: 10,
  name: 80,
  address: 200,
};

// Проверяет, что длина строки не превышает лимит.
export const withinLength = (raw, max) =>
  String(raw ?? "").trim().length <= max;

// Парсит целое и проверяет диапазон. Возвращает { ok, value }.
// allowEmpty=true => пустая строка валидна и даёт value=null.
export const parseBoundedInt = (
  raw,
  { min = 0, max = INT32_MAX, allowEmpty = false } = {},
) => {
  const s = String(raw ?? "").trim();
  if (s === "") return allowEmpty ? { ok: true, value: null } : { ok: false };

  const n = Number(s);
  if (!Number.isInteger(n)) return { ok: false };
  if (n < min || n > max) return { ok: false };
  return { ok: true, value: n };
};

// Парсит десятичное (площадь/высота). Хранит как строку для Prisma Decimal.
export const parseBoundedDecimal = (
  raw,
  { min = 0, max = DECIMAL_8_2_MAX, allowEmpty = false } = {},
) => {
  const s = String(raw ?? "").trim().replace(",", ".");
  if (s === "") return allowEmpty ? { ok: true, value: null } : { ok: false };

  const n = Number(s);
  if (!Number.isFinite(n)) return { ok: false };
  if (n < min || n > max) return { ok: false };
  return { ok: true, value: s };
};
