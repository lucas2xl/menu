import { zodResolver } from "@hookform/resolvers/zod";
import { StoreSettings } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { deleteStoreAction } from "@/actions/store/delete-store-action";
import { updateStoreSettingsAction } from "@/actions/store/update-store-settings-action";
import { UpdateStoreSettingsSchema } from "@/schemas/store";
import { themes } from "@/utils/themes";

type Props = {
  settings: StoreSettings;
};
export function useUpdateStoreSettings({ settings }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const form = useForm<UpdateStoreSettingsSchema>({
    resolver: zodResolver(UpdateStoreSettingsSchema),
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        isTableName: settings.isTableName,
        preparationTime: String(settings.preparationTime),
        hasDelivery: settings.hasDelivery,
        theme: settings.theme,
      });
    }
  }, [form, settings]);

  function onSubmit(values: UpdateStoreSettingsSchema, storeId: string) {
    startTransition(async () => {
      const response = await updateStoreSettingsAction({ values, storeId });
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      themes.forEach((theme) => {
        document.body.classList.remove(theme.label);
      });

      document.body.classList.add(values.theme || "");
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
