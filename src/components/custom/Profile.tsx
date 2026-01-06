'use client';

// Nutrivus.IA - Profile Component

import { useState, useEffect } from 'react';
import { User, Target, Activity, Heart, Edit } from 'lucide-react';
import { mockUserProfile } from '@/lib/mock-data';
import EditProfile from './EditProfile';

export default function Profile() {
  const [profile, setProfile] = useState(mockUserProfile);
  const [showEditModal, setShowEditModal] = useState(false);

  // Carregar perfil do localStorage ao montar o componente
  useEffect(() => {
    const savedProfile = localStorage.getItem('nutrivus_user_profile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile({
          ...mockUserProfile,
          name: parsedProfile.name,
          age: parsedProfile.age,
          weight: parsedProfile.weight,
          height: parsedProfile.height,
          activityLevel: parsedProfile.activityLevel,
          preferences: parsedProfile.preferences
        });
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      }
    }
  }, []);

  const handleSaveProfile = (updatedData: any) => {
    setProfile({
      ...profile,
      name: updatedData.name,
      age: updatedData.age,
      weight: updatedData.weight,
      height: updatedData.height,
      activityLevel: updatedData.activityLevel,
      preferences: updatedData.preferences
    });
  };

  const calculateBMI = () => {
    const heightInMeters = profile.height / 100;
    return (profile.weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'Abaixo do peso';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Sobrepeso';
    return 'Obesidade';
  };

  const goalLabels = {
    lose: 'Perder Peso',
    maintain: 'Manter Peso',
    gain: 'Ganhar Peso'
  };

  const activityLabels = {
    sedentary: 'Sedentário',
    light: 'Levemente Ativo',
    moderate: 'Moderadamente Ativo',
    active: 'Muito Ativo',
    'very-active': 'Extremamente Ativo'
  };

  const bmi = parseFloat(calculateBMI());

  return (
    <>
      <div className="space-y-6 pb-24 md:pb-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Perfil</h1>
          <p className="text-white/60">Suas informações e objetivos</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#00FF00]/30">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00FF00] to-[#00CC00] flex items-center justify-center">
              <User className="w-16 h-16 text-[#00BFFF]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">{profile.name}</h2>
              <p className="text-white/60 mb-4">{profile.age} anos</p>
              <button
                onClick={() => setShowEditModal(true)}
                className="px-6 py-2 bg-gradient-to-r from-[#00FF00] to-[#00CC00] hover:from-[#00CC00] hover:to-[#00FF00] text-[#00BFFF] rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto md:mx-0 font-bold shadow-lg hover:shadow-[#00FF00]/50"
              >
                <Edit className="w-4 h-4" />
                Editar Perfil
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-center">
              <p className="text-white/60 text-sm mb-2">Peso</p>
              <p className="text-3xl font-bold text-white">{profile.weight}</p>
              <p className="text-white/40 text-xs">kg</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-center">
              <p className="text-white/60 text-sm mb-2">Altura</p>
              <p className="text-3xl font-bold text-white">{profile.height}</p>
              <p className="text-white/40 text-xs">cm</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-center">
              <p className="text-white/60 text-sm mb-2">IMC</p>
              <p className="text-3xl font-bold text-[#00FF00]">{calculateBMI()}</p>
              <p className="text-white/40 text-xs">{getBMICategory(bmi)}</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-center">
              <p className="text-white/60 text-sm mb-2">Meta Diária</p>
              <p className="text-3xl font-bold text-white">{profile.dailyCalorieGoal}</p>
              <p className="text-white/40 text-xs">kcal</p>
            </div>
          </div>
        </div>

        {/* Goals & Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Goal */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#00FF00]/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-[#00FF00]" />
              </div>
              <h3 className="text-xl font-bold text-white">Objetivo</h3>
            </div>
            <p className="text-2xl font-bold text-white mb-2">{goalLabels[profile.goal]}</p>
            <p className="text-white/60 text-sm">
              Seu plano está otimizado para {goalLabels[profile.goal].toLowerCase()}
            </p>
          </div>

          {/* Activity Level */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#00BFFF]/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#00BFFF]" />
              </div>
              <h3 className="text-xl font-bold text-white">Nível de Atividade</h3>
            </div>
            <p className="text-2xl font-bold text-white mb-2">{activityLabels[profile.activityLevel]}</p>
            <p className="text-white/60 text-sm">
              Suas calorias são calculadas com base neste nível
            </p>
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#00CC00]/20 flex items-center justify-center">
              <Heart className="w-6 h-6 text-[#00CC00]" />
            </div>
            <h3 className="text-xl font-bold text-white">Preferências Alimentares</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {profile.preferences.map((pref, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-[#00FF00]/20 to-[#00CC00]/20 border border-[#00FF00]/30 rounded-full text-white"
              >
                {pref}
              </span>
            ))}
            <button
              onClick={() => setShowEditModal(true)}
              className="px-4 py-2 bg-white/5 border border-white/10 hover:border-[#00FF00]/50 rounded-full text-white/60 hover:text-white transition-all duration-300"
            >
              + Adicionar
            </button>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Métricas de Saúde</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="text-white font-medium">Pressão Arterial</p>
                <p className="text-white/60 text-sm">Última medição: Hoje</p>
              </div>
              <p className="text-2xl font-bold text-[#00FF00]">120/80</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="text-white font-medium">Frequência Cardíaca</p>
                <p className="text-white/60 text-sm">Em repouso</p>
              </div>
              <p className="text-2xl font-bold text-[#00BFFF]">72 bpm</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="text-white font-medium">Glicemia</p>
                <p className="text-white/60 text-sm">Jejum</p>
              </div>
              <p className="text-2xl font-bold text-[#00CC00]">95 mg/dL</p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Configurações da Conta</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300">
              <span className="text-white">Notificações</span>
              <span className="text-white/60">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300">
              <span className="text-white">Privacidade</span>
              <span className="text-white/60">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300">
              <span className="text-white">Idioma</span>
              <span className="text-white/60">Português</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300">
              <span className="text-white">Tema</span>
              <span className="text-white/60">Dark</span>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfile
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveProfile}
        />
      )}
    </>
  );
}
