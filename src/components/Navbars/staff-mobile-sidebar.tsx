"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { HomeIcon, Video, Videotape, Webcam } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { useMobileSidebar } from "@/hooks/useMobileSidebar";

export const StaffMobileSidebar = () => {
  const pathname = usePathname();
  const route = pathname.split("/")[2];
  const activeRoute = route === undefined ? "home" : route;

  const { isOpen, onClose, type } = useMobileSidebar();
  const [active, setActive] = useState<string>(activeRoute);

  const isSidebarOpen = isOpen && type === "STAFF";

  useEffect(() => {
    setActive(activeRoute);
  }, [activeRoute]);

  return (
    <Sheet open={isSidebarOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0">
        <div className="bg-primary h-full group">
          <div className={`w-full text-neutral-200 flex flex-col gap-12 p-3`}>
            <div className="flex flex-col gap-4 items-center justify-center">
              <Image
                src="/images/ssu-logo.png"
                alt="logo"
                width={70}
                height={70}
              />
              <h1 className="text-sm">Webinar Management System</h1>
            </div>

            <div className="flex flex-col gap-10">
              <SidebarItem
                active={active}
                href="/admin"
                icon={HomeIcon}
                label="Home"
                activeLabel="home"
                onClose={onClose}
              />

              <div className="flex flex-col gap-4">
                <div className={`w-full flex items-center `}>
                  <h1 className="uppercase text-sm text-neutral-500">
                    main menu
                  </h1>
                </div>
                <ul className="flex flex-col gap-2">
                  <SidebarItem
                    active={active}
                    href="/staff/webinars"
                    icon={Video}
                    label="Webinars"
                    activeLabel="webinars"
                    onClose={onClose}
                  />

                  <SidebarItem
                    active={active}
                    href="/staff/my-webinars"
                    icon={Webcam}
                    label="My Webinars"
                    activeLabel="my-webinars"
                    onClose={onClose}
                  />

                  <SidebarItem
                    active={active}
                    href="/staff/recordings"
                    icon={Videotape}
                    label="Recordings"
                    activeLabel="recordings"
                    onClose={onClose}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
