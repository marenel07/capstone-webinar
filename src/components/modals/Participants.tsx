"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "../ui/scroll-area";

interface ParticipantsProps {
  open: boolean;
  onClose: () => void;
  participants: string[];
}

const ParticipantsList = ({
  open,
  onClose,
  participants,
}: ParticipantsProps) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="bg-neutral-500 flex items-start p-4 md:p-6">
        <SheetHeader>
          <SheetTitle className="text-white">Participants</SheetTitle>
          <ScrollArea>
            {participants.map((participant) => (
              <p className="text-white text-sm my-2" key={participant}>
                {participant}
              </p>
            ))}
          </ScrollArea>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ParticipantsList;
