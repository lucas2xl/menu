import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/home/footer";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { getPublicUrl } from "@/lib/supabase/get-public-url";
import { cn } from "@/lib/utils";

import { SwitchTheme } from "../../../components/switch-theme";
import { Cart } from "./_components/cart";
import { StoreClosedModal } from "./_components/store-closed-modal";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const store = await db.store.findUnique({
    where: { slug: params.slug },
    select: { settings: true, name: true, logo: true },
  });

  if (!store) return notFound();

  return (
    <div className={cn("px-8 max-w-7xl mx-auto", store.settings?.theme)}>
      <SwitchTheme theme={store.settings?.theme} />
      <StoreClosedModal storeOpen={store.settings?.isOpen} />
      <header className="flex items-center justify-between h-24 border-b border-border">
        <Link href={`/${params.slug}`}>
          <div className="flex items-center gap-2">
            <Image
              src={getPublicUrl("stores", store.logo) || ""}
              alt={store.name}
              width={40}
              height={40}
              className="rounded-full"
            />
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
        <Cart />
      </div>
    </div>
  );
}
