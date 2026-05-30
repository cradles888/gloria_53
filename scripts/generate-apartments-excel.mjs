import * as XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Данные квартир ───────────────────────────────────────────────────────────

const apartments = [
  {
    position: "1",
    number: "10",
    rooms: 1,
    floor: 2,
    entrance: 1,
    areaTotal: 32.5,
    ceilingHeight: 2.7,
    price: 4100000,
    pricePerSqm: 126154,
    status: "available",

    area_kitchen: 10.2,
    area_room1: 15.8,
    area_room2: "",
    area_room3: "",
    area_hallway: 4.1,
    area_bathroom: "",
    area_toilet: "",
    area_loggia: 2.4,

    amenity_rough_finish: "да",
    amenity_floor_heating: "",
    amenity_separate_bathroom: "",
    amenity_air_conditioner: "",
    amenity_balcony: "да",

    mainImage: "10-layout.jpg",
    planImage: "pos1-genplan.jpg",
    image1: "10-layout-hq.png",
    image2: "",
    image3: "",
  },
  {
    position: "1",
    number: "24",
    rooms: 2,
    floor: 4,
    entrance: 2,
    areaTotal: 58.3,
    ceilingHeight: 2.7,
    price: 7340000,
    pricePerSqm: 125900,
    status: "available",

    area_kitchen: 14.6,
    area_room1: 17.2,
    area_room2: 16.4,
    area_room3: "",
    area_hallway: 5.8,
    area_bathroom: 3.2,
    area_toilet: "",
    area_loggia: 1.1,

    amenity_rough_finish: "да",
    amenity_floor_heating: "да",
    amenity_separate_bathroom: "",
    amenity_air_conditioner: "",
    amenity_balcony: "да",

    mainImage: "24-layout.jpg",
    planImage: "pos1-genplan.jpg",
    image1: "24-layout-hq.png",
    image2: "",
    image3: "",
  },
  {
    position: "1",
    number: "36",
    rooms: 3,
    floor: 6,
    entrance: 1,
    areaTotal: 78.9,
    ceilingHeight: 2.7,
    price: 9860000,
    pricePerSqm: 124968,
    status: "available",

    area_kitchen: 16.1,
    area_room1: 20.4,
    area_room2: 18.7,
    area_room3: 12.2,
    area_hallway: 7.3,
    area_bathroom: 4.2,
    area_toilet: "",
    area_loggia: "",

    amenity_rough_finish: "да",
    amenity_floor_heating: "да",
    amenity_separate_bathroom: "да",
    amenity_air_conditioner: "да",
    amenity_balcony: "",

    mainImage: "36-layout.jpg",
    planImage: "pos1-genplan.jpg",
    image1: "36-layout-hq.png",
    image2: "36-interior.jpg",
    image3: "",
  },
  {
    position: "1",
    number: "42",
    rooms: 2,
    floor: 7,
    entrance: 2,
    areaTotal: 62.1,
    ceilingHeight: 2.7,
    price: 7890000,
    pricePerSqm: 127054,
    status: "sold",

    area_kitchen: 15.3,
    area_room1: 18.9,
    area_room2: 17.1,
    area_room3: "",
    area_hallway: 6.2,
    area_bathroom: "",
    area_toilet: "",
    area_loggia: 4.6,

    amenity_rough_finish: "да",
    amenity_floor_heating: "",
    amenity_separate_bathroom: "",
    amenity_air_conditioner: "",
    amenity_balcony: "да",

    mainImage: "42-layout.jpg",
    planImage: "pos1-genplan.jpg",
    image1: "",
    image2: "",
    image3: "",
  },
];

// ─── Заголовки с русскими метками для читаемости ─────────────────────────────

const HEADERS = {
  position:       "position\n(позиция дома)",
  number:         "number *\n(номер квартиры)",
  rooms:          "rooms *\n(комнат)",
  floor:          "floor *\n(этаж)",
  entrance:       "entrance\n(подъезд)",
  areaTotal:      "areaTotal *\n(площадь, м²)",
  ceilingHeight:  "ceilingHeight\n(высота потолков, м)",
  price:          "price *\n(цена, ₽)",
  pricePerSqm:    "pricePerSqm *\n(цена за м², ₽)",
  status:         "status *\n(available / sold / reserved)",

  area_kitchen:   "area_kitchen\n(кухня, м²)",
  area_room1:     "area_room1\n(комната 1, м²)",
  area_room2:     "area_room2\n(комната 2, м²)",
  area_room3:     "area_room3\n(комната 3, м²)",
  area_hallway:   "area_hallway\n(прихожая, м²)",
  area_bathroom:  "area_bathroom\n(ванная, м²)",
  area_toilet:    "area_toilet\n(с/у, м²)",
  area_loggia:    "area_loggia\n(лоджия/балкон, м²)",

  amenity_rough_finish:       "amenity_rough_finish\n(предчистовая отделка)",
  amenity_floor_heating:      "amenity_floor_heating\n(подогрев полов)",
  amenity_separate_bathroom:  "amenity_separate_bathroom\n(раздельный с/у)",
  amenity_air_conditioner:    "amenity_air_conditioner\n(кондиционер)",
  amenity_balcony:            "amenity_balcony\n(балкон)",

  mainImage: "mainImage *\n(главное фото, имя файла)",
  planImage: "planImage *\n(план этажа, имя файла)",
  image1:    "image1\n(галерея 1)",
  image2:    "image2\n(галерея 2)",
  image3:    "image3\n(галерея 3)",
};

