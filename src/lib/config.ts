export const config = {
  NODE_ENV: process.env.NODE_ENV,
  domain: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  db: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  supabase: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  resend: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
};
