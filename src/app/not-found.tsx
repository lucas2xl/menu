"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const route = useRouter();

  return (
    <main className="grid h-screen place-content-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-primary">404</h1>

        <p className="text-2xl font-bold tracking-tight text-primary sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-muted-foreground">
          Não conseguimos encontrar a página que você está procurando.
        </p>

        <Button className="mt-8" onClick={route.back}>
          Voltar para a página anterior
        </Button>
      </div>
    </main>
  );
}
