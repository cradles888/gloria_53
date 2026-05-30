import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import AdminNav from "../../_components/AdminNav";
import Button from "@/components/UI/Button";
import EditBuildingForm from "./EditBuildingForm";
import DeleteBuildingButton from "./DeleteBuildingButton";

export const metadata = {
  title: "Редактировать дом",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditBuildingPage({ params, searchParams }) {
  await requireAdmin();

  const { id } = await params;
  const { error } = await searchParams;

  const building = await prisma.building.findUnique({
    where: { id: Number(id) },
    include: { complex: true },
  });

  if (!building) notFound();

  const apartmentCount = await prisma.apartment.count({
    where: { buildingId: building.id },
  });

  const displayName =
    building.position || building.name || `#${building.id}`;

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="buildings" title="Дома" />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-medium text-dark">
            {building.complex.name} · позиция {displayName}
          </h2>
          <Button variant="outline" size="sm" linkToPage="/g53-manager/buildings">
            Назад к списку
          </Button>
        </div>

        {error === "has-apartments" && (
          <p className="mt-6 rounded-3xl bg-red-50 px-5 py-3 text-sm text-red-600">
            Нельзя удалить дом: в нём {apartmentCount} квартир. Сначала удалите все квартиры.
          </p>
        )}

        <EditBuildingForm building={building} />

        <div className="mt-8 border-t border-dark15 pt-8">
          {apartmentCount > 0 ? (
            <p className="text-sm text-dark50">
              Удаление недоступно — в доме {apartmentCount} квартир.
            </p>
          ) : (
            <DeleteBuildingButton
              id={building.id}
              name={`${building.complex.name} · позиция ${displayName}`}
            />
          )}
        </div>
      </section>
    </main>
  );
}
