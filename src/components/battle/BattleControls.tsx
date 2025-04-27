
import { Button } from "@/components/ui/button";
import { Square } from "lucide-react";
import { Link } from "react-router-dom";

interface BattleControlsProps {
  isFighting: boolean;
  onFight: () => void;
  onStop: () => void;
  onReset: () => void;
  battleEnded: boolean;
}

const BattleControls = ({
  isFighting,
  onFight,
  onStop,
  onReset,
  battleEnded
}: BattleControlsProps) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <Button
        onClick={onFight}
        disabled={isFighting}
        className="bg-game-primary hover:bg-game-primary/90 text-white"
      >
        {battleEnded ? "New Battle" : isFighting ? "Fighting..." : "Start Battle"}
      </Button>
      
      {isFighting && (
        <Button
          onClick={onStop}
          className="bg-red-500 hover:bg-red-600 text-white"
          title="Stop Combat"
        >
          <Square className="mr-1" /> Stop Combat
        </Button>
      )}
      
      <Button
        onClick={onReset}
        variant="outline"
        className="border-game-dark text-game-dark"
      >
        Reset
      </Button>
      
      <Link to="/">
        <Button variant="ghost" className="text-game-dark hover:text-game-primary">
          Return Home
        </Button>
      </Link>
    </div>
  );
};

export default BattleControls;
