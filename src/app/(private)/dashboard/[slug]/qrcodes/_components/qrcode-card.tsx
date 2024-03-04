"use client";

import { Qrcode } from "@prisma/client";
import { CopyIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useDeleteQRCode } from "@/hooks/qrcode/use-delete-qrcode";
import { config } from "@/lib/config";
import { toast } from "sonner";

type Props = {
  qrcode: Qrcode;
  storeSlug: string;
};
export function QRCodeCard({ qrcode, storeSlug }: Props) {
  const { onSubmit, isPending } = useDeleteQRCode();

  const qrcodeURL = `${config.domain.NEXT_PUBLIC_APP_URL}/${storeSlug}?qrcode=${qrcode.value}`;
  return (
    <Card className="group relative">
      <CardHeader>
        <CardTitle>QRCode {qrcode.value}</CardTitle>
        <CardDescription>Slug da loja: {storeSlug}</CardDescription>
      </CardHeader>
      <CardContent className="max-w-80">
        <QRCodeSVG value={qrcodeURL} className="w-full h-full" />
        <div className="bg-white flex items-center justify-center p-1">
          <span className="text-2xl font-bold text-black">{qrcode.value}</span>
        </div>
        <form action={() => onSubmit(qrcode.id)}>
          <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute right-4 top-4">
            <Button variant="destructive" disabled={isPending}>
              {isPending && <Loader2Icon className="animate-spin h-5 w-5" />}
              {!isPending && <Trash2Icon className="w-6 h-6" />}
            </Button>
          </div>
        </form>

        <div className="flex gap-2 items-center justify-between">
          <HoverCard>
            <HoverCardTrigger>
              <span className="line-clamp-1">{qrcodeURL}</span>
            </HoverCardTrigger>
            <HoverCardContent className="w-full">{qrcodeURL}</HoverCardContent>
          </HoverCard>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => {
              navigator.clipboard.writeText(qrcodeURL);
              toast.success("URL copiada para a área de transferência");
            }}
          >
            <CopyIcon className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
