"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function useUserRole() {
  const [userRole, setUserRole] = useState<string>();
  const session = useSession();

  useEffect(() => {
    if (session.data?.user) {
      setUserRole(session?.data?.user.role);
    }
  }, [session]);

  const isAdmin = userRole === "ADMIN";
  const isUser = userRole === "USER";

  return { isAdmin, isUser };
}
