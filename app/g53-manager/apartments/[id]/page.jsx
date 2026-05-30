import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { deleteApartment } from "../../actions";
import AdminNav from "../../_components/AdminNav";
import Button from "@/components/UI/Button";
import EditApartmentForm from "./EditApartmentForm";

export const metadata = {
  title: "Редактировать квартиру",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditApartmentPage({ params }) {
  await requireAdmin();

  const { id } = await params;
  const apartment = await prisma.apartment.findUnique({
    where: { id: Number(id) },
    include: {
      building: { include: { complex: true } },
      amenities: { select: { amenityId: true } },
    },
  });

  if (!apartment) notFound();

  const [buildings, amenities] = await Promise.all([
    prisma.building.findMany({
      include: { complex: true },
      orderBy: { id: "asc" },
    }),
    prisma.amenity.findMany({ orderBy: { id: "asc" } }),
  ]);

  const selectedAmenityIds = apartment.amenities.map((a) => a.amenityId);

  const serialized = {
    ...apartment,
    areaTotal: apartment.areaTotal?.toString() ?? "",
    ceilingHeight: apartment.ceilingHeight?.toString() ?? "",
    amenities: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  };

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="apartments" title="Квартиры" />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-medium text-dark">
            Квартира №{apartment.number} · {apartment.rooms}-комн. · {serialized.areaTotal} м²
          </h2>
          <Button variant="outline" size="sm" linkToPage="/g53-manager/apartments">
            Назад к списку
          </Button>
        </div>

        <EditApartmentForm
          apartment={serialized}
          buildings={buildings}
          amenities={amenities}
          selectedAmenityIds={selectedAmenityIds}
        />

        <div className="mt-10 border-t border-dark15 pt-8">
          <p className="text-sm text-dark50">Удаление квартиры необратимо.</p>
          <form action={deleteApartment} className="mt-4">
            <input type="hidden" name="id" value={apartment.id} />
            <Button type="submit" variant="accentSoft" size="sm">Удалить квартиру</Button>
          </form>
        </div>
      </section>
    </main>
  );
}
