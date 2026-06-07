import { prisma } from "@/lib/prisma";
import InfoBlock from "@/components/Unnatov/InfoBlock";
import { formatText, formatTextWithBreaks } from "@/utils/text-format";
import SliderFullScreen from "@/components/Swiper/SwiperFast";
import FreemodeSlider from "@/components/Swiper/SwiperFreemode";

export const metadata = {
  title: "ЖК Юннатов — квартиры в Великом Новгороде",
  description:
    "Жилой комплекс Юннатов на Псковской улице. Рядом кремль, вокзал, школы и университет. Квартиры в продаже от застройщика.",
};

export const dynamic = "force-dynamic";


const POPULAR_LOCATIONS = [
  { title: "Кремль", desc: "10 минут пешком", imageUrl: "/unnatov/kremlin.jpg", imageAlt: "Кремль" },
  { title: "Театр драмы", desc: "10 минут пешком", imageUrl: "/unnatov/theatre.jpg", imageAlt: "Театр" },
  { title: "Вокзал", desc: "10 минут пешком", imageUrl: "/unnatov/station.jpg", imageAlt: "Вокзал" },
];

const FULL_SCREEN_SLIDES = [
  { src: "/unnatov/genplan.jpg", alt: "Генплан" },
  { src: "/unnatov/slider1.jpg", alt: "Вид на комплекс" },
  { src: "/unnatov/slider2.jpg", alt: "Вид на комплекс" },
];

const HISTORICAL_LOCATIONS = [
  { title: "Свято-Юрьев мужской монастырь", desc: "15 минут на машине", imageUrl: "/unnatov/monastery.jpg", imageAlt: "Монастырь" },
  { title: "Аркада гостиного двора", desc: "20 минут пешком", imageUrl: "/unnatov/arcade.jpg", imageAlt: "Аркада" },
  { title: "Первая медицинская комиссия", desc: "3 минуты пешком", imageUrl: "/unnatov/ambulance-station.jpg", imageAlt: "Медкомиссия" },
  { title: "Станция скорой помощи", desc: "5 минут пешком", imageUrl: "/unnatov/medical-center.jpg", imageAlt: "Скорая помощь" },
];

const EDUCATION_BLOCK = [
  { title: "Школа №21 через дорогу", desc: "10 минут на машине", imageUrl: "/unnatov/school21.jpg", imageAlt: "Школа №21" },
  { title: "Детский сад «Ручеёк»", desc: "7 минут пешком", imageUrl: "/unnatov/kindergarten.jpg", imageAlt: "Детский сад" },
  { title: "Торгово-технологический техникум", desc: "15 минут пешком", imageUrl: "/unnatov/technical-college.jpg", imageAlt: "Техникум" },
  { title: "Педагогический институт НовГУ", desc: "10 минут пешком", imageUrl: "/unnatov/institute.jpg", imageAlt: "Институт" },
];

const FEATURES_SLIDER = [
  { title: "Двор без машин", desc: "Эксклюзивная концепция", imageUrl: "/unnatov/no-car.jpg", imageAlt: "Двор без машин" },
  { title: "Отделка из дерева", desc: "Экологичный материал", imageUrl: "/unnatov/finishing.jpg", imageAlt: "Отделка в подъезде" },
  { title: "Надёжные кирпичные стены", desc: "Из полнотелого кирпича", imageUrl: "/unnatov/material.jpg", imageAlt: "Материал стен" },
];

const STATIC_HISTORY = [
  { title: "Позиция №2", desc: "27.01.2026", imageUrl: "/unnatov/2-27.01.2026.jpg", imageAlt: "Позиция 2, январь 2026" },
  { title: "Позиция №1", desc: "04.11.2025", imageUrl: "/unnatov/1-04.11.2025.jpg", imageAlt: "Позиция 1, ноябрь 2025" },
  { title: "Позиция №3", desc: "27.01.2026", imageUrl: "/unnatov/3-27.01.2026.jpg", imageAlt: "Позиция 3, январь 2026" },
];


const formatSettlementDate = (date: Date | null): string => {
  if (!date) return "";
  const quarters = ["I", "II", "III", "IV"];
  const quarter = Math.ceil((date.getMonth() + 1) / 3) - 1;
  return `${quarters[quarter]} кв. ${date.getFullYear()}`;
};


