'use client';

// Nutrivus.IA - Fasting Component

import { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, TrendingUp } from 'lucide-react';

export default function Fasting() {
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // em segundos
  const [fastingType, setFastingType] = useState<'16:8' | '18:6' | '20:4' | '24h'>('16:8');

  const fastingGoals = {
    '16:8': 16 * 3600,
    '18:6': 18 * 3600,
    '20:4': 20 * 3600,
    '24h': 24 * 3600
  };

  const currentGoal = fastingGoals[fastingType];
  const progress = (elapsedTime / currentGoal) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFasting = () => {
    setIsActive(!isActive);
  };

  const resetFasting = () => {
    setIsActive(false);
    setElapsedTime(0);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Jejum Intermitente</h1>
        <p className="text-white/60">Acompanhe seu período de jejum</p>
      </div>

      {/* Fasting Type Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(Object.keys(fastingGoals) as Array<keyof typeof fastingGoals>).map((type) => (
          <button
            key={type}
            onClick={() => !isActive && setFastingType(type)}
            disabled={isActive}
            className={`p-4 rounded-xl border transition-all duration-300 ${
              fastingType === type
                ? 'bg-gradient-to-br from-[#00FF00]/20 to-[#00CC00]/20 border-[#00FF00]/50'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <p className="text-2xl font-bold text-white mb-1">{type}</p>
            <p className="text-xs text-white/60">
              {type === '24h' ? '24 horas' : `${type.split(':')[0]}h jejum`}
            </p>
          </button>
        ))}
      </div>

      {/* Main Timer Card */}
      <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#00FF00]/30">
        <div className="flex flex-col items-center">
          {/* Circular Progress */}
          <div className="relative w-64 h-64 mb-8">
            <svg className="transform -rotate-90 w-64 h-64">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FF00" />
                  <stop offset="100%" stopColor="#00CC00" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Clock className="w-12 h-12 text-[#00FF00] mb-2" />
              <p className="text-5xl font-bold text-white">{formatTime(elapsedTime)}</p>
              <p className="text-white/60 mt-2">{Math.round(progress)}% completo</p>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4">
            <button
              onClick={toggleFasting}
              className="px-8 py-4 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] font-bold rounded-xl hover:shadow-lg hover:shadow-[#00FF00]/30 transition-all duration-300 flex items-center gap-2"
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Iniciar
                </>
              )}
            </button>
            <button
              onClick={resetFasting}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Resetar
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#00FF00]/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#00FF00]" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Sessões Completas</p>
              <p className="text-2xl font-bold text-white">6</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#00BFFF]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#00BFFF]" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Média de Jejum</p>
              <p className="text-2xl font-bold text-white">16.5h</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#00CC00]/20 flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <p className="text-white/60 text-sm">Sequência</p>
              <p className="text-2xl font-bold text-white">3 dias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits & Precautions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Benefits */}
        <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#00FF00]/20">
          <h3 className="text-xl font-bold text-white mb-4">✅ Benefícios</h3>
          <ul className="space-y-2 text-white/80">
            <li className="flex items-start gap-2">
              <span className="text-[#00FF00] mt-1">•</span>
              <span>Melhora da sensibilidade à insulina</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00FF00] mt-1">•</span>
              <span>Aumento da autofagia celular</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00FF00] mt-1">•</span>
              <span>Redução da inflamação</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00FF00] mt-1">•</span>
              <span>Auxílio na perda de peso</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00FF00] mt-1">•</span>
              <span>Melhora da clareza mental</span>
            </li>
          </ul>
        </div>

        {/* Precautions */}
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20">
          <h3 className="text-xl font-bold text-white mb-4">⚠️ Precauções</h3>
          <ul className="space-y-2 text-white/80">
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Consulte um médico antes de iniciar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Não recomendado para gestantes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Evite se tiver histórico de distúrbios alimentares</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Mantenha-se hidratado durante o jejum</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Pare se sentir tonturas ou mal-estar</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
