import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { UpdateCategorySchema } from "@/schemas/category";
import { updateCategoryAction } from "@/server/actions/category/update-category-action";

export function useUpdateCategory() {
  const router = useRouter();
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();
  const params = useParams() as { slug: string };

  const form = useForm<UpdateCategorySchema>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = async (values: UpdateCategorySchema) => {
    console.log(values);
    startTransition(async () => {
      const response = await updateCategoryAction({
        values,
        userId,
      });
      console.log(response);
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
