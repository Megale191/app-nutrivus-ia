'use client';

// Nutrivus.IA - AI Recommendations Component

import { useState } from 'react';
import { Sparkles, TrendingUp, Apple, Droplet, Clock, Target, Brain, Lightbulb, ChevronRight, Star } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'diet' | 'hydration' | 'fasting' | 'exercise' | 'sleep';
  title: string;
  description: string;
  reason: string;
  impact: 'high' | 'medium' | 'low';
  actionable: string;
  icon: any;
  color: string;
}

export default function AIRecommendations() {
  const [selectedType, setSelectedType] = useState<string>('all');

  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'diet',
      title: 'Aumente a Ingestão de Proteínas',
      description: 'Baseado no seu histórico, você está consumindo 15% menos proteína que o ideal para seus objetivos.',
      reason: 'Análise dos últimos 7 dias mostra déficit proteico',
      impact: 'high',
      actionable: 'Adicione 30g de proteína no café da manhã (2 ovos + whey)',
      icon: Apple,
      color: 'from-[#3F51B5] to-[#1E88E5]'
    },
    {
      id: '2',
      type: 'hydration',
      title: 'Melhore sua Hidratação Matinal',
      description: 'Você tende a beber menos água nas primeiras 4 horas do dia. Hidratação matinal acelera o metabolismo.',
      reason: 'Padrão identificado: baixa hidratação até 12h',
      impact: 'medium',
      actionable: 'Beba 500ml de água ao acordar, antes do café',
      icon: Droplet,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: '3',
      type: 'fasting',
      title: 'Ajuste sua Janela de Jejum',
      description: 'Seus melhores resultados ocorrem com jejum de 16h. Considere tornar isso consistente.',
      reason: 'Dados mostram melhor performance com 16:8',
      impact: 'high',
      actionable: 'Mantenha jejum das 20h às 12h diariamente',
      icon: Clock,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '4',
      type: 'diet',
      title: 'Reduza Carboidratos à Noite',
      description: 'Seu corpo responde melhor a carboidratos no período da manhã e pós-treino.',
      reason: 'Análise de energia e sono mostra melhor resposta',
      impact: 'medium',
      actionable: 'Concentre carboidratos no café e almoço',
      icon: Target,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: '5',
      type: 'exercise',
      title: 'Momento Ideal para Treinar',
      description: 'Seus níveis de energia são mais altos entre 16h-18h. Aproveite esse pico!',
      reason: 'Correlação entre humor/energia e horário',
      impact: 'medium',
      actionable: 'Agende treinos para o final da tarde',
      icon: TrendingUp,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: '6',
      type: 'sleep',
      title: 'Otimize seu Sono',
      description: 'Dias com melhor alimentação correlacionam com 7-8h de sono. Priorize descanso.',
      reason: 'Padrão: melhor dieta = melhor sono',
      impact: 'high',
      actionable: 'Durma entre 22h-6h para recuperação ideal',
      icon: Brain,
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const filteredRecommendations = selectedType === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.type === selectedType);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const categories = [
    { id: 'all', label: 'Todas', icon: Sparkles },
    { id: 'diet', label: 'Dieta', icon: Apple },
    { id: 'hydration', label: 'Hidratação', icon: Droplet },
    { id: 'fasting', label: 'Jejum', icon: Clock },
    { id: 'exercise', label: 'Exercício', icon: TrendingUp },
    { id: 'sleep', label: 'Sono', icon: Brain }
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[#3F51B5] dark:text-[#1E88E5]" />
            Recomendações IA
          </h1>
          <p className="text-gray-600 dark:text-white/60">Insights personalizados baseados nos seus dados</p>
        </div>
        <div className="text-center bg-gradient-to-br from-[#3F51B5]/20 to-[#1E88E5]/20 rounded-xl p-4 border border-[#3F51B5]/30 dark:border-[#1E88E5]/30">
          <Star className="w-8 h-8 text-[#3F51B5] dark:text-[#1E88E5] mx-auto mb-1" />
          <p className="text-sm text-gray-600 dark:text-white/60">Precisão</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">94%</p>
        </div>
      </div>

      {/* AI Insights Banner */}
      <div className="bg-gradient-to-br from-[#3F51B5] to-[#1E88E5] rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">Análise Inteligente Ativa</h2>
            <p className="text-white/80">Nossa IA está analisando seus dados 24/7 para otimizar seus resultados</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">127</p>
            <p className="text-white/80 text-sm">Padrões Identificados</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">18</p>
            <p className="text-white/80 text-sm">Insights Gerados</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">94%</p>
            <p className="text-white/80 text-sm">Taxa de Sucesso</p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedType(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-300 ${
                selectedType === category.id
                  ? 'bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] text-white shadow-lg'
                  : 'bg-white dark:bg-white/5 text-gray-600 dark:text-white/60 border border-gray-200 dark:border-white/10 hover:border-[#3F51B5]/30 dark:hover:border-[#1E88E5]/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <div
              key={rec.id}
              className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/10 hover:border-[#3F51B5]/30 dark:hover:border-[#1E88E5]/30 transition-all duration-300 hover:shadow-xl group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${rec.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{rec.title}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-1 ${getImpactColor(rec.impact)}`}>
                      Impacto {rec.impact === 'high' ? 'Alto' : rec.impact === 'medium' ? 'Médio' : 'Baixo'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-white/70 mb-3">{rec.description}</p>

              {/* Reason */}
              <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb className="w-4 h-4 text-[#3F51B5] dark:text-[#1E88E5]" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Por que isso importa?</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-white/60">{rec.reason}</p>
              </div>

              {/* Actionable */}
              <div className="bg-gradient-to-br from-[#3F51B5]/10 to-[#1E88E5]/10 rounded-xl p-4 border border-[#3F51B5]/20 dark:border-[#1E88E5]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-[#3F51B5] dark:text-[#1E88E5]" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Ação Recomendada</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-white/80 font-medium">{rec.actionable}</p>
              </div>

              {/* Action Button */}
              <button className="w-full mt-4 py-3 bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#3F51B5]/30 dark:hover:shadow-[#1E88E5]/30 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.02]">
                Aplicar Recomendação
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* AI Learning Section */}
      <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/10">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Brain className="w-6 h-6 text-[#3F51B5] dark:text-[#1E88E5]" />
          Como a IA Aprende com Você
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3F51B5]/20 to-[#1E88E5]/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📊</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Coleta de Dados</h4>
            <p className="text-sm text-gray-600 dark:text-white/60">Analisamos suas refeições, hidratação, jejum e humor diariamente</p>
          </div>
          <div className="text-center p-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3F51B5]/20 to-[#1E88E5]/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🧠</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Identificação de Padrões</h4>
            <p className="text-sm text-gray-600 dark:text-white/60">Encontramos correlações entre seus hábitos e resultados</p>
          </div>
          <div className="text-center p-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3F51B5]/20 to-[#1E88E5]/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Recomendações Personalizadas</h4>
            <p className="text-sm text-gray-600 dark:text-white/60">Sugerimos ações específicas para otimizar seus objetivos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
