import { useState } from "react";
import { Square } from "./square";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Timer, FlagTriangleRight } from "lucide-react";

export const Board = () => {
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const initialBoard = Array(10).fill(Array(10).fill(""));

  const [game, setGame] = useState(initialBoard);

  function createBoard() {
    const newGame = [...game];
    let bombsPlaced = 0;
    while (bombsPlaced < 10) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      if (newGame[row][col] !== "💣") {
        newGame[row][col] = "💣";
        bombsPlaced++;
      }
    }
    setGame(newGame);
  }

  function playGame() {
    if (!hasGameStarted) {
      createBoard();
      console.log("game: ", game);
      setHasGameStarted(true);
      return;
    }
    // O jogo iniciou?
    // Criar tabuleiro

    // Expandir tabuleiro
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card>
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
                setGame(initialBoard);
              }}
            >
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex">
          {game.map((row, rowIndex: number) => (
            <div key={rowIndex} className="flex flex-col">
              {row.map((cell: string, cellIndex: number) => (
                <Square key={cellIndex} content={cell} onClick={playGame} />
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
