import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { useGlobalContext } from "./global.context";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const { rightPanel } = useGlobalContext();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(false);

  const connection = import.meta.env.VITE_SERVER_URL;
  const localUser = localStorage.getItem("user");

  useEffect(() => {
    if (!rightPanel) return;

    const newSocket = io(connection, {
      query: { userId: localUser },
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      setConnected(true);
      console.log("Socket connected: ", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      setConnected(false);
      console.log("Socket disconnected: ", newSocket.id);
    });

    newSocket.on("new_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on("user_status", ({ userId, status }) => {
      setOnlineStatus((prevStatus) => ({
        ...prevStatus,
        [userId]: status === "online" ? true : false,
      }));
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [rightPanel, connection, localUser]);

  const sendMessage = (messageData) => {
    if (socket) {
      socket.emit("send_message", messageData);
    }
  };

  const value = {
    socket,
    messages,
    sendMessage,
    connected,
    onlineStatus,
    setOnlineStatus,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
