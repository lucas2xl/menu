import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addStoreImageAction } from "@/actions/store/add-store-image-action";
import { createStoreAction } from "@/actions/store/create-store-action";
import { CreateStoreSchema } from "@/schemas/store";
import { useStoreDialog } from "@/stores/use-store-dialog";
import { redirects } from "@/utils/constants";
import { allowedTypes } from "@/utils/image";

export function useCreateStore() {
  const [isPending, startTransition] = useTransition();
  const { onClose } = useStoreDialog();

  const form = useForm<CreateStoreSchema>({
    resolver: zodResolver(CreateStoreSchema),
    defaultValues: { name: "", slug: "", logo: undefined },
  });

  function onSubmit(values: CreateStoreSchema) {
    startTransition(async () => {
      const image = values.logo;
      delete values.logo;

      const response = await createStoreAction({ values });
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      await addImage({ image, slug: values.slug });

      toast.success(response.message);
      onClose();
      redirect(`${redirects.dashboard}/${values.slug}`);
    });
  }

  async function addImage({ image, slug }: { image: File; slug: string }) {
    const formData = new FormData();
    formData.append("image", image);

    return addStoreImageAction({ value: formData, slug });
  }

  function onDrop(acceptedFiles: FileList | undefined) {
    if (!acceptedFiles) return;

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
    }
  }

  function onRemoveImagePreview() {
    form.setValue("logo", undefined);
  }

  return {
    isPending,
    onSubmit,
    form,
    onDrop,
    onRemoveImagePreview,
  };
}
