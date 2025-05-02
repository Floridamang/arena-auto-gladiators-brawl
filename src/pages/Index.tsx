
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
    <div 
      className="min-h-screen py-8"
      style={{ 
        backgroundImage: "url('/lovable-uploads/e9f268a5-cd22-4514-a298-0fde6957fb43.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Arena />
    </div>
  );
};

export default Index;
