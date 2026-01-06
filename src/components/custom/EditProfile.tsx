'use client';

// Nutrivus.IA - Edit Profile Component

import { useState, useEffect } from 'react';
import { User, Save, X, Camera, AlertCircle, CheckCircle2 } from 'lucide-react';
import { mockUserProfile } from '@/lib/mock-data';

interface EditProfileProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function EditProfile({ onClose, onSave }: EditProfileProps) {
  const [formData, setFormData] = useState({
    name: mockUserProfile.name,
    age: mockUserProfile.age,
    gender: 'Masculino',
    weight: mockUserProfile.weight,
    height: mockUserProfile.height,
    goalWeight: mockUserProfile.weight - 5,
    dietType: 'Balanceada',
    activityLevel: mockUserProfile.activityLevel,
    preferences: mockUserProfile.preferences.join(', '),
    profilePhoto: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const dietTypes = [
    'Balanceada',
    'Low Carb',
    'Vegana',
    'Vegetariana',
    'Mediterrânea',
    'Cetogênica',
    'Paleo',
    'Flexitariana'
  ];

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentário' },
    { value: 'light', label: 'Levemente Ativo' },
    { value: 'moderate', label: 'Moderadamente Ativo' },
    { value: 'active', label: 'Muito Ativo' },
    { value: 'very-active', label: 'Extremamente Ativo' }
  ];

  const genderOptions = ['Masculino', 'Feminino', 'Outro', 'Prefiro não informar'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.age || formData.age < 13 || formData.age > 120) {
      newErrors.age = 'Idade deve estar entre 13 e 120 anos';
    }

    if (!formData.weight || formData.weight < 30 || formData.weight > 300) {
      newErrors.weight = 'Peso deve estar entre 30 e 300 kg';
    }

    if (!formData.height || formData.height < 100 || formData.height > 250) {
      newErrors.height = 'Altura deve estar entre 100 e 250 cm';
    }

    if (!formData.goalWeight || formData.goalWeight < 30 || formData.goalWeight > 300) {
      newErrors.goalWeight = 'Meta de peso deve estar entre 30 e 300 kg';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    // Simular salvamento (aqui você integraria com o backend/Supabase)
    setTimeout(() => {
      const preferencesArray = formData.preferences
        .split(',')
        .map(p => p.trim())
        .filter(p => p.length > 0);

      const updatedData = {
        ...formData,
        preferences: preferencesArray
      };

      // Salvar no localStorage
      localStorage.setItem('nutrivus_user_profile', JSON.stringify(updatedData));

      onSave(updatedData);
      setIsSaving(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl border border-white/10 w-full max-w-4xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF00] to-[#00CC00] flex items-center justify-center">
              <User className="w-5 h-5 text-[#00BFFF]" />
            </div>
            <h2 className="text-2xl font-bold text-white">Editar Perfil</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mx-6 mt-6 p-4 bg-[#00FF00]/20 border border-[#00FF00]/30 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#00FF00]" />
            <p className="text-white font-medium">Perfil atualizado com sucesso!</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00FF00] to-[#00CC00] flex items-center justify-center">
                <User className="w-16 h-16 text-[#00BFFF]" />
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#00FF00] hover:bg-[#00CC00] flex items-center justify-center transition-all duration-300 shadow-lg"
              >
                <Camera className="w-5 h-5 text-[#00BFFF]" />
              </button>
            </div>
            <p className="text-white/60 text-sm">Clique no ícone para alterar a foto</p>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-white font-medium mb-2">Nome Completo *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-4 py-3 bg-white/5 border ${
                  errors.name ? 'border-red-500' : 'border-white/10'
                } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00FF00] transition-all duration-300`}
                placeholder="Digite seu nome completo"
              />
              {errors.name && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="block text-white font-medium mb-2">Idade *</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value))}
                className={`w-full px-4 py-3 bg-white/5 border ${
                  errors.age ? 'border-red-500' : 'border-white/10'
                } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00FF00] transition-all duration-300`}
                placeholder="Digite sua idade"
                min="13"
                max="120"
              />
              {errors.age && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.age}</span>
                </div>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-white font-medium mb-2">Sexo</label>
              <select
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00FF00] transition-all duration-300"
              >
                {genderOptions.map((option) => (
                  <option key={option} value={option} className="bg-[#1a1a1a]">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-white font-medium mb-2">Peso Atual (kg) *</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => handleChange('weight', parseFloat(e.target.value))}
                className={`w-full px-4 py-3 bg-white/5 border ${
                  errors.weight ? 'border-red-500' : 'border-white/10'
                } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00FF00] transition-all duration-300`}
                placeholder="Digite seu peso"
                step="0.1"
                min="30"
                max="300"
              />
              {errors.weight && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.weight}</span>
                </div>
              )}
            </div>

            {/* Height */}
            <div>
              <label className="block text-white font-medium mb-2">Altura (cm) *</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => handleChange('height', parseInt(e.target.value))}
                className={`w-full px-4 py-3 bg-white/5 border ${
                  errors.height ? 'border-red-500' : 'border-white/10'
                } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00FF00] transition-all duration-300`}
                placeholder="Digite sua altura"
                min="100"
                max="250"
              />
              {errors.height && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.height}</span>
                </div>
              )}
            </div>

            {/* Goal Weight */}
            <div>
              <label className="block text-white font-medium mb-2">Meta de Peso (kg) *</label>
              <input
                type="number"
                value={formData.goalWeight}
                onChange={(e) => handleChange('goalWeight', parseFloat(e.target.value))}
                className={`w-full px-4 py-3 bg-white/5 border ${
                  errors.goalWeight ? 'border-red-500' : 'border-white/10'
                } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00FF00] transition-all duration-300`}
                placeholder="Digite sua meta de peso"
                step="0.1"
                min="30"
                max="300"
              />
              {errors.goalWeight && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.goalWeight}</span>
                </div>
              )}
            </div>

            {/* Diet Type */}
            <div>
              <label className="block text-white font-medium mb-2">Tipo de Dieta</label>
              <select
                value={formData.dietType}
                onChange={(e) => handleChange('dietType', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00FF00] transition-all duration-300"
              >
                {dietTypes.map((type) => (
                  <option key={type} value={type} className="bg-[#1a1a1a]">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-white font-medium mb-2">Nível de Atividade Física</label>
              <select
                value={formData.activityLevel}
                onChange={(e) => handleChange('activityLevel', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00FF00] transition-all duration-300"
              >
                {activityLevels.map((level) => (
                  <option key={level.value} value={level.value} className="bg-[#1a1a1a]">
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dietary Preferences */}
          <div>
            <label className="block text-white font-medium mb-2">
              Preferências Alimentares
              <span className="text-white/60 text-sm ml-2">(separe por vírgula)</span>
            </label>
            <textarea
              value={formData.preferences}
              onChange={(e) => handleChange('preferences', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00FF00] transition-all duration-300 min-h-[100px] resize-none"
              placeholder="Ex: Sem lactose, Sem glúten, Vegetariano"
            />
            <p className="text-white/40 text-sm mt-2">
              Exemplos: Sem lactose, Sem glúten, Vegano, Sem açúcar, Orgânico
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all duration-300 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00FF00] to-[#00CC00] hover:from-[#00CC00] hover:to-[#00FF00] text-[#00BFFF] rounded-xl transition-all duration-300 font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#00BFFF] border-t-transparent rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Salvar Alterações
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
