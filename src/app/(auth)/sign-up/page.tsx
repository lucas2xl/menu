"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import night from "@/components/images/night.avif";
import { PasswordInput } from "@/components/password-input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/auth/use-sign-up";
import { redirects } from "@/utils/constants";

export default function SignUpPage() {
  const { isPending, error, success, onSubmit, form } = useSignUp();

  useEffect(() => {
    if (error) toast.error(error);
    if (success) toast.success(success);
  }, [error, success]);

  return (
    <section className="h-full w-full">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <div className="hidden lg:block absolute right-12 top-12">
          <Link
            className={buttonVariants({
              variant: "outline",
              size: "sm",
            })}
            href={redirects.toSignIn}
          >
            Entrar
          </Link>
        </div>

        <section className="relative flex h-32 items-end bg-black lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="lg:hidden absolute right-4 top-4 z-50">
            <Link
              className={buttonVariants({
                variant: "outline",
                size: "sm",
              })}
              href={redirects.toSignIn}
            >
              Entrar
            </Link>
          </div>

          <Image
            src={night}
            alt="Night"
            placeholder="blur"
            width={870}
            height={580}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:flex lg:justify-between lg:flex-col lg:h-full lg:p-12">
            <Link href="/" className="text-white">
              <span className="sr-only">Home</span>
              <Icons.logo className="h-10 w-auto fill-white" />
            </Link>

            <div>
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Bem-vindo ao Menu
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Gerencie seus pedidos de forma fácil e segura em tempo real
              </p>
            </div>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl w-4/5 lg:max-w-3xl relative">
            <div className="relative -mt-16 block lg:hidden">
              <Link
                href="/"
                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background text-primary"
              >
                <span className="sr-only">Home</span>
                <Icons.logo className="h-8 sm:h-10" />
              </Link>

              <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                Bem-vindo ao Menu
              </h1>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                Gerencie seus pedidos de forma fácil e segura em tempo real
              </p>
            </div>

            <div className="space-y-8 mb-8">
              <h2 className="hidden lg:block text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                Sign up
              </h2>

              <p className="text-muted-foreground">
                Insira seus detalhes abaixo para criar sua conta
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
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
                        <FormLabel>Endereço de e-mail</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="m@example.com"
                            autoComplete="new-email"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid sm:grid-cols-2 gap-4 ">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <PasswordInput
                              {...field}
                              placeholder="******"
                              autoComplete="new-password"
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="passwordConfirmation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmação de senha</FormLabel>
                          <FormControl>
                            <PasswordInput
                              {...field}
                              placeholder="******"
                              autoComplete="new-password"
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button
                  loading
                  type="submit"
                  disabled={isPending}
                  className="w-full"
                >
                  {isPending && <div className="loading" />}
                  Criar conta
                </Button>
              </form>
            </Form>

            <div className="mt-8 space-y-8">
              <p className="text-center text-sm text-muted-foreground">
                Clicando em criar conta, você concorda com nossos{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Termos de serviço
                </Link>{" "}
                e{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Política de privacidade
                </Link>
                .
              </p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
