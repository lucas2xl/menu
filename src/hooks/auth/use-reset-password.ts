import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { resetPasswordAction } from "@/actions/auth/reset-password-action";
import { ResetSchema } from "@/schemas/auth";

export function useResetPassword() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useForm<ResetSchema>({
    resolver: zodResolver(ResetSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: ResetSchema) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await resetPasswordAction(values);
      if (response.status === "error") {
        return setError(response.message);
      }

      setSuccess(response.message);
      form.reset();
    });
  };

  return { isPending, error, success, onSubmit, form };
}
