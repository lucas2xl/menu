import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const containerVariants = cva("mx-auto", {
  variants: {
    size: {
      default: "w-full",
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface ContainerProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    return (
      <div
        className={cn(containerVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

export { Container, containerVariants };
