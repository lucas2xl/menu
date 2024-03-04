"use client";

import { Qrcode } from "@prisma/client";
import { QRCodeSVG } from "qrcode.react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeleteQRCode } from "@/hooks/qrcode/use-delete-qrcode";
import { config } from "@/lib/config";
import { Loader2Icon, Trash2Icon } from "lucide-react";

type Props = {
  qrcode: Qrcode;
  storeSlug: string;
};
export function QRCodeCard({ qrcode, storeSlug }: Props) {
  const { onSubmit, isPending } = useDeleteQRCode();

  return (
    <Card className="group relative">
      <CardHeader>
        <CardTitle>QRCode {qrcode.value}</CardTitle>
        <CardDescription>Slug da loja: {storeSlug}</CardDescription>
      </CardHeader>
      <CardContent>
        <QRCodeSVG
          value={`${config.domain.NEXT_PUBLIC_APP_URL}/${storeSlug}?qrcode=${qrcode.value}`}
          size={256}
        />
        <div className="bg-white flex items-center justify-center p-1">
          <span className="text-2xl font-bold text-black">{qrcode.value}</span>
        </div>
      </CardContent>

      <form action={() => onSubmit(qrcode.id)}>
        <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute right-4 top-4">
          <Button variant="destructive" disabled={isPending}>
            {isPending && <Loader2Icon className="animate-spin h-5 w-5" />}
            {!isPending && <Trash2Icon className="w-6 h-6" />}
          </Button>
        </div>
      </form>
    </Card>
  );
}
