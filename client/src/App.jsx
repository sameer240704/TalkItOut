import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/ui/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage, Login, Register, TalkItOut } from "./screens";
import "./App.css";

const paths = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/sign-in",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Register />,
  },
  {
    path: "/talkitout",
    element: <TalkItOut />,
  },
];

const BrowserRouter = createBrowserRouter(paths);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={BrowserRouter} />
    </ThemeProvider>
  );
}

export default App;
