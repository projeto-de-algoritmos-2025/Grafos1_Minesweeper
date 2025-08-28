import { Board } from "./components/board";
import { Header } from "./components/header";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen w-screen">
        <Header />
        <Board />
      </div>
    </ThemeProvider>
  );
}

export default App;
