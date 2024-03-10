import { redirect } from "next/navigation";
import React from "react";

import { MainNav } from "@/components/dashboards/main-nav";
import { StoreSwitcher } from "@/components/dashboards/store-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import { OpenStoreButton } from "@/components/open-store-button";
import { SwitchTheme } from "@/components/switch-theme";
import { UserButton } from "@/components/user-button";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { redirects } from "@/utils/constants";

export default async function DashboardStoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { userId } = await auth();

  if (!userId) return redirect(redirects.toSignIn);

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { plan: true, stores: { include: { settings: true } } },
  });

  if (!user) return redirect(redirects.toSignIn);

  const store = user.stores.find((store) => store.slug === params.slug);

  if (!store) return redirect(redirects.toSignIn);

  return (
    <div className={store.settings?.theme}>
      <SwitchTheme theme={store.settings?.theme} />
      <div className="px-8 pt-4 fixed h-20 mx-auto w-full bg-background/80 backdrop-blur-lg z-50 border-b border-border">
        <div className="flex items-center">
          <StoreSwitcher stores={user.stores} userPlan={user.plan} />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <OpenStoreButton store={store} />
            <ModeToggle />
            <UserButton user={user} />
          </div>
        </div>
      </div>

      <div className="pt-20 px-8">{children}</div>
    </div>
  );
}
