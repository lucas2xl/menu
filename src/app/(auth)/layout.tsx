import type { ReactNode } from "react";

export default function AuthPage({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
}
