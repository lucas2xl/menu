"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";
import { DialogProvider } from "@/providers/dialog-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <DialogProvider />
      <Toaster />
      <TailwindIndicator />
      {children}
    </ThemeProvider>
  );
}
