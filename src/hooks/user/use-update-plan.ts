import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlan } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updatePlanAction } from "@/actions/user/update-plan-action";
import { PlanSchema } from "@/schemas/user";

type Props = {
  plan: UserPlan;
};
export function useUpdatePlan({ plan }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<PlanSchema>({
    resolver: zodResolver(PlanSchema),
  });

  useEffect(() => {
    if (plan) {
      form.reset({
        price: plan.price,
        quantity: plan.quantity,
        status: plan.status,
      });
    }
  }, [plan, form]);

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
