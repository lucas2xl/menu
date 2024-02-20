import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateCategoryAction } from "@/actions/category/update-category-action";
import { UpdateCategorySchema } from "@/schemas/category";

export function useUpdateCategory() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const params = useParams() as { slug: string };

  const form = useForm<UpdateCategorySchema>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = (values: UpdateCategorySchema) => {
    startTransition(async () => {
      const response = await updateCategoryAction({ values });
      console.log(response);
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      router.push(`/${params.slug}/categories`);
      router.refresh();
    });
  };

  return { isPending, onSubmit, form };
}
