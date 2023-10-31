"use client";

import { Session } from "next-auth";
import PageLayout from "../PageLayout";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { StaffMobileSidebar } from "./staff-mobile-sidebar";
import { useMobileSidebar } from "@/hooks/useMobileSidebar";
import { ROLE } from "@prisma/client";

interface TopbarProps {
  session?: Session | null;
}

const Topbar: React.FC<TopbarProps> = ({ session }) => {
  const handleSignOut = () => {
    signOut();
  };

  const router = useRouter();
  const { onOpen } = useMobileSidebar();
  const role = session?.user?.role as ROLE;

  useEffect(() => {
    if (!session) {
      router.push("/sign-in");
    }
  });

  // get the user name initials
  const userInitial = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <PageLayout className="fixed w-full right-0 top-0 bg-white z-40">
        <div className="py-2 px-6 border-b border-neutral-200 flex items-center justify-between md:justify-end gap-3 ">
          <Menu
            size={20}
            onClick={() => onOpen(role)}
            className="text-neutral-700 md:hidden"
          />
          <div className="flex items-center gap-x-2">
            <p className="text-sm text-neutral-500">
              {" "}
              <span className="text-black">Hi</span>, {session?.user?.name}{" "}
            </p>
            <div className="cursor-pointer">
              <DropdownMenu>
                <DropdownMenuTrigger className="ring-0 visited:border-none visited:ring-transparent rounded-full flex items-center">
                  <Avatar>
                    <AvatarImage
                      src={session?.user?.image ?? "/images/default.jpg"}
                    />
                    <AvatarFallback className="text-2xl">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer"
                  >
                    Sign out
                  </DropdownMenuItem>
                  {/* {session?.user.provider === 'credentials' && (
                  <DropdownMenuItem className='cursor-pointer'>
                    Change Password
                  </DropdownMenuItem>
                )} */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Topbar;
