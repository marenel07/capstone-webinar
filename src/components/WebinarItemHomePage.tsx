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
import { Loader2, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Participant } from "@prisma/client";

type WebinarWithParticipants = Webinar & {
  participants: Participant[];
  author: { name: string };
};
interface WebinarItemHomePageProps {
  data: WebinarWithParticipants;
  className?: string;
  userId: string | undefined;
}

const WebinarItemHomePage: React.FC<WebinarItemHomePageProps> = ({
  data,
  className,
  userId,
}) => {
  const router = useRouter();
  const session = useSession();

  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/webinar/${data.id}/registration`, { userId });
      toast.success("Registered Successfully");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isRegistered = data.participants.some((item) => item.userId === userId);
  const isOwner = session?.data?.user.id === data.authorId;

  return (
    <Card className={cn("flex flex-col min-h-fit overflow-hidden", className)}>
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
              <span className="text-sm text-neutral-700">When:</span>
              <span className="text-sm text-neutral-500">
                {data.date} ({data.time})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-700">Speaker :</span>
              <span className="text-sm text-neutral-500">{data.speaker}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-700">Staff :</span>
              <span className="text-sm text-neutral-500">
                {data.author.name}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-8 group">
            {isRegistered && (
              <Button className={cn(isOwner && "hidden")}>Registered</Button>
            )}

            {isOwner ? (
              <Button
                onClick={() =>
                  router.push(`/staff/my-webinars/${data.id}/manage`)
                }
                className="flex items-center"
              >
                <span>Manage Webinar </span>
                <MoveRight
                  size={20}
                  className="lg:block ml-1 group-hover:translate-x-2 repeat-infinite transition-transform duration-300 ease-in-out"
                />
              </Button>
            ) : (
              <Button
                onClick={onRegister}
                className={cn("flex items-center", isRegistered && "hidden")}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <Loader2 size={20} className="mr-2 animate-spin" />{" "}
                    Registering...
                  </span>
                ) : (
                  <>
                    <span>Register Webinar </span>
                    <MoveRight
                      size={20}
                      className="lg:block ml-1 group-hover:translate-x-2 repeat-infinite transition-transform duration-300 ease-in-out"
                    />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default WebinarItemHomePage;
