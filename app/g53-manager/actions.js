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
  sortOrder: Number(formData.get("sortOrder") || 0),
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

  if (!data.title || !data.slug) {
    redirect("/g53-manager/news?error=required");
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
      article: String(formData.get("article") || "").trim() || null,
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
  redirect(`/g53-manager/apartments/${id}`);
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
  if (!complexId) redirect("/g53-manager/buildings/new?error=required");

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
  redirect(`/g53-manager/buildings/${id}`);
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
  redirect(`/g53-manager/built-objects/${id}`);
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
