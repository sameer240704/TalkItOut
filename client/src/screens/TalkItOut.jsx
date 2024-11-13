import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyUser } from "../hooks/useVerifyUser";
import LeftPanel from "../components/left-panel/LeftPanel";
import MessagingArea from "../components/messaging-area/MessagingArea";
import RightPanel from "../components/right-panel/RightPanel";
import Sidebar from "../components/Sidebar";

const TalkItOut = () => {
  const { verifyUser } = useVerifyUser();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const result = await verifyUser();

      if (!result.success) {
        navigate("/");
      }
    };

    verify();
  }, []);
  return (
    <>
      <div className="flex-row-center h-screen gap-x-3 px-3 py-5">
        <Sidebar />
        <LeftPanel />
        <MessagingArea />
        <RightPanel />
      </div>
    </>
  );
};

export default TalkItOut;
