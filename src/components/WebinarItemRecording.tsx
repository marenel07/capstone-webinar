"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Zoom } from "./ZoomImage";
import { Webinar } from "@/types/types";
import { Button } from "./ui/button";
import { Participant } from "@prisma/client";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import WebinarItemSkeleton from "./skeletons/WebinarItem";
import { Videotape } from "lucide-react";
import { useRouter } from "next/navigation";
import VideoPlayerModal from "./modals/VideoPlayerModal";

type WebinarWithParticipants = Webinar & {
  participants: Participant[];
  author: { name: string };
};
interface WebinarItemCertificationProps {
  data: WebinarWithParticipants | undefined;
  className?: string;
}

const WebinarItemRecordings = ({
  data,
  className,
}: WebinarItemCertificationProps) => {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(0);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUrl = async () => {
      await axios
        .get(`/api/webinar/${data?.id}/recordings`)
        .then((res) => {
          setStatus(res.status);
          setUrl(res.data);
        })
        .catch((err) => {
          setUrl("");
          setStatus(err.response.status);
        });
    };
    fetchUrl();
  }, [data]);

  return (
    <>
      <VideoPlayerModal
        videoUrl={url}
        open={open}
        onClose={() => setOpen(false)}
        title={data?.title as string}
      />
      <Suspense fallback={<WebinarItemSkeleton />}>
        <Card
          className={cn("flex flex-col min-h-fit overflow-hidden", className)}
        >
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Zoom>
              <Image
                alt={data?.title as string}
                src={data?.imageUrl as string}
                className="object-cover"
                placeholder="blur"
                blurDataURL={data?.imageUrl}
                width={800}
                height={350}
              />
            </Zoom>
          </div>

          <div>
            <CardHeader>
              <CardTitle>
                <span className="text-lg font-semibold">{data?.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-500">When:</span>
                  <span className="text-sm text-neutral-700">
                    {data?.date} ({data?.time})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-500">Speaker :</span>
                  <span className="text-sm text-neutral-700">
                    {data?.speaker}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-500">Staff :</span>
                  <span className="text-sm text-neutral-700">
                    {data?.author.name}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {status === 200 ? (
                <Button onClick={() => setOpen(true)}>
                  Watch webinar <Videotape size={20} className="ml-2" />
                </Button>
              ) : (
                <Button disabled>Recording not available</Button>
              )}
            </CardFooter>
          </div>
        </Card>
      </Suspense>
    </>
  );
};

export default WebinarItemRecordings;
