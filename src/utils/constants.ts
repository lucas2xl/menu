export const APP_TITLE = "Menu";
// export const DATABASE_PREFIX = "acme_v3";
export const EMAIL_SENDER = '"Menu" <noreply@2x-l.com>';

export const redirects = {
  toSignIn: "/sign-in",
  toSignUp: "/sign-up",
  dashboard: "/dashboard",
  afterSignOut: "/",
} as const;

export const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/reset-password",
  "/new-password",
];
export const publicRoutes = ["/", "/:slug", "/:slug/products/:id"];
export const apiAuthPrefix = "/api/auth";
