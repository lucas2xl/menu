"use client";

import { ImageDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMounted } from "@/hooks/use-is-mounted";

export function DownloadQRCodeButton() {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <TooltipProvider delayDuration={0.1}>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon">
            <ImageDownIcon className="w-6 h-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Baixar todos os QRCodes em um único arquivo ZIP</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
