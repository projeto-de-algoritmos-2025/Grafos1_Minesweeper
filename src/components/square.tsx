import { useState, type JSX } from "react";
import { Button } from "./ui/button";
import { FlagTriangleRight } from "lucide-react";

type squareProps = {
  content?: string | JSX.Element;
};

export const Square = ({ content }: squareProps) => {
  const [hasFlag, setHasFlag] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="flex align-center justify-center">
      <Button
        variant="outline"
        size="icon"
        className="relative h-8 w-8 rounded-none p-0"
        onClick={() => setIsRevealed(true)}
        onContextMenu={(event) => {
          event.preventDefault();
          setHasFlag(!hasFlag);
        }}
      >
        <div>
          {hasFlag && !isRevealed ? (
            <span>
              <FlagTriangleRight />
            </span>
          ) : (
            <></>
          )}
          {isRevealed ? <span>{content}</span> : <span />}
        </div>
      </Button>
    </div>
  );
};
