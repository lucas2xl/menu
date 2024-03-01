import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

import { config } from "@/lib/config";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    config.supabase.NEXT_PUBLIC_SUPABASE_URL!,
    config.supabase.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },

        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.error("Error setting cookie", error);
          }
        },

        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            console.error("Error removing cookie", error);
          }
        },
      },
    }
  );
}
