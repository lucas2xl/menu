import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createCategoryAction } from "@/actions/category/create-category-action";
import { CreateCategorySchema } from "@/schemas/category";
import { useParams, useRouter } from "next/navigation";

export function useCreateCategory() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const params = useParams() as { slug: string };

  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: { name: "", description: "", storeSlug: params.slug },
  });

  function onSubmit(values: CreateCategorySchema) {
    startTransition(async () => {
      const response = await createCategoryAction({
        values,
      });

      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      router.push(`/${params.slug}/categories`);
      router.refresh();
    });
  }

  return { isPending, onSubmit, form };
}
