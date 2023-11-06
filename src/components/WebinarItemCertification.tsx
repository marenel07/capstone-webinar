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

type WebinarWithParticipants = Webinar & {
  participants: Participant[];
  author: { name: string };
};
interface WebinarItemCertificationProps {
  data: WebinarWithParticipants | undefined;
  className?: string;
  userId: string | undefined;
  userName: string | undefined;
}

const WebinarItemCertification: React.FC<WebinarItemCertificationProps> = ({
  data,
  className,
  userId,
  userName,
}) => {
  const router = useRouter();

  const userRegistered = data?.participants.find(
    (user) => user.userId === userId
  );

  const isEvaluated = userRegistered?.evaluated;
  const isEnded = data?.status === WEBINAR_STATUS.ENDED;

  const { useUploadThing } = generateReactHelpers<OurFileRouter>();
  const { isUploading, startUpload } = useUploadThing("pdfUploader");

  const onSubmit = async () => {
    try {
      const file = await certificateGenerator({
        userName: userName as string,
        title: data?.title as string,
        date: data?.date as string,
        speaker: data?.speaker as string,
      });
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

      await axios.patch(`/api/webinar/${data?.id}/evaluation`, {
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
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-500">Staff :</span>
              <span className="text-sm text-neutral-700">
                {data?.author.name}
              </span>
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

            {isEvaluated ? (
              <Button className="bg-neutral-500 text-white">
                Download Certificate
              </Button>
            ) : (
              <Button className="bg-neutral-500 text-white">
                Certificate not available
              </Button>
            )}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default WebinarItemCertification;
