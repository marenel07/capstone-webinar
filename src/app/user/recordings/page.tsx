import getCurrentUser from "@/actions/getCurrentUser";
import Heading from "@/components/Heading";
import PageLayout from "@/components/PageLayout";
import RecordingClientPage from "@/components/RecordingPage";
import ScrollToTop from "@/components/ScrollToTop";
import WebinarItemCertification from "@/components/WebinarItemCertification";
import prisma from "@/lib/prismadb";
import { format } from "date-fns";
import Image from "next/image";

const RecordingsPage = async () => {
  const user = await getCurrentUser();

  const webinars = await prisma.webinar.findMany({
    where: {
      status: "ENDED",
    },
    include: {
      participants: true,
      author: true,
    },
  });

  const formattedData = webinars?.map((item) => ({
    ...item,
    date: format(item.createdAt, "MMMM dd, yyyy"),
  }));

  return (
    <div className="bg-slate-100 min-h-screen">
      <PageLayout>
        <div className="p-4 sm:p-6 mx-auto pt-[57px] md:pt-[107px]">
          <div className="flex flex-col py-6 gap-y-6 min-h-full">
            <Heading
              title="Webinar Recordings"
              description="List of your registered webinar recordigs"
            />
            {/* No data found page */}
            {formattedData?.length === 0 && (
              <div className="flex flex-col items-center justify-center mt-20">
                <Image
                  src="/images/464.svg"
                  alt="No data found"
                  width={384}
                  height={384}
                />
                <p className="text-xl font-semibold text-gray-500">
                  No data found
                </p>
              </div>
            )}
            {/* Webinar list */}
            <RecordingClientPage data={formattedData} />
          </div>
        </div>
      </PageLayout>
      <ScrollToTop />
    </div>
  );
};

export default RecordingsPage;
