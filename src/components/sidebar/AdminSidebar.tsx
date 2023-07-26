"use client";

import { useSidebarCollapse } from "@/hooks/useSidebarCollapse";
import {
  ChevronsLeft,
  ChevronsRight,
  HomeIcon,
  MoreHorizontal,
  PlusCircle,
  Video,
  Videotape,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AdminSidebar = () => {
  const pathname = usePathname();
  const route = pathname.split("/")[2];
  const activeRoute = route === undefined ? "home" : route;

  const sidebar = useSidebarCollapse();

  const [active, setActive] = useState<string>(activeRoute);

  useEffect(() => {
    setActive(activeRoute);
  }, [activeRoute]);

  return (
    <div className="bg-bgMain h-full fixed top-0 left-0 group">
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
          <h1 className="text-base">
            {sidebar.isSidebarCollapsed ? (
              <MoreHorizontal size={25} />
            ) : (
              "Webinar Management System"
            )}
          </h1>
        </div>

        <div className="flex flex-col gap-10">
          <Link
            href="/admin"
            className={
              active === "home"
                ? `text-neutral-200 text-sm rounded-sm bg-slate-500 px-3 py-2 flex gap-3 ${
                    sidebar.isSidebarCollapsed
                      ? "items-center justify-center"
                      : "items-center justify-start"
                  }`
                : `text-neutral-400 text-sm rounded-sm px-3 py-2 hover:bg-slate-500 hover:text-neutral-200 flex gap-3 items-center ${
                    sidebar.isSidebarCollapsed
                      ? "items-center justify-center"
                      : "items-center justify-start"
                  }`
            }
          >
            <HomeIcon size={20} />
            <span className={sidebar.isSidebarCollapsed ? "hidden" : "block"}>
              Home
            </span>
          </Link>

          <div className="flex flex-col gap-4">
            <div
              className={`w-full flex items-center ${
                sidebar.isSidebarCollapsed && "justify-center"
              }`}
            >
              <h1 className="uppercase text-sm text-neutral-500">
                {sidebar.isSidebarCollapsed ? (
                  <MoreHorizontal size={25} />
                ) : (
                  "main menu"
                )}
              </h1>
            </div>
            <ul className="flex flex-col gap-2">
              <Link
                href="/admin/webinar"
                className={
                  active === "webinar"
                    ? `text-neutral-200 text-sm rounded-sm bg-slate-500 px-3 py-2 flex gap-3 ${
                        sidebar.isSidebarCollapsed
                          ? "items-center justify-center"
                          : "items-start justify-start"
                      }`
                    : `text-neutral-400 text-sm rounded-sm px-3 py-2 hover:bg-slate-500 hover:text-neutral-200 flex gap-3 items-center ${
                        sidebar.isSidebarCollapsed
                          ? "items-center justify-center"
                          : "items-center justify-start"
                      }`
                }
              >
                <Video size={20} />
                <span
                  className={sidebar.isSidebarCollapsed ? "hidden" : "block"}
                >
                  Webinar
                </span>
              </Link>

              <Link
                href="/admin/create"
                className={
                  active === "create"
                    ? `text-neutral-200 text-sm rounded-sm bg-slate-500 px-3 py-2 flex gap-3 ${
                        sidebar.isSidebarCollapsed
                          ? "items-center justify-center"
                          : "items-start justify-start"
                      }`
                    : `text-neutral-400 text-sm rounded-sm px-3 py-2 hover:bg-slate-500 hover:text-neutral-200 flex gap-3 items-center ${
                        sidebar.isSidebarCollapsed
                          ? "items-center justify-center"
                          : "items-center justify-start"
                      }`
                }
              >
                <PlusCircle size={20} />
                <span
                  className={sidebar.isSidebarCollapsed ? "hidden" : "block"}
                >
                  Create Webinar
                </span>
              </Link>

              <Link
                href="/admin/recordings"
                className={
                  active === "record"
                    ? `text-neutral-200 text-sm rounded-sm bg-slate-500 px-3 py-2 flex gap-3 ${
                        sidebar.isSidebarCollapsed
                          ? "items-center justify-center"
                          : "items-start justify-start"
                      }`
                    : `text-neutral-400 text-sm rounded-sm px-3 py-2 hover:bg-slate-500 hover:text-neutral-200 flex gap-3 items-center ${
                        sidebar.isSidebarCollapsed
                          ? "items-center justify-center"
                          : "items-center justify-start"
                      }`
                }
              >
                <Videotape size={20} />
                <span
                  className={sidebar.isSidebarCollapsed ? "hidden" : "block"}
                >
                  Recordings
                </span>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
