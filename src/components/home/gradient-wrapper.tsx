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
        className={cn("absolute m-auto blur-[160px]", wrapperClassName)}
        style={{
          background:
            "linear-gradient(180deg, #7C3AED 0%, rgba(152, 103, 240, 0.984375) 0.01%, rgba(237, 78, 80, 0.2) 100%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
