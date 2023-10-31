import getCurrentUser from "@/actions/getCurrentUser";
import getPostedWebinarsByStatus from "@/actions/getPostedWebinarsByStatus";
import Heading from "@/components/Heading";
import OngoingWebinar from "@/components/OngoingWebinar";
import PageLayout from "@/components/PageLayout";
import UpcomingWebinar from "@/components/UpcomingWebinar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prismadb";
import { format } from "date-fns";

const WebinarEvents = async () => {
  const user = await getCurrentUser();

  const upcomingWebinars = await getPostedWebinarsByStatus("UPCOMING");

  const ongoingWebinars = await getPostedWebinarsByStatus("STARTED");

  const formattedUpcoming = upcomingWebinars?.map((item) => ({
    ...item,
    date: format(item.createdAt, "MMMM dd, yyyy"),
  }));

  const formattedOngoing = ongoingWebinars?.map((item) => ({
    ...item,
    date: format(item.createdAt, "MMMM dd, yyyy"),
  }));

  return (
    <div className="bg-slate-100 min-h-screen">
      <PageLayout>
        <div className="p-4 sm:p-6 mx-auto pt-[57px] md:pt-[107px]">
          <div className="flex flex-col py-6">
            <Heading
              title="Webinar Events"
              description="Upcoming and ongoing webinar events."
            />
            <Tabs defaultValue="upcoming" className="w-full mt-4">
              <TabsList className="bg-primary text-white">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="mt-4">
                <UpcomingWebinar data={formattedUpcoming} userId={user?.id} />
              </TabsContent>
              <TabsContent value="ongoing" className="mt-4">
                <OngoingWebinar data={formattedOngoing} userId={user?.id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default WebinarEvents;
