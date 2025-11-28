'use client';

// Nutrivus.IA - Achievements Component

import { Trophy, Star, Flame, Target, Award, Lock } from 'lucide-react';
import { mockAchievements } from '@/lib/mock-data';

export default function Achievements() {
  const unlockedCount = mockAchievements.filter(a => a.unlockedAt).length;
  const totalCount = mockAchievements.length;
  const completionRate = (unlockedCount / totalCount) * 100;

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Conquistas</h1>
        <p className="text-white/60">Acompanhe seu progresso e desbloqueie recompensas</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#00FF00]/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Seu Progresso</h2>
            <p className="text-white/60">Continue assim para desbloquear mais conquistas!</p>
          </div>
          <div className="text-center">
            <Trophy className="w-16 h-16 text-[#00FF00] mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{unlockedCount}/{totalCount}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/60">
            <span>Progresso Total</span>
            <span>{Math.round(completionRate)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
          <Star className="w-8 h-8 text-[#00FF00] mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">1,250</p>
          <p className="text-white/60 text-sm">Pontos XP</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
          <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">7</p>
          <p className="text-white/60 text-sm">Dias Streak</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
          <Target className="w-8 h-8 text-[#00BFFF] mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">85%</p>
          <p className="text-white/60 text-sm">Taxa Meta</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
          <Award className="w-8 h-8 text-[#00CC00] mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">Prata</p>
          <p className="text-white/60 text-sm">Nível Atual</p>
        </div>
      </div>

      {/* Achievements Grid */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Todas as Conquistas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAchievements.map((achievement) => {
            const isUnlocked = !!achievement.unlockedAt;
            const progressPercent = (achievement.progress / achievement.target) * 100;

            return (
              <div
                key={achievement.id}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-[#00FF00]/20 to-[#00CC00]/20 border-[#00FF00]/50 hover:shadow-lg hover:shadow-[#00FF00]/20'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">
                    {isUnlocked ? '🏆' : <Lock className="w-12 h-12 text-white/30" />}
                  </div>
                  {isUnlocked && achievement.unlockedAt && (
                    <span className="text-xs text-[#00FF00] bg-[#00FF00]/10 px-2 py-1 rounded-full">
                      Desbloqueado
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-bold text-white mb-2">{achievement.title}</h4>
                <p className="text-sm text-white/60 mb-4">{achievement.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Progresso</span>
                    <span>{achievement.progress}/{achievement.target}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isUnlocked
                          ? 'bg-gradient-to-r from-[#00FF00] to-[#00CC00]'
                          : 'bg-white/20'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {isUnlocked && achievement.unlockedAt && (
                  <p className="text-xs text-white/40 mt-3">
                    Desbloqueado em {achievement.unlockedAt.toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Challenges */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">🎯 Desafios Próximos</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#00FF00]/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-[#00FF00]" />
              </div>
              <div>
                <p className="text-white font-medium">Sequência de 30 Dias</p>
                <p className="text-white/60 text-sm">Registre refeições por 30 dias consecutivos</p>
              </div>
            </div>
            <span className="text-white/60">23 dias restantes</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#00BFFF]/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-[#00BFFF]" />
              </div>
              <div>
                <p className="text-white font-medium">Mestre da Hidratação</p>
                <p className="text-white/60 text-sm">Atinja meta de água por 60 dias</p>
              </div>
            </div>
            <span className="text-white/60">38 dias restantes</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#00CC00]/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#00CC00]" />
              </div>
              <div>
                <p className="text-white font-medium">Proteína Power</p>
                <p className="text-white/60 text-sm">Atinja meta de proteína por 21 dias</p>
              </div>
            </div>
            <span className="text-white/60">14 dias restantes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
