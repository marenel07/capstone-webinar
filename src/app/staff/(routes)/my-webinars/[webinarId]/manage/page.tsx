import PageLayout from "@/components/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParticipantTable } from "../../components/Participants";
import getWebinarById from "@/actions/getWebinarById";
import { ParticipantColumn } from "../../components/Columns";
import { format } from "date-fns";
import EditWebinarForm from "../../components/EditForm";
import prisma from "@/lib/prismadb";
import WebinarHeader from "../../components/WebinarHeader";
import { Participant, User } from "@prisma/client";

interface ManageWebinarProps {
  params: {
    webinarId: string;
  };
}

type ParticipantWithUser = Participant & {
  user: User;
};

const ManageWebinar = async ({ params }: ManageWebinarProps) => {
  const data = (await getWebinarById(params.webinarId)) as any;

  const webinar = await prisma.webinar.findFirst({
    where: {
      id: params.webinarId,
    },
  });

  const webinarParticipants = await prisma.participant.findMany({
    where: {
      webinarId: params.webinarId,
    },
    include: {
      user: true,
    },
  });

  const participants: ParticipantColumn[] = webinarParticipants?.map(
    (participant: ParticipantWithUser) => {
      return {
        id: participant.id,
        idNumber: participant?.user?.idNumber,
        name: participant?.user?.name,
        email: participant?.user?.email ?? "N/A",
        phone: participant?.user?.phone ?? "N/A",
        role: participant?.user?.role,
        year: participant?.user?.year,
        course: participant?.user?.course,
        department: participant?.user?.department,
        createdAt: format(participant.createdAt, "d MMM yyyy, HH:mm"),
      };
    }
  );

  const filteredStaffs = participants.filter((participant) => {
    return participant.role === "USER";
  });

  const departmentPost = webinar?.departmentPost;
  const status = webinar?.status;

  return (
    <div className="bg-slate-100 min-h-screen">
      <PageLayout>
        <div className="container mx-auto pt-[107px]">
          <div className="flex flex-col space-y-4 py-6">
            <WebinarHeader
              webinarId={params.webinarId}
              status={status}
              department={departmentPost}
            />

            <Tabs defaultValue="participants" className="w-full">
              <TabsList className="bg-primary text-white">
                <TabsTrigger value="participants">Participants</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="participants">
                <ParticipantTable data={filteredStaffs} />
              </TabsContent>
              <TabsContent value="settings" className="flex justify-center">
                <EditWebinarForm data={webinar} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default ManageWebinar;
