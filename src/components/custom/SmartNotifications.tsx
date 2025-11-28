'use client';

// Nutrivus.IA - Smart Notifications Component

import { useState } from 'react';
import { Bell, BellOff, Clock, Droplet, Flame, Heart, MessageCircle, Trophy, TrendingUp, Settings, Check } from 'lucide-react';

interface Notification {
  id: string;
  type: 'reminder' | 'achievement' | 'motivation' | 'social' | 'insight';
  title: string;
  message: string;
  time: string;
  icon: any;
  color: string;
  read: boolean;
  actionable?: {
    label: string;
    action: string;
  };
}

export default function SmartNotifications() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'reminder',
      title: 'Hora de Beber Água! 💧',
      message: 'Você está 300ml abaixo da meta de hidratação de hoje. Beba um copo agora!',
      time: 'Agora',
      icon: Droplet,
      color: 'from-cyan-500 to-blue-500',
      read: false,
      actionable: {
        label: 'Registrar 250ml',
        action: 'log_water'
      }
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Conquista Desbloqueada! 🏆',
      message: 'Parabéns! Você completou 7 dias consecutivos registrando refeições!',
      time: '5 min atrás',
      icon: Trophy,
      color: 'from-yellow-400 to-orange-500',
      read: false,
      actionable: {
        label: 'Ver Conquista',
        action: 'view_achievement'
      }
    },
    {
      id: '3',
      type: 'motivation',
      title: 'Você está indo muito bem! 💪',
      message: 'Sua consistência aumentou 35% esta semana. Continue assim!',
      time: '1h atrás',
      icon: TrendingUp,
      color: 'from-green-400 to-emerald-500',
      read: false
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Janela de Jejum Terminando ⏰',
      message: 'Sua janela de alimentação começa em 30 minutos. Prepare sua refeição!',
      time: '2h atrás',
      icon: Clock,
      color: 'from-purple-500 to-pink-500',
      read: true
    },
    {
      id: '5',
      type: 'social',
      title: 'Nova Interação na Comunidade 💬',
      message: 'Maria Silva comentou na sua publicação sobre jejum intermitente',
      time: '3h atrás',
      icon: MessageCircle,
      color: 'from-blue-400 to-indigo-500',
      read: true,
      actionable: {
        label: 'Ver Comentário',
        action: 'view_comment'
      }
    },
    {
      id: '6',
      type: 'insight',
      title: 'Novo Insight Disponível 🧠',
      message: 'A IA identificou um padrão: você tem mais energia quando treina às 17h',
      time: '5h atrás',
      icon: TrendingUp,
      color: 'from-indigo-500 to-purple-600',
      read: true,
      actionable: {
        label: 'Ver Insight',
        action: 'view_insight'
      }
    },
    {
      id: '7',
      type: 'reminder',
      title: 'Hora de Registrar o Almoço 🍽️',
      message: 'Não se esqueça de fotografar e registrar sua refeição!',
      time: '6h atrás',
      icon: Clock,
      color: 'from-orange-400 to-red-500',
      read: true
    },
    {
      id: '8',
      type: 'motivation',
      title: 'Sequência de Fogo! 🔥',
      message: 'Você manteve sua meta de proteína por 5 dias seguidos!',
      time: 'Ontem',
      icon: Flame,
      color: 'from-red-400 to-orange-500',
      read: true
    }
  ];

  const filteredNotifications = selectedFilter === 'all'
    ? notifications
    : selectedFilter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === selectedFilter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const notificationTypes = [
    { id: 'all', label: 'Todas', count: notifications.length },
    { id: 'unread', label: 'Não Lidas', count: unreadCount },
    { id: 'reminder', label: 'Lembretes', count: notifications.filter(n => n.type === 'reminder').length },
    { id: 'achievement', label: 'Conquistas', count: notifications.filter(n => n.type === 'achievement').length },
    { id: 'motivation', label: 'Motivação', count: notifications.filter(n => n.type === 'motivation').length }
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <Bell className="w-8 h-8 text-[#3F51B5] dark:text-[#1E88E5]" />
            Notificações
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-gray-600 dark:text-white/60">Fique por dentro de tudo que acontece</p>
        </div>
        <button
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          className={`p-3 rounded-xl transition-all duration-300 ${
            notificationsEnabled
              ? 'bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] text-white shadow-lg'
              : 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-white/60'
          }`}
        >
          {notificationsEnabled ? <Bell className="w-6 h-6" /> : <BellOff className="w-6 h-6" />}
        </button>
      </div>

      {/* Status Banner */}
      {notificationsEnabled ? (
        <div className="bg-gradient-to-br from-[#3F51B5]/20 to-[#1E88E5]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#3F51B5]/30 dark:border-[#1E88E5]/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3F51B5] to-[#1E88E5] flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Notificações Ativas</h3>
              <p className="text-gray-600 dark:text-white/60">Você receberá lembretes inteligentes para manter seus objetivos</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center">
              <BellOff className="w-6 h-6 text-gray-600 dark:text-white/60" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Notificações Desativadas</h3>
              <p className="text-gray-600 dark:text-white/60">Ative para receber lembretes e atualizações importantes</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 hover:border-[#3F51B5]/30 dark:hover:border-[#1E88E5]/30 transition-all duration-300 text-center group">
          <Droplet className="w-8 h-8 text-cyan-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-gray-900 dark:text-white">Lembrete de Água</p>
          <p className="text-xs text-gray-600 dark:text-white/60 mt-1">A cada 2h</p>
        </button>

        <button className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 hover:border-[#3F51B5]/30 dark:hover:border-[#1E88E5]/30 transition-all duration-300 text-center group">
          <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-gray-900 dark:text-white">Lembrete de Jejum</p>
          <p className="text-xs text-gray-600 dark:text-white/60 mt-1">Personalizado</p>
        </button>

        <button className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 hover:border-[#3F51B5]/30 dark:hover:border-[#1E88E5]/30 transition-all duration-300 text-center group">
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-gray-900 dark:text-white">Registro de Humor</p>
          <p className="text-xs text-gray-600 dark:text-white/60 mt-1">Diário</p>
        </button>

        <button className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 hover:border-[#3F51B5]/30 dark:hover:border-[#1E88E5]/30 transition-all duration-300 text-center group">
          <Settings className="w-8 h-8 text-gray-600 dark:text-white/60 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-gray-900 dark:text-white">Configurar</p>
          <p className="text-xs text-gray-600 dark:text-white/60 mt-1">Preferências</p>
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {notificationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedFilter(type.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-300 ${
              selectedFilter === type.id
                ? 'bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] text-white shadow-lg'
                : 'bg-white dark:bg-white/5 text-gray-600 dark:text-white/60 border border-gray-200 dark:border-white/10 hover:border-[#3F51B5]/30 dark:hover:border-[#1E88E5]/30'
            }`}
          >
            {type.label}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              selectedFilter === type.id
                ? 'bg-white/20'
                : 'bg-gray-200 dark:bg-white/10'
            }`}>
              {type.count}
            </span>
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-5 border transition-all duration-300 hover:shadow-lg ${
                notification.read
                  ? 'border-gray-200 dark:border-white/10'
                  : 'border-[#3F51B5]/30 dark:border-[#1E88E5]/30 bg-gradient-to-br from-[#3F51B5]/5 to-[#1E88E5]/5'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${notification.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{notification.title}</h3>
                    <span className="text-xs text-gray-600 dark:text-white/60 whitespace-nowrap">{notification.time}</span>
                  </div>
                  <p className="text-gray-600 dark:text-white/70 mb-3">{notification.message}</p>

                  {/* Action Button */}
                  {notification.actionable && (
                    <button className="px-4 py-2 bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#3F51B5]/30 dark:hover:shadow-[#1E88E5]/30 transition-all duration-300 hover:scale-105 active:scale-95">
                      {notification.actionable.label}
                    </button>
                  )}
                </div>

                {/* Unread Indicator */}
                {!notification.read && (
                  <div className="w-3 h-3 rounded-full bg-[#3F51B5] dark:bg-[#1E88E5] flex-shrink-0 mt-2" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/10">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#3F51B5] dark:text-[#1E88E5]" />
          Preferências de Notificação
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Lembretes de Hidratação', enabled: true },
            { label: 'Lembretes de Refeições', enabled: true },
            { label: 'Alertas de Jejum', enabled: true },
            { label: 'Conquistas e Badges', enabled: true },
            { label: 'Mensagens Motivacionais', enabled: true },
            { label: 'Insights da IA', enabled: false },
            { label: 'Atualizações da Comunidade', enabled: false }
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
              <span className="text-gray-900 dark:text-white font-medium">{setting.label}</span>
              <button
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  setting.enabled
                    ? 'bg-gradient-to-r from-[#3F51B5] to-[#1E88E5]'
                    : 'bg-gray-300 dark:bg-white/20'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                  setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
