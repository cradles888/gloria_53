import { prisma } from "@/lib/prisma";
import PromoCard from "@/components/NewsPromotions/PromoCard";
import Filter from "@/components/Filter/page";
import CardComplex from "@/components/UI/CardComplex";
import NewsModule from "@/components/NewsPromotions/NewsModule/page";

const getMainPromoCards = async () => {
  return prisma.newsItem.findMany({
    where: { isPublished: true, showOnMain: true },
    orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
    select: { title: true, excerpt: true, image: true, slug: true },
  });
};

export default async function Home() {
  const promoCards = await getMainPromoCards();

  return (
    <main className="min-h-screen">
      {promoCards.length > 0 && (
        <section className="container-padding section-sm">
          <div className="grid gap-6 lg:grid-cols-2">
            {promoCards.map((card) => (
              <PromoCard
                key={card.slug}
                title={card.title}
                text={card.excerpt}
                image={card.image || "/wb-ipoteka.png"}
                alt={card.title}
                href={`/news/${card.slug}`}
              />
            ))}
          </div>
        </section>
      )}

      <section className="container-padding section">
        <h1 className="section-title">
          Новостройки <span className="text-accent">в Великом Новгороде</span>
        </h1>

        <div className="mt-8">
          <Filter />
        </div>
      </section>

      <section className="container-padding section">
        <h2 className="section-title">Популярные проекты</h2>

        <div className="mt-8 grid gap-8">
          <CardComplex
            name="ЖК Юннатов"
            street="ул. Псковская"
            price="от 5,7 млн ₽"
            imageUrl="/main-card-complex-unnatov.png"
            imageAlt="Жилой комплекс Юннатов"
            linkToPage="/unnatov"
          />

          <CardComplex
            name="ЖК Раздолье"
            street="ул. Кочетова"
            price="от 5,4 млн ₽"
            imageUrl="/main-card-compex-razdolje.png"
            imageAlt="Жилой комплекс Раздолье"
            linkToPage="/razdolie"
          />
        </div>
      </section>

      <section className="container-padding section">
        <NewsModule />
      </section>
    </main>
  );
}
