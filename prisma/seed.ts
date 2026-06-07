import { PrismaClient, Prisma } from "@prisma/client";
import crypto from "node:crypto";

const prisma = new PrismaClient();

const hashPassword = (password: string, salt = crypto.randomBytes(16).toString("hex")) => {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");

  return `scrypt:${salt}:${hash}`;
};

const residentialComplexesSeed = [
  {
    name: "ЖК Юннатов",
    slug: "zhk-yunnatov",
    description: "Жилой комплекс строительной компании «Глория».",
    address: "Великий Новгород",
    status: "active",
    heroImage: "/complexes/yunnatov/hero.jpg",
  },
  {
    name: "ЖК Раздолье",
    slug: "zhk-razdolye",
    description: "Жилой комплекс строительной компании «Глория».",
    address: "Великий Новгород",
    status: "active",
    heroImage: null,
  },
  {
    name: "ЖК Шелонская",
    slug: "zhk-shelonskaya",
    description: "Жилой комплекс строительной компании «Глория».",
    address: "Великий Новгород",
    status: "active",
    heroImage: null,
  },
];

const buildingsSeed = [
  {
    complexSlug: "zhk-yunnatov",
    name: "Позиция 1",
    position: "1",
    address: "Великий Новгород",
    floorsTotal: 8,
    entrancesTotal: 2,
    plannedSettlementDate: new Date("2026-12-01"),
    status: "active",
  },
];

const amenitiesSeed = [
  {
    oldId: 1,
    name: "Предчистовая отделка",
    slug: "rough-finish",
    icon: "roughFinish",
  },
  {
    oldId: 2,
    name: "Подогрев полов",
    slug: "floor-heating",
    icon: "floorHeating",
  },
  {
    oldId: 3,
    name: "Раздельный с/у",
    slug: "separate-bathroom",
    icon: "separateBathroom",
  },
  {
    oldId: 4,
    name: "Кондиционер",
    slug: "air-conditioner",
    icon: "airConditioner",
  },
  {
    oldId: 5,
    name: "Балкон",
    slug: "balcony",
    icon: "balcony",
  },
];

const purchaseOptionsSeed = [
  {
    name: "Ипотека",
    description: "Рассчитывается индивидуально",
    isActive: true,
    sortOrder: 1,
  },
  {
    name: "Полная оплата",
    description: "Покупка одним платежом",
    isActive: true,
    sortOrder: 2,
  },
  {
    name: "Рассрочка на 3 месяца",
    description: "Условия уточняются у менеджера",
    isActive: true,
    sortOrder: 3,
  },
];

const adminUsersSeed = [
  {
    name: "Администратор",
    email: process.env.SEED_ADMIN_EMAIL || "admin@gloria.local",
    passwordHash: process.env.SEED_ADMIN_PASSWORD_HASH || hashPassword("ChangeMe53!"),
    role: "admin",
    isActive: true,
  },
];

