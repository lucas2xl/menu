import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

import { validateRequest } from "@/lib/auth/validate-request";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers";
import { APP_TITLE } from "@/utils/constants";

export const metadata: Metadata = {
  title: {
    default: APP_TITLE,
    template: `%s | ${APP_TITLE}`,
  },
  description: "Menu - plataforma para gerenciar os pedidos de comida",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          user?.theme || "theme-default"
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
