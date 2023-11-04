import Heading from "@/components/Heading";
import WebinarItem from "@/components/WebinarItem";
import WebinarItemSkeleton from "@/components/skeletons/WebinarItem";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Webinar } from "@/types/types";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

type WebinarWithAuthor = Webinar & {
  author: { name: string };
};

interface WebinarListsProps {
  initialData: WebinarWithAuthor[] | null | undefined;
}

const WebinarLists = ({ initialData }: WebinarListsProps) => {
  return (
    <div className="p-4 sm:p-6 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <Heading
          title="My webinars"
          description="Here you can see all your webinars."
        />
        <Link
          href="/staff/my-webinars/create"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "hover:bg-neutral-50 w-fit"
          )}
        >
          <PlusCircle size={20} className="mr-2" />{" "}
          <span>Create new webinar</span>
        </Link>
      </div>
      <Suspense fallback={<WebinarItemSkeleton />}>
        {initialData?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)]">
            <Image
              src="/images/464.svg"
              alt="No data illustration"
              width={400}
              height={200}
            />
            <h1 className="text-2xl font-semibold text-center">
              You haven&apos;t created a webinar yet.
            </h1>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {initialData?.map((item) => (
            <WebinarItem key={item.id} data={item} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default WebinarLists;
