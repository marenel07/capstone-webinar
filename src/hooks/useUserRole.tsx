import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useUserRole() {
  const [userRole, setUserRole] = useState<string>();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setUserRole(session?.user.role);
    }
  }, [session, status]);

  const isAdmin = userRole === "ADMIN";
  const isUser = userRole === "USER";

  return { isAdmin, isUser };
}
