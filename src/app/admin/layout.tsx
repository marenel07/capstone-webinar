import AdminSidebar from "@/components/sidebar/AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <AdminSidebar />
      {children}
    </div>
  );
};

export default AdminLayout;
