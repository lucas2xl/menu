import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { RegisterSchema } from "@/schemas/auth";
import { signUpAction } from "@/server/actions/auth/signup-action";
import { toast } from "sonner";

export function useSignUp() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  useEffect(() => {
    if (error) toast.error(error);
    if (success) toast.success(success);
  }, [error, success]);

  const onSubmit = (values: RegisterSchema) => {
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
  };

  return { isPending, error, success, onSubmit, form };
}
