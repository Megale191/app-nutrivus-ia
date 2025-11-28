'use client';

// Nutrivus.IA - Main App

import { useState } from 'react';
import Navigation from '@/components/custom/Navigation';
import Dashboard from '@/components/custom/Dashboard';
import Quiz from '@/components/custom/Quiz';
import MealRegistration from '@/components/custom/MealRegistration';
import Analysis from '@/components/custom/Analysis';
import Hydration from '@/components/custom/Hydration';
import Fasting from '@/components/custom/Fasting';
import Achievements from '@/components/custom/Achievements';
import Community from '@/components/custom/Community';
import Profile from '@/components/custom/Profile';
import MoodDiary from '@/components/custom/MoodDiary';

export default function Home() {
  const [activeTab, setActiveTab] = useState('quiz');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'quiz':
        return <Quiz />;
      case 'meals':
        return <MealRegistration />;
      case 'analysis':
        return <Analysis />;
      case 'hydration':
        return <Hydration />;
      case 'fasting':
        return <Fasting />;
      case 'achievements':
        return <Achievements />;
      case 'community':
        return <Community />;
      case 'profile':
        return <Profile />;
      case 'mood':
        return <MoodDiary />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] transition-colors duration-300">
      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="md:ml-20 lg:ml-64 p-4 md:p-8 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Background Gradient Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3F51B5]/10 dark:bg-[#1E88E5]/10 rounded-full blur-3xl transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3F51B5]/5 dark:bg-[#1E88E5]/5 rounded-full blur-3xl transition-colors duration-300" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3F51B5]/5 dark:bg-[#1E88E5]/5 rounded-full blur-3xl transition-colors duration-300" />
      </div>
    </div>
  );
}
