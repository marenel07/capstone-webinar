"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AddUsersHeaderProps {}

const AddUsersHeader = ({}: AddUsersHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <Heading title="Add Users" description="Add users here." />
      <Button>
        <PlusCircle size={20} className="mr-2" />
        Add manually
      </Button>
    </div>
  );
};

export default AddUsersHeader;
