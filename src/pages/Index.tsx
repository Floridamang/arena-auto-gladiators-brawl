
import Arena from "@/components/Arena";
import { useGame } from "@/context/GameContext";
import { useEffect } from "react";

const Index = () => {
  const { advanceCycle } = useGame();

  // Advance day cycle when entering arena
  useEffect(() => {
    advanceCycle();
  }, [advanceCycle]);

  return (
    <div className="min-h-screen bg-game-light py-8">
      <Arena />
    </div>
  );
};

export default Index;
