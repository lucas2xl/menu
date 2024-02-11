import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CreateStoreSchema } from "@/schemas/store";
import { createStoreAction } from "@/server/actions/store/create-store-action";

export function useCreateStore() {
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<CreateStoreSchema>({
    resolver: zodResolver(CreateStoreSchema),
    defaultValues: { name: "", logo: null },
  });

  const onSubmit = async (values: CreateStoreSchema) => {
    startTransition(async () => {
      const response = await createStoreAction({ values, userId });
      console.log({ response });
      if (response.status === "error") {
        toast.error(response.message);
      } else {
        toast.success("Loja criada com sucesso!");
      }
    });
  };

  function onDrop(acceptedFiles: FileList | null) {
    if (!acceptedFiles) return;

    const allowedTypes = [
      { name: "png", types: ["image/png"] },
      { name: "webp", types: ["image/webp"] },
      { name: "jpeg", types: ["image/jpeg"] },
    ];
    const fileType = allowedTypes.find((allowedType) =>
      allowedType.types.find((type) => type === acceptedFiles[0].type)
    );
    if (!fileType) {
      form.setValue("logo", null);
      form.setError("logo", {
        message: "Logo type is not valid",
        type: "typeError",
      });
      return;
    }

    if (acceptedFiles[0]) {
      const file = acceptedFiles[0];
      form.setValue("logo", file);
      setPreviewUrl(URL.createObjectURL(file));
      form.clearErrors("logo");
    }
  }

  function onRemoveImagePreview() {
    form.setValue("logo", null);
    setPreviewUrl(null);
  }

  return {
    isPending,
    onSubmit,
    onDrop,
    form,
    previewUrl,
    onRemoveImagePreview,
  };
}
