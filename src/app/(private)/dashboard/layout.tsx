import { getPathname } from "next-impl-getters/get-pathname";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { redirects } from "@/utils/constants";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const pathname = getPathname();
  if (!userId) return redirect(redirects.toSignIn);

  const store = await db.store.findFirst({
    where: { userId },
  });

  if (store && pathname === redirects.dashboard) {
    return redirect(`${redirects.dashboard}/${store.slug}`);
  }

  return <>{children}</>;
}
