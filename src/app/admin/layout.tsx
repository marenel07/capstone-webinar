import AdminSidebar from '@/components/Navbars/AdminSidebar';
import Topbar from '@/components/Navbars/Topbar';
import BreadCrumbsLayout from '@/components/breadcrumbs/BreadCrumbsLayout';
import { getAuthSession } from '@/lib/auth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = async ({ children }) => {
  const session = await getAuthSession();

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
