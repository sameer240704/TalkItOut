import React from "react";
import { useGlobalContext } from "../../context/global.context";

const FriendCard = ({ user }) => {
  const { currentFriend, setCurrentFriend } = useGlobalContext();

  return (
    <div
      className={`flex items-start justify-between px-2 py-3 rounded-xl cursor-pointer hover:bg-white hover:bg-opacity-10 ${
        currentFriend === user._id
          ? "bg-white bg-opacity-30 hover:bg-opacity-30"
          : ""
      }`}
      onClick={() => setCurrentFriend(user._id)}
    >
      <div className="flex flex-row items-start">
        <img
          src={user.avatarImage}
          alt={user.name}
          className="h-12 w-12 rounded-full"
        />
        <div className="ml-3">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            {user.name}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
