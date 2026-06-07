"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

const ALLOWED_TYPES = ["purchase", "consultation", "message"];

// Заявка с карточки квартиры — с редиректом на страницу квартиры
export const submitApplication = async (formData) => {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const comment = String(formData.get("comment") || "").trim();
  const apartmentId = Number(formData.get("apartmentId"));
  const purchaseOptionId = Number(formData.get("purchaseOption"));

  if (!name || !phone || !apartmentId) {
    redirect(`/apartments/${apartmentId}?error=required`);
  }

  await prisma.application.create({
    data: {
      apartmentId,
      type: "purchase",
      name,
      phone,
      comment: comment || null,
      purchaseOptionId:
        Number.isInteger(purchaseOptionId) && purchaseOptionId > 0
          ? purchaseOptionId
          : null,
    },
  });

  revalidatePath("/g53-manager/applications");
  redirect(`/apartments/${apartmentId}?success=1`);
};

// Универсальная заявка из модальных окон (ипотека, обратная связь и т.п.).
// Возвращает состояние для useActionState — без редиректа, работает на любой странице.
export const submitRequest = async (prevState, formData) => {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const comment = String(formData.get("comment") || "").trim();
  const rawType = String(formData.get("type") || "message").trim();
  const type = ALLOWED_TYPES.includes(rawType) ? rawType : "message";

  const apartmentIdRaw = formData.get("apartmentId");
  const apartmentId = apartmentIdRaw ? Number(apartmentIdRaw) : null;

  if (!name || !phone) {
    return { ok: false, error: "Укажите имя и телефон." };
  }

  try {
    await prisma.application.create({
      data: {
        type,
        name,
        phone,
        comment: comment || null,
        apartmentId: apartmentId && !Number.isNaN(apartmentId) ? apartmentId : null,
      },
    });
  } catch (e) {
    return { ok: false, error: "Не удалось отправить заявку. Попробуйте позже." };
  }

  revalidatePath("/g53-manager/applications");
  return { ok: true };
};
