"use client";

import { useSidebarCollapse } from "@/hooks/useSidebarCollapse";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: React.ReactNode;
  isFixed?: boolean;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  isFixed,
  className,
}) => {
  const isSidebarCollapsed = useSidebarCollapse(
    (state) => state.isSidebarCollapsed
  );

  return (
    <div
      className={cn(
        ` ${isSidebarCollapsed ? "lg:ml-[74px]" : "lg:ml-[237px]"}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageLayout;
