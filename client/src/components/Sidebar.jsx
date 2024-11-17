import React, { useEffect, useState } from "react";
import { sidebarData } from "../constants/sidebarData";
import { USER_INFO } from "../utils/constants";
import { useGlobalContext } from "../context/global.context";
import axios from "axios";
import { ModeToggle } from "./ui/mode-toggle";
import { useNavigate } from "react-router-dom";

const SidebarIcon = ({ icon: Icon, name }) => {
  const { globalState, setGlobalState } = useGlobalContext();

  return (
    <div
      className={`flex flex-col items-center text-center my-4 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 ${
        globalState === name
          ? "text-light-primary dark:text-dark-text font-semi bold"
          : ""
      }`}
      onClick={() => setGlobalState((prev) => name)}
    >
      <Icon
        className={`h-6 w-6 ${
          globalState === name
            ? "text-light-primary dark:text-dark-text"
            : "text-black dark:text-white"
        }`}
      />
      <span className="text-xs mt-1">{name}</span>
    </div>
  );
};

const Sidebar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { rightPanel, setRightPanel } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const userId = localStorage.getItem("user");

      if (!userId) {
        navigate("/sign-in");
      }

      const user = await axios.get(USER_INFO, {
        params: { userId },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      setCurrentUser(user.data.userDetails);
    };

    verify();
  }, []);

  return (
    <div className="h-full w-[2.5%] flex flex-col items-center justify-between bg-transparent">
      <div className="flex flex-col items-center">
        {sidebarData.map((item, index) => (
          <SidebarIcon key={index} icon={item.icon} name={item.name} />
        ))}
      </div>
      <div className="flex flex-col items-center mb-2 gap-y-5">
        <ModeToggle />
        <img
          src={
            currentUser
              ? currentUser.avatarImage
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
          }
          className="h-8 w-8 rounded-full cursor-pointer"
          onClick={() => setRightPanel(currentUser.userId)}
        />
      </div>
    </div>
  );
};

export default Sidebar;
