import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/global.context.jsx";
import {
  LOGOUT_ROUTE,
  UPDATE_BIODATA_ROUTE,
  USER_INFO,
} from "../../utils/constants.js";
import { userSidebarData } from "../../constants/sidebarData.js";
import { User } from "../../assets";
import { X, Loader, PenLine, SendHorizontal } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserElement = ({ icon: Icon, name }) => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    const response = await axios.get(LOGOUT_ROUTE, { withCredentials: true });

    if (response.status === 200) {
      localStorage.removeItem("user");
      navigate("/sign-in");
    }
  };

  return (
    <div
      className="w-full flex gap-x-5 cursor-pointer"
      onClick={name === "Logout" ? logoutUser : null}
    >
      <Icon
        className={`h-8 w-8 ${
          name === "Logout" ? "text-red-600 dark:text-red-500" : ""
        }`}
      />
      <div className="w-full flex flex-col justify-start gap-y-2">
        <h1
          className={`text-lg font-semibold ${
            name === "Logout" ? "text-red-600 dark:text-red-500" : ""
          }`}
        >
          {name}
        </h1>
        <div className={`w-full h-px bg-gray-700 dark:bg-gray-600`} />
      </div>
    </div>
  );
};

const CurrentUser = () => {
  const { setRightPanel, setIsRightPanelClose } = useGlobalContext();
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioData, setBioData] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("user");

    const verify = async () => {
      const user = await axios.get(USER_INFO, {
        params: { userId },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setCurrentUser(user.data ? user.data.userDetails : null);
    };

    verify();
  }, []);

  const changeBioData = async () => {
    try {
      const userId = localStorage.getItem("user");

      const response = await axios.put(
        UPDATE_BIODATA_ROUTE,
        { userId, bioData },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setCurrentUser(response.data.userDetails);
        setBioData(response.data.userDetails.bioData);
        setIsEditingBio(false);
      }

      alert(response.data.message);
    } catch (error) {
      console.error("Error in updating biodata");
    }
  };

  if (!currentUser) {
    return (
      <div className="h-full flex justify-center items-center">
        <Loader className="animate-spin h-8 w-8 duration-1000" />
      </div>
    );
  }

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
          src={currentUser ? currentUser?.avatarImage : User}
          className="h-28 w-28 rounded-full"
          alt="User Image"
        />
        <h1 className="text-xl mt-2 font-semibold tracking-tight dark:text-white">
          {currentUser?.name || ""}
        </h1>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {currentUser?.email || ""}
        </h3>
      </div>

      <div className="w-full text-sm text-gray-700 dark:text-gray-300 mt-5 px-3">
        {!isEditingBio ? (
          <div className="flex-row-center gap-x-4">
            <h1 className="text-sm text-gray-700 dark:text-gray-300">
              {currentUser.bioData || "Add a short Bio..."}
            </h1>
            <div>
              <PenLine
                className="h-5 w-5 cursor-pointer"
                onClick={() => setIsEditingBio(true)}
              />
            </div>
          </div>
        ) : (
          <div className="flex gap-x-3">
            <input
              type="text"
              value={bioData}
              onChange={(e) => setBioData(e.target.value)}
              className="w-full bg-transparent border-b-2 text-md border-gray-500 focus:outline-none dark:text-white"
              autoFocus
            />
            <X
              className="h-5 w-5 cursor-pointer"
              onClick={() => setIsEditingBio(false)}
            />
            <SendHorizontal
              className="h-5 w-5 cursor-pointer"
              onClick={changeBioData}
            />
          </div>
        )}
      </div>

      <div className="flex-col-center mt-10 w-full space-y-10 px-2">
        {userSidebarData.map((data) => (
          <UserElement key={data?.name} icon={data?.icon} name={data?.name} />
        ))}
      </div>
    </div>
  );
};

export default CurrentUser;
