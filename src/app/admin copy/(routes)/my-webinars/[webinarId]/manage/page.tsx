import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ParticipantTable } from '../../components/Participants';
import getWebinarById from '@/actions/getWebinarById';
import { ParticipantColumn } from '../../components/Columns';
import { format } from 'date-fns';
import EditWebinarForm from '../../components/EditForm';
import prisma from '@/lib/prismadb';
import WebinarHeader from '../../components/WebinarHeader';

interface ManageWebinarProps {
  params: {
    webinarId: string;
  };
}

const ManageWebinar = async ({ params }: ManageWebinarProps) => {
  const data = (await getWebinarById(params.webinarId)) as any;

  const webinar = await prisma.webinar.findFirst({
    where: {
      id: params.webinarId,
    },
  });

  const participants: ParticipantColumn[] = data
    .map((webinar: any) => {
      return webinar.participants.map((participant: any) => {
        return {
          id: participant.id,
          name: participant.name,
          email: participant.email,
          number: participant.number,
          age: participant.age,
          address: participant.address,
          occupation: participant.occupation,
          company: participant.company,
          createdAt: format(participant.createdAt, 'd MMM yyyy, HH:mm'),
        };
      });
    })
    .flat();

  const filteredStaffs = participants.filter((participant) => {
    return participant.email !== null;
  });

  return (
    <div className='bg-slate-100 min-h-screen'>
      <PageLayout>
        <div className='container mx-auto pt-[107px]'>
          <div className='flex flex-col space-y-4 py-6'>
            <WebinarHeader webinarId={params.webinarId} webinar={webinar} />

            <Tabs defaultValue='participants' className='w-full'>
              <TabsList className='bg-primary text-white'>
                <TabsTrigger value='participants'>Participants</TabsTrigger>
                <TabsTrigger value='settings'>Settings</TabsTrigger>
              </TabsList>
              <TabsContent value='participants'>
                <ParticipantTable data={filteredStaffs} />
              </TabsContent>
              <TabsContent value='settings' className='flex justify-center'>
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