const newsItemsSeed = [
  {
    complexSlug: null,
    type: "promotion",
    label: "IT-ипотека",
    title: "IT-ипотека для специалистов IT-сферы",
    excerpt:
      "Льготная ставка для сотрудников аккредитованных IT-компаний на покупку квартиры.",
    content: [
      "IT-ипотека — это программа с пониженной ставкой для сотрудников аккредитованных IT-компаний. Она позволяет приобрести квартиру в наших жилых комплексах на более выгодных условиях, чем по стандартной ипотеке.",
      "Менеджеры отдела продаж помогут проверить, подходите ли вы под условия программы, рассчитают ежемесячный платёж и подскажут доступные квартиры. Оставьте заявку на сайте — и мы свяжемся с вами для консультации.",
    ],
    image:
      "https://avatars.mds.yandex.net/i?id=604de88757f463456f6d4220e8fdf4bb_l-10992423-images-thumbs&n=13",
    slug: "it-ipoteka",
    isFeatured: true,
    isPublished: true,
    showOnMain: true,
    sortOrder: 0,
    publishedAt: new Date("2026-06-01"),
  },
  {
    complexSlug: null,
    type: "promotion",
    label: "Семейная ипотека",
    title: "Семейная ипотека для семей с детьми",
    excerpt:
      "Льготные условия покупки квартиры для семей с детьми по государственной программе.",
    content: [
      "Семейная ипотека — это государственная программа с пониженной ставкой для семей с детьми. С ней можно приобрести квартиру в наших жилых комплексах на льготных условиях и снизить ежемесячный платёж.",
      "Специалисты отдела продаж помогут разобраться в условиях программы, рассчитают платёж и подберут подходящую квартиру. Оставьте заявку — и мы подскажем все детали.",
    ],
    image:
      "https://as2.ftcdn.net/jpg/05/40/61/67/1000_F_540616761_KZdeLnsmmA45jvmfiAdYJcD6OWTRRVsc.jpg",
    slug: "semeynaya-ipoteka",
    isFeatured: true,
    isPublished: true,
    showOnMain: true,
    sortOrder: 1,
    publishedAt: new Date("2026-06-02"),
  },
  {
    complexSlug: "zhk-yunnatov",
    type: "promotion",
    label: "Акция",
    title: "Специальные условия на квартиры в ЖК «Юннатов»",
    excerpt: "Индивидуальные условия покупки на выбранные квартиры.",
    content: [
      "Для покупателей квартир в жилом комплексе «Юннатов» доступны индивидуальные условия покупки. Менеджер отдела продаж поможет подобрать подходящий вариант, рассчитать платёж и уточнить актуальные предложения.",
      "Предложение распространяется на выбранные квартиры и зависит от планировки, этажа и способа оплаты. Подробные условия можно уточнить в отделе продаж.",
    ],
    image: "/images/news/news3.jpg",
    slug: "special-offer-yunnatov",
    isFeatured: true,
    isPublished: true,
    sortOrder: 1,
    publishedAt: new Date("2026-05-18"),
  },
  {
    complexSlug: "zhk-yunnatov",
    type: "construction",
    label: "Ход строительства",
    title: "Обновление по строительству ЖК «Юннатов»",
    excerpt: "Фотоотчёт о текущих работах на объекте.",
    content: [
      "На площадке жилого комплекса «Юннатов» продолжаются плановые строительные работы. Команда ведёт работы по графику и готовит очередной этап благоустройства территории.",
      "В фотоотчёте собрали актуальные кадры объекта, чтобы покупатели могли следить за динамикой строительства и видеть изменения на площадке.",
    ],
    image: "/images/news/news2.jpg",
    slug: "construction-yunnatov-may",
    isFeatured: false,
    isPublished: true,
    sortOrder: 2,
    publishedAt: new Date("2026-05-12"),
  },
  {
    complexSlug: null,
    type: "news",
    label: "Новости",
    title: "На сайте появился раздел построенных объектов",
    excerpt:
      "Теперь пользователи могут ознакомиться с реализованными проектами компании.",
    content: [
      "Мы добавили на сайт раздел с построенными объектами. В нём можно посмотреть реализованные проекты компании и познакомиться с нашим опытом в строительстве.",
      "Раздел будет постепенно пополняться новыми материалами, фотографиями и описаниями объектов.",
    ],
    image: "/images/news/news1.jpg",
    slug: "built-objects-section",
    isFeatured: false,
    isPublished: true,
    sortOrder: 3,
    publishedAt: new Date("2026-05-08"),
  },
  {
    complexSlug: "zhk-yunnatov",
    type: "promotion",
    label: "Акция",
    title: "Скидка на квартиры с удобной планировкой",
    excerpt:
      "Специальные условия покупки на выбранные квартиры до конца месяца.",
    content: [
      "До конца месяца действуют специальные условия на выбранные квартиры с удобными планировками. Это хороший момент, чтобы рассмотреть варианты для жизни или инвестиций.",
      "В отделе продаж подскажут доступные квартиры, расскажут о планировках и помогут выбрать формат покупки.",
    ],
    image: "/images/news/news2.jpg",
    slug: "discount-for-apartments",
    isFeatured: true,
    isPublished: true,
    sortOrder: 4,
    publishedAt: new Date("2026-06-30"),
  },
];

