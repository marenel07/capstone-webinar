"use client";

import { Webinar } from "@/types/types";
import { Participant } from "@prisma/client";
import WebinarItemCertification from "./WebinarItemCertification";
import WebinarItemRecordings from "./WebinarItemRecording";
import { useEffect } from "react";

type WebinarWithAuthor = Webinar & {
  participants: Participant[];
  author: { name: string };
};

interface RecordingPageProps {
  data: WebinarWithAuthor[] | null | undefined;
}

const RecordingClientPage = ({ data }: RecordingPageProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data?.map((webinar) => (
        <WebinarItemRecordings key={webinar.id} data={webinar} />
      ))}
    </div>
  );
};

export default RecordingClientPage;
