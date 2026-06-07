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

const formatSettlementDate = (date: Date | null): string => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (month <= 3) return `1 квартал ${year}`;
  if (month <= 6) return `2 квартал ${year}`;
  if (month <= 9) return `3 квартал ${year}`;
  return `4 квартал ${year}`;
};

const getFilterBuildings = async () => {
  const buildings = await prisma.building.findMany({
    where: { status: "active" },
    include: { complex: true },
    orderBy: { id: "asc" },
  });

  return buildings.map((b) => ({
    id: b.id,
    position: b.position || "",
    name: b.name || "",
    address: b.address || "",
    floorsTotal: b.floorsTotal,
    heroImage: b.heroImage || "",
    complexId: b.complexId,
    complexName: b.complex.name,
    settlementDate: formatSettlementDate(b.plannedSettlementDate),
  }));
};

export default async function Home() {
  const [promoCards, filterBuildings] = await Promise.all([
    getMainPromoCards(),
    getFilterBuildings(),
  ]);

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
          {/* Filter — JS-компонент; приведение типов на границе JS/TS */}
          <Filter buildings={filterBuildings as unknown as never[]} />
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
        </div>
      </section>

      <section className="container-padding section">
        <NewsModule />
      </section>
    </main>
  );
}
