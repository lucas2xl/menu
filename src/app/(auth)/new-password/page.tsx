"use client";

import { Loader2Icon } from "lucide-react";

import { AlertError } from "@/components/alert-error";
import { AlertSuccess } from "@/components/alert-success";
import { BackButton } from "@/components/back-button";
import { PasswordInput } from "@/components/password-input";
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
import { useNewPassword } from "@/hooks/auth/use-new-password";

export default function NewPasswordPage() {
  const { isPending, error, success, onSubmit, form } = useNewPassword();

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="gap-2 text-center">
        <CardTitle>Enter your new password</CardTitle>
        <CardDescription>
          A Remember your password?
          <BackButton label="Sign in here" href="/signin" />
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        disabled={isPending}
                        placeholder="******"
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
              {!isPending && "Reset password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
