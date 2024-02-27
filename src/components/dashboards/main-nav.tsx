"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { redirects } from "@/utils/constants";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const currentPath = pathname.split(`/${params.slug}`).join("");

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href={`${redirects.dashboard}/${params.slug}`}
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          currentPath === redirects.dashboard && "text-primary"
        )}
      >
        Dashboard
      </Link>
      <Link
        href={`${redirects.dashboard}/${params.slug}/orders`}
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          currentPath.includes("/orders") && "text-primary"
        )}
      >
        Pedidos
      </Link>
      <Link
        href={`${redirects.dashboard}/${params.slug}/categories`}
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          currentPath.includes("/categories") && "text-primary"
        )}
      >
        Categorias
      </Link>
      <Link
        href={`${redirects.dashboard}/${params.slug}/products`}
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          currentPath.includes("/products") && "text-primary"
        )}
      >
        Produtos
      </Link>
      <Link
        href={`${redirects.dashboard}/${params.slug}/settings`}
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          currentPath.includes("/settings") && "text-primary"
        )}
      >
        Configurações
      </Link>
    </nav>
  );
}
