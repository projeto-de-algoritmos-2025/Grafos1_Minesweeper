import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";

type EndGameModalProps = {
  gameState: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resetGame: () => void;
};

export const EndGameModal = ({
  gameState,
  open,
  onOpenChange,
  resetGame,
}: EndGameModalProps) => {
  const isWin = gameState === "win";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{isWin ? "Congrats!" : "Game Over"}</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            View Board
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
              resetGame();
            }}
          >
            {isWin ? "Play Again" : "Try Again"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
