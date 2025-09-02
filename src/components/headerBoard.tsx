import { FlagTriangleRight, Timer } from "lucide-react";
import { Button } from "./ui/button";
import { CardHeader } from "./ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import type { Cell } from "@/types/cell";

type HeaderBoardProps = {
  setHasGameStarted: (value: boolean) => void, 
  setGame: (value: Cell[][]) => void;
}

export const HeaderBoard = ({ setHasGameStarted, setGame }: HeaderBoardProps) => {


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
                <DropdownMenuCheckboxItem>Easy</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Medium</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Panel</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex gap-3">
              <div className="flex gap-1 aling-center">
                <FlagTriangleRight /> <span>10</span>
              </div>
              <div className="flex gap-1 aling-center">
                <Timer /> <span>0:00</span>
              </div>
            </div>
            <Button
              onClick={() => {
                setHasGameStarted(false);
                setGame(Array(10).fill(Array(10).fill({content: "", isVisible: false})));
              }}
            >
              Reset
            </Button>
          </div>
        </CardHeader>
  );
};
