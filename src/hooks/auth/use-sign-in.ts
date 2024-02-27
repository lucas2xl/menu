import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { signInAction } from "@/actions/auth/sign-in-action";
import { SignInSchema } from "@/schemas/auth";

export function useSignIn() {
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "", code: "" },
  });

  const param = {
    callbackUrl: searchParams.get("callbackUrl"),
  };

  function clearMessages() {
    setError("");
    setSuccess("");
  }

  function onSubmit(values: SignInSchema) {
    clearMessages();

    startTransition(async () => {
      const response = await signInAction({
        values,
        callbackUrl: param.callbackUrl,
      });
      if (response.status === "error") {
        form.setValue("code", "");
        return setError(response.message);
      }

      if (response.body?.isTwoFactor) {
        setShowTwoFactor(true);
        return;
      }

      form.reset();
    });
  }

  return {
    isPending,
    error,
    success,
    showTwoFactor,
    setShowTwoFactor,
    onSubmit,
    form,
  };
}
