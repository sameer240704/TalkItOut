import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState("Messages");
  const [rightPanel, setRightPanel] = useState(null);

  return (
    <GlobalContext.Provider
      value={{ globalState, setGlobalState, rightPanel, setRightPanel }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
