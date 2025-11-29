// Types do BodyVision Pro

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'premium';
  createdAt: Date;
}

export interface BodyAnalysis {
  id: string;
  userId: string;
  imageUrl: string;
  date: Date;
  estimatedWeight: number;
  estimatedBodyFat: number;
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    legs?: number;
  };
  aiAnalysis: string;
}

export interface MealAnalysis {
  id: string;
  userId: string;
  imageUrl: string;
  date: Date;
  detectedFoods: string[];
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  withinGoal: boolean;
}

export interface PersonalizedPlan {
  id: string;
  userId: string;
  currentBody: BodyAnalysis;
  goalBody: {
    targetWeight: number;
    targetBodyFat: number;
    targetMeasurements: {
      chest?: number;
      waist?: number;
      hips?: number;
      arms?: number;
      legs?: number;
    };
  };
  diet: {
    dailyCalories: number;
    meals: Array<{
      name: string;
      time: string;
      foods: string[];
      calories: number;
    }>;
    macroSplit: {
      protein: number;
      carbs: number;
      fat: number;
    };
  };
  workout: {
    frequency: number;
    exercises: Array<{
      name: string;
      sets: number;
      reps: string;
      duration: string;
      videoUrl?: string;
    }>;
  };
  timeline: {
    estimatedWeeks: number;
    weeklyGoals: Array<{
      week: number;
      targetWeight: number;
      targetCalories: number;
      workoutDays: number;
    }>;
  };
  warnings?: string[];
}

export interface ProgressEntry {
  id: string;
  userId: string;
  date: Date;
  weight: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    legs?: number;
  };
  photoUrl?: string;
  caloriesConsumed?: number;
  caloriesBurned?: number;
  workoutCompleted: boolean;
}
