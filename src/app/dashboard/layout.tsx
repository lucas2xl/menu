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
  console.log({ userId });
  if (!userId) return redirect("/sign-in");

  const store = await db.store.findFirst({ where: { userId: userId } });
  console.log({ store });
  if (store) {
    return redirect(`/dashboard/${store.slug}`);
  }

  console.log("no store");

  return <>{children}</>;
}
