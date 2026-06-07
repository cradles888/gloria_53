import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const objects = [
  { id: 1,  title: "ул. Кочетова, д. 20/1",                          year: "2020",          description: "Жилой дом, введённый в эксплуатацию в 2020 году.",              images: ["/builtObjects/kochetova20.jpg"],              coordinates: [31.221981, 58.534429], complex: "ЖК Раздолье" },
  { id: 2,  title: "ул. Б. Санкт-Петербургская, д. 98",              year: "2019",          description: "Один из построенных объектов компании в Великом Новгороде.",      images: ["/builtObjects/spb98.jpg"],                    coordinates: [31.273328, 58.555868] },
  { id: 3,  title: "ул. Б. Санкт-Петербургская, д. 98/1",            year: "2019",          description: "Один из построенных объектов компании в Великом Новгороде.",      images: ["/builtObjects/spb98-1.jpg"],                  coordinates: [31.27314,  58.556365] },
  { id: 4,  title: "ул. Ломоносова, д. 49",                          year: "2018",          description: "Жилой дом, введённый в эксплуатацию в октябре 2018 года.",        images: ["/builtObjects/lomonosova49.jpg"],             coordinates: [31.239318, 58.526405] },
  { id: 5,  title: "ул. Ломоносова, д. 45",                          year: "2017",          description: "Жилой дом, введённый в эксплуатацию в октябре 2017 года.",        images: ["/builtObjects/lomonosova45.jpg"],             coordinates: [31.239076, 58.525719] },
  { id: 6,  title: "ул. Речная, д. 10",                              year: "2016",          description: "Дом, построенный компанией «Глория» в 2016 году.",                images: ["/builtObjects/rechnaya10.jpg"],               coordinates: [31.240351, 58.505447] },
  { id: 7,  title: "ЖК по ул. Шелонская",                            year: "2015",          description: "Жилой комплекс, отражающий опыт компании в строительстве многоквартирных домов.", images: ["/builtObjects/complex-shelonskaya.jpg"],     coordinates: [31.247451, 58.510636], complex: "ЖК Шелонская" },
  { id: 8,  title: "ул. Студенческая д. 5/1",                        year: "2006",          description: "Жилой комплекс, отражающий опыт компании в строительстве многоквартирных домов.", images: ["/builtObjects/student5.jpg"],                coordinates: [31.289516, 58.538234] },
  { id: 9,  title: "ул. Добрыня, д. 7/27 и ул. Десятинная, д. 25/10", year: "2011 и 2012", description: "Жилой комплекс, отражающий опыт компании в строительстве многоквартирных домов.", images: ["/builtObjects/dobrinya-desyatinnaya.jpg"],   coordinates: [31.267067, 58.518153] },
  { id: 10, title: "ул. Связи, д. 9",                                year: "2008",          description: "Жилой комплекс, отражающий опыт компании в строительстве многоквартирных домов.", images: ["/builtObjects/svyazi9.jpg"],                 coordinates: [31.307842, 58.53076]  },
  { id: 11, title: "ул. Лазаревская, д. 10",                         year: "2008",          description: "Жилой комплекс, отражающий опыт компании в строительстве многоквартирных домов.", images: ["/builtObjects/lazarevskaya10.jpg"],          coordinates: [31.274119, 58.534119] },
  { id: 12, title: "ул. Михайлова, д. 24/1",                         year: "2009",          description: "Жилой комплекс, отражающий опыт компании в строительстве многоквартирных домов.", images: ["/builtObjects/mikhailova24-1.jpg"],          coordinates: [31.289786, 58.517598] },
  { id: 13, title: "ул. 8 марта, д. 31",                             year: "2009",          description: "Жилой комплекс, отражающий опыт компании в строительстве многоквартирных домов.", images: ["/builtObjects/8marta.jpg"],                  coordinates: [31.289786, 58.517598] },
  { id: 14, title: "пр. К.Маркса, д. 10/1",                          year: "2006",          description: "Жилой комплекс, отражающий опыт компании в строительстве многоквартирных домов.", images: ["/builtObjects/kmarksa10-1.jpg"],             coordinates: [31.255245, 58.526992] },
  { id: 15, title: "ул. Славная, д. 24",                             year: "2012",          description: "Построенный жилой дом в исторической части города.",              images: ["/builtObjects/slavnaya24.jpg"],               coordinates: [31.290378, 58.515234] },
  { id: 16, title: "пр. А. Корсунова, д. 42/2",                      year: "2010",          description: "Дом, сданный в 4 квартале 2010 года.",                            images: ["/builtObjects/korsynova48.jpg"],              coordinates: [31.227901, 58.549679] },
  { id: 17, title: "ул. Шелонская, д. 48",                           year: "2009",          description: "Один из объектов компании, построенный в 2009 году.",             images: ["/builtObjects/shelonskaya48.jpg"],            coordinates: [31.250296, 58.509993] },
  { id: 18, title: "ул. Шелонская, д. 46",                           year: "2010",          description: "Один из объектов компании, построенный в 2009 году.",             images: ["/builtObjects/shelonskaya46.jpg"],            coordinates: [31.249218, 58.510270] },
  { id: 19, title: "ул. Ломоносова, д. 25а",                         year: "2007",          description: "Жилой дом, сданный в 4 квартале 2007 года.",                      images: ["/builtObjects/lomonosova25a.jpg"],            coordinates: [31.243747, 58.533955] },
  { id: 20, title: "ул. Нехинская, д. 35",                           year: "2015",          description: "Жилой комплекс, отражающий опыт компании в строительстве многоквартирных домов.", images: ["/builtObjects/nehinskaya35.jpg"],            coordinates: [31.241402, 58.523576] },
  { id: 21, title: "ул. Парковая, д. 3/1 и д. 3/2",                  year: "2004",          description: "Один из ранних объектов в истории строительной компании.",         images: ["/builtObjects/parkovaya.jpg", "/builtObjects/kmarksa10-1.jpg"], coordinates: [31.292714, 58.539888] },
];

async function main() {
  console.log("Seeding built objects...");

  for (const [i, obj] of objects.entries()) {
    await prisma.builtObject.upsert({
      where: { id: obj.id },
      update: {},
      create: {
        id: obj.id,
        title: obj.title,
        year: obj.year,
        description: obj.description ?? null,
        images: obj.images,
        coordinates: obj.coordinates,
        complex: obj.complex ?? null,
        sortOrder: i,
      },
    });
  }

  // Сбрасываем sequence id на max+1: объекты вставлены с явными id (upsert),
  // иначе следующий create() столкнётся с «Unique constraint failed (id)».
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"BuiltObject"','id'), COALESCE((SELECT MAX(id) FROM "BuiltObject"), 0) + 1, false)`,
  );

  console.log(`Seeded ${objects.length} built objects.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
