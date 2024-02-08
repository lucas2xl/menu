import { AlertTriangleIcon } from "lucide-react";

import { BackButton } from "@/components/auth/back-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ErrorCard() {
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="gap-2 text-center">
        <CardTitle>Oops, algo deu errado!</CardTitle>
        <CardDescription>
          Por favor, tente novamente ou entre em contato com o suporte
          <BackButton label="Don't have an account?" href="/auth/signup" />
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="w-full justify-center flex">
          <AlertTriangleIcon className="w-6 h-6 text-destructive" />
        </div>
      </CardContent>
    </Card>
  );
}
