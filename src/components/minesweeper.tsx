import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";

export const Minesweeper = () => {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Button variant="outline" size="icon" onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")} className="relative h-8 w-8 rounded-full p-0">
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};
