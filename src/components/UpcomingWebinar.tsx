"use client";

import { Webinar } from "@/types/types";
import WebinarItemHomePage from "./WebinarItemHomePage";
import { Participant } from "@prisma/client";
import Image from "next/image";
import WebinarEventItem from "./WebinarEventItem";

type WebinarWithParticipants = Webinar & {
  participants: Participant[];
  author: { name: string };
};

interface UpcomingWebinarProps {
  data: WebinarWithParticipants[] | null | undefined;
  userId: string | undefined;
}

const UpcomingWebinar = ({ data, userId }: UpcomingWebinarProps) => {
  return (
    <div>
      {data?.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)]">
          <Image
            src="/images/464.svg"
            alt="No data illustration"
            width={400}
            height={200}
          />
          <h1 className="text-2xl font-semibold text-center">
            No upcoming webinar events.
          </h1>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.map((item) => (
          <WebinarEventItem key={item.id} data={item} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingWebinar;
