"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

interface ManageUsersHeaderProps {}

const ManageUsersHeader = ({}: ManageUsersHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <Heading title="Users" description="Manage users here." />
      <Button asChild>
        <Link href="/admin/users/add">
          <PlusCircle size={20} className="mr-2" />
          Add users
        </Link>
      </Button>
    </div>
  );
};

export default ManageUsersHeader;
