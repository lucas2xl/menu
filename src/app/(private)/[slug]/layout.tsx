import React from "react";

import { MainNav } from "@/components/dashboards/main-nav";
import { StoreSwitcher } from "@/components/dashboards/store-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import { Search } from "@/components/search";
import { UserButton } from "@/components/user-button";
import { auth } from "@/lib/auth/auth";
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
  const { userId } = await auth();

  if (!userId) return redirect(redirects.toSignIn);

  const storesPromise = db.store.findMany({
    where: { userId },
  });
  const userPromise = db.user.findUnique({
    where: { id: userId },
    include: { plan: true },
  });

  const [stores, user] = await Promise.all([storesPromise, userPromise]);

  if (!user) return redirect(redirects.toSignIn);

  return (
    <div className="px-8">
      <div className="flex h-16 items-center border-b">
        <StoreSwitcher stores={stores} slug={params.slug} user={user} />
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
