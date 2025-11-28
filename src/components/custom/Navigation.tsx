'use client';

// Nutrivus.IA - Navigation Component

import { Home, User, Camera, Activity, Droplet, Clock, Trophy, Users, ClipboardList, Sun, Moon, Heart, Target, Sparkles, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  { id: 'quiz', icon: ClipboardList, label: 'Quiz' },
  { id: 'meals', icon: Camera, label: 'Refeições' },
  { id: 'analysis', icon: Activity, label: 'Análise' },
  { id: 'mood', icon: Heart, label: 'Humor' },
  { id: 'challenges', icon: Target, label: 'Desafios' },
  { id: 'ai-recommendations', icon: Sparkles, label: 'IA' },
  { id: 'notifications', icon: Bell, label: 'Notificações' },
  { id: 'hydration', icon: Droplet, label: 'Hidratação' },
  { id: 'fasting', icon: Clock, label: 'Jejum' },
  { id: 'achievements', icon: Trophy, label: 'Conquistas' },
  { id: 'community', icon: Users, label: 'Comunidade' },
  { id: 'profile', icon: User, label: 'Perfil' }
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* Desktop Navigation - Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-20 lg:w-64 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 flex-col items-center py-8 z-50 transition-colors duration-300">
        <div className="mb-12 px-4 flex items-center justify-between w-full">
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] dark:from-[#1E88E5] dark:to-[#3F51B5] bg-clip-text text-transparent">
            <span className="hidden lg:inline">Nutrivus.IA</span>
            <span className="lg:hidden">N</span>
          </h1>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-700" />
            ) : (
              <Sun className="w-5 h-5 text-[#E0E0E0]" />
            )}
          </button>
        </div>
        
        <div className="flex-1 w-full space-y-2 px-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  'w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
                  isActive
                    ? 'bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] text-white shadow-lg shadow-[#3F51B5]/30 dark:shadow-[#1E88E5]/30'
                    : 'text-gray-700 dark:text-[#E0E0E0] hover:bg-gray-100 dark:hover:bg-gray-800/50'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden lg:inline font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation - Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 z-50 transition-colors duration-300">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300',
                  isActive
                    ? 'text-[#3F51B5] dark:text-[#1E88E5]'
                    : 'text-gray-600 dark:text-gray-400'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
