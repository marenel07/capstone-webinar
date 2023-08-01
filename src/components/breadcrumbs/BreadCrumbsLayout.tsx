"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BreadCrumbs, { CrumbItem } from "./BreadCrumbs";
import PageLayout from "../PageLayout";
import { useSidebarCollapse } from "@/hooks/useSidebarCollapse";

const BreadCrumbsLayout = () => {
  const isCollapsed = useSidebarCollapse((state) => state.isSidebarCollapsed);

  const path = usePathname();

  const [breadcrumbs, setBreadcrumbs] = useState<CrumbItem[]>([]);

  useEffect(() => {
    const pathWithoutQuery = path.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    // remove admin from path array if it is the first element in the array or if it is the only element in the array
    if (pathArray.length > 1 && pathArray[0] === "admin") {
      pathArray.shift();
    } else if (pathArray.length === 1 && pathArray[0] === "admin") {
      pathArray = ["/admin"];
    }

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/admin/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label:
          path === "/admin"
            ? "Home"
            : path
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [path]);

  return (
    <PageLayout
      isFixed
      className={`right-0 top-[57px]  w-full ${
        isCollapsed ? "left-[74px]" : "left-[237px]"
      } border-b border-neutral-200 shadow-lg`}
    >
      <div className="bg-white w-full h-[50px] flex items-center">
        <BreadCrumbs items={breadcrumbs} />
      </div>
    </PageLayout>
  );
};

export default BreadCrumbsLayout;