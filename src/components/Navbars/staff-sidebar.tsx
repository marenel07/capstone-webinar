"use client";

import { useSidebarCollapse } from "@/hooks/useSidebarCollapse";
import {
  ChevronsLeft,
  ChevronsRight,
  HomeIcon,
  MoreHorizontal,
  Users,
  Video,
  Videotape,
  Webcam,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";

const StaffSidebar = () => {
  const pathname = usePathname();
  const route = pathname.split("/")[2];
  const activeRoute = route === undefined ? "home" : route;

  const sidebar = useSidebarCollapse();

  const [active, setActive] = useState<string>(activeRoute);

  useEffect(() => {
    setActive(activeRoute);
  }, [activeRoute]);

  return (
    <div className="hidden lg:block bg-primary h-full fixed top-0 left-0 group z-50">
      <div
        onClick={sidebar.toggleSidebarCollapse}
        className="opacity-0 group-hover:opacity-100 absolute cursor-pointer transition-all bg-white z-20 -right-4 top-10 border p-1 rounded-full"
      >
        {sidebar.isSidebarCollapsed ? (
          <ChevronsRight size={20} className="text-bgMain" />
        ) : (
          <ChevronsLeft size={20} className="text-bgMain" />
        )}
      </div>
      <div
        className={`w-full text-neutral-200 flex flex-col gap-12 p-3 ${
          sidebar.isSidebarCollapsed && "mt-[14px]"
        }`}
      >
        <div className="flex flex-col gap-4 items-center justify-center">
          <Image
            src="/images/ssu-logo.png"
            alt="logo"
            width={sidebar.isSidebarCollapsed ? 50 : 70}
            height={sidebar.isSidebarCollapsed ? 50 : 70}
          />
          <h1 className="text-sm">
            {sidebar.isSidebarCollapsed ? (
              <MoreHorizontal size={25} />
            ) : (
              "Webinar Management System"
            )}
          </h1>
        </div>

        <div className="flex flex-col gap-10">
          <SidebarItem
            active={active}
            href="/admin"
            icon={HomeIcon}
            label="Home"
            activeLabel="home"
          />

          <div className="flex flex-col gap-4">
            <div
              className={`w-full flex items-center ${
                sidebar.isSidebarCollapsed && "justify-center"
              }`}
            >
              <h1 className="uppercase text-sm text-neutral-500">
                {sidebar.isSidebarCollapsed ? (
                  <MoreHorizontal size={21} />
                ) : (
                  "main menu"
                )}
              </h1>
            </div>
            <ul className="flex flex-col gap-2">
              <SidebarItem
                active={active}
                href="/staff/webinar"
                icon={Video}
                label="Webinar"
                activeLabel="webinar"
              />

              <SidebarItem
                active={active}
                href="/staff/my-webinars"
                icon={Webcam}
                label="My Webinars"
                activeLabel="my-webinars"
              />

              <SidebarItem
                active={active}
                href="/staff/recordings"
                icon={Videotape}
                label="Recordings"
                activeLabel="recordings"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffSidebar;
