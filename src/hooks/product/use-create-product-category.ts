import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { createProductCategoryAction } from "@/actions/product/create-product-category-action";
import { CreateProductCategorySchema } from "@/schemas/product";

const defaultCategory = [{ name: "", quantity: "0", inputType: "", items: [] }];

export function useCreateProductCategory() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const params = useParams() as { slug: string };

  const form = useForm<CreateProductCategorySchema>({
    resolver: zodResolver(CreateProductCategorySchema),
    defaultValues: {
      productId: undefined,
      categories: defaultCategory,
    },
  });

  const {
    fields: categoriesFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  function onSubmit(values: CreateProductCategorySchema) {
    startTransition(async () => {
      const response = await createProductCategoryAction({ values });
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      router.push(`/${params.slug}/products`);
      router.refresh();
    });
  }

  return {
    isPending,
    onSubmit,
    form,
    categoriesFields,
    appendCategory,
    removeCategory,
  };
}
