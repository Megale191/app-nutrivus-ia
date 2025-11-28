'use client';

// Nutrivus.IA - Dashboard Component

import { TrendingUp, TrendingDown, Flame, Target, Award, Zap, Trophy, Star, Gift } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import { mockDailyStats, mockAchievements, weeklyCaloriesData, macronutrientsData } from '@/lib/mock-data';

export default function Dashboard() {
  const stats = mockDailyStats;
  const calorieProgress = (stats.caloriesConsumed / stats.calorieGoal) * 100;
  const waterProgress = (stats.waterConsumed / stats.waterGoal) * 100;

  // Dados para gráfico de progresso semanal
  const weeklyProgressData = [
    { day: 'Seg', score: 85 },
    { day: 'Ter', score: 92 },
    { day: 'Qua', score: 78 },
    { day: 'Qui', score: 95 },
    { day: 'Sex', score: 88 },
    { day: 'Sáb', score: 90 },
    { day: 'Dom', score: 94 }
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-white/60">Acompanhe seu progresso diário</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-white/60">Streak Atual</p>
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">7 dias</span>
          </div>
        </div>
      </div>

      {/* Level & XP Banner */}
      <div className="bg-gradient-to-br from-[#3F51B5] to-[#1E88E5] rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Star className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Nível 12 - Nutri Expert</h2>
              <p className="text-white/80">Continue assim para alcançar o próximo nível!</p>
            </div>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 mx-auto mb-1" />
            <p className="text-2xl font-bold">3,450 XP</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/80">
            <span>Progresso para Nível 13</span>
            <span>450/1000 XP</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: '45%' }} />
          </div>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Calories Card */}
        <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/10 hover:border-[#3F51B5]/50 dark:hover:border-[#1E88E5]/50 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 dark:text-white/70 text-sm font-medium">Calorias</h3>
            <Target className="w-5 h-5 text-[#3F51B5] dark:text-[#1E88E5]" />
          </div>
          <div className="space-y-2">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.caloriesConsumed}</span>
              <span className="text-gray-600 dark:text-white/60 mb-1">/ {stats.calorieGoal}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(calorieProgress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-white/60">{Math.round(calorieProgress)}% da meta</p>
          </div>
        </div>

        {/* Protein Card */}
        <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/10 hover:border-[#3F51B5]/50 dark:hover:border-[#1E88E5]/50 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 dark:text-white/70 text-sm font-medium">Proteínas</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.proteinConsumed}g</span>
            </div>
            <p className="text-xs text-green-500">+12% vs ontem</p>
          </div>
        </div>

        {/* Water Card */}
        <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/10 hover:border-[#3F51B5]/50 dark:hover:border-[#1E88E5]/50 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 dark:text-white/70 text-sm font-medium">Hidratação</h3>
            <TrendingUp className="w-5 h-5 text-cyan-500" />
          </div>
          <div className="space-y-2">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.waterConsumed}ml</span>
              <span className="text-gray-600 dark:text-white/60 mb-1">/ {stats.waterGoal}ml</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(waterProgress, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Fasting Card */}
        <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/10 hover:border-[#3F51B5]/50 dark:hover:border-[#1E88E5]/50 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 dark:text-white/70 text-sm font-medium">Jejum Hoje</h3>
            <TrendingDown className="w-5 h-5 text-purple-500" />
          </div>
          <div className="space-y-2">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.fastingHours}h</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-white/60">Jejum intermitente 16:8</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-gradient-to-br from-[#3F51B5]/20 to-[#1E88E5]/20 backdrop-blur-sm rounded-xl p-4 border border-[#3F51B5]/30 dark:border-[#1E88E5]/30 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
          <Trophy className="w-8 h-8 text-[#3F51B5] dark:text-[#1E88E5] mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900 dark:text-white">Ver Desafios</p>
        </button>

        <button className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-4 border border-green-500/30 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
          <Star className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900 dark:text-white">Recomendações IA</p>
        </button>

        <button className="bg-gradient-to-br from-orange-400/20 to-red-500/20 backdrop-blur-sm rounded-xl p-4 border border-orange-400/30 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
          <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900 dark:text-white">Manter Streak</p>
        </button>

        <button className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
          <Gift className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900 dark:text-white">Resgatar Bônus</p>
        </button>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Calories Chart */}
        <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/10">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calorias Semanais</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyCaloriesData}>
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px'
                }}
              />
              <Legend />
              <Bar dataKey="consumed" fill="#3F51B5" radius={[8, 8, 0, 0]} name="Consumido" />
              <Bar dataKey="goal" fill="#1E88E5" radius={[8, 8, 0, 0]} name="Meta" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Progress Score */}
        <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/10">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Score de Consistência</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyProgressData}>
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px'
                }}
              />
              <Line type="monotone" dataKey="score" stroke="#3F51B5" strokeWidth={3} dot={{ fill: '#1E88E5', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Conquistas Recentes</h3>
          <Award className="w-6 h-6 text-[#3F51B5] dark:text-[#1E88E5]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockAchievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${ achievement.unlockedAt 
                  ? 'bg-gradient-to-br from-[#3F51B5]/20 to-[#1E88E5]/20 border-[#3F51B5]/50 dark:border-[#1E88E5]/50' 
                  : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.unlockedAt ? '🏆' : '🔒'}</div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">{achievement.title}</h4>
              <p className="text-xs text-gray-600 dark:text-white/60 mb-3">{achievement.description}</p>
              <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] rounded-full"
                  style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-white/60 mt-1">{achievement.progress}/{achievement.target}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
