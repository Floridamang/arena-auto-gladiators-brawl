
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gladiator } from '@/types/gladiator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface GladiatorSelectorProps {
  gladiators: Gladiator[];
  selectedGladiator: Gladiator;
  onSelectGladiator: (gladiator: Gladiator) => void;
}

const GladiatorSelector = ({ gladiators, selectedGladiator, onSelectGladiator }: GladiatorSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src="/lovable-uploads/8f18e069-f431-4d6b-8b8b-7ed3f153d601.png" alt="Gladiator" />
        <AvatarFallback>{selectedGladiator.name[0]}</AvatarFallback>
      </Avatar>
      
      <Select 
        value={selectedGladiator.id} 
        onValueChange={(value) => {
          const gladiator = gladiators.find(g => g.id === value);
          if (gladiator) {
            onSelectGladiator(gladiator);
          }
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a gladiator" />
        </SelectTrigger>
        <SelectContent>
          {gladiators.map((gladiator) => (
            <SelectItem key={gladiator.id} value={gladiator.id}>
              {gladiator.name} (Level {gladiator.level || 1})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default GladiatorSelector;
