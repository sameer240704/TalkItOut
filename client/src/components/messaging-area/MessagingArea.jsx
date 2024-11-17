import React from "react";
import { useGlobalContext } from "../../context/global.context";
import { Logo } from "../../assets";
import { Lock } from "lucide-react";
import ChatInterface from "./ChatInterface";

const MessagingArea = () => {
  const { currentFriend } = useGlobalContext();

  const NotSelected = () => {
    return (
      <div className="h-full flex-col-center relative select-none">
        <img src={Logo} alt="TalkItOut" className="h-36 w-auto" />
        <h1 className="text-3xl mt-3 tracking-wider font-semibold">
          TalkItOut Web
        </h1>
        <h3 className="mt-2 text-sm">
          Connect seamlessly, wherever you are in the world.
        </h3>
        <h2 className="text-sm">
          Your ultimate messaging experience starts here!
        </h2>

        <div className="absolute bottom-5 flex-row-center gap-x-2">
          <Lock className="h-4 w-4 text-gray-700 dark:text-gray-500" />
          <h1 className="text-sm text-gray-700 dark:text-gray-500">
            Your personal messages are end-to-end encrypted
          </h1>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex-grow rounded-2xl bg-light-primary bg-opacity-60 dark:bg-dark-secondary dark:bg-opacity-60">
      {!currentFriend ? (
        <NotSelected />
      ) : (
        <ChatInterface user={currentFriend} />
      )}
    </div>
  );
};

export default MessagingArea;
