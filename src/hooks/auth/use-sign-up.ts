import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { signUpAction } from "@/actions/auth/sign-up-action";
import { redirects } from "@/lib/constants";
import { SignUpSchema } from "@/schemas/auth";

export function useSignUp() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = (values: SignUpSchema) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await signUpAction(values);
      if (response.status === "error") {
        return setError(response.message);
      }

      setSuccess(response.message);
      form.reset();
      router.push(redirects.toSignIn);
    });
  };

  return { isPending, error, success, onSubmit, form };
}
