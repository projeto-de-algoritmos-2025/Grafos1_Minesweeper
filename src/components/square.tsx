import { useState } from "react";
import { Button } from "./ui/button";
import { FlagTriangleRight } from "lucide-react";
import type { Cell } from "@/types/cell";

type squareProps = {
  cell: Cell;
  onClick?: () => void;
};

export const Square = ({ cell, onClick }: squareProps) => {
  const [hasFlag, setHasFlag] = useState(false);

  return (
    <div className="flex align-center justify-center">
      <Button
        variant={ cell?.isVisible ? "ghost" : "outline" }
        size="icon"
        className="relative h-8 w-8 rounded-none p-0"
        onClick={() => {if(onClick) onClick()}}
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
