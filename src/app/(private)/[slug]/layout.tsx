import React from "react";

import { MainNav } from "@/components/dashboards/main-nav";
import { StoreSwitcher } from "@/components/dashboards/store-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import { Search } from "@/components/search";
import { UserButton } from "@/components/user-button";
import { currentUser } from "@/lib/auth/current-user";
import { redirects } from "@/lib/constants";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { user } = await currentUser();

  if (!user) return redirect(redirects.toSignIn);

  const stores = await db.store.findMany({
    where: { userId: user.id },
  });

  return (
    <div className="px-8">
      <div className="flex h-16 items-center border-b">
        <StoreSwitcher stores={stores} slug={params.slug} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ModeToggle />
          <UserButton user={user} />
        </div>
      </div>
      {children}
    </div>
  );
}
