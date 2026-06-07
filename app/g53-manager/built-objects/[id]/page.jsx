import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import AdminNav from "../../_components/AdminNav";
import Button from "@/components/UI/Button";
import DeleteBuiltObjectButton from "./DeleteBuiltObjectButton";
import EditBuiltObjectForm from "./EditBuiltObjectForm";

export const metadata = {
  title: "Редактировать объект",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditBuiltObjectPage({ params, searchParams }) {
  await requireAdmin();

  const { id } = await params;
  const { error } = await searchParams;
  const item = await prisma.builtObject.findUnique({
    where: { id: Number(id) },
  });

  if (!item) notFound();

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="built-objects" title="Построенные объекты" />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-medium text-dark">{item.title}</h2>
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

        <EditBuiltObjectForm item={item} />

        <div className="mt-6 flex items-center justify-between">
          <DeleteBuiltObjectButton id={item.id} title={item.title} />
          <Button text="Сохранить" variant="accent" size="md" type="submit" form="edit-built-object" />
        </div>
      </section>
    </main>
  );
}
