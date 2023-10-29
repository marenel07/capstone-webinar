import getCurrentUser from "@/actions/getCurrentUser";
import { MediaRoom } from "@/components/MediaRoom";
import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";

interface RoomPageProps {
  params: {
    webinarId: string;
  };
}

const RoomPage = async ({ params }: RoomPageProps) => {
  const webinar = await prisma.webinar.findFirst({
    where: {
      id: params.webinarId,
    },
    include: {
      participants: {
        include: {
          user: true,
        },
      },
    },
  });

  const user = await getCurrentUser();

  if (!webinar) {
    return redirect("/");
  }

  if (!user) {
    return redirect("/sign-in");
  }

  const isParticipant = webinar.participants.some(
    (participant) => participant.userId === user.id
  );

  if (!isParticipant) {
    return redirect("/");
  }

  return (
    <MediaRoom
      chatId={params.webinarId}
      video={true}
      audio={true}
      name={user?.name}
    />
  );
};

export default RoomPage;
