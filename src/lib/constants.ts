export const APP_TITLE = "Menu";
// export const DATABASE_PREFIX = "acme_v3";
export const EMAIL_SENDER = '"Menu" <noreply@2x-l.com>';

export const redirects = {
  toSignIn: "/sign-in",
  toSignUp: "/sign-up",
  afterSignIn: "/dashboard",
  afterSignOut: "/",
} as const;

export const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/reset-password",
  "/new-password",
];
export const publicRoutes = ["/"];
export const apiAuthPrefix = "/api/auth";
