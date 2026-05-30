import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import AdminNav from "../../_components/AdminNav";
import Button from "@/components/UI/Button";
import NewApartmentForm from "./NewApartmentForm";

export const metadata = {
  title: "Новая квартира",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NewApartmentPage({ searchParams }) {
  await requireAdmin();

  const { error } = await searchParams;

  const [buildings, amenities] = await Promise.all([
    prisma.building.findMany({
      include: { complex: true },
      orderBy: { id: "asc" },
    }),
    prisma.amenity.findMany({ orderBy: { id: "asc" } }),
  ]);

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="apartments" title="Новая квартира" />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-medium text-dark">Добавить квартиру</h2>
          <Button variant="outline" size="sm" linkToPage="/g53-manager/apartments">
            Назад к списку
          </Button>
        </div>

        {error === "required" && (
          <p className="mt-6 rounded-3xl bg-accent/10 px-5 py-3 text-sm text-accent">
            Заполните все обязательные поля, отмеченные звёздочкой.
          </p>
        )}

        <NewApartmentForm buildings={buildings} amenities={amenities} />
      </section>
    </main>
  );
}
