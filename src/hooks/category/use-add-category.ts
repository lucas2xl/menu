import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AddCategorySchema } from "@/schemas/category";
import { addCategoryAction } from "@/server/actions/category/add-category-action";
import { useParams, useRouter } from "next/navigation";

export function useAddCategory() {
  const router = useRouter();
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();
  const params = useParams() as { slug: string };

  const form = useForm<AddCategorySchema>({
    resolver: zodResolver(AddCategorySchema),
    defaultValues: { name: "", description: "", companySlug: params.slug },
  });

  const onSubmit = async (values: AddCategorySchema) => {
    startTransition(() => {
      return new Promise(async (resolve) => {
        const response = await addCategoryAction({
          values,
          userId,
        });
        if (response.status === "error") {
          toast.error(response.message);
        } else {
          toast.success("Categoria adicionado com sucesso");
        }

        router.push(`/dashboard/${params.slug}/categories`);
        resolve();
      });
    });
  };

  return { isPending, onSubmit, form };
}
