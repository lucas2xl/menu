import { zodResolver } from "@hookform/resolvers/zod";
import { ProductCategory, ProductCategoryItem } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateProductCategoryAction } from "@/actions/product/update-product-category-action";
import { UpdateProductCategorySchema } from "@/schemas/product";
import { redirects } from "@/utils/constants";

type Props = {
  categories: (ProductCategory & { items: ProductCategoryItem[] })[];
  productId: string;
};
export function useUpdateProductCategory({ productId, categories }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const params = useParams() as { slug: string };

  const form = useForm<UpdateProductCategorySchema>({
    resolver: zodResolver(UpdateProductCategorySchema),
    defaultValues: {
      categories: categories.map((category) => ({
        name: category.name,
        quantity: String(category.quantity),
        inputType: category.inputType,
        items: category.items.map((item) => ({
          name: item.name,
          price: (item.price / 100).toFixed(2),
          description: item.description || "",
        })),
      })),
      productId,
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

  function onSubmit(values: UpdateProductCategorySchema) {
    console.log(values);
    startTransition(async () => {
      const response = await updateProductCategoryAction({ values });
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      router.push(`${redirects.dashboard}/${params.slug}/products`);
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
