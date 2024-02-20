import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  message?: string;
};

export function AlertSuccess({ message }: Props) {
  if (!message) return null;

  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
