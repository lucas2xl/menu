"use client";

import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { AlertError } from "@/components/alert-error";
import { AlertSuccess } from "@/components/alert-success";
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
import { useAddCompany } from "@/hooks/company/use-add-company";
import { cn } from "@/lib/utils";

type Company = {
  id: string;
  name: string;
  logo: string | null;
};

interface Props {
  companies: Company[];
  className?: string;
}

export function CompanySwitcher({ className, companies }: Props) {
  const { isPending, error, success, onSubmit, onDrop, form, previewUrl } =
    useAddCompany();
  const [open, setOpen] = useState(false);
  const [showNewCompanyDialog, setShowNewCompanyDialog] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company>(companies[0]);

  return (
    <Dialog open={showNewCompanyDialog} onOpenChange={setShowNewCompanyDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a company"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={selectedCompany.logo ?? ""}
                alt={selectedCompany.name}
                className="grayscale"
              />
              <AvatarFallback>
                {selectedCompany.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {selectedCompany.name}
            <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search Company..." />
              <CommandEmpty>No Company found.</CommandEmpty>
              {companies.map((company) => (
                <CommandItem
                  key={company.id}
                  onSelect={() => {
                    setSelectedCompany(company);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={company.logo ?? ""}
                      alt={company.name}
                      className="grayscale"
                    />
                    <AvatarFallback>
                      {company.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {company.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedCompany.name === company.name
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
                      setShowNewCompanyDialog(true);
                    }}
                    disabled={1 <= companies.length}
                  >
                    <PlusCircleIcon className="mr-2 h-5 w-5" />
                    Create Company
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Company</DialogTitle>
          <DialogDescription>
            Add a new Company to manage products and customers.
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
                        placeholder="XPTO Company"
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
                        placeholder="XPTO Company"
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
                    alt="Company logo"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>

            <AlertError message={error} />
            <AlertSuccess message={success} />

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowNewCompanyDialog(false)}
              >
                Cancel
              </Button>

              <Button loading type="submit" disabled={isPending}>
                {isPending && <div className="loading" />}
                Create Company
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
