import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { deleteStoreAction } from "@/actions/store/delete-store-action";
import { updateStoreSettingsAction } from "@/actions/store/update-store-settings-action";
import { UpdateStoreSettingsSchema } from "@/schemas/store";

export function useUpdateStoreSettings() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const form = useForm<UpdateStoreSettingsSchema>({
    resolver: zodResolver(UpdateStoreSettingsSchema),
  });

  function onSubmit(values: UpdateStoreSettingsSchema, storeId: string) {
    startTransition(async () => {
      const response = await updateStoreSettingsAction({ values, storeId });
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      router.refresh();
    });
  }

  function onConfirmRemove({ id }: { id: string }) {
    startTransition(async () => {
      const response = await deleteStoreAction({ id });
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
    form,
    showRemoveDialog,
    setShowRemoveDialog,
    onConfirmRemove,
  };
}
