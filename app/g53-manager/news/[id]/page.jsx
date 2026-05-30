import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import Button from "@/components/UI/Button";
import { requireAdmin } from "@/lib/adminAuth";
import { deleteNewsItem, updateNewsItem } from "../../actions";
import AdminNav from "../../_components/AdminNav";
import NewsFields from "../_components/NewsFields";

export const metadata = {
  title: "Редактировать материал",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ManagerNewsEditPage({ params }) {
  await requireAdmin();

  const { id } = await params;
  const item = await prisma.newsItem.findUnique({ where: { id: Number(id) } });

  if (!item) notFound();

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="news" title="Новости и акции" />

        <section className="mt-10 rounded-4xl bg-dark10 p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-medium text-dark">
                {item.title}
              </h2>
            </div>

            <Button variant="outline" size="sm" linkToPage="/g53-manager/news">
              Назад к списку
            </Button>
          </div>

          <form action={updateNewsItem} className="mt-6">
            <NewsFields item={item} />

            <Button type="submit" variant="dark" className="mt-6">
              Сохранить
            </Button>
          </form>

          <div className="mt-6 border-t border-dark15 pt-6">
            <form action={deleteNewsItem}>
              <input type="hidden" name="id" value={item.id} />
              <Button type="submit" variant="accentSoft" size="sm">
                Удалить материал
              </Button>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}
