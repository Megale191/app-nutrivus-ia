'use client';

// Nutrivus.IA - Achievements Component (Gamificada e Motivadora)

import { useState } from 'react';
import { 
  Trophy, Star, Flame, Target, Award, Lock, 
  Droplets, Clock, Scale, Apple, Dumbbell,
  TrendingUp, Calendar, Zap, Share2, Users,
  ChevronRight, Medal, Crown, Gift, Sparkles,
  X, Copy, Check, Facebook, Twitter, MessageCircle,
  Instagram, Linkedin, Mail
} from 'lucide-react';

// Tipos de conquistas
type AchievementCategory = 'fasting' | 'hydration' | 'weight' | 'nutrition' | 'exercise';
type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';
type AchievementLevel = 'beginner' | 'intermediate' | 'advanced' | 'master';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  tier: AchievementTier;
  icon: string;
  progress: number;
  target: number;
  unlocked: boolean;
  unlockedAt?: Date;
  xpReward: number;
}

interface DailyMission {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  xpReward: number;
  completed: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  target: number;
  participants: number;
  reward: string;
  endsIn: string;
}

export default function Achievements() {
  const [activeCategory, setActiveCategory] = useState<AchievementCategory | 'all'>('all');
  const [showCelebration, setShowCelebration] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Dados do usuário
  const userLevel: AchievementLevel = 'intermediate';
  const userXP = 2450;
  const nextLevelXP = 3000;
  const currentStreak = 12;
  const longestStreak = 28;
  const totalAchievements = 45;
  const unlockedAchievements = 18;

  // Conquistas por categoria
  const achievements: Achievement[] = [
    // Jejum Intermitente
    {
      id: 'fast-1',
      title: 'Primeiro Jejum',
      description: 'Complete seu primeiro jejum de 16 horas',
      category: 'fasting',
      tier: 'bronze',
      icon: '⏰',
      progress: 16,
      target: 16,
      unlocked: true,
      unlockedAt: new Date('2024-01-15'),
      xpReward: 50
    },
    {
      id: 'fast-2',
      title: 'Mestre do Jejum',
      description: 'Complete 30 dias consecutivos de jejum intermitente',
      category: 'fasting',
      tier: 'gold',
      icon: '👑',
      progress: 12,
      target: 30,
      unlocked: false,
      xpReward: 300
    },
    {
      id: 'fast-3',
      title: 'Guerreiro do Jejum',
      description: 'Experimente 3 protocolos diferentes de jejum',
      category: 'fasting',
      tier: 'silver',
      icon: '⚔️',
      progress: 2,
      target: 3,
      unlocked: false,
      xpReward: 150
    },
    {
      id: 'fast-4',
      title: 'Jejum Prolongado',
      description: 'Complete um jejum de 24 horas',
      category: 'fasting',
      tier: 'platinum',
      icon: '💎',
      progress: 0,
      target: 1,
      unlocked: false,
      xpReward: 500
    },

    // Hidratação
    {
      id: 'hydro-1',
      title: 'Primeira Gota',
      description: 'Registre seu primeiro copo de água',
      category: 'hydration',
      tier: 'bronze',
      icon: '💧',
      progress: 1,
      target: 1,
      unlocked: true,
      unlockedAt: new Date('2024-01-10'),
      xpReward: 25
    },
    {
      id: 'hydro-2',
      title: 'Campeão da Água',
      description: 'Atinja a meta de hidratação por 7 dias consecutivos',
      category: 'hydration',
      tier: 'silver',
      icon: '🏆',
      progress: 7,
      target: 7,
      unlocked: true,
      unlockedAt: new Date('2024-01-20'),
      xpReward: 150
    },
    {
      id: 'hydro-3',
      title: 'Oceano Pessoal',
      description: 'Beba 100 litros de água no total',
      category: 'hydration',
      tier: 'gold',
      icon: '🌊',
      progress: 45,
      target: 100,
      unlocked: false,
      xpReward: 250
    },
    {
      id: 'hydro-4',
      title: 'Hidratação Perfeita',
      description: 'Mantenha 30 dias consecutivos de hidratação ideal',
      category: 'hydration',
      tier: 'platinum',
      icon: '💎',
      progress: 12,
      target: 30,
      unlocked: false,
      xpReward: 400
    },

    // Peso e Medidas
    {
      id: 'weight-1',
      title: 'Primeiro Registro',
      description: 'Registre seu peso pela primeira vez',
      category: 'weight',
      tier: 'bronze',
      icon: '⚖️',
      progress: 1,
      target: 1,
      unlocked: true,
      unlockedAt: new Date('2024-01-08'),
      xpReward: 25
    },
    {
      id: 'weight-2',
      title: 'Progresso Visível',
      description: 'Perca 5kg em direção à sua meta',
      category: 'weight',
      tier: 'silver',
      icon: '📉',
      progress: 3,
      target: 5,
      unlocked: false,
      xpReward: 200
    },
    {
      id: 'weight-3',
      title: 'Meta Alcançada',
      description: 'Atinja seu peso ideal',
      category: 'weight',
      tier: 'gold',
      icon: '🎯',
      progress: 0,
      target: 1,
      unlocked: false,
      xpReward: 500
    },
    {
      id: 'weight-4',
      title: 'Estabilidade',
      description: 'Mantenha seu peso estável por 60 dias',
      category: 'weight',
      tier: 'platinum',
      icon: '💪',
      progress: 0,
      target: 60,
      unlocked: false,
      xpReward: 600
    },

    // Alimentação Saudável
    {
      id: 'food-1',
      title: 'Primeira Refeição',
      description: 'Registre sua primeira refeição equilibrada',
      category: 'nutrition',
      tier: 'bronze',
      icon: '🍎',
      progress: 1,
      target: 1,
      unlocked: true,
      unlockedAt: new Date('2024-01-12'),
      xpReward: 30
    },
    {
      id: 'food-2',
      title: 'Semana Saudável',
      description: 'Registre refeições equilibradas por 7 dias',
      category: 'nutrition',
      tier: 'silver',
      icon: '🥗',
      progress: 5,
      target: 7,
      unlocked: false,
      xpReward: 150
    },
    {
      id: 'food-3',
      title: 'Detox Master',
      description: 'Evite ultraprocessados por 21 dias consecutivos',
      category: 'nutrition',
      tier: 'gold',
      icon: '🌿',
      progress: 8,
      target: 21,
      unlocked: false,
      xpReward: 300
    },
    {
      id: 'food-4',
      title: 'Nutricionista Natural',
      description: 'Complete 100 refeições equilibradas',
      category: 'nutrition',
      tier: 'platinum',
      icon: '👨‍🍳',
      progress: 42,
      target: 100,
      unlocked: false,
      xpReward: 450
    },

    // Atividade Física
    {
      id: 'exercise-1',
      title: 'Primeiro Treino',
      description: 'Complete seu primeiro treino',
      category: 'exercise',
      tier: 'bronze',
      icon: '💪',
      progress: 1,
      target: 1,
      unlocked: true,
      unlockedAt: new Date('2024-01-14'),
      xpReward: 40
    },
    {
      id: 'exercise-2',
      title: 'Guerreiro Semanal',
      description: 'Complete 5 treinos em uma semana',
      category: 'exercise',
      tier: 'silver',
      icon: '🏋️',
      progress: 3,
      target: 5,
      unlocked: false,
      xpReward: 180
    },
    {
      id: 'exercise-3',
      title: 'Maratonista',
      description: 'Atinja 10.000 passos por 30 dias',
      category: 'exercise',
      tier: 'gold',
      icon: '🏃',
      progress: 12,
      target: 30,
      unlocked: false,
      xpReward: 350
    },
    {
      id: 'exercise-4',
      title: 'Atleta Elite',
      description: 'Queime 50.000 calorias no total',
      category: 'exercise',
      tier: 'platinum',
      icon: '🔥',
      progress: 18500,
      target: 50000,
      unlocked: false,
      xpReward: 700
    }
  ];

  // Missões Diárias
  const dailyMissions: DailyMission[] = [
    {
      id: 'daily-1',
      title: 'Registrar 3 Refeições',
      description: 'Registre café, almoço e jantar hoje',
      progress: 2,
      target: 3,
      xpReward: 50,
      completed: false
    },
    {
      id: 'daily-2',
      title: 'Beber 2L de Água',
      description: 'Atinja sua meta de hidratação diária',
      progress: 1.5,
      target: 2,
      xpReward: 30,
      completed: false
    },
    {
      id: 'daily-3',
      title: 'Completar Jejum',
      description: 'Complete seu protocolo de jejum de hoje',
      progress: 14,
      target: 16,
      xpReward: 40,
      completed: false
    }
  ];

  // Desafios Ativos
  const challenges: Challenge[] = [
    {
      id: 'challenge-1',
      title: '30 Dias de Hidratação Perfeita',
      description: 'Atinja a meta de água todos os dias por 30 dias',
      duration: '30 dias',
      progress: 12,
      target: 30,
      participants: 1247,
      reward: '500 XP + Badge Especial',
      endsIn: '18 dias'
    },
    {
      id: 'challenge-2',
      title: 'Desafio Detox',
      description: 'Evite ultraprocessados por 21 dias',
      duration: '21 dias',
      progress: 8,
      target: 21,
      participants: 892,
      reward: '300 XP + Medalha de Ouro',
      endsIn: '13 dias'
    },
    {
      id: 'challenge-3',
      title: 'Maratona de Passos',
      description: 'Atinja 10.000 passos por 7 dias consecutivos',
      duration: '7 dias',
      progress: 3,
      target: 7,
      participants: 2156,
      reward: '200 XP + Troféu',
      endsIn: '4 dias'
    }
  ];

  // Filtrar conquistas por categoria
  const filteredAchievements = activeCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === activeCategory);

  const unlockedCount = filteredAchievements.filter(a => a.unlocked).length;
  const totalCount = filteredAchievements.length;
  const completionRate = (unlockedCount / totalCount) * 100;

  // Função para obter cor do tier
  const getTierColor = (tier: AchievementTier) => {
    switch (tier) {
      case 'bronze': return 'from-amber-600 to-amber-800';
      case 'silver': return 'from-gray-300 to-gray-500';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'platinum': return 'from-cyan-400 to-blue-600';
    }
  };

  // Função para obter ícone da categoria
  const getCategoryIcon = (category: AchievementCategory) => {
    switch (category) {
      case 'fasting': return <Clock className="w-5 h-5" />;
      case 'hydration': return <Droplets className="w-5 h-5" />;
      case 'weight': return <Scale className="w-5 h-5" />;
      case 'nutrition': return <Apple className="w-5 h-5" />;
      case 'exercise': return <Dumbbell className="w-5 h-5" />;
    }
  };

  // Função para abrir modal de compartilhamento
  const openShareModal = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setShareModalOpen(true);
    setCopied(false);
    setShareSuccess(false);
  };

  // Função para fechar modal
  const closeShareModal = () => {
    setShareModalOpen(false);
    setSelectedAchievement(null);
    setCopied(false);
    setShareSuccess(false);
  };

  // Função para gerar texto de compartilhamento
  const getShareText = (achievement: Achievement) => {
    const tierEmoji = {
      bronze: '🥉',
      silver: '🥈',
      gold: '🥇',
      platinum: '💎'
    };
    
    return `🏆 Acabei de desbloquear a conquista ${tierEmoji[achievement.tier]} "${achievement.title}" no Nutrivus.IA!\n\n${achievement.description}\n\n+${achievement.xpReward} XP conquistados! 🎉\n\n#Nutrivus #Saúde #Conquista #VidaSaudável`;
  };

  // Função para copiar texto
  const copyToClipboard = async () => {
    if (!selectedAchievement) return;
    
    try {
      await navigator.clipboard.writeText(getShareText(selectedAchievement));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  // Função para compartilhar no WhatsApp
  const shareWhatsApp = () => {
    if (!selectedAchievement) return;
    const text = encodeURIComponent(getShareText(selectedAchievement));
    window.open(`https://wa.me/?text=${text}`, '_blank');
    showSuccessMessage();
  };

  // Função para compartilhar no Twitter
  const shareTwitter = () => {
    if (!selectedAchievement) return;
    const text = encodeURIComponent(getShareText(selectedAchievement));
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    showSuccessMessage();
  };

  // Função para compartilhar no Facebook
  const shareFacebook = () => {
    if (!selectedAchievement) return;
    const text = encodeURIComponent(getShareText(selectedAchievement));
    window.open(`https://www.facebook.com/sharer/sharer.php?quote=${text}`, '_blank');
    showSuccessMessage();
  };

  // Função para compartilhar no LinkedIn
  const shareLinkedIn = () => {
    if (!selectedAchievement) return;
    const text = encodeURIComponent(getShareText(selectedAchievement));
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://nutrivus.ai')}&summary=${text}`, '_blank');
    showSuccessMessage();
  };

  // Função para compartilhar por Email
  const shareEmail = () => {
    if (!selectedAchievement) return;
    const subject = encodeURIComponent(`Conquista desbloqueada: ${selectedAchievement.title}`);
    const body = encodeURIComponent(getShareText(selectedAchievement));
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    showSuccessMessage();
  };

  // Função para mostrar mensagem de sucesso
  const showSuccessMessage = () => {
    setShareSuccess(true);
    setTimeout(() => {
      setShareSuccess(false);
      closeShareModal();
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header com Nível do Usuário */}
      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-purple-500/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full px-3 py-1 text-xs font-bold text-gray-900">
                Nv. {userLevel === 'beginner' ? '1' : userLevel === 'intermediate' ? '2' : userLevel === 'advanced' ? '3' : '4'}
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                Suas Conquistas
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Nível: <span className="font-semibold capitalize">{userLevel}</span>
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {userXP.toLocaleString()} XP
              </span>
            </div>
            <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${(userXP / nextLevelXP) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {nextLevelXP - userXP} XP para próximo nível
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{unlockedAchievements}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Conquistas</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentStreak}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Dias Seguidos</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(completionRate)}%</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Conclusão</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{longestStreak}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Recorde</p>
        </div>
      </div>

      {/* Missões Diárias */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            Missões Diárias
          </h2>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Resetam em 8h 32min
          </span>
        </div>

        <div className="space-y-3">
          {dailyMissions.map((mission) => (
            <div 
              key={mission.id}
              className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {mission.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {mission.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 text-sm font-semibold">
                  <Star className="w-4 h-4" />
                  +{mission.xpReward}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>Progresso</span>
                  <span>{mission.progress}/{mission.target}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${(mission.progress / mission.target) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desafios Ativos */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-green-500" />
            Desafios Ativos
          </h2>
          <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">
            Ver Todos
          </button>
        </div>

        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div 
              key={challenge.id}
              className="p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-700"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {challenge.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {challenge.participants.toLocaleString()} participantes
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Termina em {challenge.endsIn}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Gift className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {challenge.reward}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>Seu Progresso</span>
                  <span>{challenge.progress}/{challenge.target} dias</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filtros de Categoria */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            activeCategory === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setActiveCategory('fasting')}
          className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
            activeCategory === 'fasting'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <Clock className="w-4 h-4" />
          Jejum
        </button>
        <button
          onClick={() => setActiveCategory('hydration')}
          className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
            activeCategory === 'hydration'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <Droplets className="w-4 h-4" />
          Hidratação
        </button>
        <button
          onClick={() => setActiveCategory('weight')}
          className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
            activeCategory === 'weight'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <Scale className="w-4 h-4" />
          Peso
        </button>
        <button
          onClick={() => setActiveCategory('nutrition')}
          className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
            activeCategory === 'nutrition'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <Apple className="w-4 h-4" />
          Alimentação
        </button>
        <button
          onClick={() => setActiveCategory('exercise')}
          className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
            activeCategory === 'exercise'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          Exercícios
        </button>
      </div>

      {/* Grid de Conquistas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {activeCategory === 'all' ? 'Todas as Conquistas' : 'Conquistas Filtradas'}
          </h2>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {unlockedCount}/{totalCount} desbloqueadas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAchievements.map((achievement) => {
            const progressPercent = (achievement.progress / achievement.target) * 100;

            return (
              <div
                key={achievement.id}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-700 hover:shadow-lg'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div className={`text-5xl ${!achievement.unlocked && 'grayscale opacity-50'}`}>
                      {achievement.unlocked ? achievement.icon : <Lock className="w-12 h-12 text-gray-400" />}
                    </div>
                    {achievement.unlocked && (
                      <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br ${getTierColor(achievement.tier)} flex items-center justify-center`}>
                        <Medal className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {achievement.unlocked && (
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full font-medium">
                        Desbloqueado
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                      achievement.tier === 'bronze' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                      achievement.tier === 'silver' ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300' :
                      achievement.tier === 'gold' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                      'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
                    }`}>
                      {achievement.tier}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {achievement.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>Progresso</span>
                    <span>{achievement.progress}/{achievement.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        achievement.unlocked
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : 'bg-gradient-to-r from-gray-400 to-gray-500'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-semibold">
                    <Star className="w-4 h-4" />
                    +{achievement.xpReward} XP
                  </div>
                  {achievement.unlocked && (
                    <button
                      onClick={() => openShareModal(achievement)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                      title="Compartilhar conquista"
                    >
                      <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-500" />
                    </button>
                  )}
                </div>

                {achievement.unlocked && achievement.unlockedAt && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    Desbloqueado em {achievement.unlockedAt.toLocaleDateString('pt-BR', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Ranking Pessoal */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple-500" />
          Seus Recordes Pessoais
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
            <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{longestStreak}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Maior Sequência</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{unlockedAchievements}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Conquistas Totais</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
            <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{userXP.toLocaleString()}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">XP Total</p>
          </div>
        </div>
      </div>

      {/* Mensagem Motivacional */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-center">
        <Sparkles className="w-12 h-12 text-white mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">
          Continue Assim! 🎉
        </h3>
        <p className="text-white/90 mb-4">
          Você está a apenas {nextLevelXP - userXP} XP de subir de nível. Complete suas missões diárias para acelerar seu progresso!
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
          Ver Próximas Conquistas
        </button>
      </div>

      {/* Modal de Compartilhamento */}
      {shareModalOpen && selectedAchievement && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Header do Modal */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Share2 className="w-6 h-6 text-blue-500" />
                Compartilhar Conquista
              </h3>
              <button
                onClick={closeShareModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Preview da Conquista */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 mb-6 border border-yellow-200 dark:border-yellow-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl">{selectedAchievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {selectedAchievement.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedAchievement.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={`px-2 py-1 rounded-full font-medium capitalize ${
                  selectedAchievement.tier === 'bronze' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                  selectedAchievement.tier === 'silver' ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300' :
                  selectedAchievement.tier === 'gold' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                  'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
                }`}>
                  {selectedAchievement.tier}
                </span>
                <span className="text-yellow-500 font-semibold flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  +{selectedAchievement.xpReward} XP
                </span>
              </div>
            </div>

            {/* Mensagem de Sucesso */}
            {shareSuccess && (
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span className="font-medium">Compartilhado com sucesso!</span>
              </div>
            )}

            {/* Botões de Compartilhamento */}
            <div className="space-y-3 mb-4">
              <button
                onClick={shareWhatsApp}
                className="w-full flex items-center gap-3 p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors font-medium"
              >
                <MessageCircle className="w-5 h-5" />
                Compartilhar no WhatsApp
              </button>

              <button
                onClick={shareTwitter}
                className="w-full flex items-center gap-3 p-3 bg-blue-400 hover:bg-blue-500 text-white rounded-xl transition-colors font-medium"
              >
                <Twitter className="w-5 h-5" />
                Compartilhar no Twitter
              </button>

              <button
                onClick={shareFacebook}
                className="w-full flex items-center gap-3 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
              >
                <Facebook className="w-5 h-5" />
                Compartilhar no Facebook
              </button>

              <button
                onClick={shareLinkedIn}
                className="w-full flex items-center gap-3 p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl transition-colors font-medium"
              >
                <Linkedin className="w-5 h-5" />
                Compartilhar no LinkedIn
              </button>

              <button
                onClick={shareEmail}
                className="w-full flex items-center gap-3 p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors font-medium"
              >
                <Mail className="w-5 h-5" />
                Compartilhar por Email
              </button>
            </div>

            {/* Copiar Texto */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl transition-colors font-medium"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-green-500" />
                    Texto Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copiar Texto
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
