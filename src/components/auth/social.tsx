"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/server/routes";

type Props = {
  provider: "google" | "github";
};
export function Social({ provider }: Props) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  function handleGoogle() {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT_URL,
    });
  }

  const Icon = provider === "google" ? Icons.google : Icons.gitHub;

  return (
    <Button variant="outline" onClick={handleGoogle}>
      <Icon className="mr-2 h-4 w-4" />
      {provider === "google" ? "Google" : "Github"}
    </Button>
  );
}
