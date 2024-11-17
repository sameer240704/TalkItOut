import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/global.context";
import { X, User } from "lucide-react";
import { GET_USER_PANEL_DETAILS } from "../../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";

const FriendUser = () => {
  const { rightPanel, setIsRightPanelClose } = useGlobalContext();
  const [currentSelected, setCurrentSelected] = useState(null);

  useEffect(() => {
    const getRightPanelUser = async () => {
      try {
        const response = await axios.get(GET_USER_PANEL_DETAILS, {
          params: { userId: rightPanel },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setCurrentSelected(response.data.userDetails);
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (rightPanel) getRightPanelUser();
  }, [rightPanel]);

  return (
    <div className="h-full w-full px-6 py-5 flex flex-col justify-start">
      <div className="text-3xl font-bold flex items-center justify-between">
        <h1 className="text-2xl">Profile</h1>
        <X
          className="h-6 w-6 cursor-pointer dark:text-white hover:opacity-50"
          onClick={() => setIsRightPanelClose(true)}
        />
      </div>

      <div className="flex-col-center mt-5">
        <img
          src={currentSelected ? currentSelected?.avatarImage : User}
          className="h-28 w-28 rounded-full"
          alt="User Image"
        />
        <h1 className="text-xl mt-4 font-semibold tracking-tight dark:text-white">
          {currentSelected?.name || ""}
        </h1>
        <h3 className="text-md font-medium text-gray-800 dark:text-gray-300">
          {currentSelected?.bioData || ""}
        </h3>
      </div>

      <div></div>
    </div>
  );
};

export default FriendUser;
