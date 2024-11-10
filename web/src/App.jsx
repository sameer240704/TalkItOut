import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/ui/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <div className="h-screen flex-col-center mx-10">
        <div className="flex-row-center gap-10 mb-10">
          <Button>Hello World</Button>
          <ModeToggle />
        </div>
        <div className="text-xl text-black dark:text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          cupiditate repellat expedita adipisci illum eligendi quaerat maxime
          incidunt aspernatur, perspiciatis ad est esse consectetur autem modi
          corporis, natus magnam quos!
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
