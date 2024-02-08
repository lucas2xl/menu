import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { NewPasswordSchema } from "@/schemas/auth";
import { resetPasswordAction } from "@/server/actions/auth/reset-password-action";

export function useRestPassword() {
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const param = {
    token: searchParams.get("token"),
  };

  const form = useForm<NewPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = (values: NewPasswordSchema) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await resetPasswordAction(values, param.token);
      if (response.status === "error") {
        form.setValue("password", "");
        return setError(response.message);
      }

      setSuccess(response.message);
      form.reset();
    });
  };

  return { isPending, error, success, onSubmit, form };
}
