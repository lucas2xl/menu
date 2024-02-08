import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React from "react";

import { CompanySwitcher } from "@/components/dashboard/company-switcher";
import { MainNav } from "@/components/dashboard/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Search } from "@/components/search";
import { db } from "@/server/db";
import { RedirectType, redirect } from "next/navigation";

export default async function DashboardCompanyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { userId } = auth();

  const companies = await db.company.findMany({ where: { userId: userId! } });
  if (!companies) return redirect("/dashboard", RedirectType.replace);
  console.log(companies);

  return (
    <div className="px-8">
      <div className="flex h-16 items-center border-b">
        <CompanySwitcher companies={companies} />
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
