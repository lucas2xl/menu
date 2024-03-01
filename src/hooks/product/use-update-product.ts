import { zodResolver } from "@hookform/resolvers/zod";
import {
  Product,
  ProductCategory,
  ProductCategoryItem,
  ProductImage,
} from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateProductAction } from "@/actions/product/update-category-action";
import { UpdateProductSchema } from "@/schemas/product";
import { redirects } from "@/utils/constants";

type Props = {
  data: Product & {
    images: ProductImage[];
    categories: (ProductCategory & { items: ProductCategoryItem[] })[];
  };
};
export function useUpdateProduct({ data }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const params = useParams() as { slug: string };
  const [tab, setTab] = useState<"product" | "subcategories">("product");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(UpdateProductSchema),
  });

  useEffect(() => {
    form.reset({
      name: data.name,
      description: data.description || "",
      id: data.id,
      price: (data.price / 100).toFixed(2),
      discount: String(data.discount || ""),
      serves: String(data.serves || ""),
      categoryId: data.categoryId,
      isFeatured: data.isFeatured || false,
      images: data.images,
    });
    setPreviewUrls(data.images.map((image) => image.url));
  }, [data, form, setPreviewUrls]);

  function onSubmit(values: UpdateProductSchema) {
    startTransition(async () => {
      const response = await updateProductAction({ values });
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      router.push(`${redirects.dashboard}/${params.slug}/products`);
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
    onRemoveImagePreview,
    tab,
    setTab,
  };
}
