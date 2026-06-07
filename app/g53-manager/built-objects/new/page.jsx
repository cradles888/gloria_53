import { requireAdmin } from "@/lib/adminAuth";
import AdminNav from "../../_components/AdminNav";
import Button from "@/components/UI/Button";
import NewBuiltObjectForm from "./NewBuiltObjectForm";

export const metadata = {
  title: "Новый построенный объект",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NewBuiltObjectPage({ searchParams }) {
  await requireAdmin();

  const { error } = await searchParams;

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="built-objects" title="Новый объект" />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-medium text-dark">Добавить объект</h2>
          <Button variant="outline" size="sm" linkToPage="/g53-manager/built-objects">
            Назад к списку
          </Button>
        </div>

        {error === "range" && (
          <p className="mt-6 rounded-3xl bg-red-50 px-5 py-3 text-sm text-red-600">
            Проверьте числовые поля: порядок сортировки — до 100 000, долгота
            −180…180, широта −90…90.
          </p>
        )}

        <NewBuiltObjectForm />
      </section>
    </main>
  );
}
