import PromoCard from "@/components/PromoCard";
import Filter from "@/components/Filter/page";
import CardComplex from "@/components/UI/CardComplex";
import NewsModule from "@/components/News/NewsModule/page";
export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      <section className="container-padding section-sm">
        <div className="grid gap-6 lg:grid-cols-2">
          <PromoCard
            title="Семейная ипотека от 6%"
            text="От наших партнёров — СберБанк · ВТБ"
            image="/wb-ipoteka.png"
            alt="Семейная ипотека"
          />

          <PromoCard
            title="Новые квартиры в ЖК Юннатов"
            text="Позиция №1 готова к заселению"
            image="/wb-unnatov.png"
            alt="Новые квартиры в ЖК Юннатов"
          />
        </div>
      </section>

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
