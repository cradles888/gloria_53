# 🏙️ Gloria53

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8)](https://tailwindcss.com/)

**Веб-приложение для строительной компании ООО "Глория"** — информационный веб-ресурс с онлайн-инструментами для строительной компании ООО «Глория». Сайт раскрывает деятельность застройщика, позволяет покупателю **подобрать квартиру по собственным параметрам**, изучить планировки и ход строительства, следить за новостями и **оставить заявку на обратную связь**. Для сотрудников предусмотрена админ-панель с управлением каталогом, медиатекой и массовым импортом квартир из Excel.

---

## ✨ Возможности

- 🔎 Каталог квартир с фильтром по ЖК, корпусу, числу комнат, площади, цене и этажу
- 🧩 Три режима каталога: **сетка**, **список** и **поэтажно** (шахматка по корпусам и этажам)
- 🏠 Карточка квартиры: галерея фото, **планировка** и **план этажа** (Swiper с зумом, оптимизация next/image)
- 🔗 Блок «Похожие квартиры» (тот же ЖК и комнатность, сортировка по площади)
- 📝 Форма заявки на квартиру с серверной валидацией (Server Actions)
- 🗺️ Страницы ЖК, готовых объектов и новостей застройщика; карты на **Яндекс.Картах**
- 🛠️ Админ-панель `/g53-manager`: CRUD квартир, корпусов, новостей; привязка удобств
- 📥 Массовая загрузка квартир через **Excel-таблицу** по шаблону (SheetJS)
- 🖼️ **Медиатека**: загрузка изображений в Supabase Storage и копирование публичных ссылок

---

## 🧱 Технологический стек

| Компонент | Технологии |
| --- | --- |
| Фронтенд | Next.js 16 (App Router), React 19 |
| Стили и UI | Tailwind CSS 4, Headless UI, Framer Motion, Lucide, Swiper, React Range |
| Бэкенд | Next.js Server Actions и API Route Handlers (Node.js) |
| ORM / БД | Prisma 6 + PostgreSQL (Supabase) |
| Файловое хранилище | Supabase Storage (бакет `gloria-images`) |
| Карты | Яндекс.Карты (ymaps3) |
| Импорт данных | SheetJS (`xlsx`) |
| Развёртывание | Vercel |

---

## 🗂️ Структура проекта

```
gloria53/
├── app/                 # маршруты App Router, страницы и Server Actions
│   ├── apartments/      # каталог и карточка квартиры
│   ├── g53-manager/     # админ-панель (CRUD, медиатека, импорт)
│   └── api/             # route handlers (upload, media, import, template)
├── components/          # React-компоненты (UI, каталог, галерея и много другого)
├── lib/                 # клиент Supabase, вспомогательные модули
├── prisma/              # schema.prisma, миграции, seed
└── public/              # статические ресурсы
```

---

## 🚀 Запуск (режим разработки)

```bash
npm install                              # установка зависимостей
# создать .env с переменными окружения (см. ниже)
npx prisma migrate dev --name init       # применить миграции
npx prisma generate                      # сгенерировать Prisma Client
npx prisma db seed                       # заполнить начальными данными
npm run dev                              # http://localhost:3000

Для теста желательно использовать supabase, чтобы сразу работало supabase storage для медиатеки
env:
- DATABASE_URL=postgresql://postgres.kbjoqqhdizkupsfatkwk:[YOUR_PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:5432/postgres (SESSION POOLER)
- DIRECT_URL=postgresql://postgres.kbjoqqhdizkupsfatkwk:[YOUR_PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:5432/postgres
- NEXT_PUBLIC_SUPABASE_URL: Settings → API Keys → Leagcy anon, service_role API keys (anon public)
- SUPABASE_SERVICE_ROLE_KEY: Settings → API Keys → Leagcy anon, service_role API keys (service_role)
- ADMIN_SESSION_SECRET: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Переменные окружения (`.env`)

| Переменная | Назначение |
| --- | --- |
| `DATABASE_URL` | строка подключения к PostgreSQL (Supabase) |
| `NEXT_PUBLIC_SUPABASE_URL` | адрес проекта Supabase (публичные изображения) |
| `SUPABASE_SERVICE_ROLE_KEY` | служебный ключ Supabase Storage (только сервер) |
| `ADMIN_SESSION_SECRET` | секрет для подписи сессии администратора |
| `NEXT_PUBLIC_YANDEX_MAPS_API_KEY` | ключ API Яндекс.Карт |

> Файл `.env` не публикуется в репозитории.

---

Проект разработан в учебных целях для ООО «Глория».
