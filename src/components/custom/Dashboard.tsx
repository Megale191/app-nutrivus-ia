'use client';

// Nutrivus.IA - Dashboard Component

import { TrendingUp, TrendingDown, Flame, Target, Award } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { mockDailyStats, mockAchievements, weeklyCaloriesData, macronutrientsData } from '@/lib/mock-data';

export default function Dashboard() {
  const stats = mockDailyStats;
  const calorieProgress = (stats.caloriesConsumed / stats.calorieGoal) * 100;
  const waterProgress = (stats.waterConsumed / stats.waterGoal) * 100;

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/60">Acompanhe seu progresso diário</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-white/60">Streak Atual</p>
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-[#00FF00]" />
            <span className="text-2xl font-bold text-white">7 dias</span>
          </div>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Calories Card */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#00FF00]/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white/70 text-sm font-medium">Calorias</h3>
            <Target className="w-5 h-5 text-[#00FF00]" />
          </div>
          <div className="space-y-2">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white">{stats.caloriesConsumed}</span>
              <span className="text-white/60 mb-1">/ {stats.calorieGoal}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(calorieProgress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-white/60">{Math.round(calorieProgress)}% da meta</p>
          </div>
        </div>

        {/* Protein Card */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#00FF00]/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white/70 text-sm font-medium">Proteínas</h3>
            <TrendingUp className="w-5 h-5 text-[#00FF00]" />
          </div>
          <div className="space-y-2">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white">{stats.proteinConsumed}g</span>
            </div>
            <p className="text-xs text-[#00FF00]">+12% vs ontem</p>
          </div>
        </div>

        {/* Water Card */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#00FF00]/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white/70 text-sm font-medium">Hidratação</h3>
            <TrendingUp className="w-5 h-5 text-[#00FF00]" />
          </div>
          <div className="space-y-2">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white">{stats.waterConsumed}ml</span>
              <span className="text-white/60 mb-1">/ {stats.waterGoal}ml</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00BFFF] to-[#0099CC] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(waterProgress, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Fasting Card */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#00FF00]/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white/70 text-sm font-medium">Jejum Hoje</h3>
            <TrendingDown className="w-5 h-5 text-[#00FF00]" />
          </div>
          <div className="space-y-2">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white">{stats.fastingHours}h</span>
            </div>
            <p className="text-xs text-white/60">Jejum intermitente 16:8</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Calories Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Calorias Semanais</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyCaloriesData}>
              <XAxis dataKey="day" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0099CC40', 
                  border: '1px solid #ffffff20',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <Legend />
              <Bar dataKey="consumed" fill="#00FF00" radius={[8, 8, 0, 0]} name="Consumido" />
              <Bar dataKey="goal" fill="#00BFFF40" radius={[8, 8, 0, 0]} name="Meta" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Macronutrients Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Distribuição de Macros</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={macronutrientsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}g`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {macronutrientsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Conquistas Recentes</h3>
          <Award className="w-6 h-6 text-[#00FF00]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockAchievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                achievement.unlockedAt 
                  ? 'bg-gradient-to-br from-[#00FF00]/20 to-[#00CC00]/20 border-[#00FF00]/50' 
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.unlockedAt ? '🏆' : '🔒'}</div>
              <h4 className="font-bold text-white mb-1">{achievement.title}</h4>
              <p className="text-xs text-white/60 mb-3">{achievement.description}</p>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] rounded-full"
                  style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                />
              </div>
              <p className="text-xs text-white/60 mt-1">{achievement.progress}/{achievement.target}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
