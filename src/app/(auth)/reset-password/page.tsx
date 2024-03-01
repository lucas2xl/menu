"use client";

import { Loader2Icon } from "lucide-react";

import { AlertError } from "@/components/alert-error";
import { AlertSuccess } from "@/components/alert-success";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPassword } from "@/hooks/auth/use-reset-password";

export default function ResetPasswordPage() {
  const { isPending, error, success, onSubmit, form } = useResetPassword();

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-[400px]">
        <CardHeader className="gap-2 text-center">
          <CardTitle>Forgot your password?</CardTitle>
          <CardDescription>
            A Remember your password?
            <BackButton label="Sign in here" href="/sign-in" />
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
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
              </div>

              <AlertError message={error} />
              <AlertSuccess message={success} />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2Icon className="animate-spin h-5 w-5" />}
                {!isPending && "Send Reset Link"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
