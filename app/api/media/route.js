import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { getSupabase, BUCKET, getPublicUrl } from "@/lib/supabase";

const ALLOWED_FOLDERS = ["apartments", "buildings", "news", "built-objects", "misc"];

export async function GET(request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder") || "apartments";

  if (!ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }

  const { data, error } = await getSupabase().storage
    .from(BUCKET)
    .list(folder, {
      limit: 200,
      sortBy: { column: "created_at", order: "desc" },
    });

  if (error) {
    return NextResponse.json({ error: "Ошибка загрузки файлов" }, { status: 500 });
  }

  const files = (data ?? [])
    .filter((f) => f.name !== ".emptyFolderPlaceholder")
    .map((f) => ({
      name: f.name,
      path: `${folder}/${f.name}`,
      url: getPublicUrl(`${folder}/${f.name}`),
      createdAt: f.created_at ?? null,
    }));

  return NextResponse.json({ files });
}
