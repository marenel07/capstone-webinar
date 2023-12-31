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

    if (pathArray.length > 1 && pathArray[0] === "admin") {
      pathArray.shift();
    } else if (pathArray.length === 1 && pathArray[0] === "admin") {
      pathArray = ["/admin"];
    }

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      let href = "";

      if (path.startsWith("/admin")) {
        href = "/admin" + pathArray.slice(0, index + 1).join("/");
      } else if (path.startsWith("/user")) {
        href = "/user" + pathArray.slice(0, index + 1).join("/");
      } else if (path.startsWith("/staff")) {
        href = "/staff" + pathArray.slice(0, index + 1).join("/");
      } else {
        href = "/" + pathArray.slice(0, index + 1).join("/");
      }
      // const href = "/admin/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label:
          path === "/admin"
            ? "Home"
            : path === "user"
            ? "Home"
            : path === "staff"
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
      className={`lg:fixed lg:top-[57px] mt-[57px] lg:mt-0  w-full hidden md:block ${
        isCollapsed ? "lg:left-[74px]" : "lg:left-[237px]"
      } border-b border-neutral-200 shadow-lg lg:z-40 lg:left-0`}
    >
      <div className="bg-white w-full h-[50px] flex items-center">
        <BreadCrumbs items={breadcrumbs} />
      </div>
    </PageLayout>
  );
};

export default BreadCrumbsLayout;
