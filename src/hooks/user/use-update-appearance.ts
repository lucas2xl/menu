import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateAppearanceAction } from "@/actions/user/update-appearance-action";
import { AppearanceSchema } from "@/schemas/user";

export function useUpdateAppearance() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<AppearanceSchema>({
    resolver: zodResolver(AppearanceSchema),
  });

  function onSubmit(values: AppearanceSchema) {
    startTransition(async () => {
      const response = await updateAppearanceAction({ values });
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
  };
}
