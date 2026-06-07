import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import Button from "@/components/UI/Button";
import AdminNav from "../_components/AdminNav";
import AdminRow from "../_components/AdminRow";
import AdminPagination from "../_components/AdminPagination";
import SectionMeter from "../_components/SectionMeter";
import { deleteBuiltObject } from "../actions";

export const metadata = {
  title: "Построенные объекты",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

export default async function ManagerBuiltObjectsPage({ searchParams }) {
  await requireAdmin();

  const { page: pageParam } = await searchParams;
  const page = Math.max(Number(pageParam) || 1, 1);
  const skip = (page - 1) * PAGE_SIZE;

  const [items, total] = await Promise.all([
    prisma.builtObject.findMany({
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
      skip,
      take: PAGE_SIZE,
    }),
    prisma.builtObject.count(),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const yearsCount = new Set(items.map((i) => i.year)).size;
  const complexCount = items.filter((i) => i.complex).length;

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="built-objects" title="Построенные объекты" />

        <div className="mt-10">
          <SectionMeter
            items={[
              { label: "Объекты", value: total, caption: "в базе" },
              { label: "Периоды", value: yearsCount, caption: "на странице" },
              { label: "ЖК", value: complexCount, caption: "связаны" },
            ]}
          />
        </div>

        <section className="mt-8 overflow-hidden rounded-4xl border border-dark15 bg-white">
          <div className="flex flex-col gap-4 border-b border-dark15 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <h2 className="text-2xl font-medium text-dark">Список объектов</h2>
            <Button variant="dark" size="sm" linkToPage="/g53-manager/built-objects/new">
              Добавить объект
            </Button>
          </div>

          <div className="divide-y divide-dark15">
            {items.map((item) => (
              <AdminRow
                key={item.id}
                openHref={`/g53-manager/built-objects/${item.id}`}
                editHref={`/g53-manager/built-objects/${item.id}`}
                deleteAction={deleteBuiltObject}
                deleteId={item.id}
                deleteName={item.title}
                className="grid items-center gap-4 sm:grid-cols-[88px_1fr_auto]"
              >
                <div className="h-16 overflow-hidden rounded-2xl bg-dark10">
                  {item.images?.[0] ? (
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                <div>
                  <p className="text-lg font-medium text-dark">{item.title}</p>
                  <p className="mt-1 line-clamp-1 text-sm text-dark50">
                    {item.description}
                  </p>
                </div>

                <span className="w-max rounded-full bg-dark10 px-3 py-1 text-sm text-dark80">
                  {item.year}
                </span>
              </AdminRow>
            ))}

            {items.length === 0 && (
              <p className="p-8 text-center text-sm text-dark50">
                Объектов пока нет
              </p>
            )}
          </div>
        </section>

        <AdminPagination
          basePath="/g53-manager/built-objects"
          page={page}
          totalPages={totalPages}
        />
      </section>
    </main>
  );
}
