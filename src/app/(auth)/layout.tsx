import { auth } from "@/lib/auth/auth";
import { redirects } from "@/utils/constants";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (userId) redirect(redirects.dashboard);

  return <>{children}</>;
}
