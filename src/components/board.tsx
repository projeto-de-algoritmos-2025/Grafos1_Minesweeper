import type { Cell } from "@/types/cell";
import { useEffect, useState } from "react";
import { useCronometro } from "./cronometro";
import { EndGameModal } from "./endGameModal";
import { HeaderBoard } from "./headerBoard";
import { Square } from "./square";
import { Card, CardContent } from "./ui/card";

export const Board = () => {
  const [gameState, setGameState] = useState<
    "win" | "lost" | "noStarted" | "running"
  >("noStarted");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">(
    "Easy"
  );
  const [isResetButtonEnabled, setIsResetButtonEnabled] = useState(true);
  const [shouldOpenEndGameModal, setShouldOpenEndGameModal] = useState(false);
  const [boardSize, setBoardSize] = useState(getsBoardDifficult()?.size);
  const [flagsQuantity, setFlagsQuantity] = useState(
    getsBoardDifficult()?.bombQuantity
  );
  const [game, setGame] = useState<Cell[][]>(
    Array.from({ length: boardSize }, () =>
      Array.from({ length: boardSize }, () => ({
        content: "",
        isVisible: false,
        hasFlag: false,
      }))
    )
  );

  const { segundos, parar, iniciar, resetar } = useCronometro();

  function getsBoardDifficult() {
    const sizeEasy = 10;
    const sizeMedium = 13;
    const sizeHard = 15;
    const bombQuantityEasy = 10;
    const bombQuantityMedium = 15;
    const bombQuantityHard = 20;

    switch (difficulty) {
      case "Easy":
        return { size: sizeEasy, bombQuantity: bombQuantityEasy };
      case "Medium":
        return { size: sizeMedium, bombQuantity: bombQuantityMedium };
      case "Hard":
        return { size: sizeHard, bombQuantity: bombQuantityHard };
    }
  }

  function resetGame() {
    const { size, bombQuantity } = getsBoardDifficult();
    setFlagsQuantity(bombQuantity);
    setBoardSize(size);
    const newBoard = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({
        content: "",
        isVisible: false,
        hasFlag: false,
      }))
    );
    setGame(newBoard);
    setGameState("noStarted");
    resetar();
    parar();
  }

  function createBoard(x: number, y: number) {
    const { size, bombQuantity } = getsBoardDifficult();
    setGameState("running");
    const newGame: Cell[][] = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({
        content: "",
        isVisible: false,
        hasFlag: false,
      }))
    );

    let bombsPlaced = 0;

    const safeZone = new Set<string>();
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < size && newY >= 0 && newY < size) {
          safeZone.add(`${newX},${newY}`);
        }
      }
    }

    while (bombsPlaced < bombQuantity) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      const key = `${row},${col}`;

      if (!safeZone.has(key) && newGame[row][col]?.content !== "💣") {
        newGame[row][col] = { content: "💣", isVisible: false, hasFlag: false };
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

  function revealBombs(x: number, y: number, board: Cell[][]) {
    setIsResetButtonEnabled(false);
    const updatedBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    const size = updatedBoard.length;
    const visited = new Set<string>();

    const delay = 300;
    let time = 0;

    function dfs(row: number, col: number) {
      const key = `${row},${col}`;
      if (
        row < 0 ||
        row >= size ||
        col < 0 ||
        col >= size ||
        visited.has(key)
      ) {
        return;
      }

      visited.add(key);

      if (updatedBoard[row][col].content === "💣") {
        setTimeout(() => {
          updatedBoard[row][col].isVisible = true;
          setGame([...updatedBoard]);
        }, time);
        time += delay;
      }

      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];

      for (const [dx, dy] of directions) {
        dfs(row + dx, col + dy);
      }
    }

    updatedBoard[x][y].isVisible = true;
    setGame([...updatedBoard]);

    dfs(x, y);
  }

  function markFlag(x: number, y: number) {
    if (gameState !== "running") return;

    if (game[x][y].isVisible) return;

    const newGame = game.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex === x && colIndex === y) {
          return {
            ...cell,
            hasFlag: !cell.hasFlag,
          };
        }
        return cell;
      })
    );

    setGame(newGame);
    setFlagsQuantity((prev) => prev + (game[x][y].hasFlag ? 1 : -1));
  }

  function playGame(x: number, y: number) {
    if (gameState === "noStarted") {
      const newBoard = createBoard(x, y);
      const expandedBoard = expandBoard(x, y, newBoard);
      setGame(expandedBoard);
      iniciar();
    } else {
      if (gameState === "running") {
        const clickedCell = game[x][y];

        if (clickedCell.hasFlag) return;
        if (clickedCell.content !== "💣") {
          if (clickedCell.isVisible) {
            return;
          }
          const expandedBoard = expandBoard(x, y, game);
          setGame(expandedBoard);

          const { size, bombQuantity } = getsBoardDifficult();
          const totalCells = size ** 2;
          const totalNonBombCells = totalCells - bombQuantity;

          let VisibleCellsCount = 0;

          for (let row = 0; row < expandedBoard.length; row++) {
            for (let col = 0; col < expandedBoard[row].length; col++) {
              if (expandedBoard[row][col].isVisible) {
                VisibleCellsCount++;
              }
            }
          }

          if (VisibleCellsCount === totalNonBombCells) {
            setGameState("win");
            parar();
            setShouldOpenEndGameModal(true);
          }
        } else {
          setGameState("lost");
          revealBombs(x, y, game);
          parar();
          setTimeout(() => {
            setShouldOpenEndGameModal(true);
            setIsResetButtonEnabled(true);
          }, 4000);

          return;
        }
      }
    }
  }

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card>
        <HeaderBoard
          setGameState={setGameState}
          segundos={segundos}
          resetar={resetGame}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          isResetButtonEnabled={isResetButtonEnabled}
          flagsQuantity={flagsQuantity}
        />
        <CardContent className="flex">
          {game.map((row, rowIndex: number) => (
            <div key={rowIndex} className="flex flex-col">
              {row.map((cell: Cell, cellIndex: number) => (
                <Square
                  key={cellIndex}
                  cell={cell}
                  onClick={() => playGame(rowIndex, cellIndex)}
                  boardSize={boardSize}
                  onRightClick={() => markFlag(rowIndex, cellIndex)}
                />
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
      {shouldOpenEndGameModal ? (
        <EndGameModal
          gameState={gameState}
          open={shouldOpenEndGameModal}
          onOpenChange={setShouldOpenEndGameModal}
          resetGame={resetGame}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
