import { createClient } from "@/lib/supabase/server";

export function getPublicUrl(bucket: string, url: string | null) {
  if (!url) return null;

  if (url.includes("https")) return url;

  const supabase = createClient();

  const { data } = supabase.storage.from(bucket).getPublicUrl(url);

  return data.publicUrl;
}
