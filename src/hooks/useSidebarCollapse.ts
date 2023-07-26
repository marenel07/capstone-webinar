import { create } from "zustand";

type SidebarCollapseState = {
  isSidebarCollapsed: boolean;
  toggleSidebarCollapse: () => void;
};

export const useSidebarCollapse = create<SidebarCollapseState>((set) => ({
  isSidebarCollapsed: false,
  toggleSidebarCollapse: () =>
    set((state) => ({
      isSidebarCollapsed: !state.isSidebarCollapsed,
    })),
}));
