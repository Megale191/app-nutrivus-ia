'use client';

// Nutrivus.IA - Meal Registration Component

import { useState, useRef } from 'react';
import { Camera, Upload, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { analyzeMealImage } from '@/lib/openai';
import { NutritionAnalysis } from '@/lib/types';

export default function MealRegistration() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<NutritionAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      // Converter imagem para base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);

        try {
          const result = await analyzeMealImage(base64String);
          setAnalysis(result);
        } catch (err) {
          setError('Erro ao analisar a imagem. Tente novamente.');
          console.error(err);
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Erro ao processar a imagem.');
      setIsAnalyzing(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Registrar Refeição</h1>
        <p className="text-white/60">Tire uma foto ou faça upload da sua refeição</p>
      </div>

      {/* Upload Area */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {!previewImage ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00FF00] to-[#00CC00] flex items-center justify-center mb-6">
              <Camera className="w-12 h-12 text-[#00BFFF]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Adicionar Foto da Refeição</h3>
            <p className="text-white/60 text-center mb-6 max-w-md">
              Nossa IA analisará automaticamente os nutrientes da sua refeição
            </p>
            <button
              onClick={triggerFileInput}
              className="px-8 py-4 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] font-bold rounded-xl hover:shadow-lg hover:shadow-[#00FF00]/30 transition-all duration-300 flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Escolher Imagem
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src={previewImage} 
                alt="Preview da refeição" 
                className="w-full h-64 object-cover"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-[#00BFFF]/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
                    <p className="text-white font-medium">Analisando refeição com IA...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Analysis Results */}
            {analysis && !isAnalyzing && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#00FF00]">
                  <CheckCircle className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Análise Concluída</h3>
                </div>

                {/* Nutrition Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/60 text-sm mb-1">Calorias</p>
                    <p className="text-2xl font-bold text-white">{analysis.calories}</p>
                    <p className="text-xs text-white/40">kcal</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/60 text-sm mb-1">Proteínas</p>
                    <p className="text-2xl font-bold text-[#00FF00]">{analysis.protein}g</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/60 text-sm mb-1">Carboidratos</p>
                    <p className="text-2xl font-bold text-[#00BFFF]">{analysis.carbs}g</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/60 text-sm mb-1">Gorduras</p>
                    <p className="text-2xl font-bold text-[#00CC00]">{analysis.fats}g</p>
                  </div>
                </div>

                {/* Food Items Detected */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h4 className="font-bold text-white mb-3">Alimentos Identificados:</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.foodItems.map((item, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-[#00FF00]/20 to-[#00CC00]/20 border border-[#00FF00]/30 rounded-full text-white text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 bg-white/10 rounded-full h-2">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] rounded-full"
                        style={{ width: `${analysis.confidence}%` }}
                      />
                    </div>
                    <span className="text-white/60 text-sm">{analysis.confidence}% confiança</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setPreviewImage(null);
                      setAnalysis(null);
                      setError(null);
                    }}
                    className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    Nova Análise
                  </button>
                  <button
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] font-bold rounded-xl hover:shadow-lg hover:shadow-[#00FF00]/30 transition-all duration-300"
                  >
                    Salvar Refeição
                  </button>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && !isAnalyzing && (
              <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <XCircle className="w-6 h-6" />
                <p>{error}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Manual Entry Option */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Ou registre manualmente</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome da refeição"
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-[#00FF00]/50 focus:outline-none transition-all"
          />
          <input
            type="number"
            placeholder="Calorias"
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-[#00FF00]/50 focus:outline-none transition-all"
          />
          <input
            type="number"
            placeholder="Proteínas (g)"
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-[#00FF00]/50 focus:outline-none transition-all"
          />
          <input
            type="number"
            placeholder="Carboidratos (g)"
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-[#00FF00]/50 focus:outline-none transition-all"
          />
        </div>
        <button className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] font-bold rounded-xl hover:shadow-lg hover:shadow-[#00FF00]/30 transition-all duration-300">
          Adicionar Manualmente
        </button>
      </div>
    </div>
  );
}
