import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateCategoryAction } from "@/actions/category/update-category-action";
import { UpdateCategorySchema } from "@/schemas/category";
import { redirects } from "@/utils/constants";

type Props = {
  data: Category;
};
export function useUpdateCategory({ data }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const params = useParams() as { slug: string };

  const form = useForm<UpdateCategorySchema>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: { name: "", description: "" },
  });

  useEffect(() => {
    form.reset({
      name: data.name,
      description: data.description || "",
      id: data.id,
    });
  }, [data, form]);

  function onSubmit(values: UpdateCategorySchema) {
    startTransition(async () => {
      const response = await updateCategoryAction({ values });
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      router.push(`${redirects.dashboard}/${params.slug}/categories`);
      router.refresh();
    });
  }

  return { isPending, onSubmit, form };
}
