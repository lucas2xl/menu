import { HTMLProps } from "react";

import { cn } from "@/lib/utils";

type Props = HTMLProps<HTMLElement>;

export function SectionWrapper({ children, className, ...props }: Props) {
  return (
    <section {...props} className={cn("py-16 lg:py-24", className)}>
      {children}
    </section>
  );
}
