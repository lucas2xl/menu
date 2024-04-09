import { zodResolver } from "@hookform/resolvers/zod";
import {
  Product,
  ProductCategory,
  ProductCategoryItem,
  ProductImage,
} from "@prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addProductImagesAction } from "@/actions/product/add-product-images-action";
import { updateProductAction } from "@/actions/product/update-category-action";
import { UpdateProductSchema } from "@/schemas/product";

type Props = {
  data: Product & {
    images: ProductImage[];
    categories: (ProductCategory & { items: ProductCategoryItem[] })[];
  };
};
export function useUpdateProduct({ data }: Props) {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<"product" | "subcategories">("product");
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    data.images.map((image) => image.url)
  );

  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      id: data.id,
      name: data.name,
      description: data.description || "",
      price: (data.price / 100).toFixed(2),
      discount: String(data.discount || ""),
      serves: String(data.serves || ""),
      categoryId: data.categoryId,
      isFeatured: data.isFeatured || false,
      images: data.images,
    },
  });

  function onSubmit(values: UpdateProductSchema) {
    startTransition(async () => {
      const images = values.images as File[];
      delete (values as { images?: any }).images;

      const response = await updateProductAction({ values });
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }
      if (!response.body?.id) {
        toast.error("Erro ao criar produto");
        return;
      }

      await addImages({ images, productId: response.body?.id });

      toast.success(response.message);
    });
  }

  async function addImages({
    images,
    productId,
  }: {
    images: File[] | ProductImage[];
    productId: string;
  }) {
    const formData = new FormData();

    for (const image of images) {
      if (image instanceof File) {
        formData.append("images", image);
      }
    }

    return addProductImagesAction({
      values: formData,
      productId,
      imagesUrl: previewUrls.filter((url) => url.startsWith("http")),
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
