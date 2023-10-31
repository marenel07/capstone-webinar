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
import { Button, buttonVariants } from "./ui/button";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Participant, WEBINAR_STATUS } from "@prisma/client";
import { PopupButton } from "@typeform/embed-react";
import axios from "axios";
import { toast } from "sonner";
import { certificateGenerator } from "@/lib/certificateGenerator";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";

type WebinarWithParticipants = Webinar & { participants: Participant[] };
interface WebinarItemHomePageProps {
  data: WebinarWithParticipants | undefined;
  className?: string;
  userId: string | undefined;
  userName: string | undefined;
}

const WebinarItemRegistered: React.FC<WebinarItemHomePageProps> = ({
  data,
  className,
  userId,
  userName,
}) => {
  const router = useRouter();

  const isStarted = data?.status === WEBINAR_STATUS.STARTED;
  const isUpcoming = data?.status === WEBINAR_STATUS.UPCOMING;

  const userRegistered = data?.participants.find(
    (user) => user.userId === userId
  );

  const isEvaluated = userRegistered?.evaluated;
  const isEnded = data?.status === WEBINAR_STATUS.ENDED;

  const { useUploadThing } = generateReactHelpers<OurFileRouter>();
  const { isUploading, startUpload } = useUploadThing("pdfUploader");

  const onSubmit = async () => {
    try {
      const file = await certificateGenerator(userName as string);
      const certificate = file
        ? await startUpload(file).then((res) => {
            const formattedImages = res?.map((image) => ({
              name: image.key.split("_")[1] ?? image.key,
              url: image.url,
            }));
            return formattedImages?.[0]?.url
              ? (formattedImages[0].url as string)
              : null;
          })
        : null;

      console.log(certificate);

      await axios.patch(`/api/webinar/${data?.id}/evaluation`, {
        userId,
        certificate,
      });
      toast.success("Evaluated Successfully");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className={cn("flex flex-col min-h-fit overflow-hidden", className)}>
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
          <p className="text-sm text-neutral-500">{data?.description}</p>

          <div className="flex flex-col items-start mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-500">When:</span>
              <span className="text-sm text-neutral-700">
                {data?.date} ({data?.time})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-500">Speaker :</span>
              <span className="text-sm text-neutral-700">{data?.speaker}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-8 group">
            {isEvaluated && (
              <Button className="">
                Check here if your certificate is already available
                <MoveRight
                  size={20}
                  className="lg:block ml-1 group-hover:translate-x-2 repeat-infinite transition-transform duration-300 ease-in-out"
                />
              </Button>
            )}
            {!isEvaluated && isEnded && (
              <PopupButton
                id="LTbO0WqF"
                className={cn(buttonVariants({ variant: "default" }))}
                autoClose
                onSubmit={onSubmit}
              >
                Evaluate webinar
              </PopupButton>
            )}

            {isStarted && (
              <Button
                disabled={!isStarted}
                onClick={() => router.push(`/session/${data?.id}`)}
                className="flex items-center"
              >
                <span>Join Session</span>
                <MoveRight
                  size={20}
                  className="lg:block ml-1 group-hover:translate-x-2 repeat-infinite transition-transform duration-300 ease-in-out"
                />
              </Button>
            )}

            {isUpcoming && (
              <p className="text-sm bg-amber-200 p-2 rounded-full">
                🎉 Connect, learn, and grow at our upcoming gathering!
              </p>
            )}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default WebinarItemRegistered;
