'use client';

// Nutrivus.IA - Navigation Component

import { Home, User, Camera, Activity, Droplet, Clock, Trophy, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  { id: 'meals', icon: Camera, label: 'Refeições' },
  { id: 'analysis', icon: Activity, label: 'Análise' },
  { id: 'hydration', icon: Droplet, label: 'Hidratação' },
  { id: 'fasting', icon: Clock, label: 'Jejum' },
  { id: 'achievements', icon: Trophy, label: 'Conquistas' },
  { id: 'community', icon: Users, label: 'Comunidade' },
  { id: 'profile', icon: User, label: 'Perfil' }
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <>
      {/* Desktop Navigation - Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-20 lg:w-64 bg-[#0099CC]/20 backdrop-blur-xl border-r border-white/10 flex-col items-center py-8 z-50">
        <div className="mb-12 px-4">
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#00FF00] to-[#00CC00] bg-clip-text text-transparent">
            <span className="hidden lg:inline">Nutrivus.IA</span>
            <span className="lg:hidden">N</span>
          </h1>
        </div>
        
        <div className="flex-1 w-full space-y-2 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  'w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300',
                  isActive
                    ? 'bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] shadow-lg shadow-[#00FF00]/20'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0099CC]/20 backdrop-blur-xl border-t border-white/10 z-50">
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
                    ? 'text-[#00FF00]'
                    : 'text-white/60'
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
