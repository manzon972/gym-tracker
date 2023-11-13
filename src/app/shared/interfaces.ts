export interface GymProgramResponseI {
  success: boolean;
  routine: RoutineI;
}

export interface RoutineI {
  days: DayI[];
}

export interface DayI {
  id: string;
  dayName: string;
  exercises: ExerciseI[];
}

export interface ExerciseI {
  id: string;
  exerciseName: string;
  sets: SetI[];
  maxWeight: number;
}

export interface SetI {
  done: boolean;
  reps: number;
  weight: number;
}
