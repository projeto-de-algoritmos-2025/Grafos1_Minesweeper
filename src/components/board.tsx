import { useEffect, useState } from "react";
import { Square } from "./square";
import { Card, CardContent } from "./ui/card";
import type { Cell } from "@/types/cell";
import { HeaderBoard } from "./headerBoard";
import { useCronometro } from "./cronometro";

export const Board = () => {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const {segundos, parar, iniciar, resetar} = useCronometro();
  const [difficulty, setDifficulty] = useState< "Easy" | "Medium" | "Hard">("Easy");

  const sizeEasy = 10;
  const sizeMedium = 13;
  const sizeHard = 15;
  const bombQuantityEasy = 10;
  const bombQuantityMedium = 15;
  const bombQuantityHard = 20;

  function getsBoardDifficult(){
    switch(difficulty){
      case "Easy":
        return {size: sizeEasy, bombQuantity: bombQuantityEasy}
      case "Medium":
        return {size: sizeMedium, bombQuantity: bombQuantityMedium}
      case "Hard":
        return {size: sizeHard, bombQuantity: bombQuantityHard}
    }
  }

  const [boardSize, setBoardSize] = useState(10);
  const [game, setGame] = useState<Cell[][]>(Array.from({ length: boardSize}, () => Array.from ({ length: boardSize }, () => ({ content: "", isVisible: false}))));

  useEffect(() => {
    resetGame();
  }, [difficulty]);

  function resetGame() {
    const { size } = getsBoardDifficult();
    setBoardSize(size);
    const newBoard = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => ({ content: "", isVisible: false }))
    );
    setGame(newBoard);
    setHasGameStarted(false);
    resetar();
    parar();
}

  function createBoard(x: number, y: number) {
    const {size, bombQuantity} = getsBoardDifficult();
    const newGame: Cell[][] = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({ content: "", isVisible: false }))
    );

    let bombsPlaced = 0;

    while (bombsPlaced < bombQuantity) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if (!(row === x && col === y) && newGame[row][col]?.content !== "💣") {
        newGame[row][col] = { content: "💣", isVisible: false };
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

    console.log(newGame);
    return newGame;
  }

  //aplicação da bfs
  function expandBoard(x: number, y: number, board: Cell[][]) {
    const size = board.length;

    const newGame = board.map((row) => row.map((cell) => ({ ...cell })));

    const queue: [number, number][] = [[x, y]];

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

    while (queue.length > 0) {
      const [currentRow, currentCol] = queue.shift()!;
      const currentCell = newGame[currentRow][currentCol];

      if (currentCell.isVisible || currentCell.content === "💣") {
        continue;
      }

      newGame[currentRow][currentCol].isVisible = true;

      if (currentCell.content !== "") {
        continue;
      }

      directions.forEach(([dx, dy]) => {
        const newRow = currentRow + dx;
        const newCol = currentCol + dy;

        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
          const neighbor = newGame[newRow][newCol];
          if (!neighbor.isVisible) {
            queue.push([newRow, newCol]);
          }
        }
      });
    }

    return newGame;
  }

  function playGame(x: number, y: number) {
    if (!hasGameStarted) {
      const newBoard = createBoard(x, y);
      const expandedBoard = expandBoard(x, y, newBoard);
      setGame(expandedBoard);
      setHasGameStarted(true);
      iniciar();
    } else {
      const clickedCell = game[x][y];
      if (clickedCell.content !== "💣") {
        if (clickedCell.isVisible) {
          return;
        }
        const expandedBoard = expandBoard(x, y, game);
        setGame(expandedBoard);
      } else {
        // Inserir algoritmo para revelar bombas no tabuleiro
        parar();
        console.log("fim de jogo!");
        return;
      }
    }
  }
  //adicionar logica de vitoria e parar o cronometro
  //contar todos os cliques, se for total de coluna x linhas do tabuleiro - numero de bomba. vitoria

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card>
        <HeaderBoard setHasGameStarted={setHasGameStarted} setGame={setGame} segundos={segundos} resetar={resetGame} difficulty={difficulty} setDifficulty={setDifficulty}/>
        <CardContent className="flex">
          {game.map((row, rowIndex: number) => (
            <div key={rowIndex} className="flex flex-col">
              {row.map((cell: Cell, cellIndex: number) => (
                <Square
                  key={cellIndex}
                  cell={cell}
                  onClick={() => playGame(rowIndex, cellIndex)}
                  boardSize={boardSize}
                />
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};


