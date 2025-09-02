import { useState, type JSX } from "react";
import { Button } from "./ui/button";
import { FlagTriangleRight } from "lucide-react";
import type { Cell } from "@/types/cell";

type squareProps = {
  cell: Cell;
  content?: string | JSX.Element ;
  onClick?: () => void;
};

export const Square = ({ cell, content, onClick }: squareProps) => {
  const [hasFlag, setHasFlag] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="flex align-center justify-center">
      <Button
        variant={ isRevealed ? "ghost" : "outline" }
        size="icon"
        className="relative h-8 w-8 rounded-none p-0"
        onClick={() => {setIsRevealed(true); if(onClick) onClick()}}
        onContextMenu={(event) => {
          event.preventDefault();
          setHasFlag(!hasFlag);
        }}
      >
        <div>
          {hasFlag && !cell.isVisible ? (
            <span>
              <FlagTriangleRight />
            </span>
          ) : (
            <></>
          )}
          {cell.isVisible ? <span>{cell.content}</span> : <span />}
        </div>
      </Button>
    </div>
  );
};
