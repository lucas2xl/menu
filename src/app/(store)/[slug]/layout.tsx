import { Footer } from "@/components/home/footer";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SwitchTheme } from "@/components/switch-theme";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Cart } from "./_components/cart";
import { StoreClosedModal } from "./_components/store-closed-modal";

export const dynamic = "force-dynamic";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string; qrcode: string };
}) {
  const store = await db.store.findUnique({
    where: { slug: params.slug },
    include: { settings: true },
  });

  if (!store) return notFound();

  return (
    <div className={cn("max-w-7xl mx-auto ", store.settings?.theme)}>
      <SwitchTheme theme={store.settings?.theme} />
      <StoreClosedModal storeOpen={store.settings?.isOpen} />

      <header className="flex items-center justify-between h-24 border-b border-border px-4 md:px-8 sticky top-0 z-50 w-full bg-background/90 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <Link href={`/${params.slug}`}>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={store.logo || ""} />
              <AvatarFallback>
                {store?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{store.name}</span>
          </div>
        </Link>

        <div className="flex flex-col items-end gap-2">
          <div className="space-x-4">
            <ModeToggle />

            <Button variant="ghost" size="icon">
              <SearchIcon />
            </Button>
          </div>
          <span className="text-xs">
            Tempo de preparo:{" "}
            <strong>{store.settings?.preparationTime} min</strong>
          </span>
        </div>
      </header>

      <div className="min-h-[calc(100vh-96px)] my-6">{children}</div>
      <Footer />

      <div className="fixed bottom-4 right-4">
        <Cart store={store} />
      </div>
    </div>
  );
}
