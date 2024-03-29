import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-8 pt-6 h-screen overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <Skeleton className="h-12 w-40 rounded-md" />
      </div>

      <div className="mt-8 space-y-2">
        <Skeleton className="h-8 w-[200px]" />
      </div>

      <div className="mt-4 space-y-4">
        <Separator />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    </div>
  );
}
