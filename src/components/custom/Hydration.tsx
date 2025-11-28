'use client';

// Nutrivus.IA - Hydration Component

import { useState } from 'react';
import { Droplet, Plus, TrendingUp } from 'lucide-react';
import { mockHydrationLogs } from '@/lib/mock-data';

export default function Hydration() {
  const [waterConsumed, setWaterConsumed] = useState(1800);
  const waterGoal = 2500;
  const progress = (waterConsumed / waterGoal) * 100;

  const addWater = (amount: number) => {
    setWaterConsumed(prev => Math.min(prev + amount, waterGoal + 1000));
  };

  const quickAmounts = [200, 300, 500, 750];

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Hidratação</h1>
        <p className="text-white/60">Mantenha-se hidratado ao longo do dia</p>
      </div>

      {/* Main Progress Card */}
      <div className="bg-gradient-to-br from-[#00BFFF]/20 to-[#0099CC]/20 backdrop-blur-sm rounded-2xl p-8 border border-[#00BFFF]/30">
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            {/* Water Drop Animation */}
            <div className="w-48 h-48 rounded-full bg-gradient-to-b from-[#00BFFF] to-[#0099CC] flex items-center justify-center relative overflow-hidden">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#00FF00]/30 to-transparent transition-all duration-500"
                style={{ height: `${progress}%` }}
              />
              <div className="relative z-10 text-center">
                <Droplet className="w-16 h-16 text-white mx-auto mb-2" />
                <p className="text-4xl font-bold text-white">{waterConsumed}ml</p>
                <p className="text-white/80 text-sm">de {waterGoal}ml</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm text-white/60">
            <span>Progresso Diário</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00BFFF] to-[#00FF00] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => addWater(amount)}
              className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00BFFF]/50 rounded-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5 text-[#00BFFF]" />
              <span className="text-white font-medium">{amount}ml</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#00BFFF]/20 flex items-center justify-center">
              <Droplet className="w-5 h-5 text-[#00BFFF]" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Média Diária</p>
              <p className="text-2xl font-bold text-white">2.1L</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#00FF00]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#00FF00]" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Sequência</p>
              <p className="text-2xl font-bold text-white">12 dias</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#00CC00]/20 flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <div>
              <p className="text-white/60 text-sm">Meta Semanal</p>
              <p className="text-2xl font-bold text-white">6/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Histórico de Hoje</h3>
        <div className="space-y-3">
          {mockHydrationLogs.map((log) => (
            <div 
              key={log.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00BFFF]/20 flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-[#00BFFF]" />
                </div>
                <div>
                  <p className="text-white font-medium">{log.amount}ml</p>
                  <p className="text-white/60 text-sm">
                    {log.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div className="text-[#00FF00] text-sm font-medium">
                +{log.amount}ml
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#00FF00]/20">
        <h3 className="text-xl font-bold text-white mb-4">💡 Dicas de Hidratação</h3>
        <ul className="space-y-2 text-white/80">
          <li className="flex items-start gap-2">
            <span className="text-[#00FF00] mt-1">•</span>
            <span>Beba água ao acordar para ativar o metabolismo</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00FF00] mt-1">•</span>
            <span>Mantenha uma garrafa de água sempre por perto</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00FF00] mt-1">•</span>
            <span>Beba água antes, durante e após exercícios físicos</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00FF00] mt-1">•</span>
            <span>Aumente a ingestão em dias quentes ou durante atividades intensas</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
