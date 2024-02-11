import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  const store = await db.store.findFirst({ where: { userId } });

  if (store) {
    return redirect(`/dashboard/${store.slug}`);
  }

  return <>{children}</>;
}
