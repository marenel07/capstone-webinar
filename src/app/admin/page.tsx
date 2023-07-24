"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const AdminPage = () => {
  return (
    <div>
      Hello Admin
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
};

export default AdminPage;
