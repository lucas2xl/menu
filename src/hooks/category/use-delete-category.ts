import { useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteCategoryAction } from "@/server/actions/category/delete-category-action";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function useDeleteCategory() {
  const router = useRouter();
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async ({ id }: { id: number }) => {
    startTransition(async () => {
      const response = await deleteCategoryAction({ id, userId });
      if (response.status === "error") {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        router.refresh();
      }
    });
  };

  return { isPending, onSubmit, isOpen, setIsOpen };
}
