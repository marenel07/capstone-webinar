import PageLayout from "@/components/PageLayout";
import WebinarLists from "./components/WebinarLists";
import getWebinars from "@/actions/getWebinars";
import { format } from "date-fns";
import ScrollToTop from "@/components/ScrollToTop";

const WebinarsPage = async () => {
  const initialData = await getWebinars();

  const formattedData = initialData?.map((item) => ({
    ...item,
    date: format(item.createdAt, "MMMM dd, yyyy"),
  }));

  return (
    <div className="bg-slate-100 min-h-screen">
      <PageLayout>
        <div className="mt-[50px] md:mt-0 lg:pt-[107px]">
          <WebinarLists initialData={formattedData} />
        </div>
      </PageLayout>
      <ScrollToTop />
    </div>
  );
};

export default WebinarsPage;
