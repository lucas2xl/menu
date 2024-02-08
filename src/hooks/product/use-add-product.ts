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
      companySlug: params.slug,
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategoriesAction({ companySlug: params.slug });
      if (res.status === "error") {
        return toast.error(res.message);
      }

      setCategories(res.body || null);
    };

    fetchCategories();
  }, [params.slug]);

  const onSubmit = async (values: AddProductSchema): Promise<void> => {
    startTransition(() => {
      return new Promise(async (resolve) => {
        const response = await addProductAction({ values, userId });
        if (response.status === "error") {
          return toast.error(response.message);
        }

        toast.success("Produto adicionado com sucesso!");
        router.push(`/dashboard/${params.slug}/products`);
        resolve();
      });
    });
  };

  return { isPending, onSubmit, form, categories };
}