export default async function Unnatov() {
  const complex = await prisma.residentialComplex.findFirst({
    where: { name: { contains: "Юннатов" } },
  });

  const complexId = complex?.id;

  const [buildings, availableCount, constructionPhotos] = await Promise.all([
    complexId
      ? prisma.building.findMany({ where: { complexId, status: "active" }, orderBy: { id: "asc" } })
      : Promise.resolve([]),
    complexId
      ? prisma.apartment.count({ where: { status: "available", building: { complexId } } })
      : Promise.resolve(0),
    complexId
      ? prisma.constructionPhoto.findMany({
          where: { building: { complexId } },
          include: { building: true },
          orderBy: [{ takenAt: "desc" }, { sortOrder: "asc" }],
          take: 24,
        })
      : Promise.resolve([]),
  ]);

  const maxFloors = buildings.reduce((acc: number, b: any) => Math.max(acc, b.floorsTotal ?? 0), 0);
  const earliestDate = buildings.map((b: any) => b.plannedSettlementDate).filter(Boolean).sort()[0] ?? null;

  const stats = [
    { value: buildings.length || "—", label: buildings.length === 1 ? "позиция" : "позиции" },
    { value: maxFloors > 0 ? `до ${maxFloors}` : "—", label: "этажей" },
    { value: availableCount || "—", label: "квартир в продаже" },
    { value: formatSettlementDate(earliestDate) || "Уточняйте", label: "срок сдачи" },
  ];

  const constructionCards = constructionPhotos.length > 0
    ? constructionPhotos.map((photo: any) => {
        const position = photo.building?.position || photo.building?.name || "";
        const title = position ? `Позиция №${position}` : "Ход строительства";
        return {
          title,
          desc: new Date(photo.takenAt).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          imageUrl: photo.url,
          imageAlt: `${title}, ${new Date(photo.takenAt).toLocaleDateString("ru-RU")}`,
        };
      })
    : STATIC_HISTORY;

  return (
    <div>
      <section className="min-h-screen">
        <div className="h-full bg-[url(/unnatov/bg.png)] bg-cover bg-no-repeat top-0 w-full -z-10 absolute" />
        <div className="bg-linear-to-b from-black/15 -z-10 to-transparent h-40 w-full absolute top-0" />
        <div className="container-padding mx-auto flex min-h-screen flex-col justify-center py-24">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-medium italic leading-tight">
            ЖК Юннатов
            <span className="font-light italic block mt-2 text-3xl sm:text-4xl md:text-5xl">
              Уют, в котором хочется остаться
            </span>
          </h1>
        </div>
      </section>

      <section className="container-padding mx-auto -mt-10 relative z-10">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-4xl border border-dark15 bg-dark15 shadow-xl sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-6">
              <dd className="text-2xl font-medium text-dark sm:text-3xl">{stat.value}</dd>
              <dt className="mt-1 text-sm text-dark50">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <div className="container-padding mx-auto mt-16 md:mt-20">
        <p className="text-black text-2xl sm:text-2xl md:text-[32px] mb-8 max-w-4xl">
          ЖК «Юннатов»&nbsp;— жилой комплекс на&nbsp;Псковской. Рядом
          развитая инфраструктура: автовокзал, ж/д вокзал, спортивный комплекс
          «Химик», медицинские учреждения, школы, детские сады и&nbsp;университет.
        </p>
      </div>

      <div className="container-padding mx-auto">
        <InfoBlock
          title={formatText("Популярные места в&nbsp;пешей доступности")}
          desc={formatText("Жизнь здесь&nbsp;— это когда самое интересное начинается за&nbsp;порогом дома. В&nbsp;нескольких минутах ходьбы&nbsp;— уютные кофейни, рестораны, парки для&nbsp;прогулок и&nbsp;все ключевые точки вашего городского маршрута.")}
          data={POPULAR_LOCATIONS}
          colOff={true}
          classNameCol="lg:grid-cols-[1.7fr_1fr_1fr]"
        />
      </div>

      <SliderFullScreen data={FULL_SCREEN_SLIDES} />

      <div className="container-padding mx-auto">
        <InfoBlock
          title={formatText("Инфраструктура и&nbsp;историческое окружение")}
          desc={formatText("Здесь гармонично соединяются дух прошлого и&nbsp;комфорт настоящего. Архитектурные памятники соседствуют с&nbsp;современными удобствами: супермаркеты, фитнес-центры, детские сады и&nbsp;клиники&nbsp;— всё в&nbsp;нескольких минутах ходьбы.")}
          data={HISTORICAL_LOCATIONS}
        />

        <InfoBlock
          title={formatTextWithBreaks("Образование<br/>Учёба для&nbsp;детей&nbsp;— рядом")}
          desc={formatText("Ваши дети смогут добираться до&nbsp;уроков, не&nbsp;тратя время на&nbsp;длинные переезды. В&nbsp;шаговой доступности детские сады, школы и&nbsp;развивающие центры.")}
          data={EDUCATION_BLOCK}
        />

        <InfoBlock
          title="Особенности проекта"
          desc={formatText("Каждая деталь продумана для&nbsp;комфорта жизни. Закрытый двор без&nbsp;машин, натуральные отделочные материалы в&nbsp;подъездах, кирпичные стены с&nbsp;высокой тепло- и&nbsp;звукоизоляцией.")}
          data={FEATURES_SLIDER}
          slider={true}
        />

        <div className="my-20 md:my-30">
          <h3 className="text-xl md:text-[32px] font-medium text-dark leading-[116%]">
            Фотоотчёт строительства
          </h3>
          <FreemodeSlider data={constructionCards} />
        </div>
      </div>
    </div>
  );
}
