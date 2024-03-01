import { createClient } from "@/lib/supabase/server";

export async function removeImages(bucket: string, imageUrl: string[]) {
  const supabase = createClient();

  const { error } = await supabase.storage.from(bucket).remove(imageUrl);

  if (error) {
    console.error("Remove failed:", error.message);
    return null;
  }
}