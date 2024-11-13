import React from "react";
import { useGlobalContext } from "../../context/global.context.jsx";
import CurrentUser from "./CurrentUser.jsx";

const RightPanel = () => {
  const { rightPanel, setRightPanel } = useGlobalContext();

  return (
    <div
      className={`${
        rightPanel ? "w-1/5" : "hidden"
      } h-full rounded-2xl bg-light-primary dark:bg-dark-secondary`}
    >
      {rightPanel === "USER" && <CurrentUser />}
    </div>
  );
};

export default RightPanel;
