import { prisma } from "@/lib/prisma";
import Button from "@/components/UI/Button";
import { requireAdmin } from "@/lib/adminAuth";
import AdminNav from "../_components/AdminNav";
import AdminPagination from "../_components/AdminPagination";
import SectionMeter from "../_components/SectionMeter";
import Link from "next/link";
import ApartmentImportButton from "./_components/ApartmentImportButton";
import ApartmentsViewToggle from "./_components/ApartmentsViewToggle";
import { deleteApartment } from "../actions";

export const metadata = {
  title: "Квартиры",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

const PAGE_SIZE = 8;

export default async function ManagerApartmentsPage({ searchParams }) {
  await requireAdmin();

  const { page: pageParam } = await searchParams;
  const page = Math.max(Number(pageParam) || 1, 1);
  const skip = (page - 1) * PAGE_SIZE;

  const [totalCount, availableCount, soldCount, apartments] = await Promise.all([
    prisma.apartment.count(),
    prisma.apartment.count({ where: { status: "available" } }),
    prisma.apartment.count({ where: { status: "sold" } }),
    prisma.apartment.findMany({
      skip,
      take: PAGE_SIZE,
      include: {
        building: {
          include: {
            complex: true,
          },
        },
      },
      orderBy: [
        {
          id: "asc",
        },
      ],
    }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const serializedApartments = apartments.map((apt) => ({
    id: apt.id,
    number: apt.number,
    rooms: apt.rooms,
    floor: apt.floor,
    entrance: apt.entrance,
    areaTotal: apt.areaTotal.toString(),
    price: apt.price,
    status: apt.status,
    position: apt.building.position ?? "",
    complexName: apt.building.complex.name,
  }));

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="apartments" title="Квартиры" />

        <div className="mt-10">
          <SectionMeter
            items={[
              { label: "Всего", value: totalCount, caption: "в базе" },
              { label: "Доступны", value: availableCount, caption: "на сайте" },
              { label: "Проданы", value: soldCount, caption: "архив" },
            ]}
          />
        </div>

        <section className="mt-8 overflow-hidden rounded-4xl border border-dark15 bg-white">
          <div className="flex flex-col gap-4 border-b border-dark15 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <h2 className="text-2xl font-medium text-dark">Список квартир</h2>

            <div className="flex flex-wrap items-start gap-3">
              <ApartmentImportButton />
              <Button variant="dark" size="sm" linkToPage="/g53-manager/apartments/new">
                Добавить квартиру
              </Button>
            </div>
          </div>

          <ApartmentsViewToggle
            apartments={serializedApartments}
            deleteAction={deleteApartment}
          />
        </section>

        <AdminPagination
          basePath="/g53-manager/apartments"
          page={page}
          totalPages={totalPages}
        />
      </section>
    </main>
  );
}
