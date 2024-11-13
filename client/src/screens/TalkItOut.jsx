import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftPanel from "../components/left-panel/LeftPanel";
import MessagingArea from "../components/messaging-area/MessagingArea";
import RightPanel from "../components/right-panel/RightPanel";
import Sidebar from "../components/Sidebar";

const TalkItOut = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex-row-center h-screen gap-x-3 px-3 py-5 bg-light-bg dark:bg-dark-bg">
        <Sidebar />
        <LeftPanel />
        <MessagingArea />
        <RightPanel />
      </div>
    </>
  );
};

export default TalkItOut;
