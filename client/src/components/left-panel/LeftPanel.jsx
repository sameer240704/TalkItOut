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
import { GET_ALL_USERS_ROUTE } from "../../utils/constants";

const UserCard = ({ user }) => {
  return (
    <>
      <div className="w-full h-16 px-3 py-2 flex items-center">
        <img
          src={user.avatarImage}
          alt={user.name}
          className="h-10 w-10 rounded-full"
        />
        <div className="ml-3">
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.bioData}
          </p>
        </div>
      </div>
      <div className={`w-full h-px bg-gray-700 dark:bg-gray-600`} />
    </>
  );
};

const LeftPanel = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const userId = localStorage.getItem("user");

      const response = await axios.get(GET_ALL_USERS_ROUTE, {
        params: { userId },
      });
      setAllUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="h-full w-1/4 bg-light-primary rounded-2xl dark:bg-dark-secondary px-6 py-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chats</h1>
        <Dialog>
          <DialogTrigger>
            <UserRoundPlus className="h-6 w-6" />
          </DialogTrigger>
          <DialogContent className="popup-scroll h-1/2 overflow-y-scroll">
            <DialogHeader>
              <DialogTitle className="text-2xl">Users</DialogTitle>
              <DialogDescription>
                <div className="mt-4 space-y-2">
                  <div className={`w-full h-px bg-gray-700 dark:bg-gray-600`} />
                  {allUsers.length > 0 ? (
                    allUsers.map((user) => (
                      <UserCard key={user._id} user={user} />
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
    </div>
  );
};

export default LeftPanel;
