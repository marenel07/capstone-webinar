import getSession from '@/actions/getSession';
import Topbar from '@/components/navbars/topbar';
import BreadCrumbsLayout from '@/components/breadcrumbs/BreadCrumbsLayout';
import UserSidebar from '@/components/navbars/user-sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = async ({ children }) => {
  const session = await getSession();

  return (
    <div className='h-full'>
      <UserSidebar />
      <Topbar session={session} />
      <BreadCrumbsLayout />
      {children}
    </div>
  );
};

export default AdminLayout;
