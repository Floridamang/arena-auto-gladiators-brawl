
import { Gladiator } from "@/types/gladiator";

interface GladiatorSvgProps {
  gladiator: Gladiator;
  isAttacking: boolean;
  isHurt: boolean;
  isCriticalHit?: boolean;
  isEvaded?: boolean;
}

const GladiatorSvg = ({ gladiator, isAttacking, isHurt, isCriticalHit, isEvaded }: GladiatorSvgProps) => {
  const animationClass = gladiator.isLeft
    ? isAttacking
      ? "animate-attack-right"
      : isHurt
      ? `animate-take-hit ${isCriticalHit ? "animate-shake" : ""}`
      : isEvaded
      ? "animate-evade"
      : ""
    : isAttacking
    ? "animate-attack-left"
    : isHurt
    ? `animate-take-hit ${isCriticalHit ? "animate-shake" : ""}`
    : isEvaded
    ? "animate-evade"
    : "";

  const mirrorClass = gladiator.isLeft ? "" : "scale-x-[-1]";
  const criticalClass = isCriticalHit && isHurt ? "drop-shadow-[0_0_8px_rgba(234,56,76,0.8)]" : "";
  const evadeClass = isEvaded ? "opacity-50" : "";

  return (
    <div className={`${animationClass} ${mirrorClass} ${criticalClass} ${evadeClass}`}>
      <svg width="120" height="160" viewBox="0 0 120 160">
        {/* Body */}
        <path
          d="M60 40 L80 90 L60 140 L40 90 Z"
          fill="#6E59A5"
          stroke="#1A1F2C"
          strokeWidth="2"
        />
        
        {/* Head */}
        <circle cx="60" cy="30" r="20" fill="#8E9196" stroke="#1A1F2C" strokeWidth="2" />
        
        {/* Helmet */}
        <path
          d="M40 30 Q60 0 80 30"
          fill="none"
          stroke="#9b87f5"
          strokeWidth="4"
        />
        
        {/* Arms */}
        <line x1="40" y1="60" x2="20" y2="80" stroke="#8E9196" strokeWidth="4" />
        <line x1="80" y1="60" x2="100" y2="80" stroke="#8E9196" strokeWidth="4" />
        
        {/* Sword (right hand) */}
        <line x1="100" y1="80" x2="110" y2="60" stroke="#D946EF" strokeWidth="3" />
        
        {/* Shield (left hand) */}
        <path
          d="M15 75 Q20 65 25 75 Q20 85 15 75"
          fill="#F97316"
          stroke="#1A1F2C"
          strokeWidth="2"
        />
        
        {/* Legs */}
        <line x1="60" y1="140" x2="50" y2="160" stroke="#8E9196" strokeWidth="4" />
        <line x1="60" y1="140" x2="70" y2="160" stroke="#8E9196" strokeWidth="4" />
      </svg>
    </div>
  );
};

export default GladiatorSvg;
