"use client";

import { StaffMobileSidebar } from "@/components/Navbars/staff-mobile-sidebar";
import UserMobileSidebar from "@/components/Navbars/user-mobile-sidebar";
import AddSingleUser from "@/components/modals/AddSingleUser";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AddSingleUser />
      <StaffMobileSidebar />
      <UserMobileSidebar />
    </>
  );
};

export default ModalProvider;
