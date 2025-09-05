import { FlagTriangleRight, Timer } from "lucide-react";
import { Button } from "./ui/button";
import { CardHeader } from "./ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import type { Cell } from "@/types/cell"

type HeaderBoardProps = {
  setHasGameStarted: (value: boolean) => void, 
  setGame: (value: Cell[][]) => void;
  segundos: number;
  resetar: ()=> void;
  difficulty: "Easy" | "Medium" | "Hard";
  setDifficulty: (Value: "Easy" | "Medium" | "Hard") =>void;
};

function formatarTempo(totalSegundos: number) {
  const minutos = Math.floor(totalSegundos / 60).toString().padStart(2, "0");
  const segundos = (totalSegundos % 60).toString().padStart(2, "0");
  return `${minutos}:${segundos}`;
}

export const HeaderBoard = ({ setHasGameStarted, setGame, segundos, resetar, difficulty, setDifficulty }: HeaderBoardProps) => {


  return (
    <CardHeader>
          <div className="flex justify-between items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Level</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  Choose the difficulty of the game
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                checked={difficulty === "Easy"}
                onCheckedChange={() => setDifficulty("Easy")}
                >
                  Easy</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                checked={difficulty === "Medium"}
                onCheckedChange={()=> setDifficulty("Medium")}
                >
                  Medium</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                checked={difficulty === "Hard"}
                onCheckedChange={()=> setDifficulty("Hard")}
                >
                  Hard</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex gap-3">
              <div className="flex gap-1 aling-center">
                <FlagTriangleRight /> <span>10</span>
              </div>
              <div className="flex gap-1 aling-center">
                <Timer /> <span>{formatarTempo(segundos)}</span>
              </div>
            </div>
            <Button
              onClick={() => {
                setHasGameStarted(false);
                setGame(Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ({ content: "", isVisible: false }))))
                resetar();
              }}
            >
              Reset
            </Button>
          </div>
        </CardHeader>
  );
};
