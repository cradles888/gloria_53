import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { updateApplicationStatus } from "../actions";
import AdminNav from "../_components/AdminNav";
import AdminPagination from "../_components/AdminPagination";
import SectionMeter from "../_components/SectionMeter";

export const metadata = {
  title: "Заявки",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const PAGE_SIZE = 15;

const STATUS_LABELS = {
  new: "Новая",
  "in-progress": "В работе",
  done: "Решена",
  cancelled: "Отменена",
};

const STATUS_NEXT = {
  new: "in-progress",
  "in-progress": "done",
  done: "cancelled",
  cancelled: "new",
};

const STATUS_STYLES = {
  new: "bg-accent/10 text-accent",
  "in-progress": "bg-dark/10 text-dark",
  done: "bg-green-100 text-green-700",
  cancelled: "bg-dark15 text-dark50",
};

const TYPE_LABELS = {
  purchase: "Покупка",
  consultation: "Консультация",
  message: "Сообщение",
};

const TYPE_STYLES = {
  purchase: "bg-accent/10 text-accent",
  consultation: "bg-blue-100 text-blue-700",
  message: "bg-dark10 text-dark",
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

export default async function ManagerApplicationsPage({ searchParams }) {
  await requireAdmin();

  const { page: pageParam } = await searchParams;
  const page = Math.max(Number(pageParam) || 1, 1);
  const skip = (page - 1) * PAGE_SIZE;

  const [totalCount, newCount, inProgressCount, applications] = await Promise.all([
    prisma.application.count(),
    prisma.application.count({ where: { status: "new" } }),
    prisma.application.count({ where: { status: "in-progress" } }),
    prisma.application.findMany({
      skip,
      take: PAGE_SIZE,
      orderBy: { createdAt: "desc" },
      include: {
        apartment: {
          include: { building: { include: { complex: true } } },
        },
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="applications" title="Заявки" />

        <div className="mt-10">
          <SectionMeter
            items={[
              { label: "Всего", value: totalCount, caption: "заявок" },
              { label: "Новые", value: newCount, caption: "необработано" },
              { label: "В работе", value: inProgressCount, caption: "на рассмотрении" },
            ]}
          />
        </div>

        <section className="mt-8 overflow-hidden rounded-4xl border border-dark15 bg-white">
          <div className="border-b border-dark15 p-5 sm:p-6">
            <h2 className="text-2xl font-medium text-dark">Список заявок</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark15 bg-dark10 text-left text-xs uppercase tracking-wide text-dark50">
                  <th className="px-5 py-3 font-medium">#</th>
                  <th className="px-5 py-3 font-medium">Дата</th>
                  <th className="px-5 py-3 font-medium">Тип</th>
                  <th className="px-5 py-3 font-medium">Имя</th>
                  <th className="px-5 py-3 font-medium">Телефон</th>
                  <th className="px-5 py-3 font-medium">Квартира</th>
                  <th className="px-5 py-3 font-medium">Комментарий</th>
                  <th className="px-5 py-3 font-medium">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark15">
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center text-dark50">
                      Заявок пока нет
                    </td>
                  </tr>
                )}
                {applications.map((app) => {
                  const apt = app.apartment;
                  const aptLabel = apt
                    ? `№${apt.number}, ${apt.rooms}-комн. · ${apt.building?.complex?.name ?? ""}`
                    : "—";

                  return (
                    <tr key={app.id} className="align-top hover:bg-dark10/40">
                      <td className="px-5 py-4 text-dark50">{app.id}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-dark50">
                        {formatDate(app.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${TYPE_STYLES[app.type] ?? TYPE_STYLES.message}`}
                        >
                          {TYPE_LABELS[app.type] ?? app.type}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium text-dark">{app.name}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-dark">
                        <a
                          href={`tel:${app.phone}`}
                          className="transition hover:text-accent"
                        >
                          {app.phone}
                        </a>
                      </td>
                      <td className="px-5 py-4 text-dark">{aptLabel}</td>
                      <td className="px-5 py-4 max-w-xs text-dark50">
                        <p className="line-clamp-2">{app.comment || "—"}</p>
                      </td>
                      <td className="px-5 py-4">
                        <form action={updateApplicationStatus}>
                          <input type="hidden" name="id" value={app.id} />
                          <input type="hidden" name="status" value={STATUS_NEXT[app.status] ?? "new"} />
                          <button
                            type="submit"
                            title="Нажмите чтобы перейти к следующему статусу"
                            className={`inline-flex cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition hover:opacity-70 ${STATUS_STYLES[app.status] ?? STATUS_STYLES.new}`}
                          >
                            {STATUS_LABELS[app.status] ?? app.status}
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <AdminPagination
          basePath="/g53-manager/applications"
          page={page}
          totalPages={totalPages}
        />
      </section>
    </main>
  );
}
