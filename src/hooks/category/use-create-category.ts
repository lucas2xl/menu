import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CreateCategorySchema } from "@/schemas/category";
import { createCategoryAction } from "@/server/actions/category/create-category-action";
import { useParams, useRouter } from "next/navigation";

export function useCreateCategory() {
  const router = useRouter();
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();
  const params = useParams() as { slug: string };

  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: { name: "", description: "", storeSlug: params.slug },
  });

  const onSubmit = async (values: CreateCategorySchema) => {
    startTransition(async () => {
      const response = await createCategoryAction({
        values,
        userId,
      });
      if (response.status === "error") {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        router.push(`/dashboard/${params.slug}/categories`);
        router.refresh();
      }
    });
  };

  return { isPending, onSubmit, form };
}
