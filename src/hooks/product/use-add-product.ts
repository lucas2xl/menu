import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AddProductSchema } from "@/schemas/product";
import { getCategoriesAction } from "@/server/actions/category/get-categories-action";
import { addProductAction } from "@/server/actions/product/add-product-action";

export function useAddProduct() {
  const router = useRouter();
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();
  const params = useParams() as { slug: string };
  const [categories, setCategories] = useState<Category[] | null>(null);

  const form = useForm<AddProductSchema>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      name: "",
      description: "",
      time: "",
      serves: "",
      price: "",
      isFeatured: false,
      discount: "",
      storeSlug: params.slug,
    },
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

  const onSubmit = async (values: AddProductSchema): Promise<void> => {
    startTransition(async () => {
      const response = await addProductAction({ values, userId });
      if (response.status === "error") {
        toast.error(response.message);
      } else {
        toast.success("Produto adicionado com sucesso!");
        router.push(`/dashboard/${params.slug}/products`);
        router.refresh();
      }
    });
  };

  return { isPending, onSubmit, form, categories };
}
