import { redirect } from "next/navigation";
import React from "react";

import { currentUser } from "@/lib/auth/current-user";
import { redirects } from "@/lib/constants";
import { db } from "@/lib/db";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { user } = await currentUser();
  if (!user?.id) return redirect(redirects.toSignIn);

  const store = await db.store.findFirst({
    where: { slug: params.slug, userId: user.id },
  });

  if (store) return redirect(`/${store.slug}`);

  return <>{children}</>;
}
