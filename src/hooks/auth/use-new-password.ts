import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { newPasswordAction } from "@/actions/auth/new-password-action";
import { NewPasswordSchema } from "@/schemas/auth";

export function useNewPassword() {
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

  function onSubmit(values: NewPasswordSchema) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await newPasswordAction(values, param.token);
      if (response.status === "error") {
        form.setValue("password", "");
        return setError(response.message);
      }

      setSuccess(response.message);
      form.reset();
    });
  }

  return { isPending, error, success, onSubmit, form };
}
