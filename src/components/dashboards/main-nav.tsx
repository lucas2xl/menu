"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const currentPath = pathname.split(`/dashboard/${params.slug}`).join("");

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href={`/dashboard/${params.slug}`}
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          currentPath === "" && "text-primary"
        )}
      >
        Dashboard
      </Link>
      <Link
        href={`/dashboard/${params.slug}/orders`}
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          currentPath === "/orders" && "text-primary"
        )}
      >
        Orders
      </Link>
      <Link
        href={`/dashboard/${params.slug}/categories`}
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          currentPath === "/categories" && "text-primary"
        )}
      >
        Categories
      </Link>
      <Link
        href={`/dashboard/${params.slug}/products`}
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          currentPath === "/products" && "text-primary"
        )}
      >
        Products
      </Link>
      {/* <Link
        href={`/dashboard/${params.slug}/customers`}
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          currentPath === "/customers" && "text-primary"
        )}
      >
        Settings
      </Link> */}
    </nav>
  );
}
