"use client";

import { User } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Label } from "@/components/ui/label";
import { useUpdateUser } from "@/hooks/user/use-update-user";

type Props = {
  user: User;
};
export function UpdateUserForm({ user }: Props) {
  const { form, isPending, onSubmit, onDrop } = useUpdateUser({ user });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-4"
      >
        <div className="col-span-3 flex flex-col gap-6">
          <div className="flex flex-col gap-4 h-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nome <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormDescription>
                    O email não pode ser alterado.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="isTwoFactorEnabled"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="isTwoFactorEnabled">
                      Autenticação de dois fatores
                    </FormLabel>
                    <FormDescription>
                      Deixe ativado a autenticação de dois fatores para aumentar
                      a segurança da sua conta.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <DialogFooter className="gap-4 my-auto">
            <Button loading type="submit" disabled={isPending}>
              {isPending && <div className="loading" />}
              Salvar
            </Button>
          </DialogFooter>
        </div>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>
              Adicione uma foto para que os outros possam te reconhecer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Label
                      htmlFor="file-input"
                      className="rounded-md ring ring-primary border-border w-full h-32 overflow-hidden flex items-center justify-center cursor-pointer"
                    >
                      {field.value && (
                        <Image
                          src={
                            field.value instanceof File
                              ? URL.createObjectURL(field.value)
                              : field.value
                          }
                          alt="Avatar"
                          width={100}
                          height={100}
                          className="object-cover h-full w-full"
                        />
                      )}

                      {!field.value && (
                        <div className="flex items-center justify-center h-full w-full bg-slate-950 text-white text-lg">
                          <span className="text-2xl">
                            {user.username.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}

                      <Input
                        {...field}
                        value={undefined}
                        type="file"
                        className="sr-only"
                        multiple
                        id="file-input"
                        onChange={(e) => onDrop(e.target.files || undefined)}
                      />
                    </Label>
                  </FormControl>
                  <FormDescription>
                    Você pode alterar seu avatar clicando na imagem.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
