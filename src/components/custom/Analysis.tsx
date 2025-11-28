'use client';

// Nutrivus.IA - Analysis Component

import { Activity, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function Analysis() {
  const weeklyNutritionData = [
    { day: 'Seg', proteinas: 85, carboidratos: 180, gorduras: 45 },
    { day: 'Ter', proteinas: 90, carboidratos: 160, gorduras: 40 },
    { day: 'Qua', proteinas: 80, carboidratos: 190, gorduras: 50 },
    { day: 'Qui', proteinas: 95, carboidratos: 170, gorduras: 42 },
    { day: 'Sex', proteinas: 88, carboidratos: 165, gorduras: 38 },
    { day: 'Sáb', proteinas: 100, carboidratos: 200, gorduras: 55 },
    { day: 'Dom', proteinas: 75, carboidratos: 150, gorduras: 35 }
  ];

  const micronutrientsData = [
    { nutrient: 'Vitamina A', value: 85, fullMark: 100 },
    { nutrient: 'Vitamina C', value: 92, fullMark: 100 },
    { nutrient: 'Vitamina D', value: 65, fullMark: 100 },
    { nutrient: 'Cálcio', value: 78, fullMark: 100 },
    { nutrient: 'Ferro', value: 88, fullMark: 100 },
    { nutrient: 'Magnésio', value: 72, fullMark: 100 }
  ];

  const caloriesTrendData = [
    { week: 'Sem 1', consumido: 14200, meta: 14000 },
    { week: 'Sem 2', consumido: 13800, meta: 14000 },
    { week: 'Sem 3', consumido: 14100, meta: 14000 },
    { week: 'Sem 4', consumido: 13900, meta: 14000 }
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Análise Nutricional</h1>
        <p className="text-white/60">Visão detalhada dos seus nutrientes</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/10 backdrop-blur-sm rounded-xl p-6 border border-[#00FF00]/30">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white/70 text-sm font-medium">Balanço Semanal</h3>
            <TrendingUp className="w-5 h-5 text-[#00FF00]" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">+2.5%</p>
          <p className="text-xs text-[#00FF00]">Acima da meta</p>
        </div>

        <div className="bg-gradient-to-br from-[#00BFFF]/10 to-[#0099CC]/10 backdrop-blur-sm rounded-xl p-6 border border-[#00BFFF]/30">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white/70 text-sm font-medium">Qualidade Nutricional</h3>
            <Activity className="w-5 h-5 text-[#00BFFF]" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">8.5/10</p>
          <p className="text-xs text-[#00BFFF]">Excelente</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white/70 text-sm font-medium">Atenção</h3>
            <AlertCircle className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">Vitamina D</p>
          <p className="text-xs text-orange-400">Abaixo do ideal</p>
        </div>
      </div>

      {/* Macronutrients Trend */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Tendência de Macronutrientes (7 dias)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyNutritionData}>
            <XAxis dataKey="day" stroke="#ffffff60" />
            <YAxis stroke="#ffffff60" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0099CC40', 
                border: '1px solid #ffffff20',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="proteinas" stroke="#00FF00" strokeWidth={3} name="Proteínas (g)" />
            <Line type="monotone" dataKey="carboidratos" stroke="#00BFFF" strokeWidth={3} name="Carboidratos (g)" />
            <Line type="monotone" dataKey="gorduras" stroke="#00CC00" strokeWidth={3} name="Gorduras (g)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Micronutrients Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Perfil de Micronutrientes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={micronutrientsData}>
              <PolarGrid stroke="#ffffff20" />
              <PolarAngleAxis dataKey="nutrient" stroke="#ffffff60" />
              <PolarRadiusAxis stroke="#ffffff60" />
              <Radar name="Consumo" dataKey="value" stroke="#00FF00" fill="#00FF00" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Calories Trend */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Tendência Calórica Mensal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={caloriesTrendData}>
              <XAxis dataKey="week" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0099CC40', 
                  border: '1px solid #ffffff20',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <Legend />
              <Bar dataKey="consumido" fill="#00FF00" radius={[8, 8, 0, 0]} name="Consumido" />
              <Bar dataKey="meta" fill="#00BFFF40" radius={[8, 8, 0, 0]} name="Meta" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Análise Detalhada de Hoje</h3>
        <div className="space-y-4">
          {/* Proteins */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Proteínas</span>
              <span className="text-white/60">80g / 100g</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] rounded-full" style={{ width: '80%' }} />
            </div>
            <p className="text-xs text-white/60 mt-1">80% da meta diária</p>
          </div>

          {/* Carbs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Carboidratos</span>
              <span className="text-white/60">150g / 200g</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00BFFF] to-[#0099CC] rounded-full" style={{ width: '75%' }} />
            </div>
            <p className="text-xs text-white/60 mt-1">75% da meta diária</p>
          </div>

          {/* Fats */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Gorduras</span>
              <span className="text-white/60">38g / 50g</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00CC00] to-[#00FF00] rounded-full" style={{ width: '76%' }} />
            </div>
            <p className="text-xs text-white/60 mt-1">76% da meta diária</p>
          </div>

          {/* Fiber */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Fibras</span>
              <span className="text-white/60">24g / 30g</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00FF00] to-[#00BFFF] rounded-full" style={{ width: '80%' }} />
            </div>
            <p className="text-xs text-white/60 mt-1">80% da meta diária</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#00FF00]/20">
        <h3 className="text-xl font-bold text-white mb-4">💡 Recomendações Personalizadas</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
            <TrendingUp className="w-5 h-5 text-[#00FF00] flex-shrink-0 mt-1" />
            <div>
              <p className="text-white font-medium mb-1">Aumente a ingestão de Vitamina D</p>
              <p className="text-white/60 text-sm">Considere alimentos como salmão, ovos e cogumelos, ou suplementação.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
            <Activity className="w-5 h-5 text-[#00BFFF] flex-shrink-0 mt-1" />
            <div>
              <p className="text-white font-medium mb-1">Excelente balanço de macros</p>
              <p className="text-white/60 text-sm">Continue mantendo essa distribuição equilibrada de nutrientes.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
            <TrendingDown className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-white font-medium mb-1">Atenção ao sódio</p>
              <p className="text-white/60 text-sm">Reduza alimentos processados para manter níveis saudáveis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
