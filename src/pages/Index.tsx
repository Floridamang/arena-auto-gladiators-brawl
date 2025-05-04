
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
      className="min-h-screen w-full py-8 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: "url('/lovable-uploads/e9f268a5-cd22-4514-a298-0fde6957fb43.png')",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <Arena />
    </div>
  );
};

export default Index;
