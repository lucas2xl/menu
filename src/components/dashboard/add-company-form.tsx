"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useAddCompany } from "@/hooks/company/use-add-company";
import { toSlug } from "@/lib/utils";

export function AddCompanyForm() {
  const { isPending, onSubmit, onDrop, form, previewUrl } = useAddCompany();

  return (
    <div className="flex items-center justify-center bg-background min-h-screen">
      <Card className="w-full max-w-[400px]">
        <CardHeader className="gap-2 text-center">
          <CardTitle>Create your first company</CardTitle>
          <CardDescription>
            This is the first step to create your company.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            form.setValue("slug", toSlug(e.target.value));
                          }}
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
                        <Input {...field} disabled={true} />
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
                          title="Drop file or click here"
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

              <Button
                loading
                type="submit"
                disabled={isPending}
                className="w-full"
              >
                {isPending && <div className="loading" />}
                Create Company
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
