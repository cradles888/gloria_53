import Button from "@/components/UI/Button";

const COMPANY_STATS = [
  {
    value: "1999",
    label: "работаем с",
  },
  {
    value: "300",
    label: "человек в команде",
  },
  {
    value: "215 тыс. м²",
    label: "построенного жилья",
  },
  {
    value: "70 млн ₽",
    label: "техника и оборудование",
  },
];

const BIG_PROJECTS = [
  {
    title:
      "Реконструкция и расширение системы водохозяйственно-питьевого водоснабжения Великого Новгорода",
    price: "60 млн ₽",
  },
  {
    title:
      "Водоснабжение Деревяницкого жилого микрорайона, II этап строительства насосной станции первого подъёма",
    price: "36 млн ₽",
  },
  {
    title:
      "Расширение свинокомплекса: строительство репродуктора на 5 000 свиноматок и модернизация производства в д. Чечулино",
    price: "15,6 млн ₽",
  },
];

const COMPETENCE_ITEMS = [
  {
    title: "Полный цикл строительства",
    text: "Компания работает как инвестор, застройщик, генеральный подрядчик и субподрядчик. Это позволяет сопровождать объект на разных этапах.",
  },
  {
    title: "Собственная проектная база",
    text: "В структуру компании входит проектная организация, что помогает заранее продумывать будущие жилые и промышленные объекты.",
  },
  {
    title: "Инженерные и специальные работы",
    text: "Специалисты выполняют работы, связанные с сетями газопровода, теплоснабжения, водопровода, канализации и электроснабжения.",
  },
];

