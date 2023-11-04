"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Zoom } from "./ZoomImage";
import { Webinar } from "@/types/types";
import { Button } from "./ui/button";
import { Play, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useToast } from "./ui/use-toast";
import axios from "axios";

type WebinarWithAuthor = Webinar & {
  author: { name: string };
};

interface WebinarItemProps {
  data: WebinarWithAuthor;
  className?: string;
}

const WebinarItem: React.FC<WebinarItemProps> = ({ data, className }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    try {
      setLoading(true);

      await axios.patch(`/api/webinar/${data.id}/session`);

      router.push(`/session/${data?.id}`);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong. We couldn't start the session.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Card
        className={cn("flex flex-col min-h-fit overflow-hidden", className)}
      >
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Zoom>
            <Image
              alt={data.title}
              src={data.imageUrl}
              className="object-cover"
              placeholder="blur"
              blurDataURL={data.imageUrl}
              width={800}
              height={350}
            />
          </Zoom>
        </div>

        <div>
          <CardHeader>
            <CardTitle>
              <span className="text-lg font-semibold">{data.title}</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-neutral-500">{data.description}</p>

            <div className="flex flex-col items-start mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-500">When:</span>
                <span className="text-sm text-neutral-700">
                  {data.date} ({data.time})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-500">Speaker :</span>
                <span className="text-sm text-neutral-700">{data.speaker}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-500">Staff :</span>
                <span className="text-sm text-neutral-700">
                  {data.author.name}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-8">
              <Button
                disabled={loading}
                variant="secondary"
                onClick={() =>
                  router.push(`/staff/my-webinars/${data.id}/manage`)
                }
              >
                <Settings2 size={20} className="hidden lg:block mr-2" />
                <span>Manage</span>
              </Button>
              <Button disabled={loading} onClick={handleStart}>
                <Play size={20} className="hidden lg:block mr-2" />
                <span>Start Session</span>
              </Button>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Suspense>
  );
};

export default WebinarItem;
