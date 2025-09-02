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
import type { Cell } from "@/types/cell";

export const Board = () => {
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const initialBoard: Cell[][] = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => ({ content: "", isVisible: false }))
  );

  const [game, setGame] = useState<Cell[][]>(initialBoard);

  function createBoard(x: number, y: number): Cell[][] {
    const size = 10;
    const newGame: Cell[][] = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({ content: "", isVisible: false }))
    );
    // const newGame = Array.from({ length: size }, () => Array(size).fill(Array(10).fill({content: "", isVisible: false})));

    const bombQuantity = 10;
    let bombsPlaced = 0;

    while (bombsPlaced < bombQuantity) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if (!(row === x && col === y) && newGame[row][col]?.content !== "💣") {
        newGame[row][col] = {content: "💣", isVisible: false};
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
      if (newGame[row][col]?.content === "💣") {
        directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;

        if (
          newRow >= 0 &&
          newRow < size &&
          newCol >= 0 &&
          newCol < size &&
          newGame[newRow][newCol]?.content !== "💣"
        ) {
          const currentCell = newGame[newRow][newCol];
          const currentValue = parseInt(String(currentCell.content)) || 0;
          newGame[newRow][newCol] = {
          ...currentCell,
          content: (currentValue + 1).toString(),
          };
        }
        });
      }
      }
    }
    
    newGame[x][y].isVisible = true;

    console.log(newGame);
    return newGame;
  }

  function expandBoard(x: number, y: number, board: Cell[][]) {
    const size = board.length;

    const newGame = board.map(row => row.map(cell => ({ ...cell})));

    const queue: [number, number][] = [[x, y]];

    const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
    ];

    while (queue.length > 0){
      const [currentRow, currentCol] = queue.shift()!;
      const currentCell = newGame[currentRow][currentCol];

      if (currentCell.isVisible || currentCell.content === "💣"){
        continue;
      }

      newGame[currentRow][currentCol].isVisible = true;

      if (currentCell.content !== "") {
        continue;
      }

      directions.forEach( ([dx, dy]) => {
        const newRow = currentRow + dx;
        const newCol = currentCol + dy;

        if (newRow>=0 && newRow < size && newCol>=0 &&newCol <size)
        {
          const neighbor = newGame[newRow][newCol];
          if(!neighbor.isVisible){
            queue.push([newRow,newCol]);
          }
        }
      })

    }
   
    return newGame;

  }

  function playGame(x: number, y: number) {

    let newGame: Cell[][];

    if (!hasGameStarted) {
      const inicialBoardWithBombs = createBoard(x, y);
      const clickedCell = inicialBoardWithBombs[x][y];

      if(clickedCell.content === ""){
        newGame = expandBoard(x, y, inicialBoardWithBombs);
      } else {
        newGame = inicialBoardWithBombs
      }
      
      setGame(newGame);
      setHasGameStarted(true);
      
    } else {
      
      const clickedCell = game[x][y];
      
      if(clickedCell.isVisible){
        return;
      }
      
      if(clickedCell.content === "💣"){
        console.log("fim de jogo!");
        return;
      }
      
      if(clickedCell.content === ""){
        newGame = expandBoard(x, y, game);
      }else{
        newGame = game.map((row, rowIndex) =>
          row.map((cell, cellIndex) =>
            rowIndex === x && cellIndex === y ? { ...cell, isVisible: true } : cell
      )
    );
  }
  
  setGame(newGame);
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
              {row.map((cell: Cell, cellIndex: number) => (
                <Square
                  key={cellIndex}
                  cell={cell}
                  onClick={() => playGame(rowIndex, cellIndex)}
                />
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
