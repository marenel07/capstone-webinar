"use client";

import useUserRole from "@/hooks/useUserRole";

export default function Home() {
  const { isAdmin } = useUserRole();
  return (
    <div>
      {isAdmin ? <p>You are an admin!</p> : <p>You are not an admin.</p>}
    </div>
  );
}
