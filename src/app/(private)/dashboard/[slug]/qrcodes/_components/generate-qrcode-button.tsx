"use client";

import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { useCreateQRCode } from "@/hooks/qrcode/use-create-qrcode";

const MAX_QRCODES = 100;

type Props = {
  storeSlug: string;
};
export function GenerateQRCodeButton({ storeSlug }: Props) {
  const { form, isPending, onSubmit } = useCreateQRCode({ storeSlug });
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Gerar QRCodes</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Gerar QRCodes</h4>
            <p className="text-sm text-muted-foreground">
              Você pode gerar até {MAX_QRCODES} QRCodes por vez.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade de QRCodes</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          defaultValue="1"
                          className="col-span-2 h-8"
                          type="number"
                          min={1}
                          max={MAX_QRCODES}
                          autoFocus
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending && (
                    <Loader2Icon className="animate-spin h-5 w-5" />
                  )}
                  {!isPending && "Gerar"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
