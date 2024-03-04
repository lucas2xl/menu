import { redirect } from "next/navigation";
import React from "react";

import { MainNav } from "@/components/dashboards/main-nav";
import { StoreSwitcher } from "@/components/dashboards/store-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import { OpenStoreButton } from "@/components/open-store-button";
import { SwitchTheme } from "@/components/switch-theme";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@/components/user-button";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { getPublicUrl } from "@/lib/supabase/get-public-url";
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

  const store = await db.store.findFirst({
    where: { slug: params.slug, userId },
    include: { settings: true },
  });

  if (!store) return redirect(redirects.dashboard);

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { plan: true, stores: true },
  });

  if (!user) return redirect(redirects.toSignIn);

  return (
    <div className={store.settings?.theme}>
      <SwitchTheme theme={store.settings?.theme} />
      <div className="px-8 pt-4 fixed h-20 mx-auto w-full backdrop-blur-lg">
        <div className="flex items-center">
          <StoreSwitcher
            stores={user.stores?.map((store) => ({
              ...store,
              logo: store.logo && getPublicUrl("stores", store.logo),
            }))}
            userPlan={user.plan}
          />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search /> */}
            <OpenStoreButton store={store} />
            <ModeToggle />
            <UserButton
              user={{
                ...user,
                imageUrl: user.imageUrl && getPublicUrl("users", user.imageUrl),
              }}
            />
          </div>
        </div>
        <Separator className="mt-4" />
      </div>

      <div className="pt-20 px-8">{children}</div>
    </div>
  );
}
