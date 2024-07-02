import { cn } from "@/lib/utils";

type DividerProps = {
  className?: string;
  text?: string;
};
export function Divider({ className, text }: DividerProps) {
  return (
    <span className={cn("relative flex justify-center", className)}>
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

      <span className="z-10 bg-background px-6 text-foreground/60">{text}</span>
    </span>
  );
}
