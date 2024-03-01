"use client";

import { Store, StoreSettings } from "@prisma/client";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { PackageIcon, PackageOpenIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUpdateStoreStatus } from "@/hooks/store/use-update-store-status";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { cn } from "@/lib/utils";

type Props = {
  store: Store & { settings: StoreSettings | null };
};
export function OpenStoreButton({ store }: Props) {
  const isMounted = useIsMounted();
  const isOpen = store.settings?.isOpen || false;
  const { isPending, onSubmit } = useUpdateStoreStatus();

  if (!isMounted) return null;

  return (
    <div className="mr-2">
      <form action={() => onSubmit({ isOpen: !isOpen, storeId: store.id })}>
        <TooltipProvider delayDuration={0.1}>
          <Tooltip>
            <TooltipTrigger>
              <SwitchPrimitives.Root
                className={cn(
                  "peer inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary/60 data-[state=unchecked]:bg-input"
                )}
                checked={isOpen}
                type="submit"
                disabled={isPending}
              >
                <SwitchPrimitives.Thumb
                  className={cn(
                    "flex items-center justify-center pointer-events-none h-8 w-8 rounded-full bg-background ring-1 ring-border data-[state=checked]:bg-primary shadow-lg transition-transform data-[state=checked]:ring-0 data-[state=checked]:translate-x-6 data-[state=unchecked]:-translate-x-2"
                  )}
                >
                  {isOpen && (
                    <PackageOpenIcon
                      className={cn(
                        "w-4 h-4 text-white",
                        isPending && "animate-spin"
                      )}
                    />
                  )}

                  {!isOpen && (
                    <PackageIcon
                      className={cn("w-4 h-4", isPending && "animate-spin")}
                    />
                  )}
                </SwitchPrimitives.Thumb>
              </SwitchPrimitives.Root>
            </TooltipTrigger>
            <TooltipContent>
              {isOpen ? "Loja aberta" : "Loja fechada"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    </div>
  );
}
