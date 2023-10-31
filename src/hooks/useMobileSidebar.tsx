import { ROLE } from "@prisma/client";
import { create } from "zustand";

interface SidebarStore {
  type: ROLE | null;
  isOpen: boolean;
  onOpen: (type: ROLE) => void;
  onClose: () => void;
}

export const useMobileSidebar = create<SidebarStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ type: null, isOpen: false }),
}));
