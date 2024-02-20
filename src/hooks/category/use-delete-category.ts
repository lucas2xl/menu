import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteCategoryAction } from "@/actions/category/delete-category-action";

export function useDeleteCategory() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = ({ id }: { id: string }) => {
    startTransition(async () => {
      const response = await deleteCategoryAction({ id });
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      router.refresh();
    });
  };

  return { isPending, onSubmit, isOpen, setIsOpen };
}
