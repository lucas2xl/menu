import Link from "next/link";

import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  href: string;
};

export function BackButton({ label, href }: Props) {
  return (
    <Button asChild variant="link" size="sm" className="font-normal px-1">
      <Link href={href}>{label}</Link>
    </Button>
  );
}
