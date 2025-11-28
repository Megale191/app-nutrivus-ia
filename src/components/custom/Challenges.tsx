'use client';

// Nutrivus.IA - Challenges Component (Gamificação)

import { useState } from 'react';
import { Trophy, Target, Flame, Star, Gift, Clock, TrendingUp, Award, Zap } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  category: string;
  progress: number;
  target: number;
  reward: {
    xp: number;
    badge?: string;
    title?: string;
  };
  expiresIn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
}

export default function Challenges() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const activeChallenges: Challenge[] = [
    {
      id: '1',
      title: 'Hidratação Perfeita',
      description: 'Beba 2L de água por 7 dias consecutivos',
      type: 'weekly',
      category: 'Hidratação',
      progress: 4,
      target: 7,
      reward: { xp: 500, badge: '💧', title: 'Mestre da Hidratação' },
      expiresIn: '3 dias',
      difficulty: 'easy',
      icon: '💧'
    },
    {
      id: '2',
      title: 'Proteína Power',
      description: 'Atinja sua meta de proteína por 5 dias',
      type: 'weekly',
      category: 'Nutrição',
      progress: 2,
      target: 5,
      reward: { xp: 750, badge: '💪' },
      expiresIn: '5 dias',
      difficulty: 'medium',
      icon: '💪'
    },
    {
      id: '3',
      title: 'Jejum Consistente',
      description: 'Complete 3 jejuns de 16h esta semana',
      type: 'weekly',
      category: 'Jejum',
      progress: 1,
      target: 3,
      reward: { xp: 1000, badge: '⏰', title: 'Guerreiro do Jejum' },
      expiresIn: '4 dias',
      difficulty: 'hard',
      icon: '⏰'
    },
    {
      id: '4',
      title: 'Registro Diário',
      description: 'Registre todas as refeições hoje',
      type: 'daily',
      category: 'Hábitos',
      progress: 2,
      target: 3,
      reward: { xp: 100 },
      expiresIn: '8 horas',
      difficulty: 'easy',
      icon: '📝'
    },
    {
      id: '5',
      title: 'Calorias no Alvo',
      description: 'Fique dentro da meta calórica por 10 dias',
      type: 'monthly',
      category: 'Nutrição',
      progress: 6,
      target: 10,
      reward: { xp: 2000, badge: '🎯', title: 'Precisão Nutricional' },
      expiresIn: '18 dias',
      difficulty: 'hard',
      icon: '🎯'
    }
  ];

  const completedChallenges: Challenge[] = [
    {
      id: '6',
      title: 'Primeira Semana',
      description: 'Use o app por 7 dias consecutivos',
      type: 'weekly',
      category: 'Hábitos',
      progress: 7,
      target: 7,
      reward: { xp: 300, badge: '🌟' },
      expiresIn: 'Completo',
      difficulty: 'easy',
      icon: '🌟'
    },
    {
      id: '7',
      title: 'Explorador',
      description: 'Teste todas as funcionalidades do app',
      type: 'monthly',
      category: 'Descoberta',
      progress: 10,
      target: 10,
      reward: { xp: 500, badge: '🔍', title: 'Explorador Nutrivus' },
      expiresIn: 'Completo',
      difficulty: 'medium',
      icon: '🔍'
    }
  ];

  const totalXP = 3450;
  const currentLevel = Math.floor(totalXP / 1000) + 1;
  const xpForNextLevel = currentLevel * 1000;
  const xpProgress = (totalXP % 1000) / 10;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-[#00FF00] border-[#00FF00]/30 bg-[#00FF00]/10';
      case 'medium': return 'text-[#00BFFF] border-[#00BFFF]/30 bg-[#00BFFF]/10';
      case 'hard': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
      default: return 'text-white/60';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-[#00FF00]/20 text-[#00FF00]';
      case 'weekly': return 'bg-[#00BFFF]/20 text-[#00BFFF]';
      case 'monthly': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-white/10 text-white';
    }
  };

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Desafios</h1>
        <p className="text-gray-600 dark:text-white/60">Complete desafios e ganhe recompensas incríveis</p>
      </div>

      {/* Level Progress */}
      <div className="bg-gradient-to-br from-[#3F51B5]/20 to-[#1E88E5]/20 dark:from-[#1E88E5]/20 dark:to-[#3F51B5]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#3F51B5]/30 dark:border-[#1E88E5]/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Nível {currentLevel}</h2>
            <p className="text-gray-600 dark:text-white/60">Continue completando desafios para subir de nível!</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3F51B5] to-[#1E88E5] flex items-center justify-center mb-2 shadow-lg">
              <Star className="w-10 h-10 text-white" />
            </div>
            <p className="text-sm text-gray-600 dark:text-white/60">{totalXP} XP</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-white/60">
            <span>Progresso para Nível {currentLevel + 1}</span>
            <span>{totalXP % 1000}/{xpForNextLevel}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] rounded-full transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 text-center">
          <Trophy className="w-8 h-8 text-[#3F51B5] dark:text-[#1E88E5] mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeChallenges.length}</p>
          <p className="text-gray-600 dark:text-white/60 text-sm">Ativos</p>
        </div>

        <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 text-center">
          <Target className="w-8 h-8 text-[#3F51B5] dark:text-[#1E88E5] mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedChallenges.length}</p>
          <p className="text-gray-600 dark:text-white/60 text-sm">Completos</p>
        </div>

        <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 text-center">
          <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">7</p>
          <p className="text-gray-600 dark:text-white/60 text-sm">Dias Streak</p>
        </div>

        <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 text-center">
          <Gift className="w-8 h-8 text-[#3F51B5] dark:text-[#1E88E5] mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
          <p className="text-gray-600 dark:text-white/60 text-sm">Recompensas</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-gray-200 dark:border-white/10">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'active'
              ? 'bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] text-white shadow-lg'
              : 'text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5'
          }`}
        >
          Desafios Ativos ({activeChallenges.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'completed'
              ? 'bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] text-white shadow-lg'
              : 'text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5'
          }`}
        >
          Completos ({completedChallenges.length})
        </button>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(activeTab === 'active' ? activeChallenges : completedChallenges).map((challenge) => {
          const progressPercent = (challenge.progress / challenge.target) * 100;
          const isCompleted = challenge.progress >= challenge.target;

          return (
            <div
              key={challenge.id}
              className={`bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl ${
                isCompleted
                  ? 'border-[#3F51B5]/50 dark:border-[#1E88E5]/50 bg-gradient-to-br from-[#3F51B5]/10 to-[#1E88E5]/10'
                  : 'border-gray-200 dark:border-white/10 hover:border-[#3F51B5]/30 dark:hover:border-[#1E88E5]/30'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{challenge.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{challenge.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-white/60">{challenge.category}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(challenge.type)}`}>
                  {challenge.type === 'daily' ? 'Diário' : challenge.type === 'weekly' ? 'Semanal' : 'Mensal'}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-white/60 mb-4">{challenge.description}</p>

              {/* Progress */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-white/60">
                  <span>Progresso</span>
                  <span>{challenge.progress}/{challenge.target}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCompleted
                        ? 'bg-gradient-to-r from-[#3F51B5] to-[#1E88E5]'
                        : 'bg-gradient-to-r from-[#3F51B5]/50 to-[#1E88E5]/50'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-[#3F51B5] dark:text-[#1E88E5]" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">+{challenge.reward.xp} XP</span>
                  </div>
                  {challenge.reward.badge && (
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-[#3F51B5] dark:text-[#1E88E5]" />
                      <span className="text-sm">{challenge.reward.badge}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600 dark:text-white/60" />
                  <span className="text-sm text-gray-600 dark:text-white/60">{challenge.expiresIn}</span>
                </div>
              </div>

              {/* Difficulty Badge */}
              <div className="mt-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty === 'easy' ? 'Fácil' : challenge.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Bonus */}
      <div className="bg-gradient-to-br from-[#3F51B5]/20 to-[#1E88E5]/20 dark:from-[#1E88E5]/20 dark:to-[#3F51B5]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#3F51B5]/30 dark:border-[#1E88E5]/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3F51B5] to-[#1E88E5] flex items-center justify-center">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Bônus Diário Disponível!</h3>
              <p className="text-gray-600 dark:text-white/60">Entre todos os dias para ganhar recompensas extras</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#3F51B5]/30 dark:hover:shadow-[#1E88E5]/30 transition-all duration-300 hover:scale-105 active:scale-95">
            Resgatar +50 XP
          </button>
        </div>
      </div>
    </div>
  );
}
