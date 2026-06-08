import { requireAdmin } from "@/lib/adminAuth";
import Button from "@/components/UI/Button";
import { createNewsItem } from "../../actions";
import AdminNav from "../../_components/AdminNav";
import NewsFields from "../_components/NewsFields";

export const metadata = {
  title: "Добавить материал",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ManagerNewsNewPage({ searchParams }) {
  await requireAdmin();

  const { error } = await searchParams;

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="news" title="Новости и акции" />

        <section className="mt-10 rounded-4xl bg-dark10 p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-medium text-dark">
                Добавить материал
              </h2>
            </div>

            <Button variant="outline" size="sm" linkToPage="/g53-manager/news">
              Назад к списку
            </Button>
          </div>

          {error === "required" && (
            <p className="mt-6 rounded-3xl bg-red-50 px-5 py-3 text-sm text-red-600">
              Заполните все обязательные поля (кроме «Метка» и «Порядок»):
              заголовок, slug, описание, текст, изображение и дату.
            </p>
          )}

          <form action={createNewsItem} className="mt-6">
            <NewsFields />

            <Button type="submit" variant="dark" className="mt-6">
              Создать
            </Button>
          </form>
        </section>
      </section>
    </main>
  );
}