const keys = Object.keys(HEADERS);

// ─── Формируем строки ─────────────────────────────────────────────────────────

const rows = apartments.map((apt) => keys.map((k) => apt[k] ?? ""));

// ─── Создаём книгу ────────────────────────────────────────────────────────────

const wb = XLSX.utils.book_new();

// Лист с данными
const wsData = XLSX.utils.aoa_to_sheet([
  Object.values(HEADERS),
  ...rows,
]);

// Ширина колонок
wsData["!cols"] = [
  { wch: 12 }, // position
  { wch: 14 }, // number
  { wch: 10 }, // rooms
  { wch: 10 }, // floor
  { wch: 12 }, // entrance
  { wch: 14 }, // areaTotal
  { wch: 18 }, // ceilingHeight
  { wch: 14 }, // price
  { wch: 16 }, // pricePerSqm
  { wch: 22 }, // status
  { wch: 14 }, // area_kitchen
  { wch: 14 }, // area_room1
  { wch: 14 }, // area_room2
  { wch: 14 }, // area_room3
  { wch: 14 }, // area_hallway
  { wch: 14 }, // area_bathroom
  { wch: 14 }, // area_toilet
  { wch: 18 }, // area_loggia
  { wch: 22 }, // amenity_rough_finish
  { wch: 20 }, // amenity_floor_heating
  { wch: 24 }, // amenity_separate_bathroom
  { wch: 20 }, // amenity_air_conditioner
  { wch: 16 }, // amenity_balcony
  { wch: 24 }, // mainImage
  { wch: 24 }, // planImage
  { wch: 22 }, // image1
  { wch: 22 }, // image2
  { wch: 22 }, // image3
];

// Высота строки заголовка
wsData["!rows"] = [{ hpt: 42 }];

XLSX.utils.book_append_sheet(wb, wsData, "Квартиры");

// Лист-справка
const wsHelp = XLSX.utils.aoa_to_sheet([
  ["СПРАВКА ПО ЗАПОЛНЕНИЮ"],
  [],
  ["ОБЯЗАТЕЛЬНЫЕ ПОЛЯ (отмечены *)"],
  ["position", "Номер позиции дома (берётся из панели управления)"],
  ["number", "Номер квартиры — любая строка: 42, 42А и т.п."],
  ["rooms", "Количество комнат: 0 (студия), 1, 2, 3 ..."],
  ["floor", "Этаж"],
  ["areaTotal", "Общая площадь в м², дробное через точку: 45.70"],
  ["price", "Цена в рублях целым числом: 7780000"],
  ["pricePerSqm", "Цена за м² в рублях целым числом: 171240"],
  ["status", "Статус: available (доступна), sold (продана), reserved (забронирована)"],
  ["mainImage", "Имя файла главного изображения: 42-layout.jpg"],
  ["planImage", "Имя файла плана этажа: pos1-genplan.jpg"],
  [],
  ["НЕОБЯЗАТЕЛЬНЫЕ ПОЛЯ"],
  ["entrance", "Подъезд — целое число. Пусто → прочерк"],
  ["ceilingHeight", "Высота потолков. Пусто → 2.70 по умолчанию"],
  [],
  ["ПОМЕЩЕНИЯ (area_*)"],
  ["", "Площадь в м², дробное через точку. Пустая ячейка = помещения нет"],
  ["area_kitchen", "Кухня"],
  ["area_room1", "Комната 1"],
  ["area_room2", "Комната 2"],
  ["area_room3", "Комната 3"],
  ["area_hallway", "Прихожая"],
  ["area_bathroom", "Ванная"],
  ["area_toilet", "Санузел (с/у)"],
  ["area_loggia", "Лоджия или балкон"],
  [],
  ["УДОБСТВА (amenity_*)"],
  ["", "Значение «да» = удобство есть. Пусто = нет"],
  ["amenity_rough_finish", "Предчистовая отделка"],
  ["amenity_floor_heating", "Подогрев полов"],
  ["amenity_separate_bathroom", "Раздельный санузел"],
  ["amenity_air_conditioner", "Кондиционер"],
  ["amenity_balcony", "Балкон"],
  [],
  ["ИЗОБРАЖЕНИЯ"],
  ["", "Только имя файла. Файлы должны быть загружены в хранилище заранее"],
  ["mainImage", "Главное изображение (планировка)"],
  ["planImage", "Изображение плана этажа"],
  ["image1–3", "Галерея (дополнительные фото)"],
]);

wsHelp["!cols"] = [{ wch: 28 }, { wch: 60 }];

XLSX.utils.book_append_sheet(wb, wsHelp, "Справка");

// ─── Сохраняем файл ───────────────────────────────────────────────────────────

const outputPath = path.join(__dirname, "..", "apartments-import-template.xlsx");
XLSX.writeFile(wb, outputPath);

console.log(`Файл создан: ${outputPath}`);
