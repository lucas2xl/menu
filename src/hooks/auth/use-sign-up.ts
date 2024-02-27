import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { signUpAction } from "@/actions/auth/sign-up-action";
import { SignUpSchema } from "@/schemas/auth";

export function useSignUp() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  function onSubmit(values: SignUpSchema) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await signUpAction(values);
      if (response.status === "error") {
        return setError(response.message);
      }

      setSuccess(response.message);
      form.reset();
    });
  }

  return { isPending, error, success, onSubmit, form };
}
