import PageLayout from "@/components/PageLayout";
import { format } from "date-fns";
import ScrollToTop from "@/components/ScrollToTop";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/DataTable";
import prisma from "@/lib/prismadb";
import { columns } from "./components/columns";
import ManageUsersHeader from "./components/ManageUsersHeader";

const WebinarsPage = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: {
        not: "ADMIN",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData = users?.map((user) => ({
    id: user.id,
    idNumber: user.idNumber,
    name: user.name,
    phone: user.phone ?? "N/A",
    email: user.email ?? "N/A",
    role: user.role,
    createdAt: format(user?.createdAt, "MMMM dd, yyyy"),
  }));

  return (
    <div className="bg-slate-100 min-h-screen">
      <PageLayout>
        <div className="container lg:pt-[107px]">
          <div className="py-6">
            <ManageUsersHeader />
            <Separator className="my-6" />
            <DataTable
              columns={columns}
              data={formattedData}
              searchKey="idNumber"
              isFilter
            />
          </div>
        </div>
      </PageLayout>
      <ScrollToTop />
    </div>
  );
};

export default WebinarsPage;
