import { redirect } from "next/navigation";
import { toast } from "sonner";

import { signOutAction } from "@/actions/auth/sign-out-action";
import { deleteUserAction } from "@/actions/user/delete-user-action";
import { redirects } from "@/utils/constants";

export function useDeleteUser() {
  async function onDeleteAccount(id: string) {
    const response = await deleteUserAction(id);
    if (response.status === "error") {
      return toast.error(response.message);
    }

    onLogout();
  }

  function onLogout() {
    signOutAction();
    redirect(redirects.afterSignOut);
  }

  return { onDeleteAccount, onLogout };
}
