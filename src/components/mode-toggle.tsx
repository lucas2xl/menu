"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  let Icon = theme === "dark" ? SunIcon : MoonIcon;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) Icon = MoonIcon;

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Icon className="h-6 w-6 stroke-1" />
      <span className="sr-only">Open menu</span>
    </Button>
  );
}
