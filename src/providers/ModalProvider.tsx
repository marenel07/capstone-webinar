"use client";

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
    </>
  );
};

export default ModalProvider;
