import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export function SkeletonCard() {
  return (
    <Card className="border-none p-2 shadow-none rounded-none">
      <CardContent className="p-0">
        <Skeleton className="w-auto aspect-[12/9]" />
      </CardContent>
      <CardHeader className="px-0 py-0 mt-3">
        <Skeleton className="h-4 w-auto" />
        <Skeleton className="h-4 w-auto" />
      </CardHeader>
    </Card>
  );
}

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  //   return <Skeleton />;
  return (
    <div className="grid grid-cols-1 sm-grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
