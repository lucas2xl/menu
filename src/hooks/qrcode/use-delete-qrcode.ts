import { toast } from "sonner";

import { deleteQRCodeAction } from "@/actions/qrcode/delete-qrcode-action";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function useDeleteQRCode() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function onSubmit(id: string) {
    startTransition(async () => {
      const response = await deleteQRCodeAction(id);
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      router.refresh();
      toast.success(response.message);
    });
  }

  return { onSubmit, isPending };
}
