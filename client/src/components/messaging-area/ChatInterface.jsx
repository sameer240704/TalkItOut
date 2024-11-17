import React, { useEffect, useState } from "react";
import { USER_INFO } from "../../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../context/global.context";
import { Search, EllipsisVertical } from "lucide-react";

const ChatHeader = (props) => {
  const { setRightPanel } = useGlobalContext();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    setIsSearchExpanded(false);
  }, [props]);

  return (
    <div className="w-full h-16 flex items-center justify-between px-4 bg-light-primary dark:bg-dark-primary rounded-xl">
      {/* Left Side */}
      <div className="flex items-start gap-x-4">
        <div className="relative">
          <img src={props.avatarImage} className="h-10 w-10 rounded-full" />
          <div
            className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 dark:border-dark-primary ${
              !props.isOnline ? "bg-red-500" : "bg-green-600"
            }`}
          ></div>
        </div>
        <div className="flex flex-col items-start justify-between">
          <h1 className="text-md font-semibold">{props.name}</h1>
          <h1 className="text-[12px] text-gray-400">
            {props.isOnline ? "Online" : "Offline"}
          </h1>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-end gap-x-5">
        <div
          className={`flex items-center transition-all duration-300 ${
            isSearchExpanded
              ? "h-10 w-5/6 border px-2 py-1"
              : "w-0 overflow-hidden"
          } bg-light-secondary dark:bg-dark-secondary rounded-lg`}
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200"
            onBlur={() => setIsSearchExpanded(false)}
          />
        </div>

        <Search
          className="h-5 w-5 cursor-pointer"
          onClick={() => setIsSearchExpanded(!isSearchExpanded)}
        />

        <EllipsisVertical
          className="h-5 w-5 cursor-pointer"
          onClick={() => setRightPanel(props.userId)}
        />
      </div>
    </div>
  );
};

const ChatInterface = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { rightPanel, setRightPanel } = useGlobalContext();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(USER_INFO, {
          params: { userId: user },
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        setCurrentUser(response.data.userDetails);
        setRightPanel(user);
      } catch (error) {
        toast.error("Please try again later");
      }
    };
    if (user) getCurrentUser();
  }, [user]);

  return (
    <div>
      {currentUser ? (
        <div className="p-3">
          <ChatHeader
            userId={currentUser.userId}
            name={currentUser.name}
            avatarImage={currentUser.avatarImage}
            isOnline={currentUser.isOnline}
          />
        </div>
      ) : (
        <div>Loading user info...</div>
      )}
    </div>
  );
};

export default ChatInterface;
