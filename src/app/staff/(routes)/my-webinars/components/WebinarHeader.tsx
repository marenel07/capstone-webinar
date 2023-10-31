"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Heading from "@/components/Heading";
import { ActionTooltip } from "@/components/ActionTooltip";
import axios from "axios";
import { DEPARTMENT_POST, WEBINAR_STATUS, Webinar } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StatusSwitcher from "./StatusSwitcher";
import DepartmentSwitcher from "./DepartmentSwitcher";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import AlertModal from "@/components/modals/AlertModal";

interface WebinarHeaderProps {
  webinarId: string;
  status: WEBINAR_STATUS | undefined;
  department: DEPARTMENT_POST | undefined;
}

const WebinarHeader = ({
  webinarId,
  status,
  department,
}: WebinarHeaderProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/webinar/${webinarId}`);
      toast.success("Webinar deleted.");
      router.refresh();
      router.push("/staff/my-webinars");
    } catch (error: any) {
      toast.error(error.response.data ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 md:flex-row justify-between items-start">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Heading title="Manage Webinar" description="Manage your webinar here." />
      <div className="flex gap-3">
        <StatusSwitcher status={status} webinarId={webinarId} />
        <DepartmentSwitcher department={department} webinarId={webinarId} />
        <ActionTooltip label="Delete webinar">
          <Button onClick={onDelete} variant="destructive" disabled={loading}>
            <Trash size={20} />
          </Button>
        </ActionTooltip>
      </div>
    </div>
  );
};

export default WebinarHeader;
