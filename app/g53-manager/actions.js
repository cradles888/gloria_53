"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createAdminSession,
  destroyAdminSession,
  getAdminByCredentials,
  requireAdmin,
} from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import {
  FIELD_LIMITS,
  STRING_LIMITS,
  withinLength,
  parseBoundedInt,
  parseBoundedDecimal,
} from "@/lib/validation";

// Проверяет, что числовые поля квартиры в допустимых пределах БД
// (Int ≤ 2 147 483 647, площадь Decimal(8,2), высота Decimal(4,2)).
const apartmentNumbersValid = (formData) =>
  [
    parseBoundedInt(formData.get("rooms"), { ...FIELD_LIMITS.rooms, allowEmpty: true }),
    parseBoundedInt(formData.get("floor"), { ...FIELD_LIMITS.floor, allowEmpty: true }),
    parseBoundedInt(formData.get("entrance"), { ...FIELD_LIMITS.entrance, allowEmpty: true }),
    parseBoundedInt(formData.get("price"), { ...FIELD_LIMITS.price, allowEmpty: true }),
    parseBoundedInt(formData.get("pricePerSqm"), { ...FIELD_LIMITS.pricePerSqm, allowEmpty: true }),
    parseBoundedDecimal(formData.get("areaTotal"), { ...FIELD_LIMITS.areaTotal, allowEmpty: true }),
    parseBoundedDecimal(formData.get("ceilingHeight"), { ...FIELD_LIMITS.ceilingHeight, allowEmpty: true }),
  ].every((c) => c.ok);

const buildingFieldsValid = (formData) =>
  [
    parseBoundedInt(formData.get("floorsTotal"), { ...FIELD_LIMITS.floorsTotal, allowEmpty: true }),
    parseBoundedInt(formData.get("entrancesTotal"), { ...FIELD_LIMITS.entrancesTotal, allowEmpty: true }),
  ].every((c) => c.ok) &&
  withinLength(formData.get("position"), STRING_LIMITS.position) &&
  withinLength(formData.get("name"), STRING_LIMITS.name) &&
  withinLength(formData.get("address"), STRING_LIMITS.address);

const builtObjectNumbersValid = (formData) =>
  [
    parseBoundedInt(formData.get("sortOrder"), { ...FIELD_LIMITS.sortOrder, allowEmpty: true }),
    parseBoundedDecimal(formData.get("lng"), { ...FIELD_LIMITS.lng, allowEmpty: true }),
    parseBoundedDecimal(formData.get("lat"), { ...FIELD_LIMITS.lat, allowEmpty: true }),
  ].every((c) => c.ok);

const parseBoolean = (value) => value === "on" || value === "true";

const parseDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

