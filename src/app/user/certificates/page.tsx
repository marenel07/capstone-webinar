import getCurrentUser from "@/actions/getCurrentUser";
import Heading from "@/components/Heading";
import PageLayout from "@/components/PageLayout";
import ScrollToTop from "@/components/ScrollToTop";
import WebinarItemCertification from "@/components/WebinarItemCertification";
import WebinarItemRegistered from "@/components/WebinarItemRegistered";
import prisma from "@/lib/prismadb";
import { format } from "date-fns";

const CertificatePage = async () => {
  const user = await getCurrentUser();

  const webinars = await prisma.webinar.findMany({
    where: {
      status: "ENDED",
      participants: {
        some: {
          userId: user?.id,
        },
      },
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
          <div className="flex flex-col py-6 gap-y-6">
            <Heading
              title="Certification"
              description="List of your certified webinar"
            />
            {formattedData.map((webinar) => {
              return (
                <div
                  key={webinar.id}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                >
                  <WebinarItemCertification
                    key={webinar.id}
                    data={webinar}
                    userId={user?.id}
                    userName={user?.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </PageLayout>
      <ScrollToTop />
    </div>
  );
};

export default CertificatePage;
