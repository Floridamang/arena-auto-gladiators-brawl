
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { Gladiator } from "@/types/gladiator";

interface AttributeAllocatorProps {
  selectedGladiator: Gladiator;
  availableSkillPoints: number;
  tempAttributes: {
    strength: number;
    agility: number;
    endurance: number;
    maxStamina: number;
  };
  allocateSkillPoint: (attribute: keyof Pick<Gladiator, "strength" | "agility" | "endurance" | "maxStamina">, value: number) => void;
  resetSkillPoints: () => void;
  levelUp: () => void;
}

const AttributeAllocator = ({
  selectedGladiator,
  availableSkillPoints,
  tempAttributes,
  allocateSkillPoint,
  resetSkillPoints,
  levelUp
}: AttributeAllocatorProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-game-dark">Level Up!</h2>
        <div className="bg-game-primary text-white px-3 py-1 rounded-full">
          {availableSkillPoints} Points Available
        </div>
      </div>
      
      <p className="mb-4 text-gray-600">
        Allocate your skill points to improve your gladiator's attributes.
      </p>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <h3 className="font-semibold">Strength</h3>
            <p className="text-sm text-gray-500">Increases damage dealt</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono">
              {selectedGladiator.strength} 
              {tempAttributes.strength > 0 && (
                <span className="text-green-600">+{tempAttributes.strength}</span>
              )}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => allocateSkillPoint("strength", -1)} 
              disabled={tempAttributes.strength <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => allocateSkillPoint("strength", 1)} 
              disabled={availableSkillPoints <= 0}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <h3 className="font-semibold">Agility</h3>
            <p className="text-sm text-gray-500">Increases attack speed and dodge chance</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono">
              {selectedGladiator.agility} 
              {tempAttributes.agility > 0 && (
                <span className="text-green-600">+{tempAttributes.agility}</span>
              )}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => allocateSkillPoint("agility", -1)} 
              disabled={tempAttributes.agility <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => allocateSkillPoint("agility", 1)} 
              disabled={availableSkillPoints <= 0}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <h3 className="font-semibold">Endurance</h3>
            <p className="text-sm text-gray-500">Increases stamina regeneration</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono">
              {selectedGladiator.endurance} 
              {tempAttributes.endurance > 0 && (
                <span className="text-green-600">+{tempAttributes.endurance}</span>
              )}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => allocateSkillPoint("endurance", -1)} 
              disabled={tempAttributes.endurance <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => allocateSkillPoint("endurance", 1)} 
              disabled={availableSkillPoints <= 0}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <h3 className="font-semibold">Maximum Stamina</h3>
            <p className="text-sm text-gray-500">Increases total stamina capacity</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono">
              {selectedGladiator.maxStamina} 
              {tempAttributes.maxStamina > 0 && (
                <span className="text-green-600">+{tempAttributes.maxStamina}</span>
              )}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => allocateSkillPoint("maxStamina", -1)} 
              disabled={tempAttributes.maxStamina <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => allocateSkillPoint("maxStamina", 1)} 
              disabled={availableSkillPoints <= 0}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={resetSkillPoints}>
          Reset
        </Button>
        <Button 
          onClick={levelUp} 
          disabled={
            tempAttributes.strength === 0 && 
            tempAttributes.agility === 0 && 
            tempAttributes.endurance === 0 && 
            tempAttributes.maxStamina === 0
          }
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default AttributeAllocator;
