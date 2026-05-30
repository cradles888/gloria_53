import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import AdminNav from "../_components/AdminNav";
import Button from "@/components/UI/Button";

export const metadata = {
  title: "Дома",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ManagerBuildingsPage() {
  await requireAdmin();

  const buildings = await prisma.building.findMany({
    include: { complex: true },
    orderBy: [{ complexId: "asc" }, { id: "asc" }],
  });

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="buildings" title="Дома" />

        <section className="mt-10 overflow-hidden rounded-4xl border border-dark15 bg-white">
          <div className="flex flex-col gap-4 border-b border-dark15 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="text-2xl font-medium text-dark">Список домов</h2>
              <p className="mt-1 text-sm text-dark50">
                Нажмите на строку, чтобы отредактировать фото и параметры дома
              </p>
            </div>
            <Button variant="dark" size="sm" linkToPage="/g53-manager/buildings/new">
              Добавить дом
            </Button>
          </div>

          <div className="divide-y divide-dark15">
            {buildings.map((building) => (
              <Link
                key={building.id}
                href={`/g53-manager/buildings/${building.id}`}
                className="grid items-center gap-4 p-5 transition hover:bg-dark5 sm:grid-cols-[72px_1fr_auto] sm:p-6"
              >
                <div className="h-14 w-14 overflow-hidden rounded-2xl bg-dark10">
                  {building.heroImage ? (
                    <img
                      src={building.heroImage}
                      alt={`Позиция №${building.id}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-xs text-dark30">Нет</span>
                    </div>
                  )}
                </div>

                <div>
                  <p className="font-medium text-dark">
                    {building.complex.name} · позиция{" "}
                    {building.position || building.name || `#${building.id}`}
                  </p>
                  <p className="mt-1 text-sm text-dark50">
                    {[
                      building.address,
                      building.floorsTotal ? `${building.floorsTotal} эт.` : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    building.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-dark10 text-dark50"
                  }`}
                >
                  {building.status === "active" ? "Активен" : building.status}
                </span>
              </Link>
            ))}

            {buildings.length === 0 && (
              <p className="p-8 text-center text-sm text-dark50">Нет домов в базе</p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
