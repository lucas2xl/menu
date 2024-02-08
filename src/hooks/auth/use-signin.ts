import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoginSchema } from "@/schemas/auth";
import { signInAction } from "@/server/actions/auth/signin-action";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/server/routes";

export function useSignIn() {
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", code: "" },
  });

  const param = {
    callbackUrl: searchParams.get("callbackUrl"),
    error: searchParams.get("error"),
  };

  useEffect(() => {
    if (param.error === "OAuthAccountNotLinked") {
      setError("Email already in use with different provider.");
    }
  }, [param.error]);

  useEffect(() => {
    if (error) toast.error(error);
    if (success) toast.success(success);
  }, [error, success]);

  function clearMessages() {
    setError("");
    setSuccess("");
  }

  const onSubmit = (values: LoginSchema) => {
    clearMessages();

    startTransition(async () => {
      const response = await signInAction(values);
      if (response.status === "error") {
        form.setValue("code", "");
        return setError(response.message);
      }

      if (response.twoFactor) {
        return setShowTwoFactor(true);
      }

      // setSuccess(response.message);
      form.reset();

      redirect(param.callbackUrl || DEFAULT_LOGIN_REDIRECT_URL);
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