const apartmentsSeed = [
  {
    buildingPosition: "1",

    number: "0",
    rooms: 2,
    areaTotal: "70.90",
    price: 7780000,
    pricePerSqm: 171240,

    floor: 4,
    entrance: 2,
    ceilingHeight: "2.70",

    status: "available",
    layoutType: "Квартира",

    mainImage: "/apartments/2-45.png",
    planImage: "/apartments/general-plan.jpg",

    images: [
      {
        url: "/apartments/2-45.png",
        title: "Планировка квартиры",
        type: "layout",
        sortOrder: 1,
      },
      {
        url: "/apartments/general-plan.jpg",
        title: "Планировка дома, позиция 1",
        type: "building_plan",
        sortOrder: 3,
      },
    ],

    roomAreas: [
      { name: "Кухня", area: "14.60", sortOrder: 1 },
      { name: "Комната", area: "17.20", sortOrder: 2 },
      { name: "Комната", area: "20.20", sortOrder: 3 },
      { name: "Прихожая", area: "10.10", sortOrder: 4 },
      { name: "Ванная", area: "4.80", sortOrder: 5 },
      { name: "С/у", area: "1.70", sortOrder: 6 },
      { name: "Лоджия", area: "4.50", sortOrder: 7 },
    ],

    amenityOldIds: [1, 3, 2],
  },
  {
    buildingPosition: "1",

    number: "1",
    rooms: 2,
    areaTotal: "45.70",
    price: 7780000,
    pricePerSqm: 171240,

    floor: 4,
    entrance: null,
    ceilingHeight: null,

    status: "available",
    layoutType: "Квартира",

    mainImage: "/apartments/2-45.png",
    planImage: "/apartments/general-plan.jpg",

    images: [
      {
        url: "/apartments/2-45.png",
        title: "Планировка квартиры",
        type: "layout",
        sortOrder: 1,
      },
      {
        url: "/apartments/general-plan.jpg",
        title: "Планировка дома, позиция 1",
        type: "building_plan",
        sortOrder: 3,
      },
    ],

    roomAreas: [],
    amenityOldIds: [3, 2, 1],
  },
  {
    buildingPosition: "1",

    number: "2",
    rooms: 2,
    areaTotal: "45.70",
    price: 7780000,
    pricePerSqm: 171240,

    floor: 4,
    entrance: null,
    ceilingHeight: null,

    status: "available",
    layoutType: "Квартира",

    mainImage: "/apartments/2-45.png",
    planImage: "/apartments/general-plan.jpg",

    images: [
      {
        url: "/apartments/2-45.png",
        title: "Планировка квартиры",
        type: "layout",
        sortOrder: 1,
      },
      {
        url: "/apartments/general-plan.jpg",
        title: "Планировка дома, позиция 1",
        type: "building_plan",
        sortOrder: 3,
      },
    ],

    roomAreas: [],
    amenityOldIds: [],
  },
  {
    buildingPosition: "1",

    number: "3",
    rooms: 2,
    areaTotal: "45.70",
    price: 7780000,
    pricePerSqm: 171240,

    floor: 4,
    entrance: null,
    ceilingHeight: null,

    status: "available",
    layoutType: "Квартира",

    mainImage: "/apartments/2-45.png",
    planImage: "/apartments/general-plan.jpg",

    images: [
      {
        url: "/apartments/2-45.png",
        title: "Планировка квартиры",
        type: "layout",
        sortOrder: 1,
      },
      {
        url: "/apartments/general-plan.jpg",
        title: "Планировка дома, позиция 1",
        type: "building_plan",
        sortOrder: 2,
      },
    ],

    roomAreas: [],
    amenityOldIds: [],
  },
  {
    buildingPosition: "1",

    number: "4",
    rooms: 2,
    areaTotal: "45.70",
    price: 7780000,
    pricePerSqm: 171240,

    floor: 4,
    entrance: null,
    ceilingHeight: null,

    status: "available",
    layoutType: "Квартира",

    mainImage: "/apartments/2-45.png",
    planImage: "/apartments/general-plan.jpg",

    images: [
      {
        url: "/apartments/2-45.png",
        title: "Планировка квартиры",
        type: "layout",
        sortOrder: 1,
      },
      {
        url: "/apartments/general-plan.jpg",
        title: "Планировка дома, позиция 1",
        type: "building_plan",
        sortOrder: 2,
      },
    ],

    roomAreas: [],
    amenityOldIds: [],
  },
  {
    buildingPosition: "1",

    number: "5",
    rooms: 2,
    areaTotal: "45.70",
    price: 7780000,
    pricePerSqm: 171240,

    floor: 4,
    entrance: null,
    ceilingHeight: null,

    status: "available",
    layoutType: "Квартира",

    mainImage: "/apartments/2-45.png",
    planImage: "/apartments/general-plan.jpg",

    images: [
      {
        url: "/apartments/2-45.png",
        title: "Планировка квартиры",
        type: "layout",
        sortOrder: 1,
      },
      {
        url: "/apartments/general-plan.jpg",
        title: "Планировка дома, позиция 1",
        type: "building_plan",
        sortOrder: 2,
      },
    ],

    roomAreas: [],
    amenityOldIds: [],
  },
  {
    buildingPosition: "1",

    number: "6",
    rooms: 2,
    areaTotal: "45.70",
    price: 7780000,
    pricePerSqm: 171240,

    floor: 4,
    entrance: null,
    ceilingHeight: null,

    status: "available",
    layoutType: "Квартира",

    mainImage: "/apartments/2-45.png",
    planImage: "/apartments/general-plan.jpg",

    images: [
      {
        url: "/apartments/2-45.png",
        title: "Планировка квартиры",
        type: "layout",
        sortOrder: 1,
      },
      {
        url: "/apartments/general-plan.jpg",
        title: "Планировка дома, позиция 1",
        type: "building_plan",
        sortOrder: 2,
      },
    ],

    roomAreas: [],
    amenityOldIds: [],
  },
];

