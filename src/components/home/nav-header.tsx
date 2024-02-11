import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { Icons } from "../icons";
import { Button } from "../ui/button";

type Props = {
  onClick: () => void;
  state: boolean;
};
export function NavHeader({ onClick, state }: Props) {
  return (
    <div className="flex items-center justify-between py-5 md:block">
      <Link href="/">
        <Icons.logo className="w-8 h-8" />
      </Link>

      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          onClick={onClick}
        >
          {state ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </Button>
      </div>
    </div>
  );
}
