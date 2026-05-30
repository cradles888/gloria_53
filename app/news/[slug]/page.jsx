import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { ArrowRight } from "@/icons/ArrowRight";

export const dynamic = "force-dynamic";

const formatNewsDate = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const serializeNewsItem = (item) => ({
  id: item.id,
  type: item.type,
  label: item.label,
  title: item.title,
  excerpt: item.excerpt,
  content: item.content,
  date: formatNewsDate(item.publishedAt),
  image: item.image,
  slug: item.slug,
  featured: item.isFeatured,
});

const getNewsItemBySlug = async (slug) => {
  const item = await prisma.newsItem.findFirst({
    where: {
      slug,
      isPublished: true,
    },
  });

  return item ? serializeNewsItem(item) : null;
};

const getLatestNews = async (currentSlug) => {
  const newsItems = await prisma.newsItem.findMany({
    where: {
      isPublished: true,
      slug: {
        not: currentSlug,
      },
    },
    orderBy: [
      {
        publishedAt: "desc",
      },
      {
        sortOrder: "asc",
      },
    ],
    take: 3,
  });

  return newsItems.map(serializeNewsItem);
};

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const item = await getNewsItemBySlug(slug);

  if (!item) {
    return {
      title: "Материал не найден",
    };
  }

  return {
    title: item.title,
    description: item.excerpt,
  };
};

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const item = await getNewsItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const latestNews = await getLatestNews(slug);
  const paragraphs = item.content.length
    ? item.content
    : [item.excerpt].filter(Boolean);

  return (
    <main className="container-padding">
      <article className="py-10 lg:py-16">
        <Link
          href="/news"
          className="inline-flex gap-2 text-sm font-medium text-dark50 transition hover:text-accent"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Назад к новостям
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,820px)_360px] lg:items-start xl:grid-cols-[minmax(0,880px)_400px]">
          <div>
            <header>
              <h1 className="max-w-4xl text-4xl font-medium leading-tight text-dark md:text-5xl">
                {item.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium text-dark50">
                <time>
                  {item.date}
                </time>

                <span className="h-1 w-1 rounded-full bg-dark25" />

                <span className="text-accent">
                  {item.label}
                </span>

                <Link
                  href="/news"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-dark10 text-accent"
                >
                  <ArrowRight className="h-4 w-4 -rotate-45" />
                </Link>
              </div>
            </header>

            <div className="mt-10 max-w-3xl space-y-5 text-base leading-8 text-dark80 sm:text-lg">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="grid gap-5 lg:sticky lg:top-24">
            <section className="rounded-4xl bg-dark10 p-6 sm:p-8">
              <h2 className="text-xl font-medium text-dark">
                Последние новости
              </h2>

              <div className="mt-6 grid gap-5">
                {latestNews.map((newsItem) => (
                  <Link
                    key={newsItem.slug}
                    href={`/news/${newsItem.slug}`}
                    className="group block"
                  >
                    <h3 className="text-base font-medium leading-6 text-dark transition group-hover:text-accent">
                      {newsItem.title}
                    </h3>

                    <time className="mt-2 block text-sm text-dark50">
                      {newsItem.date}
                    </time>
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}
