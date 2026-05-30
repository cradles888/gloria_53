import { prisma } from "@/lib/prisma";
import Button from "@/components/UI/Button";
import BuiltObjectsMap from "@/components/BuiltObject/BuiltObjectsMap";
import BuiltObjectGallery from "@/components/BuiltObject/BuiltObjectGallery";

export const dynamic = "force-dynamic";

const STATS = [
  {
    value: "2004",
    label: "первый объект в архиве",
  },
  {
    value: "20+",
    label: "построенных объектов",
  },
  {
    value: "215 тыс. м²",
    label: "введённого жилья",
  },
];

const StatCard = ({ value, label }) => {
  return (
    <div className="rounded-4xl bg-white/10 xl:bg-dark/10 p-5 backdrop-blur-sm">
      <p className="text-3xl font-medium text-white xl:text-dark sm:text-4xl">
        {value}
      </p>

      <p className="mt-2 text-sm text-white/70 xl:text-dark/70">{label}</p>
    </div>
  );
};

const BuiltObjectPreview = ({ object }) => {
  return (
    <article
      className={`grid relative overflow-hidden rounded-2xl min-h-[400px] lg:min-h-[500px]`}
    >
      <img
        src={object.images[0]}
        alt={object.title}
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/40 lg:via-black/20 to-black/50" />

      {/* <span className="absolute mx-4 my-4 text-accent rounded-4xl bg-white px-4 py-2 text-sm font-medium backdrop-blur-sm">
          {object.year}
        </span> */}

      <div className="grid content-between md:gap-8 p-6 sm:p-8 lg:p-10 relative">
        <div>
          {/* <span className="mb-4 inline-flex rounded-4xl bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
            Построенный объект
          </span> */}

          <h2 className="text-xl font-medium text-white sm:text-3xl md:text-3xl">
            {object.title}
          </h2>

        </div>

        <div className="flex items-center justify-between gap-4 border-t border-dark/10 pt-5">
          <div>
            <p className="text-sm lg:text-base text-white">Год сдачи</p>
            <p className="mt-1 text-base sm:text-lg lg:text-2xl font-medium text-white">
              {object.year}
            </p>
          </div>

          <BuiltObjectGallery
  object={object}
  size="md"
  className="hidden! lg:block!"
/>

<BuiltObjectGallery
  object={object}
  size="sm"
  className="block lg:hidden"
/>
        </div>
      </div>
    </article>
  );
};

const BuiltObjectsPage = async () => {
  const builtObjects = await prisma.builtObject.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  return (
    <main>
      <section className="container-padding section">
        <div className="relative overflow-hidden rounded-4xl xl:grid xl:grid-cols-2 xl:gap-12">
          {/* Фоновая картинка для мобильных и планшетов */}
          <img
            src="/builtObjects/parkovaya.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover xl:hidden"
          />

          {/* Затемнение фона на мобильных */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/25 xl:hidden" />

          <div className="relative z-10 grid gap-10 p-5 text-white sm:p-7 xl:content-center xl:p-0 xl:text-dark">
            <div className="max-w-4xl">
              <h1 className="mt-3 text-3xl font-medium leading-tight sm:text-5xl lg:text-5xl xl:text-4xl">
                Построенные объекты компании Глория
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg xl:text-dark/80">
                Здесь собраны построенные объекты компании «Глория» за разные
                годы работы. Это не просто список адресов, а история домов,
                которые уже сданы и используются жителями.
              </p>
            </div>

            <div className="grid gap-3">
              {STATS.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>

            {/* Бейдж на мобильных поверх фоновой картинки */}
            <div className="rounded-4xl bg-white/10 p-5 text-white shadow-2xl backdrop-blur-2xl xl:hidden">
              <div className="mb-3 flex flex-wrap gap-1">
                <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-dark">
                  Первый построенный объект
                </span>

                <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-dark">
                  2004
                </span>
              </div>

              <p className="text-xl font-medium leading-tight">
                ул. Парковая, д. 3, корп. 1 и 2
              </p>
            </div>
          </div>

          {/* Правая картинка только на desktop */}
          <div className="group relative hidden min-h-[420px] overflow-hidden rounded-4xl xl:block">
            <img
              src="/builtObjects/parkovaya.jpg"
              alt="Первый построенный объект компании Глория"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5">
              <div className="rounded-4xl bg-white/25 p-5 text-white shadow-2xl backdrop-blur-2xl">
                <div className="mb-3 flex flex-wrap gap-1">
                  <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-dark">
                    Первый построенный объект
                  </span>

                  <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-dark">
                    2004
                  </span>
                </div>

                <p className="text-xl font-medium leading-tight">
                  ул. Парковая, д. 3, корп. 1 и 2
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="container-padding section">
        <div className="overflow-hidden rounded-4xl bg-dark10 p-4 sm:p-5">
          <div className="flex gap-2 overflow-x-auto">
            {YEARS.map((year) => (
              <a
                key={year}
                href={`#year-${year}`}
                className="min-w-max rounded-4xl bg-white px-5 py-3 text-sm font-medium text-dark transition hover:bg-accent hover:text-white"
              >
                {year}
              </a>
            ))}
          </div>
        </div>
      </section> */}

      <section className="container-padding section">
        <div className="mb-12 grid lg:grid-cols-2 lg:gap-5">
          <h2 className="text-2xl lg:text-3xl font-medium leading-tight text-dark sm:text-4xl">
            Построенные дома по годам
          </h2>

          <p className="mt-4 text-base leading-relaxed text-dark60">
            За годы работы компания «Глория» построила десятки жилых домов
            в&nbsp;Великом&nbsp;Новгороде. Эти объекты стали домом для многих
            семей.
          </p>
        </div>

        <div className="grid gap-6">
          {builtObjects.map((object, index) => (
            <div key={object.id} id={`year-${object.year}`}>
              <BuiltObjectPreview object={object} index={index} />
            </div>
          ))}
        </div>
      </section>

      <section className="container-padding section">
        <div className="mb-12 grid lg:grid-cols-[1fr_1.5fr] items-start gap-6 lg:gap-32">
          <h2 className="text-2xl lg:text-3xl font-medium leading-tight text-dark sm:text-4xl">
            Построенный объекты компании
          </h2>
{/* 
          <p className=" text-base leading-relaxed text-dark60">
            Яx сделал страницу не в формате обычной сетки, а в виде крупных
            карточек. Так каждый объект воспринимается отдельно и выглядит
            значимее.
          </p> */}
        </div>

        <BuiltObjectsMap objects={builtObjects} />
      </section>

      {/* <section className="container-padding section mb-24">
        <div className="grid overflow-hidden rounded-4xl bg-dark10 p-3 sm:p-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="grid content-center rounded-4xl bg-accent p-6 text-white sm:p-8 lg:p-10">
            <h2 className="max-w-3xl text-2xl lg:text-3xl font-medium leading-tight sm:text-4xl">
              Посмотрите актуальные предложения компании
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
              В каталоге можно выбрать комнатность, площадь, стоимость и
              оставить заявку на консультацию.
            </p>

            <div className="mt-7">
              <Button
                text="Смотреть квартиры"
                variant="white"
                size="md"
                linkToPage="/apartments"
              />
            </div>
          </div>

          <div className="relative min-h-[260px] overflow-hidden rounded-4xl sm:min-h-[340px] lg:min-h-full">
            <img
              src="/built/family-home.jpg"
              alt="Новая квартира"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default BuiltObjectsPage;
