"use client";

import { Award, HomeIcon, LayoutList, Video, Videotape } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { useMobileSidebar } from "@/hooks/useMobileSidebar";

const UserMobileSidebar = () => {
  const pathname = usePathname();
  const route = pathname.split("/")[2];
  const activeRoute = route === undefined ? "home" : route;

  const [active, setActive] = useState<string>(activeRoute);
  const { isOpen, onClose, type } = useMobileSidebar();
  const isSidebarOpen = isOpen && type === "USER";

  useEffect(() => {
    setActive(activeRoute);
  }, [activeRoute]);

  return (
    <Sheet open={isSidebarOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0">
        <div className="bg-primary h-full group z-50">
          <div className="w-full text-neutral-200 flex flex-col gap-12 p-3">
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
                href="/user"
                icon={HomeIcon}
                label="Home"
                activeLabel="home"
                onClose={onClose}
              />

              <div className="flex flex-col gap-4">
                <div className="w-full flex items-center">
                  <h1 className="uppercase text-sm text-neutral-500">
                    main menu
                  </h1>
                </div>
                <ul className="flex flex-col gap-2">
                  <SidebarItem
                    active={active}
                    href="/user/webinars"
                    icon={Video}
                    label="Webinars"
                    activeLabel="webinars"
                    onClose={onClose}
                  />
                  <SidebarItem
                    active={active}
                    href="/user/registered-webinar"
                    icon={LayoutList}
                    label="Registered Webinar"
                    activeLabel="registered-webinar"
                    onClose={onClose}
                  />

                  <SidebarItem
                    active={active}
                    href="/user/recordings"
                    icon={Videotape}
                    label="Recordings"
                    activeLabel="recordings"
                    onClose={onClose}
                  />

                  <SidebarItem
                    active={active}
                    href="/user/certificates"
                    icon={Award}
                    label="Certificates"
                    activeLabel="certificates"
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

export default UserMobileSidebar;
