"use client";

import { UserColumn } from "./columns";

import {
  Check,
  Copy,
  Edit,
  MoreHorizontal,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import AlertModal from "@/components/modals/AlertModal";
import { ROLE } from "@prisma/client";

interface CellActionProps {
  data: UserColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async (idNumber: string) => {
    try {
      setLoading(true);
      await axios.delete("/api/user", { data: { idNumber } });
      toast.success("User deleted successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data ?? "Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onRoleChange = async (idNumber: string, role: ROLE) => {
    setLoading(true);
    toast.promise(axios.patch("/api/user", { idNumber, role }), {
      loading: "Changing role...",
      success: () => {
        router.refresh();
        return "Role changed successfully";
      },
      error: (err) => {
        return toast.error(err.response.data ?? "Something went wrong");
      },
      finally: () => {
        setLoading(false);
      },
    });
    router.refresh();
  };

  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(data.idNumber)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              className="flex items-center"
              disabled={loading}
            >
              <ShieldQuestion className="w-4 h-4 mr-2" />
              <span>Role</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => onRoleChange(data.idNumber, "STAFF")}
                >
                  <ShieldCheck className="h-4 w-4 mr-2 text-amber-600" />
                  Staff
                  {data.role === "STAFF" && (
                    <Check className="h-4 w-4 ml-auto" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onRoleChange(data.idNumber, "USER")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  User
                  {data.role === "USER" && (
                    <Check className="h-4 w-4 ml-auto" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
