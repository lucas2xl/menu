"use client";

import { useIsMounted } from "@/hooks/use-is-mounted";
import { signOut } from "next-auth/react";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function Commands({ children }: ThemeProviderProps) {
  const isMounted = useIsMounted();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // ⌃P
      if (e.ctrlKey && e.key === "q") {
        e.preventDefault();
        signOut({ callbackUrl: "/" });
      }
      // ⇧⌘P
      if (e.metaKey && e.shiftKey && e.key === "p") {
        e.preventDefault();
        router.push(`/${pathname}/profile`);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [pathname, router]);

  if (!isMounted) return null;

  return <>{children}</>;
}
