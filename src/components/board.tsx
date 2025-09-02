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

  function createBoard(x: number, y: number) {
    const size = 10;
    const newGame = Array.from({ length: size }, () => Array(size).fill(""));

    const bombQuantity = 10;
    let bombsPlaced = 0;

    while (bombsPlaced < bombQuantity) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if (!(row === x && col === y) && newGame[row][col] !== "💣") {
        newGame[row][col] = "💣";
        bombsPlaced++;
      }
    }

    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (newGame[row][col] === "💣") {
          directions.forEach(([dx, dy]) => {
            const newRow = row + dx;
            const newCol = col + dy;

            if (
              newRow >= 0 &&
              newRow < size &&
              newCol >= 0 &&
              newCol < size &&
              newGame[newRow][newCol] !== "💣"
            ) {
              newGame[newRow][newCol] =
                (parseInt(newGame[newRow][newCol]) || 0) + 1;
            }
          });
        }
      }
    }

    setGame(newGame);
  }

  function playGame(x: number, y: number) {
    if (!hasGameStarted) {
      createBoard(x, y);
      setHasGameStarted(true);
      return;
    }
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
                <Square key={cellIndex} content={cell} onClick={() => playGame(rowIndex, cellIndex)} />
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
