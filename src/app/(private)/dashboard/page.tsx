import { AddCompanyForm } from "@/components/dashboard/add-company-form";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";
import { RedirectType, redirect } from "next/navigation";

export default async function RootPage() {
  const { userId } = auth();
  console.log("🔥", userId);
  if (!userId) return redirect("/sign-in");

  const company = await db.company.findFirst({ where: { userId: userId } });
  console.log("🔥", company);

  if (company) {
    return redirect(`/dashboard/${company.slug}`, RedirectType.push);
  }

  return <AddCompanyForm />;
}
