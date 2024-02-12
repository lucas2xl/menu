import { HTMLProps } from "react";

import { cn } from "@/lib/utils";

type Props = HTMLProps<HTMLDivElement> & {
  wrapperClassName?: string;
};

export function GradientWrapper({
  children,
  className,
  wrapperClassName,
  ...props
}: Props) {
  return (
    <div {...props} className={cn("relative", className)}>
      <div
        className={cn(
          "absolute m-auto blur-[160px] bg-gradient-radial from-primary to-indigo-600",
          wrapperClassName
        )}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