const parseContent = (value) => {
  return String(value || "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
};

const parseAmenityIds = (formData) =>
  formData.getAll("amenities").map(Number).filter(Boolean);

const getNewsDataFromForm = (formData) => ({
  title: String(formData.get("title") || "").trim(),
  slug: String(formData.get("slug") || "").trim(),
  excerpt: String(formData.get("excerpt") || "").trim() || null,
  content: parseContent(formData.get("content")),
  image: String(formData.get("image") || "").trim() || null,
  label: String(formData.get("label") || "Новости").trim(),
  type: String(formData.get("type") || "news").trim(),
  isFeatured: parseBoolean(formData.get("isFeatured")),
  isPublished: parseBoolean(formData.get("isPublished")),
  showOnMain: parseBoolean(formData.get("showOnMain")),
  sortOrder: parseBoundedInt(formData.get("sortOrder"), {
    ...FIELD_LIMITS.sortOrder,
    allowEmpty: true,
  }).value ?? 0,
  publishedAt: parseDate(formData.get("publishedAt")),
});

export const loginAdmin = async (formData) => {
  const login = String(formData.get("login") || "").trim();
  const password = String(formData.get("password") || "");

  if (!process.env.ADMIN_SESSION_SECRET && !process.env.NEXTAUTH_SECRET) {
    redirect("/g53-manager?error=config");
  }

  const admin = await getAdminByCredentials(login, password);

  if (!admin) {
    redirect("/g53-manager?error=1");
  }

  await prisma.adminUser.update({
    where: {
      id: admin.id,
    },
    data: {
      lastLoginAt: new Date(),
    },
  });

  await createAdminSession(admin.id);
  redirect("/g53-manager");
};

export const logoutAdmin = async () => {
  await destroyAdminSession();
  redirect("/g53-manager");
};

export const createNewsItem = async (formData) => {
  await requireAdmin();

  const data = getNewsDataFromForm(formData);

  // Обязательны все поля, кроме метки и порядка
  if (
    !data.title ||
    !data.slug ||
    !data.excerpt ||
    data.content.length === 0 ||
    !data.image ||
    !data.publishedAt
  ) {
    redirect("/g53-manager/news/new?error=required");
  }

  await prisma.newsItem.create({
    data,
  });

  revalidatePath("/news");
  revalidatePath("/g53-manager/news");
  redirect("/g53-manager/news");
};

export const updateNewsItem = async (formData) => {
  await requireAdmin();

  const id = Number(formData.get("id"));
  const data = getNewsDataFromForm(formData);

  if (!id || !data.title || !data.slug) {
    redirect("/g53-manager/news?error=required");
  }

  await prisma.newsItem.update({
    where: {
      id,
    },
    data,
  });

  revalidatePath("/news");
  revalidatePath(`/news/${data.slug}`);
  revalidatePath("/g53-manager/news");
  redirect("/g53-manager/news");
};

export const deleteNewsItem = async (formData) => {
  await requireAdmin();

  const id = Number(formData.get("id"));

  if (!id) return;

  await prisma.newsItem.delete({
    where: {
      id,
    },
  });

  revalidatePath("/news");
  revalidatePath("/g53-manager/news");
  redirect("/g53-manager/news");
};

export const updateApartment = async (formData) => {
  await requireAdmin();

  const id = Number(formData.get("id"));
  if (!id) redirect("/g53-manager/apartments?error=required");

  if (!apartmentNumbersValid(formData)) {
    redirect(`/g53-manager/apartments/${id}?error=range`);
  }

  const number = String(formData.get("number") || "").trim();
  const rooms = Number(formData.get("rooms") || 0);
  const floor = Number(formData.get("floor") || 0);
  const areaTotalRaw = String(formData.get("areaTotal") || "").trim();
  const price = Number(formData.get("price") || 0);
  const pricePerSqmRaw = String(formData.get("pricePerSqm") || "").trim();
  const entranceRaw = String(formData.get("entrance") || "").trim();
  const ceilingHeightRaw = String(formData.get("ceilingHeight") || "").trim();
  const mainImage = String(formData.get("mainImage") || "").trim();
  const planImage = String(formData.get("planImage") || "").trim();
  const amenityIds = parseAmenityIds(formData);

  await prisma.apartment.update({
    where: { id },
    data: {
      number,
      rooms,
      areaTotal: areaTotalRaw,
      price,
      pricePerSqm: pricePerSqmRaw ? Number(pricePerSqmRaw) : null,
      floor,
      entrance: entranceRaw ? Number(entranceRaw) : null,
      ceilingHeight: ceilingHeightRaw || null,
      status: String(formData.get("status") || "available"),
      layoutType: String(formData.get("layoutType") || "Квартира").trim(),
      mainImage: mainImage || null,
      planImage: planImage || null,
      amenities: {
        deleteMany: {},
        create: amenityIds.map((amenityId) => ({ amenityId })),
      },
    },
  });

  revalidatePath("/apartments");
  revalidatePath(`/apartments/${id}`);
  revalidatePath("/g53-manager/apartments");
  redirect("/g53-manager/apartments");
};

export const deleteApartment = async (formData) => {
  await requireAdmin();

  const id = Number(formData.get("id"));
  if (!id) return;

  await prisma.apartment.delete({ where: { id } });

  revalidatePath("/apartments");
  revalidatePath("/g53-manager/apartments");
  redirect("/g53-manager/apartments");
};

export const createBuilding = async (formData) => {
  await requireAdmin();

  const complexId = Number(formData.get("complexId"));

  // Обязательны: ЖК, позиция, адрес, этажи, подъезды, плановая дата сдачи
  const position = String(formData.get("position") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const floorsTotal = String(formData.get("floorsTotal") || "").trim();
  const entrancesTotal = String(formData.get("entrancesTotal") || "").trim();
  const plannedSettlementDate = String(formData.get("plannedSettlementDate") || "").trim();

  if (
    !complexId ||
    !position ||
    !address ||
    !floorsTotal ||
    !entrancesTotal ||
    !plannedSettlementDate
  ) {
    redirect("/g53-manager/buildings/new?error=required");
  }

  if (!buildingFieldsValid(formData)) {
    redirect("/g53-manager/buildings/new?error=range");
  }

  await prisma.building.create({
    data: {
      complexId,
      name: String(formData.get("name") || "").trim() || null,
      position: String(formData.get("position") || "").trim() || null,
      address: String(formData.get("address") || "").trim() || null,
      floorsTotal: Number(formData.get("floorsTotal") || 0) || null,
      entrancesTotal: Number(formData.get("entrancesTotal") || 0) || null,
      plannedSettlementDate: parseDate(formData.get("plannedSettlementDate")),
      heroImage: String(formData.get("heroImage") || "").trim() || null,
      status: String(formData.get("status") || "active").trim(),
    },
  });

  revalidatePath("/apartments");
  revalidatePath("/g53-manager/buildings");
  redirect("/g53-manager/buildings");
};

export const deleteBuilding = async (formData) => {
  await requireAdmin();

  const id = Number(formData.get("id"));
  if (!id) return;

  const apartmentCount = await prisma.apartment.count({ where: { buildingId: id } });
  if (apartmentCount > 0) {
    redirect(`/g53-manager/buildings/${id}?error=has-apartments`);
  }

  await prisma.building.delete({ where: { id } });

  revalidatePath("/apartments");
  revalidatePath("/g53-manager/buildings");
  redirect("/g53-manager/buildings");
};

export const updateBuilding = async (formData) => {
  await requireAdmin();

  const id = Number(formData.get("id"));
  if (!id) redirect("/g53-manager/buildings?error=required");

  if (!buildingFieldsValid(formData)) {
    redirect(`/g53-manager/buildings/${id}?error=range`);
  }

  await prisma.building.update({
    where: { id },
    data: {
      name: String(formData.get("name") || "").trim() || null,
      position: String(formData.get("position") || "").trim() || null,
      address: String(formData.get("address") || "").trim() || null,
      floorsTotal: Number(formData.get("floorsTotal") || 0) || null,
      entrancesTotal: Number(formData.get("entrancesTotal") || 0) || null,
      plannedSettlementDate: parseDate(formData.get("plannedSettlementDate")),
      heroImage: String(formData.get("heroImage") || "").trim() || null,
      status: String(formData.get("status") || "active").trim(),
    },
  });

  revalidatePath("/apartments");
  revalidatePath("/g53-manager/buildings");
  redirect("/g53-manager/buildings");
};

const parseImages = (formData) => {
  const all = formData.getAll("images").map((s) => String(s).trim()).filter(Boolean);
  if (all.length > 0) return all;
  return String(formData.get("images") || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
};

const parseCoordinates = (lng, lat) => {
  const x = parseFloat(lng);
  const y = parseFloat(lat);
  if (isNaN(x) || isNaN(y)) return [];
  return [x, y];
};

export const createBuiltObject = async (formData) => {
  await requireAdmin();

  // Обязательны все поля, кроме порядка сортировки
  const title = String(formData.get("title") || "").trim();
  const year = String(formData.get("year") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const complex = String(formData.get("complex") || "").trim();
  const lng = String(formData.get("lng") || "").trim();
  const lat = String(formData.get("lat") || "").trim();
  const images = parseImages(formData);

  if (
    !title ||
    !year ||
    !description ||
    !complex ||
    !lng ||
    !lat ||
    images.length === 0
  ) {
    redirect("/g53-manager/built-objects/new?error=required");
  }

  if (!builtObjectNumbersValid(formData)) {
    redirect("/g53-manager/built-objects/new?error=range");
  }

  await prisma.builtObject.create({
    data: {
      title: String(formData.get("title") || "").trim(),
      year: String(formData.get("year") || "").trim(),
      description: String(formData.get("description") || "").trim() || null,
      images: parseImages(formData),
      coordinates: parseCoordinates(formData.get("lng"), formData.get("lat")),
      complex: String(formData.get("complex") || "").trim() || null,
      sortOrder: Number(formData.get("sortOrder") || 0),
    },
  });

  revalidatePath("/built-object");
  revalidatePath("/g53-manager/built-objects");
  redirect("/g53-manager/built-objects");
};

export const updateBuiltObject = async (formData) => {
  await requireAdmin();

  const id = Number(formData.get("id"));
  if (!id) redirect("/g53-manager/built-objects?error=required");

  if (!builtObjectNumbersValid(formData)) {
    redirect(`/g53-manager/built-objects/${id}?error=range`);
  }

  await prisma.builtObject.update({
    where: { id },
    data: {
      title: String(formData.get("title") || "").trim(),
      year: String(formData.get("year") || "").trim(),
      description: String(formData.get("description") || "").trim() || null,
      images: parseImages(formData),
      coordinates: parseCoordinates(formData.get("lng"), formData.get("lat")),
      complex: String(formData.get("complex") || "").trim() || null,
      sortOrder: Number(formData.get("sortOrder") || 0),
    },
  });

  revalidatePath("/built-object");
  revalidatePath("/g53-manager/built-objects");
  redirect("/g53-manager/built-objects");
};

export const deleteBuiltObject = async (formData) => {
  await requireAdmin();

  const id = Number(formData.get("id"));
  if (!id) return;

  await prisma.builtObject.delete({ where: { id } });

  revalidatePath("/built-object");
  revalidatePath("/g53-manager/built-objects");
  redirect("/g53-manager/built-objects");
};

export const updateApplicationStatus = async (formData) => {
  await requireAdmin();

  const id = Number(formData.get("id"));
  const status = String(formData.get("status") || "new");
  if (!id) return;

  await prisma.application.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/g53-manager/applications");
};

export const createApartment = async (formData) => {
  await requireAdmin();

  const buildingId = Number(formData.get("buildingId"));
  const number = String(formData.get("number") || "").trim();
  const rooms = Number(formData.get("rooms") || 0);
  const floor = Number(formData.get("floor") || 0);
  const areaTotalRaw = String(formData.get("areaTotal") || "").trim();
  const price = Number(formData.get("price") || 0);
  const pricePerSqm = Number(formData.get("pricePerSqm") || 0);
  const mainImage = String(formData.get("mainImage") || "").trim();
  const planImage = String(formData.get("planImage") || "").trim();

  if (
    !buildingId ||
    !number ||
    !rooms ||
    !floor ||
    !areaTotalRaw ||
    !price ||
    !pricePerSqm ||
    !mainImage ||
    !planImage
  ) {
    redirect("/g53-manager/apartments/new?error=required");
  }

  if (!apartmentNumbersValid(formData)) {
    redirect("/g53-manager/apartments/new?error=range");
  }

  const entranceRaw = String(formData.get("entrance") || "").trim();
  const ceilingHeightRaw = String(formData.get("ceilingHeight") || "").trim();
  const amenityIds = parseAmenityIds(formData);

  await prisma.apartment.create({
    data: {
      buildingId,
      number,
      rooms,
      areaTotal: areaTotalRaw,
      price,
      pricePerSqm,
      floor,
      entrance: entranceRaw ? Number(entranceRaw) : null,
      ceilingHeight: ceilingHeightRaw || "2.70",
      status: String(formData.get("status") || "available"),
      layoutType: "Квартира",
      mainImage,
      planImage,
      amenities: {
        create: amenityIds.map((amenityId) => ({ amenityId })),
      },
    },
  });

  revalidatePath("/apartments");
  revalidatePath("/g53-manager/apartments");
  redirect("/g53-manager/apartments");
};
