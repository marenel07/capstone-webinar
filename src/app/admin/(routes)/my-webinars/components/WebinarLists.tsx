"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

interface WebinarListsProps {}

const WebinarLists: React.FC<WebinarListsProps> = ({}) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-end">
        <Link
          href="/admin/my-webinars/create"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "hover:bg-neutral-50"
          )}
        >
          <PlusCircle size={20} className="mr-2" />{" "}
          <span>Create new webinar</span>
        </Link>
      </div>
    </div>
  );
};

export default WebinarLists;
