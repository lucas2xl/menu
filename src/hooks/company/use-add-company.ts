import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AddCompanySchema } from "@/schemas/company";
import { addCompanyAction } from "@/server/actions/company/add-company-action";

export function useAddCompany() {
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<AddCompanySchema>({
    resolver: zodResolver(AddCompanySchema),
    defaultValues: { name: "", logo: null },
  });

  const onSubmit = async (values: AddCompanySchema) => {
    startTransition(async () => {
      return new Promise(async (resolve) => {
        const response = await addCompanyAction({ values, userId });
        if (response.status === "error") {
          return toast.error(response.message);
        }

        toast.success("Companhia criada com sucesso!");

        // revalidatePath("/");
        resolve();
      });
    });
  };

  function onDrop(acceptedFiles: FileList | null) {
    if (!acceptedFiles) return;

    const allowedTypes = [
      { name: "png", types: ["image/png"] },
      { name: "webp", types: ["image/webp"] },
    ];
    const fileType = allowedTypes.find((allowedType) =>
      allowedType.types.find((type) => type === acceptedFiles[0].type)
    );
    if (!fileType) {
      form.setValue("logo", null);
      form.setError("logo", {
        message: "Logo type is not valid",
        type: "typeError",
      });
      return;
    }

    if (acceptedFiles[0]) {
      const file = acceptedFiles[0];
      form.setValue("logo", file);
      setPreviewUrl(URL.createObjectURL(file));
      form.clearErrors("logo");
    }
  }

  return { isPending, onSubmit, onDrop, form, previewUrl };
}
