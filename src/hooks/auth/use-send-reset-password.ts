import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { ResetSchema } from "@/schemas/auth";
import { sendResetPasswordAction } from "@/server/actions/auth/send-reset-password-action";

export function useSendResetPassword() {
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
      const response = await sendResetPasswordAction(values);
      if (response.status === "error") {
        return setError(response.message);
      }

      setSuccess(response.message);
      form.reset();
    });
  };

  return { isPending, error, success, onSubmit, form };
}
