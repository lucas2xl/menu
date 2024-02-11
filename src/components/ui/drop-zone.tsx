import React, { ChangeEvent, useRef } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DownloadCloud, XIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import { Input } from "./input";

interface DropzoneProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  className?: string;
  preview?: string | null;
  handleOnDrop: (acceptedFiles: FileList | null) => void;
  handleRemove: () => void;
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  ({ className, handleOnDrop, handleRemove, preview, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
      e.preventDefault();
      e.stopPropagation();
      handleOnDrop(null);
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
      e.preventDefault();
      e.stopPropagation();
      const { files } = e.dataTransfer;
      if (inputRef.current) {
        inputRef.current.files = files;
        handleOnDrop(files);
      }
    }

    function handleButtonClick() {
      if (inputRef.current) {
        inputRef.current.click();
      }
    }

    return (
      <Card
        ref={ref}
        className={cn(
          `border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50 relative w-full h-40 sm:h-48 rounded-lg overflow-hidden group transition-all duration-200 ease-in-out`,
          className
        )}
      >
        <CardContent
          className="flex flex-col items-center justify-center space-y-2 p-4 sm:p-7 text-xs h-full"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <Input
            {...props}
            value={undefined}
            ref={inputRef}
            type="file"
            className="sr-only"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleOnDrop(e.target.files)
            }
          />
          <DownloadCloud size={32} className="text-muted-foreground" />
          <span className="mt-2 block text-sm text-gray-800 dark:text-gray-200">
            Busque no seu dispositivo ou{" "}
            <span className="group-hover:text-blue-700 text-blue-600">
              arraste e solte
            </span>
          </span>
          <span className="mt-1 block text-xs text-gray-500">
            O tamanho máximo do arquivo é 2 MB
          </span>
        </CardContent>

        {preview && (
          <div className="absolute top-0 left-0 right-0 bottom-0 z-50">
            <Button
              className="absolute top-0 right-0"
              variant="destructive"
              size="icon"
              onClick={handleRemove}
            >
              <XIcon size={16} />
            </Button>
            <Image
              src={preview}
              alt="Store logo"
              width={100}
              height={100}
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        )}
      </Card>
    );
  }
);
Dropzone.displayName = "Dropzone";

export { Dropzone };
