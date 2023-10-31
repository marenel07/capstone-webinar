import PageLayout from "@/components/PageLayout";
import { format } from "date-fns";
import ScrollToTop from "@/components/ScrollToTop";
import getRegisteredWebinar from "@/actions/getRegisteredWebinar";
import RegisteredWebinarPage from "@/components/RegisteredWebinarPage";
import getCurrentUser from "@/actions/getCurrentUser";

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
        <div className="lg:pt-[107px]">
          <RegisteredWebinarPage
            initialData={formattedData}
            userId={user?.id}
            userName={user?.name}
          />
        </div>
      </PageLayout>
      <ScrollToTop />
    </div>
  );
};

export default UserRegisteredWebinarPage;
