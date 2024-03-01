"use client";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { themes } from "@/utils/themes";
import { useEffect } from "react";

type ThemeProps = {
  theme?: string;
};

export function SwitchTheme({ theme }: ThemeProps) {
  const isMounted = useIsMounted();
  useEffect(() => {
    themes.forEach((theme) => {
      document.body.classList.remove(theme.label);
    });
    document.body.classList.add(theme || "");
  }, [theme]);

  if (!isMounted) return null;

  return <></>;
}
