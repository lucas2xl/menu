"use client";

import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon } from "lucide-react";
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

type Store = {
  id: string;
  name: string;
  logo: string | null;
};

interface Props {
  stores: Store[];
  className?: string;
}

export function StoreSwitcher({ className, stores }: Props) {
  const [open, setOpen] = useState(false);
  const { onOpen } = useStoreDialog();
  const [showNewStoreDialog, setShowNewStoreDialog] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store>(stores[0]);

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
                src={selectedStore.logo ?? ""}
                alt={selectedStore.name}
                className="grayscale"
              />
              <AvatarFallback>
                {selectedStore.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {selectedStore.name}
            <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search Store..." />
              <CommandEmpty>No Store found.</CommandEmpty>
              {stores.map((store) => (
                <CommandItem
                  key={store.id}
                  onSelect={() => {
                    setSelectedStore(store);
                    setOpen(false);
                  }}
                  className="text-sm"
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
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedStore.name === store.name
                        ? "opacity-100"
                        : "opacity-0"
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
                    // disabled={1 <= stores.length}
                  >
                    <PlusCircleIcon className="mr-2 h-5 w-5" />
                    Create Store
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
