import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/lib/auth/auth";
import { redirects } from "@/lib/constants";
import { db } from "@/lib/db";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { userId } = await auth();

  if (!userId) return redirect(redirects.toSignIn);
  const store = await db.store.findFirst({
    where: { slug: params.slug, userId },
  });

  if (store) return redirect(`/${store.slug}`);

  return <>{children}</>;
}
