import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState("Messages");
  const [rightPanel, setRightPanel] = useState(null);
  const [isRightPanelClose, setIsRightPanelClose] = useState(true);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        globalState,
        setGlobalState,
        rightPanel,
        setRightPanel,
        currentFriend,
        setCurrentFriend,
        isRightPanelClose,
        setIsRightPanelClose,
        messages,
        setMessages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
