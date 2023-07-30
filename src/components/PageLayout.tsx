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
        ` ${isSidebarCollapsed ? "ml-[74px]" : "ml-[237px]"} ${
          isFixed && "fixed ml-0"
        } transition-all duration-200 ease-in-out`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageLayout;
