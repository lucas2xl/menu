"use client";

import { Qrcode } from "@prisma/client";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import JSZip from "jszip";
import { ImageDownIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMounted } from "@/hooks/use-is-mounted";
import saveAs from "file-saver";

type Props = {
  qrcodes: Qrcode[];
  storeSlug: string;
};
export function DownloadQRCodeButton({ qrcodes, storeSlug }: Props) {
  const [loading, setLoading] = useState(false);
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  const generatePDFsAndZip = async () => {
    setLoading(true);
    const zip = new JSZip();
    const pdfFolder = zip.folder("QRCodes");

    for (const qrcode of qrcodes) {
      const input = document.getElementById(`qrcode-${qrcode.value}`)!;
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");

      const margin = 20;
      const pageWidth = canvas.width + 2 * margin;
      const pageHeight = canvas.height + 2 * margin;
      const posX = (pageWidth - canvas.width) / 2;
      const posY = (pageHeight - canvas.height) / 2;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [pageWidth, pageHeight],
      });

      pdf.addImage(imgData, "PNG", posX, posY, canvas.width, canvas.height);

      pdfFolder?.file(`QRCode_${qrcode.value}.pdf`, pdf.output("blob"));
      if (qrcodes.indexOf(qrcode) === qrcodes.length - 1) {
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "QRCodes.zip");
      }
    }

    setLoading(false);
  };

  return (
    <TooltipProvider delayDuration={0.1}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={generatePDFsAndZip}>
            {loading && <Loader2Icon className="animate-spin w-6 h-6" />}
            {!loading && <ImageDownIcon className="w-6 h-6" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Baixar todos os QRCodes em um único arquivo ZIP</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
