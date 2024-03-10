"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { StoreDialog } from "@/components/dialogs/store-dialog";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <StoreDialog />
      {/* <Analytics /> */}
      <Toaster richColors />
      <TailwindIndicator />
      {children}
    </ThemeProvider>
  );
}
