import { Button } from "./ui/button";
import { FlagTriangleRight } from "lucide-react";
import type { Cell } from "@/types/cell";

type squareProps = {
  cell: Cell;
  onClick?: () => void;
  onRightClick?: () => void;
  boardSize: number;
};

export const Square = ({
  cell,
  onClick,
  onRightClick,
  boardSize,
}: squareProps) => {
  const sizeMap: { [key: number]: string } = {
    10: "32px",
    15: "24px",
    20: "18px",
  };

  const squareSize = sizeMap[boardSize] || "32px";

  return (
    <div className="flex align-center justify-center">
      <Button
        variant={cell?.isVisible ? "ghost" : "outline"}
        // size="icon"
        style={{ width: squareSize, height: squareSize }}
        className="relative h-8 w-8 rounded-none p-0"
        onClick={() => {
          if (onClick) onClick();
        }}
        onContextMenu={(event) => {
          event.preventDefault();
          if (onRightClick) onRightClick();
        }}
      >
        <div>
          {cell.hasFlag && !cell.isVisible ? (
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
