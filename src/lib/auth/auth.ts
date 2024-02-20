import { validateRequest } from "@/lib/auth/validate-request";

export async function auth() {
  const { user } = await validateRequest();

  return { userId: user?.id };
}
