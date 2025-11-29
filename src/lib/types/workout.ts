// Tipos para o sistema de treinos

export type MuscleGroup = 
  | "peito" 
  | "costas" 
  | "ombros" 
  | "biceps" 
  | "triceps" 
  | "pernas" 
  | "gluteos" 
  | "abdomen" 
  | "cardio"
  | "corpo-inteiro";

export type ExperienceLevel = "iniciante" | "intermediario" | "avancado";

export type WorkoutGoal = "perder-peso" | "ganhar-massa" | "definicao" | "recomposicao";

export type IntensityLevel = "baixa" | "moderada" | "alta" | "muito-alta";

export interface ExerciseVariation {
  level: ExperienceLevel;
  description: string;
  sets: string;
  reps: string;
  rest: string;
}

export interface Exercise {
  id: string;
  name: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number; // em segundos
  muscleGroups: MuscleGroup[];
  intensity: IntensityLevel;
  experienceLevel: ExperienceLevel[];
  
  // Descrição detalhada
  description: string;
  targetMuscles: string[];
  equipment: string[];
  
  // Execução
  correctExecution: string[];
  idealPosture: string[];
  commonMistakes: string[];
  
  // Variações
  variations: ExerciseVariation[];
  
  // Segurança
  safetyTips: string[];
  contraindications: string[];
  
  // Recomendações por objetivo
  recommendations: {
    goal: WorkoutGoal;
    sets: string;
    reps: string;
    rest: string;
    notes: string;
  }[];
}

export interface CustomWorkout {
  id: string;
  name: string;
  description: string;
  exercises: string[]; // IDs dos exercícios
  createdAt: string;
  isFavorite: boolean;
}

export interface WorkoutProgress {
  exerciseId: string;
  date: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

export interface DailyExercise {
  date: string;
  exerciseId: string;
  viewed: boolean;
}
