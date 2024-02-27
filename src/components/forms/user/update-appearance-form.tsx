"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUpdateAppearance } from "@/hooks/user/use-update-appearance";
import { cn } from "@/lib/utils";
import { themes } from "@/utils/themes";
import { useEffect } from "react";

type Props = {
  theme: string;
};
export function UpdateAppearanceForm({ theme }: Props) {
  const { form, isPending, onSubmit } = useUpdateAppearance();

  useEffect(() => {
    if (theme) {
      form.reset({ theme });
    }
  }, [theme, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Theme</FormLabel>
              <FormDescription>
                Select the theme for the dashboard.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-wrap gap-4 pt-2"
              >
                {themes.map((theme) => (
                  <FormItem key={theme.value} className="">
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem
                          value={theme.value}
                          className="sr-only"
                        />
                      </FormControl>

                      <AppearanceCard color={theme.color} />

                      <span className="block w-full p-2 text-center font-normal">
                        {theme.label}
                      </span>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button loading type="submit" disabled={isPending}>
            {isPending && <div className="loading" />}
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}

type AppearanceCardProps = {
  color: string;
};
function AppearanceCard({ color }: AppearanceCardProps) {
  return (
    <div className="h-36 w-48 items-center rounded-md border-2 border-muted p-1 hover:border-accent cursor-pointer">
      <div className={cn("space-y-2 rounded-sm p-2", color)}>
        <div className="space-y-2 rounded-md bg-black p-2 shadow-sm">
          <div className={cn("h-2 w-[80px] rounded-lg", color)} />
          <div className={cn("h-2 w-[100px] rounded-lg", color)} />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-black p-2 shadow-sm">
          <div className={cn("h-4 w-4 rounded-full", color)} />
          <div className={cn("h-2 w-[100px] rounded-lg", color)} />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-black p-2 shadow-sm">
          <div className={cn("h-4 w-4 rounded-full", color)} />
          <div className={cn("h-2 w-[100px] rounded-lg", color)} />
        </div>
      </div>
    </div>
  );
}
