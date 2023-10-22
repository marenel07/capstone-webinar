"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { PlusCircle } from "lucide-react";

interface AddUsersHeaderProps {
  loading: boolean;
}

const AddUsersHeader = ({ loading }: AddUsersHeaderProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex justify-between items-center">
      <Heading title="Add Users" description="Add users here." />
      <Button onClick={() => onOpen("addUser")} disabled={loading}>
        <PlusCircle size={20} className="mr-2" />
        Add manually
      </Button>
    </div>
  );
};

export default AddUsersHeader;
