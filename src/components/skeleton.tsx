import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonForm() {
  return (
    <div className="mx-8 pt-6">
      <div className="mt-4 space-y-2">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Separator />
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-10">
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-[250px]" />
        </div>

        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>

      <Skeleton className="my-4 h-12 w-32 rounded-md" />
      <Separator />
    </div>
  );
}
