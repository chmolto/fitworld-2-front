export interface Exercise {
  id: number;
  name: string;
  muscleGroup: MuscleGroups[];
  muscles: string[];
  antagonists: string[];
}

export type MuscleGroups =
  | "Chest"
  | "Back"
  | "Legs"
  | "Arms"
  | "Shoulders"
  | "Abs";
