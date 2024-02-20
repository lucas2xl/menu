import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { signInAction } from "@/actions/auth/sign-in-action";
import { SignInSchema } from "@/schemas/auth";

export function useSignIn() {
  const route = useRouter();
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
    error: searchParams.get("error"),
  };

  useEffect(() => {
    if (param.error === "OAuthAccountNotLinked") {
      setError("Email já está em uso com um provedor diferente.");
    }
  }, [param.error]);

  function clearMessages() {
    setError("");
    setSuccess("");
  }

  const onSubmit = (values: SignInSchema) => {
    clearMessages();

    startTransition(async () => {
      const response = await signInAction(values);
      if (response.status === "error") {
        form.setValue("code", "");
        return setError(response.message);
      }

      if (response.body?.isTwoFactor) {
        setShowTwoFactor(true);
        return;
      }

      form.reset();

      route.push(param.callbackUrl || "/dashboard");
    });
  };

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
