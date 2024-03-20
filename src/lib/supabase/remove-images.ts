import { createClient } from "@/lib/supabase/server";

export async function removeImages(bucket: string, imageUrl: string[]) {
  const supabase = createClient();

  const path = imageUrl.map((url) => url.split(`/${bucket}/`).pop() || "");

  const { error } = await supabase.storage.from(bucket).remove(path);
  if (error) {
    console.error("Remove failed:", error.message);
    return null;
  }
}
