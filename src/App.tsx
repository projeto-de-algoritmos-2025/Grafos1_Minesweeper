import { Minesweeper } from "./components/minesweeper";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Minesweeper />
    </ThemeProvider>
  );
}

export default App;
