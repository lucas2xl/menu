import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addUserImageAction } from "@/actions/user/add-user-image-action";
import { updateUserAction } from "@/actions/user/update-user-action ";
import { UpdateUserSchema } from "@/schemas/user";
import { allowedTypes } from "@/utils/image";

export function useUpdateUser() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(UpdateUserSchema),
  });

  function onSubmit(values: UpdateUserSchema) {
    startTransition(async () => {
      const image = values.imageUrl;
      delete values.imageUrl;

      const response = await updateUserAction({ values });
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      await addImage({ image });

      toast.success(response.message);
      router.refresh();
    });
  }

  async function addImage({ image }: { image: File }) {
    const formData = new FormData();
    formData.append("image", image);

    return addUserImageAction({ value: formData });
  }

  function onDrop(acceptedFiles: FileList | undefined) {
    if (!acceptedFiles) return;

    const fileType = allowedTypes.find((allowedType) =>
      allowedType.types.find((type) => type === acceptedFiles[0].type)
    );
    if (!fileType) {
      form.setValue("imageUrl", undefined);
      form.setError("imageUrl", {
        message: "Image type is not valid",
        type: "typeError",
      });
      return;
    }

    if (acceptedFiles[0]) {
      const file = acceptedFiles[0];
      form.setValue("imageUrl", file);
    }
  }

  return {
    isPending,
    onSubmit,
    form,
    onDrop,
  };
}
