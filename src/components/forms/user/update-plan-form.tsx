"use client";

import { UserPlan } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdatePlan } from "@/hooks/user/use-update-plan";

type Props = {
  plan: UserPlan;
};
export function UpdatePlanForm({ plan }: Props) {
  const { form, onSubmit } = useUpdatePlan({ plan });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status do plano</FormLabel>
                <Select {...field} disabled>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione umm status" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {[
                      { id: "ACTIVE", label: "Ativo" },
                      { id: "INACTIVE", label: "Inativo" },
                    ]?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de plano</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value === 0 ? "Básico" : "Premium"}
                    disabled
                  />
                </FormControl>
                <FormDescription>
                  Contate o suporte para alterar alterar o plano.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade de lojas</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormDescription>
                  Contate o suporte para alterar a quantidade de lojas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter className="gap-4">
          <Button type="submit" disabled={true}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
