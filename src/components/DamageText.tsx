
import React, { useEffect, useState } from 'react';

interface DamageTextProps {
  text: string;
  type: "normal" | "critical" | "miss";
}

const DamageText = ({ text, type }: DamageTextProps) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!visible) return null;
  
  const getTextColor = () => {
    switch (type) {
      case "critical":
        return "text-red-500 font-bold";
      case "miss":
        return "text-gray-400";
      default:
        return "text-white";
    }
  };
  
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 animate-fade-out">
      <div className={`text-xl ${getTextColor()} animate-take-hit drop-shadow-lg`}>
        {text}
      </div>
    </div>
  );
};

export default DamageText;
