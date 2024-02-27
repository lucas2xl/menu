"use client";

import { Store, UserPlan } from "@prisma/client";
import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useStoreDialog } from "@/stores/use-store-dialog";

interface Props {
  stores: Store[];
  className?: string;
  userPlan: UserPlan | null;
}

export function StoreSwitcher({ className, stores, userPlan }: Props) {
  const params = useParams() as { slug: string };
  const router = useRouter();
  const { onOpen } = useStoreDialog();
  const [open, setOpen] = useState(false);
  const [showNewStoreDialog, setShowNewStoreDialog] = useState(false);

  const store = stores.find((store) => store.slug === params.slug);
  if (!store) return null;

  return (
    <Dialog open={showNewStoreDialog} onOpenChange={setShowNewStoreDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a store"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={store.logo ?? ""}
                alt={store.name}
                className="grayscale"
              />
              <AvatarFallback>
                {store.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {store.name}
            <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search Store..." />
              <CommandEmpty>Nenhuma loja encontrada.</CommandEmpty>
              {stores.map((state) => (
                <CommandItem
                  key={state.id}
                  onSelect={() => {
                    router.push(`/${state.slug}`);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={state.logo ?? ""}
                      alt={state.name}
                      className="grayscale"
                    />
                    <AvatarFallback>
                      {state.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {state.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      state.slug === store.slug ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      onOpen();
                    }}
                    disabled={
                      userPlan ? userPlan.quantity <= stores.length : true
                    }
                  >
                    <PlusCircleIcon className="mr-2 h-5 w-5" />
                    Nova Loja
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  );
}
