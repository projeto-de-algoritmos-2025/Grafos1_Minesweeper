import { Board } from "./components/board";
import { HeaderPage } from "./components/headerPage";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen w-screen">
        <HeaderPage />
        <Board />
      </div>
    </ThemeProvider>
  );
}

export default App;
