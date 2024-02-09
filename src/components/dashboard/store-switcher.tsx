"use client";

import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dropzone } from "@/components/ui/drop-zone";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAddStore } from "@/hooks/store/use-add-store";
import { cn } from "@/lib/utils";

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
  const { isPending, onSubmit, onDrop, form, previewUrl } = useAddStore();
  const [open, setOpen] = useState(false);
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
                      setShowNewStoreDialog(true);
                    }}
                    disabled={1 <= stores.length}
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Store</DialogTitle>
          <DialogDescription>
            Add a new Store to manage products and customers.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="XPTO Store"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="XPTO Store"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      <Dropzone
                        {...field}
                        title="Drop files or click here"
                        handleOnDrop={onDrop}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {previewUrl && (
                <div className="flex items-center justify-center gap-3 p-4 relative">
                  <Image
                    src={previewUrl}
                    alt="Store logo"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowNewStoreDialog(false)}
              >
                Cancel
              </Button>

              <Button loading type="submit" disabled={isPending}>
                {isPending && <div className="loading" />}
                Create Store
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
