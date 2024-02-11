import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

import { MainNav } from "@/components/dashboards/main-nav";
import { StoreSwitcher } from "@/components/dashboards/store-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import { Search } from "@/components/search";
import { db } from "@/server/db";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  const stores = await db.store.findMany({
    where: { slug: params.slug, userId },
  });
  if (!stores.length) return redirect("/verify");

  return (
    <div className="px-8">
      <div className="flex h-16 items-center border-b">
        <StoreSwitcher stores={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      {children}
    </div>
  );
}
