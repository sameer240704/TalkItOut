import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(null);
  const [rightPanel, setRightPanel] = useState(null);

  return (
    <GlobalContext.Provider
      value={{ globalState, setGlobalState, rightPanel, setRightPanel }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
