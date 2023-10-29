import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Webinar } from "@/types/types";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import WebinarItemHomePage from "./WebinarItemHomePage";
import { Participant } from "@prisma/client";

type WebinarWithParticipants = Webinar & { participants: Participant[] };

interface WebinarListsProps {
  initialData: WebinarWithParticipants[] | null | undefined;
  departmentPost?: WebinarWithParticipants[] | null | undefined;
  userId: string | undefined;
}

const HomePage: React.FC<WebinarListsProps> = ({
  initialData,
  departmentPost,
  userId,
}) => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <Suspense fallback={<div>Loading... </div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialData?.map((item) => (
            <WebinarItemHomePage key={item.id} data={item} userId={userId} />
          ))}

          {departmentPost?.map((item) => (
            <WebinarItemHomePage key={item.id} data={item} userId={userId} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default HomePage;
