import getSession from '@/actions/getSession';
import AdminSidebar from '@/components/Navbars/admin-sidebar';
import Topbar from '@/components/Navbars/Topbar';
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
