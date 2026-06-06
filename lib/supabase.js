import { createClient } from "@supabase/supabase-js";

export const BUCKET = "gloria-images";

let _client = null;

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
