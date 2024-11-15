import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { UserRoundPlus } from "lucide-react";
import axios from "axios";
import {
  FRIEND_REQUEST_ROUTE,
  GET_ALL_USER_FRIENDS,
  GET_ALL_USERS_ROUTE,
} from "../../utils/constants";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FriendCard from "./FriendCard";

const UserCard = ({ user }) => {
  const sendFriendRequest = async (userId) => {
    const myUserId = localStorage.getItem("user");
    const response = await axios.post(
      FRIEND_REQUEST_ROUTE,
      { userId, myUserId },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
  };

  return (
    <>
      <div className="w-full h-16 py-2 flex items-center justify-between">
        <div className="flex items-center w-2/3">
          <img
            src={user.avatarImage}
            alt={user.name}
            className="h-10 w-10 rounded-full text-black"
          />
          <div className="ml-3 flex-1">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              {user.name}
            </h2>
            <div className="w-[95%]">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap">
                {user.bioData}
              </p>
            </div>
          </div>
        </div>
        <Button
          className="bg-green-500 hover:bg-green-600 active:scale-95"
          onClick={() => sendFriendRequest(user._id)}
        >
          <h1>Friend Request</h1>
        </Button>
      </div>
      <div className="w-full h-px bg-gray-700 dark:bg-gray-600" />
    </>
  );
};

const LeftPanel = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [friendsSearchQuery, setFriendsSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const userId = localStorage.getItem("user");

        if (!userId) {
          toast.error("Please login again");
          navigate("/sign-in");
        }

        const response = await axios.get(GET_ALL_USERS_ROUTE, {
          params: { userId },
          withCredentials: true,
        });

        setAllUsers(response.data.users);
      } catch (error) {
        toast.error(error.message);
      }
    };

    getAllUsers();
  }, []);

  useEffect(() => {
    const getAllUserFriends = async () => {
      try {
        const userId = localStorage.getItem("user");

        if (!userId) {
          toast.error("Please login again");
          navigate("/sign-in");
        }

        const response = await axios.get(GET_ALL_USER_FRIENDS, {
          params: { userId },
          withCredentials: true,
        });

        setUserFriends(response.data.friends);
      } catch (error) {
        toast.error("Couldn't get the users");
      }
    };

    getAllUserFriends();
  }, []);

  const groupUsersAlphabetically = (users) => {
    return users.reduce((groups, user) => {
      const firstLetter = user.name[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(user);
      return groups;
    }, {});
  };

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFriends = userFriends.filter((user) =>
    user.name.toLowerCase().includes(friendsSearchQuery.toLowerCase())
  );

  const groupedUsers = groupUsersAlphabetically(filteredUsers);

  return (
    <div className="h-full w-1/4 bg-light-primary rounded-2xl dark:bg-dark-secondary px-6 py-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chats</h1>

        {/* Users Dialog */}
        <Dialog>
          <DialogTrigger>
            <UserRoundPlus className="h-6 w-6" />
          </DialogTrigger>
          <DialogContent className="popup-scroll h-1/2 overflow-y-scroll">
            <DialogHeader>
              <DialogTitle className="text-2xl">Users</DialogTitle>
              <DialogDescription>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full px-3 py-2 mb-4 border-2 bg-transparent border-gray-900 rounded-md text-black dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="mt-4 space-y-2">
                  {Object.keys(groupedUsers).length > 0 ? (
                    Object.keys(groupedUsers).map((letter) => (
                      <div key={letter}>
                        <h2 className="text-lg font-semibold my-3">{letter}</h2>
                        <div
                          className={`w-full h-px bg-gray-700 dark:bg-gray-600`}
                        />
                        {groupedUsers[letter].map((user) => (
                          <UserCard key={user._id} user={user} />
                        ))}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No users found</p>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* Global Search */}
      <input
        type="text"
        placeholder="Search users..."
        className="w-full px-3 py-2 mb-4 mt-3 rounded-md bg-white bg-opacity-30 text-black placeholder:text-gray-700   dark:text-white"
        value={friendsSearchQuery}
        onChange={(e) => setFriendsSearchQuery(e.target.value)}
      />

      <div className="mt-2">
        <div className="space-y-3">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((user) => (
              <FriendCard key={user._id} user={user} />
            ))
          ) : (
            <p className="text-gray-500">No friends found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
