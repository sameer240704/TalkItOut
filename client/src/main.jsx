import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/auth.context.jsx";
import { GlobalContextProvider } from "./context/global.context.jsx";
import { Toaster } from "react-hot-toast";
import SocketProvider from "./context/socket.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalContextProvider>
      <AuthContextProvider>
        <SocketProvider>
          <App />
          <Toaster />
        </SocketProvider>
      </AuthContextProvider>
    </GlobalContextProvider>
  </StrictMode>
);
