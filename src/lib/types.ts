// Nutrivus.IA - Type Definitions

export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  goal: 'lose' | 'maintain' | 'gain';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  dailyCalorieGoal: number;
  preferences: string[];
}

export interface Meal {
  id: string;
  name: string;
  timestamp: Date;
  imageUrl?: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface NutritionAnalysis {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  vitamins?: Record<string, number>;
  minerals?: Record<string, number>;
  foodItems: string[];
  confidence: number;
}

export interface HydrationLog {
  id: string;
  timestamp: Date;
  amount: number; // ml
}

export interface FastingSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // hours
  type: '16:8' | '18:6' | '20:4' | '24h';
  status: 'active' | 'completed' | 'cancelled';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress: number;
  target: number;
}

export interface DailyStats {
  date: Date;
  caloriesConsumed: number;
  calorieGoal: number;
  proteinConsumed: number;
  carbsConsumed: number;
  fatsConsumed: number;
  waterConsumed: number;
  waterGoal: number;
  mealsLogged: number;
  fastingHours: number;
}
