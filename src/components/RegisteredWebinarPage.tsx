import { Webinar } from "@/types/types";
import { Participant } from "@prisma/client";
import WebinarItemSkeleton from "./skeletons/WebinarItem";
import { Suspense } from "react";
import WebinarItemRegistered from "./WebinarItemRegistered";

type WebinarWithParticipants = Webinar & {
  participants: Participant[];
  author: { name: string };
};
interface WebinarListsProps {
  initialData: WebinarWithParticipants[] | null | undefined;
  userId: string | undefined;
  userName: string | undefined;
}

const RegisteredWebinarPage = ({
  initialData,
  userId,
  userName,
}: WebinarListsProps) => {
  return (
    <div className="flex flex-col gap-6">
      <Suspense
        fallback={
          <div>
            <WebinarItemSkeleton />
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialData?.map((item) => (
            <WebinarItemRegistered
              key={item.id}
              data={item}
              userId={userId}
              userName={userName}
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default RegisteredWebinarPage;
