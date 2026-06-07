import { prisma } from "@/lib/prisma";
import Button from "@/components/UI/Button";
import { requireAdmin } from "@/lib/adminAuth";
import AdminNav from "../_components/AdminNav";
import AdminRow from "../_components/AdminRow";
import AdminPagination from "../_components/AdminPagination";
import SectionMeter from "../_components/SectionMeter";
import { deleteNewsItem } from "../actions";

export const metadata = {
  title: "Новости и акции",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

const typeLabels = {
  news: "Новости",
  promotion: "Акция",
  construction: "Стройка",
  tips: "Покупателю",
  mortgage: "Ипотека",
};

const formatDate = (date) => {
  if (!date) return "—";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

export default async function ManagerNewsPage({ searchParams }) {
  await requireAdmin();

  const { page: pageParam } = await searchParams;
  const page = Math.max(Number(pageParam) || 1, 1);
  const skip = (page - 1) * PAGE_SIZE;

  const [totalCount, publishedCount, showOnMainCount, newsItems] = await Promise.all([
    prisma.newsItem.count(),
    prisma.newsItem.count({ where: { isPublished: true } }),
    prisma.newsItem.count({ where: { showOnMain: true } }),
    prisma.newsItem.findMany({
      skip,
      take: PAGE_SIZE,
      orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
    }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="news" title="Новости и акции" />

        <div className="mt-10">
          <SectionMeter
            items={[
              { label: "Всего", value: totalCount, caption: "материалов" },
              { label: "Опубликовано", value: publishedCount, caption: "на сайте" },
              { label: "На главной", value: showOnMainCount, caption: "показываются" },
            ]}
          />
        </div>

        <section className="mt-8 overflow-hidden rounded-4xl border border-dark15 bg-white">
          <div className="flex flex-col gap-4 border-b border-dark15 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="text-2xl font-medium text-dark">
                Список материалов
              </h2>
            </div>

            <Button variant="dark" size="sm" linkToPage="/g53-manager/news/new">
              Добавить материал
            </Button>
          </div>

          <div className="divide-y divide-dark15">
            {newsItems.map((item) => (
              <AdminRow
                key={item.id}
                openHref={
                  item.isPublished && item.slug
                    ? `/news/${item.slug}`
                    : `/g53-manager/news/${item.id}`
                }
                editHref={`/g53-manager/news/${item.id}`}
                deleteAction={deleteNewsItem}
                deleteId={item.id}
                deleteName={item.title}
              >
                <p className="text-base font-medium text-dark">{item.title}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-dark50">
                  <span>{formatDate(item.publishedAt)}</span>
                  <span className="rounded-full bg-dark10 px-2.5 py-0.5 text-xs font-medium text-dark80">
                    {typeLabels[item.type] || item.type}
                  </span>
                  {!item.isPublished && (
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                      Скрыто
                    </span>
                  )}
                  {item.showOnMain && (
                    <span className="rounded-full bg-dark px-2.5 py-0.5 text-xs font-medium text-white">
                      На главной
                    </span>
                  )}
                </div>
              </AdminRow>
            ))}

            {newsItems.length === 0 && (
              <p className="p-8 text-center text-sm text-dark50">
                Материалов пока нет
              </p>
            )}
          </div>
        </section>

        <AdminPagination
          basePath="/g53-manager/news"
          page={page}
          totalPages={totalPages}
        />
      </section>
    </main>
  );
}
