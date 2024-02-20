import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createStoreAction } from "@/actions/store/create-store-action";
import { currentUser } from "@/lib/auth/current-user";
import { CreateStoreSchema } from "@/schemas/store";
import { useStoreDialog } from "@/stores/use-store-dialog";

export function useCreateStore() {
  const [isPending, startTransition] = useTransition();
  const { onClose } = useStoreDialog();

  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  const form = useForm<CreateStoreSchema>({
    resolver: zodResolver(CreateStoreSchema),
    defaultValues: { name: "", slug: "", logo: undefined },
  });

  const onSubmit = (values: CreateStoreSchema) => {
    startTransition(async () => {
      const { user } = await currentUser();
      const validatedFields = CreateStoreSchema.safeParse(values);

      if (!validatedFields.success) {
        toast.error("Campos inválidos");
        return;
      }
      const { name, slug, logo } = validatedFields.data;

      const formData = new FormData();

      formData.append("name", name);
      formData.append("slug", slug);
      if (logo) {
        formData.append("logo", logo);
      }

      const response = await createStoreAction({
        values: formData,
        userId: user?.id,
      });
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success("Loja criada com sucesso!");
      onClose();
      redirect(`/${response.body?.slug}`);
    });
  };

  function onDrop(acceptedFiles: FileList | undefined) {
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
      form.setValue("logo", undefined);
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
    }
  }

  function onRemoveImagePreview() {
    form.setValue("logo", undefined);
    setPreviewUrl(undefined);
  }

  return {
    isPending,
    onSubmit,
    form,
    previewUrl,
    onDrop,
    onRemoveImagePreview,
  };
}
