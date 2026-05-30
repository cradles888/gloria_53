import { createClient } from "@supabase/supabase-js";

export const BUCKET = "gloria-images";

let _client = null;

// Ленивая инициализация — клиент создаётся при первом обращении (в рантайме),
// а не при импорте модуля. Иначе next build падает на этапе сборки, если
// env-переменные ещё не заданы в окружении.
export const getSupabase = () => {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase не настроен: задайте NEXT_PUBLIC_SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY",
    );
  }

  _client = createClient(url, key);
  return _client;
};

export const getPublicUrl = (path) =>
  getSupabase().storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
