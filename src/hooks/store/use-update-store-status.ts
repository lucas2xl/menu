import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { updateStoreStatusAction } from "@/actions/store/update-store-status-action";

export function useUpdateStoreStatus() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onSubmit({ isOpen, storeId }: { isOpen: boolean; storeId: string }) {
    startTransition(async () => {
      const response = await updateStoreStatusAction({ isOpen, storeId });
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      router.refresh();
    });
  }

  return {
    isPending,
    onSubmit,
  };
}
