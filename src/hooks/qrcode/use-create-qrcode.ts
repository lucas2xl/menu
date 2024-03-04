import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createQRCodeAction } from "@/actions/qrcode/create-qrcode-action";
import { CreateQRCodeSchema } from "@/schemas/qrcode";

type Props = {
  storeSlug: string;
};
export function useCreateQRCode({ storeSlug }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateQRCodeSchema>({
    resolver: zodResolver(CreateQRCodeSchema),
    defaultValues: { storeSlug, quantity: "1" },
  });

  function onSubmit(values: CreateQRCodeSchema) {
    startTransition(async () => {
      const response = await createQRCodeAction({ values });
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
