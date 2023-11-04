import PageLayout from "@/components/PageLayout";
import { format } from "date-fns";
import ScrollToTop from "@/components/ScrollToTop";
import getRegisteredWebinar from "@/actions/getRegisteredWebinar";
import RegisteredWebinarPage from "@/components/RegisteredWebinarPage";
import getCurrentUser from "@/actions/getCurrentUser";
import Heading from "@/components/Heading";

const UserRegisteredWebinarPage = async () => {
  const initialData = await getRegisteredWebinar();

  const formattedData = initialData?.map((item) => ({
    ...item,
    date: format(item.createdAt, "MMMM dd, yyyy"),
  }));

  const user = await getCurrentUser();

  return (
    <div className="bg-slate-100 min-h-screen">
      <PageLayout>
        <div className="p-4 sm:p-6 mx-auto pt-[57px] md:pt-[107px]">
          <div className="flex flex-col py-6 gap-y-6">
            <Heading
              title="Registered Webinar"
              description="List of your registered webinar."
            />
            <RegisteredWebinarPage
              initialData={formattedData}
              userId={user?.id}
              userName={user?.name}
            />
          </div>
        </div>
      </PageLayout>
      <ScrollToTop />
    </div>
  );
};

export default UserRegisteredWebinarPage;
