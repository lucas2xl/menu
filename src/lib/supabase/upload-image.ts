import { randomUUID } from "node:crypto";

import { createClient } from "@/lib/supabase/server";

export async function uploadImage(bucket: string, file?: File) {
  if (!file) return null;

  const supabase = createClient();

  const fileExtension = file.name.split(".").pop();
  const fileName = `${randomUUID()}.${fileExtension}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`${fileName}`, file);

  if (error) {
    console.error("Upload failed:", error.message);
    return null;
  }

  return data.path;
}
