import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

const WebinarItemSkeleton = () => {
  return (
    <Card className={cn("flex flex-col min-h-fit overflow-hidden")}>
      <Skeleton className="w-[800px] h-[350px]" />
      <div>
        <CardHeader>
          <CardTitle>
            <span className="text-lg font-semibold">
              <Skeleton className="w-1/2 h-2" />
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="flex flex-col gap-y-3">
            <Skeleton className="w-full h-2" />
            <Skeleton className="w-full h-2" />
            <Skeleton className="w-full h-2" />
          </p>

          <div className="flex flex-col items-start mt-4 gap-y-2">
            <Skeleton className="w-1/2 h-2" />
            <Skeleton className="w-1/4 h-2" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="w-1/2 h-8" />
        </CardFooter>
      </div>
    </Card>
  );
};

export default WebinarItemSkeleton;
