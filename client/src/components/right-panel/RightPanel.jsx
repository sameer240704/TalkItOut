import React from "react";
import { useGlobalContext } from "../../context/global.context.jsx";
import CurrentUser from "./CurrentUser.jsx";
import FriendUser from "./FriendUser.jsx";

const RightPanel = () => {
  const { rightPanel, isRightPanelClose } = useGlobalContext();
  const localUser = localStorage.getItem("user");

  return (
    <div
      className={`${
        !isRightPanelClose ? "w-1/5" : "hidden"
      } h-full rounded-2xl bg-light-primary dark:bg-dark-secondary`}
    >
      {rightPanel === localUser ? <CurrentUser /> : <FriendUser />}
    </div>
  );
};

export default RightPanel;
