import getSession from '@/actions/getSession';
import AdminSidebar from '@/components/navbars/adminsidebar';
import Topbar from '@/components/navbars/topbar';
import BreadCrumbsLayout from '@/components/breadcrumbs/BreadCrumbsLayout';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = async ({ children }) => {
  const session = await getSession();

  return (
    <div className='h-full'>
      <AdminSidebar />
      <Topbar session={session} />
      <BreadCrumbsLayout />
      {children}
    </div>
  );
};

export default AdminLayout;
