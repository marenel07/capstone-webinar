"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModal";
import AddSingleUserForm from "../forms/AddSingleUserForm";

const AddSingleUser = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "addUser";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add user form</DialogTitle>
          <DialogDescription>
            Fill up the form below to add a new user.
          </DialogDescription>
          <AddSingleUserForm onClose={onClose} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddSingleUser;