const AboutPage = () => {
  return (
    <main>
      <section className="container-padding pb-10 pt-14 sm:pt-18 lg:pb-14 lg:pt-24">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.95fr] lg:items-center">
          <div>


            <h1 className="max-w-4xl text-3xl font-medium text-dark sm:text-5xl lg:text-5xl">
              ООО «Глория» — строительная компания из Великого Новгорода
            </h1>

            <div className="mt-8 grid max-w-3xl gap-4 text-base text-dark60 sm:text-lg">
              <p>
                Общество с ограниченной ответственностью «Глория» основано в
                сентябре 1999 года. С апреля 2000 года основным направлением
                деятельности компании стало промышленно-гражданское
                строительство.
              </p>

              <p>
                Сегодня компания выполняет функции инвестора, застройщика,
                генерального подрядчика и субподрядчика. Проще говоря, «Глория»
                участвует не только в продаже квартир, но и в самом процессе
                создания объектов — от проектных решений до строительных работ.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <Button
                text="Выбрать квартиру"
                variant="accent"
                size="md"
                linkToPage="/apartments"
              />

              <Button
                text="Связаться с отделом продаж"
                variant="outline"
                size="md"
                linkToPage="/contacts"
              />
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden bg-transparent sm:min-h-[520px] hidden lg:block">
            <img
              src="/logo-active.jpg"
              alt="Строительная компания Глория"
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>
        </div>
      </section>

      <section className="container-padding mt-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {COMPANY_STATS.map((item) => (
            <div
              key={item.label}
              className="rounded-4xl bg-dark10 p-5 sm:p-6 text-center"
            >
              <p className="text-3xl font-medium text-accent sm:text-4xl">
                {item.value}
              </p>

              <p className="mt-3 text-base leading-relaxed text-dark60">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-padding section ">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
        

            <h2 className="text-3xl font-medium leading-tight text-dark sm:text-4xl">
              Более двадцати лет в строительстве
            </h2>

            <div className="mt-5 grid gap-4 text-base leading-relaxed text-dark60">
              <p>
                За время работы компания реализовала ряд проектов нежилого
                назначения: реконструкцию Окуловского суда, реконструкцию школы
                в городе Холм и строительно-монтажные работы на Новгородской
                ТЭЦ.
              </p>

              <p>
                Отдельное направление опыта связано с промышленными объектами и
                инженерной инфраструктурой. Такие проекты требуют точной
                организации работ, соблюдения сроков и устойчивой материальной
                базы.
              </p>
            </div>
          </div>

          <div className="grid gap-4">


            <div className="rounded-4xl bg-dark10 p-5 sm:p-6">
              <p className="mb-4 text-lg font-medium text-dark">
                Компания участвовала в следующих проектах по строительству
                промышленных объектов
              </p>

              <div className="grid gap-3">
                {BIG_PROJECTS.map((item) => (
                  <div
                    key={item.title}
                    className="grid gap-2 rounded-3xl bg-white p-4 sm:grid-cols-[1fr_auto] sm:items-start"
                  >
                    <p className="text-sm leading-relaxed text-dark60">
                      {item.title}
                    </p>

                    <span className="w-max rounded-4xl bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-padding section">
        <div className="relative overflow-hidden rounded-4xl bg-header">
          <img
            src="/images/tower-crane.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-right opacity-35 lg:hidden"
            aria-hidden="true"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/30 lg:hidden" />

          <div className="relative z-10 grid lg:grid-cols-[1fr_1fr]">
            <div className="grid content-center gap-6 p-6 sm:p-8 lg:p-12">
              <div>
                <span className="mb-4 inline-flex rounded-4xl bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
                  Ресурсы и компетенции
                </span>

                <h2 className="text-3xl font-medium leading-tight text-white sm:text-4xl">
                  У компании есть своя техника, специалисты и проектное
                  направление
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                «Глория» имеет парк машин, механизмов и оборудования, а также
                земельные участки с инвестиционным потенциалом. Кроме того, у
                компании есть специалисты для проектирования зданий и выполнения
                инженерных работ.
              </p>

              <div className="grid gap-3">
                {COMPETENCE_ITEMS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm"
                  >
                    <p className="font-medium text-white">{item.title}</p>

                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden min-h-[320px] lg:block">
              <img
                src="/images/tower-crane.png"
                alt="Строительная техника и ресурсы компании"
                className="absolute inset-0 h-full w-full object-cover object-right"
              />

              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-padding section">
        <div className="relative overflow-hidden rounded-4xl bg-dark10 lg:hidden">
          <img
            src="/images/material-brick.png"
            alt="материал"
            className="absolute inset-0 h-full w-full object-cover object-bottom"
            aria-hidden="true"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/15" />

          <div className="absolute  inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/20" />

          <div className="relative z-10 grid min-h-[520px] content-end gap-7 p-6 sm:min-h-[560px] sm:p-8">
            <div>
           

              <h2 className="text-3xl font-medium leading-tight text-white sm:text-4xl">
                Экологически чистый и надёжный материал
              </h2>

              <div className="mt-5 grid gap-4 text-sm leading-relaxed text-white/85 sm:text-base">
                <p>
                  Наша компания строит дома из натурального и надёжного
                  материала — кирпича.
                </p>

                <p>
                  Кирпич хорошо сохраняет тепло, помогает с шумоизоляцией и
                  создаёт комфортную атмосферу в доме.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/15 p-4 backdrop-blur-sm">
                <p className="font-medium text-white">Тепло</p>
                <p className="mt-1 text-sm text-white/75">
                  комфорт в холодный сезон
                </p>
              </div>

              <div className="rounded-3xl bg-white/15 p-4 backdrop-blur-sm">
                <p className="font-medium text-white">Тише</p>
                <p className="mt-1 text-sm text-white/75">
                  хорошая шумоизоляция
                </p>
              </div>

              <div className="rounded-3xl bg-white/15 p-4 backdrop-blur-sm">
                <p className="font-medium text-white">Надёжно</p>
                <p className="mt-1 text-sm text-white/75">
                  проверенный материал
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop от 1024px */}
        <div className="hidden gap-8 lg:grid lg:grid-cols-[1fr_1fr] lg:items-stretch">
          <div className="relative min-h-[390px] overflow-hidden rounded-4xl bg-dark10">
            <img
              src="/images/material-brick.png"
              alt="Кирпичный дом"
              className="absolute inset-0 h-full w-full object-cover object-bottom"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <div className="grid content-between">
            <div>
             

              <h2 className="text-3xl font-medium leading-tight text-dark sm:text-4xl">
                Экологически чистый и надёжный материал
              </h2>

              <div className="mt-5 grid gap-4 text-base leading-relaxed text-dark60">
                <p>
                  Наша компания строит дома исключительно из натурального,
                  экологически чистого и надёжного материала — кирпича.
                </p>

                <p>
                  Мы ценим кирпич за то, что он лучше других материалов
                  сохраняет тепло, обеспечивает хорошую шумоизоляцию и создаёт
                  максимально комфортную атмосферу в доме.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-dark10 p-4">
                <p className="font-medium text-dark">Тепло</p>
                <p className="mt-1 text-sm text-dark60">
                  комфорт в холодный сезон
                </p>
              </div>

              <div className="rounded-3xl bg-dark10 p-4">
                <p className="font-medium text-dark">Тише</p>
                <p className="mt-1 text-sm text-dark60">хорошая шумоизоляция</p>
              </div>

              <div className="rounded-3xl bg-dark10 p-4">
                <p className="font-medium text-dark">Надёжно</p>
                <p className="mt-1 text-sm text-dark60">проверенный материал</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-padding section">
        <div className="rounded-4xl bg-dark10 p-6 sm:p-8 lg:p-10">
          <div className="mb-8 max-w-3xl">
           

            <h2 className="text-3xl font-medium leading-tight text-dark sm:text-4xl">
              Состав строительной компании «Глория»
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-4xl bg-white p-5 shadow-sm sm:p-6">
              <p className="mb-3 text-sm font-medium text-accent">
                Заказчик-застройщик
              </p>

              <h3 className="text-xl font-medium text-dark">ООО «Глория»</h3>

              <p className="mt-4 text-sm leading-relaxed text-dark60">
                Свидетельство СРО № 0275.01-2010-5321072550-С-070 от 11.10.2010
                г.
              </p>
            </article>

            <article className="rounded-4xl bg-white p-5 shadow-sm sm:p-6">
              <p className="mb-3 text-sm font-medium text-accent">
                Проектная организация
              </p>

              <h3 className="text-xl font-medium text-dark">
                ООО «Глория Проект»
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-dark60">
                Свидетельство СРО № СРО-П-056-16112009-0120 от 25.11.2010 г.
              </p>
            </article>

            <article className="rounded-4xl bg-header p-5 text-white shadow-sm sm:p-6">
              <p className="mb-3 text-sm font-medium text-white/70">
                Директор компании
              </p>

              <h3 className="text-xl font-medium">
                Соловьев Сергей Дмитриевич
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Руководит строительной компанией «Глория».
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="container-padding section pb-16 pt-8 mb-24">
        <div className="relative min-h-[420px] overflow-hidden rounded-4xl bg-dark">
          <img
            src="/images/material-brick.png"
            alt="Семья в новой квартире"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />

          <div className="relative z-10 grid min-h-[420px] gap-8 p-6 text-white sm:p-8 lg:grid-cols-[1fr_0.75fr] lg:items-center lg:p-10">
            <div className="max-w-3xl">
              <span className="mb-4 inline-flex rounded-4xl bg-white/15 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
                Заинтересованы в приобретении жилья?
              </span>

              <h2 className="text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
                Подберите квартиру, которая подойдёт именно вам
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
                В каталоге можно посмотреть планировки, выбрать параметры и
                оставить заявку. Менеджер поможет уточнить детали и условия
                покупки.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  text="Смотреть квартиры"
                  variant="white"
                  size="md"
                  linkToPage="/apartments"
                />

                <Button
                  text="Связаться"
                  variant="glass"
                  size="md"
                  linkToPage="/contacts"
                />
              </div>
            </div>

            <div className="hidden rounded-4xl border border-white/10 bg-white/12 p-6 backdrop-blur-sm lg:block">
              <div className="mb-5">
                <p className="text-lg font-medium text-white">
                  Как это работает
                </p>

                <div className="mt-3 h-1 w-14 rounded-full bg-accent" />
              </div>

              <div className="grid gap-4">
                <div className="flex gap-3 items-center">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium text-white">
                    1
                  </span>

                  <p className="text-sm leading-relaxed text-white/80">
                    Вы выбираете квартиру в каталоге.
                  </p>
                </div>

                <div className="flex gap-3 items-center">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium text-white">
                    2
                  </span>

                  <p className="text-sm leading-relaxed text-white/80">
                    Оставляете заявку или связываетесь с отделом продаж.
                  </p>
                </div>

                <div className="flex gap-3 items-center">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium text-white">
                    3
                  </span>

                  <p className="text-sm leading-relaxed text-white/80">
                    Менеджер помогает уточнить детали покупки.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
