import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import AdminNav from "../../_components/AdminNav";
import Button from "@/components/UI/Button";
import NewBuildingForm from "./NewBuildingForm";

export const metadata = {
  title: "Новый дом",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NewBuildingPage({ searchParams }) {
  await requireAdmin();

  const { error } = await searchParams;

  const complexes = await prisma.residentialComplex.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="buildings" title="Дома" />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-medium text-dark">Добавить дом</h2>
          <Button variant="outline" size="sm" linkToPage="/g53-manager/buildings">
            Назад к списку
          </Button>
        </div>

        {error === "required" && (
          <p className="mt-6 rounded-3xl bg-accent/10 px-5 py-3 text-sm text-accent">
            Выберите ЖК.
          </p>
        )}

        <NewBuildingForm complexes={complexes} />
      </section>
    </main>
  );
}
