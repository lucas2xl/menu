import { createClient } from "@/lib/supabase/server";

export function getPublicUrl(bucket: string, url: string) {
  if (!url) return null;

  const supabase = createClient();

  const { data } = supabase.storage.from(bucket).getPublicUrl(url);

  return data.publicUrl;
}
