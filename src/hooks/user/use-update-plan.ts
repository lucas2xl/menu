import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updatePlanAction } from "@/actions/user/update-plan-action";
import { PlanSchema } from "@/schemas/user";

export function useUpdatePlan() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<PlanSchema>({
    resolver: zodResolver(PlanSchema),
  });

  function onSubmit(values: PlanSchema) {
    startTransition(async () => {
      const response = await updatePlanAction({ values });
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
