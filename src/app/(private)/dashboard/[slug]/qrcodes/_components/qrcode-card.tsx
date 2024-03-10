"use client";

import { Qrcode } from "@prisma/client";
import { CheckIcon, CopyIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { toast } from "sonner";

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
import { motion } from "framer-motion";

type Props = {
  qrcode: Qrcode;
  storeSlug: string;
};
export function QRCodeCard({ qrcode, storeSlug }: Props) {
  const { onSubmit, isPending } = useDeleteQRCode();
  const [isCopied, setIsCopied] = useState(false);

  const qrcodeURL = `${config.domain.NEXT_PUBLIC_APP_URL}/${storeSlug}?qrcode=${qrcode.value}`;

  function CopyToClipboard() {
    setIsCopied(true);
    navigator.clipboard.writeText(qrcodeURL);
    toast.success("URL copiada para a área de transferência");
    setTimeout(() => setIsCopied(false), 1000);
  }

  return (
    <Card className="group relative">
      <CardHeader>
        <CardTitle>QRCode {qrcode.value}</CardTitle>
        <CardDescription>Slug da loja: {storeSlug}</CardDescription>
      </CardHeader>
      <CardContent className="max-w-64">
        <div id={`qrcode-${qrcode.value}`}>
          <QRCodeSVG
            value={qrcodeURL}
            className="w-full h-full"
            includeMargin
          />
          <div className="bg-white flex items-center justify-center p-1">
            <span className="text-2xl font-bold text-black">
              {qrcode.value}
            </span>
          </div>
        </div>

        <form action={() => onSubmit(qrcode.id)}>
          <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute right-4 top-4">
            <Button variant="destructive" disabled={isPending}>
              {isPending && <Loader2Icon className="animate-spin h-5 w-5" />}
              {!isPending && <Trash2Icon className="w-6 h-6" />}
            </Button>
          </div>
        </form>

        <div className="flex gap-2 items-center justify-between mt-2">
          <HoverCard>
            <HoverCardTrigger>
              <span className="line-clamp-1">{qrcodeURL}</span>
            </HoverCardTrigger>
            <HoverCardContent className="w-full">{qrcodeURL}</HoverCardContent>
          </HoverCard>

          <Button variant="outline" size="sm" onClick={CopyToClipboard}>
            {isCopied && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <CheckIcon className="w-4 h-4" />
              </motion.div>
            )}

            {!isCopied && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <CopyIcon className="w-4 h-4" />
              </motion.div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
