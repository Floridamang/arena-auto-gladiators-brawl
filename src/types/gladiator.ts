export interface Gladiator {
  id: string;
  name: string;
  attack: number;
  defense: number;
  health: number;
  isLeft?: boolean;
  traits: GladiatorTrait[];
  attackCount?: number;
  strength: number;
  agility: number;
  stamina: number;
  maxStamina: number;
  endurance: number;
  level?: number;
  experience?: number;
  experienceToNextLevel?: number;
  wins?: number;
}

export interface GladiatorTrait {
  name: "bold" | "resentful";
  description: string;
}

export interface PurchasableGladiator extends Gladiator {
  cost: number;
  image: string;
}
