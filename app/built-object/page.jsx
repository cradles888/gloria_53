import Button from '@/components/UI/Button'
import { formatText } from "@/utils/text-format";
import BuiltObjectsMap from '@/components/BuiltObject/BuiltObjectsMap'
import { BUILT_OBJECTS } from '@/data/builtObjects';

const STATS = [
  {
    value: '1999',
    label: 'год основания',
  },
  {
    value: '2004',
    label: 'первый объект в архиве',
  },
  {
    value: '20+',
    label: 'построенных объектов',
  },
  {
    value: '215 тыс. м²',
    label: 'введённого жилья',
  },
]

const YEARS = ['2020', '2019', '2018', '2016', '2015', '2012', '2010', '2009', '2007', '2004']

const StatCard = ({ value, label }) => {
  return (
    <div className="rounded-4xl bg-white/10 p-5 backdrop-blur-sm">
      <p className="text-3xl font-medium text-white sm:text-4xl">
        {value}
      </p>

      <p className="mt-2 text-sm text-white/70">
        {label}
      </p>
    </div>
  )
}

const BuiltObjectPreview = ({ object, index }) => {
  const isReversed = index % 2 !== 0

  return (
    <article className={`grid relative overflow-hidden rounded-2xl min-h-[400px] lg:min-h-[500px]`}>
        <img
          src={object.image}
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

          <h2 className="text-xl font-medium text-white sm:text-3xl md:text-4xl">
            {object.title}
          </h2>

          <p className="mt-2 lg:mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-white">
            {object.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-dark/10 pt-5">
          <div>
            <p className="text-sm text-white">Год сдачи</p>
            <p className="mt-1 text-base sm:text-lg lg:text-xl font-medium text-white">{object.year}</p>
          </div>

          <Button
            text="Подробнее"
            variant="white"
            size="md"
            className="hidden! lg:block!"
          />

          <Button
            text="Подробнее"
            variant="white"
            size="sm"
            className="block lg:hidden"/>
        </div>
      </div>
    </article>
  )
}

const BuiltObjectsPage = () => {
  return (
    <main>
      <section className="container-padding section">
        <div className="relative overflow-hidden rounded-4xl bg-header content-center min-h-[350px]">
          <img
            src="https://ngloriya.su/images/homes/18/constructed1-sm.jpg"
            alt="Построенные объекты компании Глория"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />

          <div className="relative z-10 grid gap-10 p-6 text-white sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:p-10">
            <div className="max-w-4xl">
              {/* <span className="mb-4 inline-flex rounded-4xl bg-accent px-4 py-2 text-sm font-medium text-white">
                Построенные объекты
              </span> */}

              <h1 className="text-2xl mt-3 lg:text-3xl font-medium sm:text-5xl">
                Дома, которые уже стали частью города
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-base lg:text-lg">
                Здесь собраны построенные объекты компании «Глория» за разные
                годы работы. Это не просто список адресов, а история домов,
                которые уже сданы и используются жителями.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {STATS.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
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
            Я сделал страницу не в формате обычной сетки, а в виде крупных
            карточек. Так каждый объект воспринимается отдельно и выглядит
            значимее.
          </p>
        </div>

        <div className="grid gap-6">
          {BUILT_OBJECTS.map((object, index) => (
            <div key={object.id} id={`year-${object.year}`}>
              <BuiltObjectPreview object={object} index={index} />
            </div>
          ))}
        </div>
      </section>

      

      <section className='container-padding section'>
        <div className="mb-12 grid lg:grid-cols-[1fr_1.5fr] items-start gap-6 lg:gap-32">

          <h2 className="text-2xl lg:text-3xl font-medium leading-tight text-dark sm:text-4xl">
            Объекты компании расположены в разных районах Великого&nbsp;Новгорода
          </h2>

          <p className=" text-base leading-relaxed text-dark60">
            Яx сделал страницу не в формате обычной сетки, а в виде крупных
            карточек. Так каждый объект воспринимается отдельно и выглядит
            значимее.
          </p>
        </div>

        <BuiltObjectsMap />
      </section>

      {/* <section className="container-padding section mb-24">
        <div className="grid overflow-hidden rounded-4xl bg-dark10 p-3 sm:p-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="grid content-center rounded-[2rem] bg-accent p-6 text-white sm:p-8 lg:p-10">
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

          <div className="relative min-h-[260px] overflow-hidden rounded-[2rem] sm:min-h-[340px] lg:min-h-full">
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
  )
}

export default BuiltObjectsPage