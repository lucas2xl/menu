import { validateRequest } from "@/lib/auth/validate-request";

export async function currentUser() {
  const { user } = await validateRequest();

  return { user };
}
