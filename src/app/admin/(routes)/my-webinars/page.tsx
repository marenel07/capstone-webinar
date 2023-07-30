import PageLayout from "@/components/PageLayout";
import React from "react";
import WebinarLists from "./components/WebinarLists";

const WebinarsPage = () => {
  return (
    <div className="bg-slate-100 h-full pt-[107px]">
      <PageLayout>
        <WebinarLists />
      </PageLayout>
    </div>
  );
};

export default WebinarsPage;
