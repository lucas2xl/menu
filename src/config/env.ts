export const env = {
  NODE_ENV: String(process.env.NODE_ENV),
  NEXT_PUBLIC_APP_URL: String(process.env.NEXT_PUBLIC_APP_URL),
  DATABASE_URL: String(process.env.DATABASE_URL),
  NEXT_PUBLIC_SUPABASE_URL: String(process.env.NEXT_PUBLIC_SUPABASE_URL),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: String(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ),
  RESEND_API_KEY: String(process.env.RESEND_API_KEY),
};
