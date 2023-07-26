import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="ml-[266px]">
      <Link href={"/admin/create/settings"}>Settings</Link>
    </div>
  );
};

export default page;
