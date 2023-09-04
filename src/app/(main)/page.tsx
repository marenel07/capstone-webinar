"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div>
      Hello User
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
}
