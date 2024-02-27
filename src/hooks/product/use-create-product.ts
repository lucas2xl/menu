import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getCategoriesAction } from "@/actions/category/get-categories-action";
import { addProductImagesAction } from "@/actions/product/add-product-images-action";
import { createProductAction } from "@/actions/product/create-product-action";
import { CreateProductSchema } from "@/schemas/product";

const defaultValues = {
  name: "",
  description: "",
  time: "",
  serves: "",
  price: "",
  isFeatured: false,
  discount: "",
  storeSlug: "",
  images: [],
};

export function useCreateProduct() {
  const [isPending, startTransition] = useTransition();
  const params = useParams() as { slug: string };
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [tab, setTab] = useState<"product" | "subcategories">("product");

  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: { ...defaultValues, storeSlug: params.slug },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategoriesAction({ storeSlug: params.slug });
      if (res.status === "error") {
        return toast.error(res.message);
      }

      setCategories(res.body || null);
    };
    fetchCategories();
  }, [params.slug]);

  function onSubmit(values: CreateProductSchema) {
    startTransition(async () => {
      const images = values.images as File[];
      delete (values as { images?: any }).images;

      const response = await createProductAction({ values });
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
      setProductId(response.body?.id);
      setTab("subcategories");
    });
  }

  async function addImages({
    images,
    productId,
  }: {
    images: File[];
    productId: string;
  }) {
    const formData = new FormData();
    for (const image of images) {
      formData.append("images", image);
    }

    return addProductImagesAction({ values: formData, productId });
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
    categories,
    productId,
    setProductId,
    onDrop,
    onRemoveImagePreview,
    previewUrls,
    tab,
  };
}
