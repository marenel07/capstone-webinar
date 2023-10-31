import { Webinar } from "@/types/types";
import { Suspense } from "react";
import WebinarItemHomePage from "./WebinarItemHomePage";
import { Participant } from "@prisma/client";
import WebinarItemSkeleton from "./skeletons/WebinarItem";

type WebinarWithParticipants = Webinar & { participants: Participant[] };

interface WebinarListsProps {
  initialData: WebinarWithParticipants[] | null | undefined;
  departmentPost?: WebinarWithParticipants[] | null | undefined;
  userId: string | undefined;
}

const HomePage = ({
  initialData,
  departmentPost,
  userId,
}: WebinarListsProps) => {
  return (
    <div className="p-4 sm:p-6 flex flex-col gap-6 mt-[50px] md:mt-0">
      <div className="md:hidden flex justify-between items-center">
        <h1 className="text-2xl text-neutral-700 font-semibold">Home</h1>
      </div>
      <div className="flex flex-col gap-6">
        <Suspense fallback={<WebinarItemSkeleton />}>
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
    </div>
  );
};

export default HomePage;