async function main() {
  console.log("Очистка старых данных...");

  await prisma.application.deleteMany();
  await prisma.apartmentAmenity.deleteMany();
  await prisma.apartmentImage.deleteMany();
  await prisma.apartmentRoomArea.deleteMany();
  await prisma.apartment.deleteMany();
  await prisma.newsItem.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.purchaseOption.deleteMany();
  await prisma.building.deleteMany();
  await prisma.residentialComplex.deleteMany();

  console.log("Создание жилых комплексов...");

  const complexBySlug = new Map<string, number>();

  for (const residentialComplex of residentialComplexesSeed) {
    const createdComplex = await prisma.residentialComplex.create({
      data: residentialComplex,
    });

    complexBySlug.set(createdComplex.slug, createdComplex.id);
  }

  console.log("Создание домов / позиций...");

  const buildingByPosition = new Map<string, number>();

  for (const building of buildingsSeed) {
    const complexId = complexBySlug.get(building.complexSlug);

    if (!complexId) {
      throw new Error(`Не найден ЖК для slug: ${building.complexSlug}`);
    }

    const createdBuilding = await prisma.building.create({
      data: {
        complexId,
        name: building.name,
        position: building.position,
        address: building.address,
        floorsTotal: building.floorsTotal,
        entrancesTotal: building.entrancesTotal,
        plannedSettlementDate: building.plannedSettlementDate,
        status: building.status,
      },
    });

    if (createdBuilding.position) {
      buildingByPosition.set(createdBuilding.position, createdBuilding.id);
    }
  }

  console.log("Создание удобств...");

  const amenityByOldId = new Map<number, number>();

  for (const amenity of amenitiesSeed) {
    const createdAmenity = await prisma.amenity.create({
      data: {
        name: amenity.name,
        slug: amenity.slug,
        icon: amenity.icon,
      },
    });

    amenityByOldId.set(amenity.oldId, createdAmenity.id);
  }

  console.log("Создание условий покупки...");

  await prisma.purchaseOption.createMany({
    data: purchaseOptionsSeed,
  });

  console.log("Создание администраторов...");

  await prisma.adminUser.createMany({
    data: adminUsersSeed,
  });

  console.log("Создание новостей и акций...");

  for (const newsItem of newsItemsSeed) {
    const complexId = newsItem.complexSlug
      ? complexBySlug.get(newsItem.complexSlug)
      : null;

    if (newsItem.complexSlug && !complexId) {
      throw new Error(`Не найден ЖК для новости: ${newsItem.complexSlug}`);
    }

    await prisma.newsItem.create({
      data: {
        residentialComplexId: complexId ?? null,
        type: newsItem.type,
        label: newsItem.label,
        title: newsItem.title,
        excerpt: newsItem.excerpt,
        content: newsItem.content,
        image: newsItem.image,
        slug: newsItem.slug,
        isFeatured: newsItem.isFeatured,
        isPublished: newsItem.isPublished,
        showOnMain: newsItem.showOnMain ?? false,
        sortOrder: newsItem.sortOrder,
        publishedAt: newsItem.publishedAt,
      },
    });
  }

  console.log("Создание квартир...");

  for (const apartment of apartmentsSeed) {
    const buildingId = buildingByPosition.get(apartment.buildingPosition);

    if (!buildingId) {
      throw new Error(
        `Не найден дом / позиция для квартиры №${apartment.number}`,
      );
    }

    await prisma.apartment.create({
      data: {
        buildingId,

        number: apartment.number,
        rooms: apartment.rooms,
        areaTotal: new Prisma.Decimal(apartment.areaTotal),
        price: apartment.price,
        pricePerSqm: apartment.pricePerSqm,

        floor: apartment.floor,
        entrance: apartment.entrance,
        ceilingHeight: apartment.ceilingHeight
          ? new Prisma.Decimal(apartment.ceilingHeight)
          : null,

        status: apartment.status,
        layoutType: apartment.layoutType,

        mainImage: apartment.mainImage,
        planImage: apartment.planImage,

        images: {
          create: apartment.images,
        },

        roomAreas: {
          create: apartment.roomAreas.map((roomArea) => ({
            name: roomArea.name,
            area: new Prisma.Decimal(roomArea.area),
            sortOrder: roomArea.sortOrder,
          })),
        },

        amenities: {
          create: apartment.amenityOldIds
            .map((oldAmenityId) => {
              const amenityId = amenityByOldId.get(oldAmenityId);

              if (!amenityId) return null;

              return {
                amenityId,
              };
            })
            .filter((item): item is { amenityId: number } => Boolean(item)),
        },
      },
    });
  }

  console.log("Seed завершён успешно!");
}

main()
  .catch((error) => {
    console.error("Ошибка seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
