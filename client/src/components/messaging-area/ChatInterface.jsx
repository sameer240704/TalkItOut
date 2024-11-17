import React, { useEffect, useState, useRef } from "react";
import {
  GET_ALL_MESSAGES,
  SEND_MESSAGES,
  UPLOAD_DOCUMENT,
  USER_INFO,
} from "../../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../context/global.context";
import {
  Search,
  EllipsisVertical,
  Plus,
  Smile,
  SendHorizonal,
  File,
  Image,
  Loader2,
} from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { useTheme } from "../theme-provider";

const ChatHeader = (props) => {
  const { setRightPanel } = useGlobalContext();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    setIsSearchExpanded(false);
  }, [props]);

  return (
    <div className="w-full h-20 flex items-center justify-between px-4 bg-light-primary dark:bg-dark-primary rounded-xl z-10">
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
          <h1 className="text-[12px] text-gray-800 dark:text-gray-400">
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

const ChatInput = ({ onSendMessage, onFileUpload }) => {
  const [message, setMessage] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const { theme } = useTheme();

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage({
        type: "text",
        content: message,
        timestamp: new Date(),
      });
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = async (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setIsPlusOpen(false);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(UPLOAD_DOCUMENT, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data && response.data.documentUrl) {
        onFileUpload({
          type: fileType,
          fileUrl: response.data.documentUrl,
          fileName: file.name,
          timestamp: new Date(),
        });
      } else {
        toast.error("Failed to get document URL");
      }
    } catch (error) {
      toast.error("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const toggleEmojiPicker = () => {
    setIsEmojiOpen((prev) => {
      if (!prev) setIsPlusOpen(false);
      return !prev;
    });
  };

  const togglePlusPopup = () => {
    setIsPlusOpen((prev) => {
      if (!prev) setIsEmojiOpen(false);
      return !prev;
    });
  };

  const onEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
    setIsEmojiOpen(false);
  };

  return (
    <div className="relative h-20 w-full flex items-center gap-x-3 px-4 justify-between rounded-xl bg-light-primary dark:bg-dark-primary z-10">
      <div className="flex items-center gap-x-3 relative">
        <Smile className="h-5 w-5 cursor-pointer" onClick={toggleEmojiPicker} />
        {isEmojiOpen && (
          <div className="absolute bottom-10 left-0 z-20">
            <EmojiPicker theme={theme} onEmojiClick={onEmojiClick} />
          </div>
        )}
        <div className="relative">
          <Plus className="h-5 w-5 cursor-pointer" onClick={togglePlusPopup} />
          {isPlusOpen && (
            <div className="absolute bottom-12 left-0 z-20 bg-white dark:bg-[#222222] rounded-lg shadow-md p-2">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => handleFileUpload(e, "document")}
                accept=".pdf,.doc,.docx,.txt"
              />
              <input
                type="file"
                ref={imageInputRef}
                className="hidden"
                onChange={(e) => handleFileUpload(e, "image")}
                accept="image/*"
              />
              <button
                className="w-full text-left flex justify-start items-center gap-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <File />
                Document
              </button>
              <button
                className="w-full text-left flex justify-start items-center gap-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300"
                onClick={() => imageInputRef.current?.click()}
                disabled={isUploading}
              >
                <Image />
                Image
              </button>
            </div>
          )}
        </div>
      </div>

      <input
        className="w-full h-10 bg-black bg-opacity-20 rounded-md outline-none active:border-none px-4 placeholder:text-sm text-gray-200"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <button
        className="flex-row-center gap-x-2 p-2 px-3 bg-black bg-opacity-20 rounded-md cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSendMessage}
        disabled={isUploading || !message.trim()}
      >
        {isUploading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <span>Send</span>
            <SendHorizonal className="h-5 w-5" />
          </>
        )}
      </button>
    </div>
  );
};

const Message = ({ message, isOwn }) => {
  const renderFile = (fileUrl, fileName) => {
    return (
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
        download={fileName}
      >
        <File className="h-4 w-4" />
        {fileName}
      </a>
    );
  };

  const renderImage = (fileUrl) => {
    return (
      <div>
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" download>
          <img
            src={fileUrl}
            alt="Uploaded image"
            className="max-h-96 rounded-lg cursor-pointer"
          />
        </a>
      </div>
    );
  };

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[70%] ${
          isOwn
            ? "bg-light-secondary dark:bg-[#177351] text-white"
            : "bg-gray-200 dark:bg-gray-700"
        } rounded-lg p-3`}
      >
        {message.type === "text" && (
          <p className="max-w-xl">{message.content}</p>
        )}
        {message.type === "image" && renderImage(message.fileUrl)}
        {message.type === "document" &&
          renderFile(message.fileUrl, message.fileName)}

        <span className="text-xs opacity-70 mt-1 flex justify-end">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

const ChatMessagingArea = ({ messages }) => {
  const messagesEndRef = useRef(null);
  const currentUser = localStorage.getItem("user");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="messaging-scrollbar h-full w-full z-10 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message}
          isOwn={message.senderId === currentUser}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

const ChatInterface = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { rightPanel, setRightPanel } = useGlobalContext();
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    const senderUser = localStorage.getItem("user");

    const getAllMessages = async () => {
      if (!senderUser) {
        toast.error("No user found");
        return;
      }

      const messageDetails = {
        senderId: senderUser,
        receiverId: user,
      };

      const response = await axios.get(GET_ALL_MESSAGES, {
        params: messageDetails,
        withCredentials: true,
      });

      setMessages(response.data.messages);
    };

    if (user && senderUser) getAllMessages();
  }, [user]);

  const handleSendMessage = async (messageData) => {
    let newMessage;
    const senderId = localStorage.getItem("user");

    try {
      newMessage = {
        ...messageData,
        senderId: senderId,
      };
      setMessages((prev) => [...prev, newMessage]);

      const result = await axios.post(
        SEND_MESSAGES,
        {
          recipientId: user,
          senderId: senderId,
          ...messageData,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      toast.error("Failed to send message");

      setMessages((prev) => prev.filter((msg) => msg !== newMessage));
    }
  };

  return (
    <div
      className="h-full w-full bg-repeat relative"
      style={{ backgroundImage: `url('src/assets/images/background.png')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-10 dark:bg-opacity-50 rounded-xl"></div>

      {currentUser ? (
        <div className="h-full p-3 flex-col-center gap-y-2">
          <ChatHeader
            userId={currentUser.userId}
            name={currentUser.name}
            avatarImage={currentUser.avatarImage}
            isOnline={currentUser.isOnline}
          />
          <ChatMessagingArea messages={messages} />
          <ChatInput
            onSendMessage={handleSendMessage}
            onFileUpload={handleSendMessage}
          />
        </div>
      ) : (
        <div>Loading user info...</div>
      )}
    </div>
  );
};

export default ChatInterface;
