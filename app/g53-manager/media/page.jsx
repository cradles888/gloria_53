import { requireAdmin } from "@/lib/adminAuth";
import AdminNav from "../_components/AdminNav";
import MediaLibrary from "./MediaLibrary";

export const metadata = {
  title: "Медиатека",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  await requireAdmin();

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="media" title="Медиатека" />
        <MediaLibrary />
      </section>
    </main>
  );
}
