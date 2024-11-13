import React, { useEffect, useState } from "react";
import { sidebarData } from "../constants/sidebarData";
import { USER_INFO } from "../utils/constants";
import { LogOut, Settings } from "lucide-react";
import axios from "axios";

const SidebarIcon = ({ icon: Icon, name }) => {
  return (
    <div className="flex flex-col items-center text-center my-4 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300">
      <Icon className="h-6 w-6 dark:text-white" />
      <span className="text-xs mt-1">{name}</span>
    </div>
  );
};

const Sidebar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const userId = localStorage.getItem("user");
      const user = await axios.get(USER_INFO, {
        params: { userId },
        headers: { "Content-Type": "application/json" },
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
        <Settings className="h-6 w-6 dark:text-white" />
        <img
          src={
            currentUser
              ? currentUser.avatarImage
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
          }
          className="h-10 w-10 rounded-full cursor-pointer"
        />
        <LogOut className="h-6 w-6 dark:text-white" />
      </div>
    </div>
  );
};

export default Sidebar;
