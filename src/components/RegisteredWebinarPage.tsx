import { Webinar } from "@/types/types";
import { Participant } from "@prisma/client";
import WebinarItemSkeleton from "./skeletons/WebinarItem";
import { Suspense } from "react";
import WebinarItemRegistered from "./WebinarItemRegistered";
import Image from "next/image";

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
        {initialData?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)]">
            <div className="w-auto aspect-video relative overflow-hidden">
              <Image
                src="/images/464.svg"
                alt="No data illustration"
                width={400}
                height={200}
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl font-semibold text-neutral-500 text-center mt-4">
              You have not registered to any webinar.
            </h1>
          </div>
        )}
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
