import PageLayout from "@/components/PageLayout";
import { format } from "date-fns";
import ScrollToTop from "@/components/ScrollToTop";
import HomePage from "@/components/HomePage";
import getPostedWebinars from "@/actions/getPostedWebinars";
import getPostedWebinarsByDepartment from "@/actions/getPostedWebinarsByDepartment";
import getCurrentUser from "@/actions/getCurrentUser";

const AdminHomePage = async () => {
  const initialData = await getPostedWebinarsByDepartment();

  const formattedData = initialData?.map((item) => ({
    ...item,
    date: format(item.createdAt, "MMMM dd, yyyy"),
  }));

  const user = await getCurrentUser();

  return (
    <div className="bg-slate-100 min-h-screen">
      <PageLayout>
        <div className="lg:pt-[107px]">
          <HomePage initialData={formattedData} userId={user?.id} />
        </div>
      </PageLayout>
      <ScrollToTop />
    </div>
  );
};

export default AdminHomePage;
