
export interface Gladiator {
  id: string;
  name: string;
  attack: number;
  defense: number;
  health: number;
  isLeft?: boolean;
  traits: GladiatorTrait[];
  attackCount?: number;
}

export interface GladiatorTrait {
  name: "bold" | "resentful";
  description: string;
}
