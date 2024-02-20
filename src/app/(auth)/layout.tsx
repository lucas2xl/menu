import { currentUser } from "@/lib/auth/current-user";
import { redirects } from "@/lib/constants";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await currentUser();

  if (user) redirect(redirects.afterSignIn);

  return <>{children}</>;
}
