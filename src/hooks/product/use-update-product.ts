import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateProductAction } from "@/actions/product/update-category-action";
import { UpdateProductSchema } from "@/schemas/product";

export function useUpdateProduct() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const params = useParams() as { slug: string };
  const [tab, setTab] = useState<"product" | "subcategories">("product");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(UpdateProductSchema),
  });

  function onSubmit(values: UpdateProductSchema) {
    startTransition(async () => {
      const response = await updateProductAction({ values });
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      router.push(`/${params.slug}/products`);
      router.refresh();
    });
  }

  function onDrop(acceptedFiles: FileList | undefined) {
    if (!acceptedFiles) return;

    const newPreviewUrls: string[] = [];
    const newFiles = [];

    for (const file of acceptedFiles as any) {
      newFiles.push(file);
      newPreviewUrls.push(URL.createObjectURL(file));
    }

    form.setValue("images", newFiles);
    setPreviewUrls((prevState) => [...prevState, ...newPreviewUrls]);
  }

  function onRemoveImagePreview(index: number) {
    const newPreviewUrls = previewUrls.filter((_, idx) => idx !== index);
    const newFiles = form
      .getValues("images")
      ?.filter((_, idx) => idx !== index);

    form.setValue("images", newFiles);
    setPreviewUrls(newPreviewUrls);
  }

  return {
    isPending,
    onSubmit,
    form,
    onDrop,
    previewUrls,
    setPreviewUrls,
    onRemoveImagePreview,
    tab,
    setTab,
  };
}
