import { zodResolver } from "@hookform/resolvers/zod";
import { Store, StoreSettings } from "@prisma/client";
import { redirect } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addStoreImageAction } from "@/actions/store/add-store-image-action";
import { updateStoreAction } from "@/actions/store/update-store-action";
import { UpdateStoreSchema } from "@/schemas/store";
import { redirects } from "@/utils/constants";
import { allowedTypes } from "@/utils/image";

type Props = {
  store: Store & { settings: StoreSettings | null };
};
export function useUpdateStore({ store }: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateStoreSchema>({
    resolver: zodResolver(UpdateStoreSchema),
  });

  useEffect(() => {
    if (store) {
      form.reset({
        slug: store.slug,
        name: store.name,
        logo: store.logo,
      });
    }
  }, [form, store]);

  function onSubmit(values: UpdateStoreSchema, slug: string) {
    startTransition(async () => {
      const image = values.logo;
      delete values.logo;
      const response = await updateStoreAction({ values, slug });
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      if (!slug) {
        toast.error("Slug é obrigatório");
        return;
      }

      await addImage({ image, slug });

      toast.success(response.message);
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
        message: "Tipo de arquivo inválido",
        type: "typeError",
      });
      return;
    }

    if (acceptedFiles[0]) {
      const file = acceptedFiles[0];
      form.setValue("logo", file);
    }
  }

  return {
    isPending,
    onSubmit,
    form,
    onDrop,
  };
}
