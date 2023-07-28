"use client";

import { useSidebarCollapse } from "@/hooks/useSidebarCollapse";

interface PageLayoutProps {
  children: React.ReactNode;
  isFullHeight?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, isFullHeight }) => {
  const isSidebarCollapsed = useSidebarCollapse(
    (state) => state.isSidebarCollapsed
  );

  return (
    <div
      className={`${isFullHeight && "h-screen"} ${
        isSidebarCollapsed ? "ml-[74px]" : "ml-[237px]"
      }`}
    >
      {children}
    </div>
  );
};

export default PageLayout;
