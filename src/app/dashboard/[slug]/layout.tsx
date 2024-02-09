import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

import { MainNav } from "@/components/dashboard/main-nav";
import { StoreSwitcher } from "@/components/dashboard/store-switcher";
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
  const stores = await db.store.findMany({ where: { slug: params.slug } });
  if (!stores.length) return redirect("/dashboard");

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
