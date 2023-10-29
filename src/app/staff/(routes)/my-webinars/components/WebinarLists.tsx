import WebinarItem from "@/components/WebinarItem";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Webinar } from "@/types/types";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface WebinarListsProps {
  initialData: Webinar[] | null | undefined;
}

const WebinarLists = ({ initialData }: WebinarListsProps) => {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-center justify-end">
          <Link
            href="/staff/my-webinars/create"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "hover:bg-neutral-50"
            )}
          >
            <PlusCircle size={20} className="mr-2" />{" "}
            <span>Create new webinar</span>
          </Link>
        </div>
        {initialData?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)]">
            <h1 className="text-2xl font-semibold text-center">
              You haven&apos;t created a webinar yet.
            </h1>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialData?.map((item) => (
            <WebinarItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default WebinarLists;
