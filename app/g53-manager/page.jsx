import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { hasAdminSessionSecret, isAdminAuthenticated } from "@/lib/adminAuth";
import { loginAdmin } from "./actions";
import AdminNav from "./_components/AdminNav";
import SectionMeter from "./_components/SectionMeter";

export const metadata = {
  title: "Панель управления",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

const LoginView = ({ hasError, hasConfigError }) => {
  return (
    <main className="min-h-screen bg-dark10 px-4 py-10">
      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-md content-center">
        <form
          action={loginAdmin}
          className="rounded-4xl bg-white p-6 shadow-sm sm:p-8"
        >
          <h1 className="text-3xl font-medium text-dark">
            Вход в панель
          </h1>

          <div className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-dark">
              Email
              <input
                name="login"
                type="email"
                autoComplete="username"
                className="h-12 rounded-4xl border border-dark15 bg-white px-5 text-base outline-none transition focus:border-accent"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-dark">
              Пароль
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className="h-12 rounded-4xl border border-dark15 bg-white px-5 text-base outline-none transition focus:border-accent"
                required
              />
            </label>
          </div>

          {hasError ? (
            <p className="mt-4 rounded-3xl bg-accent/10 px-4 py-3 text-sm text-accent">
              Неверный email или пароль.
            </p>
          ) : null}

          {hasConfigError ? (
            <p className="mt-4 rounded-3xl bg-accent/10 px-4 py-3 text-sm text-accent">
              Не задан ADMIN_SESSION_SECRET в .env. Сессия администратора не
              может быть создана.
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-6 h-12 w-full rounded-4xl bg-dark px-5 text-sm font-medium text-white transition hover:bg-accent active:scale-[0.98]"
          >
            Войти
          </button>
        </form>
      </section>
    </main>
  );
};

const DashboardView = async () => {
  const [
    newsCount,
    publishedNewsCount,
    apartmentsCount,
    availableApartmentsCount,
    applicationsCount,
    complexesCount,
  ] = await Promise.all([
    prisma.newsItem.count(),
    prisma.newsItem.count({ where: { isPublished: true } }),
    prisma.apartment.count(),
    prisma.apartment.count({ where: { status: "available" } }),
    prisma.application.count(),
    prisma.residentialComplex.count(),
  ]);

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav title="Кабинет администратора" />

        <div className="mt-10">
          <SectionMeter
            items={[
              {
                label: "Новости",
                value: newsCount,
                caption: `${publishedNewsCount} опубликовано`,
              },
              {
                label: "Квартиры",
                value: apartmentsCount,
                caption: `${availableApartmentsCount} доступны`,
              },
              {
                label: "Заявки",
                value: applicationsCount,
                caption: `${complexesCount} ЖК`,
              },
            ]}
          />
        </div>

        <section className="mt-8 overflow-hidden rounded-4xl border border-dark15">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-dark p-6 text-white sm:p-8">
              <h2 className="text-3xl font-medium leading-tight">
                Выберите раздел сайта, с&nbsp;которым работаете сейчас
              </h2>
            </div>

            <div className="divide-y divide-dark15 bg-white">
              {[
                {
                  href: "/g53-manager/apartments",
                  title: "Квартиры",
                  text: "Список квартир, статусы, цены и привязка к позициям.",
                  value: `${availableApartmentsCount}/${apartmentsCount}`,
                },
                {
                  href: "/g53-manager/news",
                  title: "Новости и акции",
                  text: "Материалы, промо-блоки и публикации для покупателей.",
                  value: `${publishedNewsCount}/${newsCount}`,
                },
                {
                  href: "/g53-manager/built-objects",
                  title: "Построенные объекты",
                  text: "Витрина реализованных объектов и география проектов.",
                  value: "архив",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="grid gap-4 p-5 transition hover:bg-dark10 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6"
                >
                  <div>
                    <h3 className="text-xl font-medium text-dark">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-dark80">
                      {item.text}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-accent">
                    {item.value}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default async function ManagerPage({ searchParams }) {
  const { error } = await searchParams;
  const hasSecret = hasAdminSessionSecret();
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    return (
      <LoginView
        hasError={error === "1"}
        hasConfigError={!hasSecret || error === "config"}
      />
    );
  }

  return <DashboardView />;
}
