import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

import { verifyEmailAction } from "@/server/actions/auth/verify-email-action";

export function useVerifyEmail() {
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const param = {
    token: searchParams.get("token"),
  };

  const onVerify = useCallback(async () => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await verifyEmailAction(param.token);
      if (response.status === "error") {
        return setError(response.message);
      }

      setSuccess("Your email has been verified");
    });
  }, [param.token]);

  useEffect(() => {
    onVerify();
  }, [onVerify]);

  return { success, error, isPending };
}
