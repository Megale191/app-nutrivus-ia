// Nutrivus.IA - Mock Data

import { UserProfile, Meal, Achievement, DailyStats, HydrationLog, FastingSession } from './types';

export const mockUserProfile: UserProfile = {
  name: 'João Silva',
  age: 28,
  weight: 75,
  height: 175,
  goal: 'lose',
  activityLevel: 'moderate',
  dailyCalorieGoal: 2000,
  preferences: ['Vegetariano', 'Sem Lactose', 'Low Carb']
};

export const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'Café da Manhã Completo',
    timestamp: new Date(2024, 0, 15, 8, 0),
    calories: 450,
    protein: 25,
    carbs: 55,
    fats: 12,
    fiber: 8,
    type: 'breakfast'
  },
  {
    id: '2',
    name: 'Almoço Saudável',
    timestamp: new Date(2024, 0, 15, 12, 30),
    calories: 650,
    protein: 45,
    carbs: 70,
    fats: 18,
    fiber: 12,
    type: 'lunch'
  },
  {
    id: '3',
    name: 'Lanche da Tarde',
    timestamp: new Date(2024, 0, 15, 16, 0),
    calories: 200,
    protein: 10,
    carbs: 25,
    fats: 8,
    fiber: 4,
    type: 'snack'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: '7 Dias Consecutivos',
    description: 'Registrou refeições por 7 dias seguidos',
    icon: 'flame',
    unlockedAt: new Date(2024, 0, 10),
    progress: 7,
    target: 7
  },
  {
    id: '2',
    title: 'Hidratação Master',
    description: 'Atingiu meta de água por 30 dias',
    icon: 'droplet',
    progress: 22,
    target: 30
  },
  {
    id: '3',
    title: 'Jejum Intermitente',
    description: 'Completou 10 sessões de jejum',
    icon: 'clock',
    progress: 6,
    target: 10
  },
  {
    id: '4',
    title: 'Meta Calórica',
    description: 'Manteve-se dentro da meta por 14 dias',
    icon: 'target',
    unlockedAt: new Date(2024, 0, 12),
    progress: 14,
    target: 14
  }
];

export const mockDailyStats: DailyStats = {
  date: new Date(),
  caloriesConsumed: 1300,
  calorieGoal: 2000,
  proteinConsumed: 80,
  carbsConsumed: 150,
  fatsConsumed: 38,
  waterConsumed: 1800,
  waterGoal: 2500,
  mealsLogged: 3,
  fastingHours: 14
};

export const mockHydrationLogs: HydrationLog[] = [
  { id: '1', timestamp: new Date(2024, 0, 15, 8, 0), amount: 300 },
  { id: '2', timestamp: new Date(2024, 0, 15, 10, 30), amount: 500 },
  { id: '3', timestamp: new Date(2024, 0, 15, 13, 0), amount: 400 },
  { id: '4', timestamp: new Date(2024, 0, 15, 15, 30), amount: 300 },
  { id: '5', timestamp: new Date(2024, 0, 15, 18, 0), amount: 300 }
];

export const mockFastingSession: FastingSession = {
  id: '1',
  startTime: new Date(2024, 0, 15, 20, 0),
  duration: 16,
  type: '16:8',
  status: 'active'
};

export const weeklyCaloriesData = [
  { day: 'Seg', consumed: 1950, goal: 2000 },
  { day: 'Ter', consumed: 2100, goal: 2000 },
  { day: 'Qua', consumed: 1850, goal: 2000 },
  { day: 'Qui', consumed: 2050, goal: 2000 },
  { day: 'Sex', consumed: 1900, goal: 2000 },
  { day: 'Sáb', consumed: 2200, goal: 2000 },
  { day: 'Dom', consumed: 1800, goal: 2000 }
];

export const macronutrientsData = [
  { name: 'Proteínas', value: 80, color: '#00FF00' },
  { name: 'Carboidratos', value: 150, color: '#00BFFF' },
  { name: 'Gorduras', value: 38, color: '#00CC00' }
];
