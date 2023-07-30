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

interface TopbarProps {
  session?: Session | null;
}

const Topbar: React.FC<TopbarProps> = ({ session }) => {
  const handleSignOut = () => {
    signOut();
  };

  // get the user name initials
  const userInitial = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div>
      <PageLayout className="fixed w-full right-0 top-0 bg-white">
        <div className="py-2 px-6 border-b border-neutral-200 flex items-center justify-end gap-3 ">
          <p className="text-sm"> Hi {session?.user?.name} </p>
          <div className="cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger className="ring-0 visited:border-none visited:ring-transparent rounded-full flex items-center">
                <Avatar>
                  <AvatarImage src={session?.user?.image ?? userInitial} />
                  <AvatarFallback className="text-2xl">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute -right-5">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Topbar;
