'use client';

// Nutrivus.IA - Mood & Energy Diary Component

import { useState, useEffect } from 'react';
import { Heart, Zap, Save, TrendingUp, Calendar, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  energy: number;
  notes: string;
  quote: string;
}

const moodEmojis = ['😢', '😕', '😐', '😊', '😄'];
const energyEmojis = ['🔋', '🔋', '⚡', '⚡⚡', '⚡⚡⚡'];

const quotes = {
  highEnergyGoodMood: [
    "Acredite em si mesmo e todo o resto virá naturalmente.",
    "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    "Você é mais forte do que pensa e mais capaz do que imagina.",
    "Hoje é o dia perfeito para conquistar seus sonhos!",
    "A energia que você irradia atrai o que você deseja."
  ],
  lowEnergyGoodMood: [
    "A paz vem de dentro de você mesmo. Não a procure à sua volta.",
    "Descansar não é perder tempo, é recarregar sua essência.",
    "Aprecie os pequenos momentos de tranquilidade.",
    "A calma é o superpoder dos sábios.",
    "Permita-se desacelerar e apreciar o presente."
  ],
  highEnergyBadMood: [
    "A única maneira de fazer um excelente trabalho é amar o que você faz.",
    "Transforme sua frustração em motivação para mudança.",
    "Cada desafio é uma oportunidade disfarçada.",
    "Sua energia pode mover montanhas - direcione-a com sabedoria.",
    "O que não te derruba, te fortalece."
  ],
  lowEnergyBadMood: [
    "Mesmo a noite mais escura terminará e o sol nascerá.",
    "Está tudo bem não estar bem. Amanhã é um novo dia.",
    "Você já superou 100% dos seus piores dias.",
    "A tempestade passa, a força permanece.",
    "Seja gentil consigo mesmo - você está fazendo o melhor que pode."
  ]
};

export default function MoodDiary() {
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [notes, setNotes] = useState('');
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [currentQuote, setCurrentQuote] = useState('');
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    // Load entries from localStorage
    const saved = localStorage.getItem('moodEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Generate quote based on mood and energy
    const quote = getQuote(mood, energy);
    setCurrentQuote(quote);
  }, [mood, energy]);

  const getQuote = (moodLevel: number, energyLevel: number): string => {
    const isGoodMood = moodLevel >= 3;
    const isHighEnergy = energyLevel >= 3;

    let category: keyof typeof quotes;
    if (isHighEnergy && isGoodMood) category = 'highEnergyGoodMood';
    else if (!isHighEnergy && isGoodMood) category = 'lowEnergyGoodMood';
    else if (isHighEnergy && !isGoodMood) category = 'highEnergyBadMood';
    else category = 'lowEnergyBadMood';

    const quotesArray = quotes[category];
    return quotesArray[Math.floor(Math.random() * quotesArray.length)];
  };

  const handleSave = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood,
      energy,
      notes,
      quote: currentQuote
    };

    const updatedEntries = [newEntry, ...entries].slice(0, 30); // Keep last 30 entries
    setEntries(updatedEntries);
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));

    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
    
    // Reset form
    setNotes('');
  };

  const getAverageMood = () => {
    if (entries.length === 0) return 0;
    const sum = entries.reduce((acc, entry) => acc + entry.mood, 0);
    return (sum / entries.length).toFixed(1);
  };

  const getAverageEnergy = () => {
    if (entries.length === 0) return 0;
    const sum = entries.reduce((acc, entry) => acc + entry.energy, 0);
    return (sum / entries.length).toFixed(1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] dark:from-[#1E88E5] dark:to-[#3F51B5] bg-clip-text text-transparent">
            Diário de Humor
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Registre seu estado emocional e receba frases inspiradoras
          </p>
        </div>
        <Sparkles className="w-8 h-8 text-[#3F51B5] dark:text-[#1E88E5]" />
      </div>

      {/* Current Entry Card */}
      <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#3F51B5] dark:text-[#1E88E5]" />
          Como você está hoje?
        </h2>

        {/* Mood Selector */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
            <Heart className="w-4 h-4" />
            Humor
          </label>
          <div className="flex gap-2 md:gap-4 justify-between">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setMood(level)}
                className={cn(
                  'flex-1 p-3 md:p-4 rounded-xl text-3xl md:text-4xl transition-all duration-300 hover:scale-110 active:scale-95',
                  mood === level
                    ? 'bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] shadow-lg scale-110'
                    : 'bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                {moodEmojis[level - 1]}
              </button>
            ))}
          </div>
        </div>

        {/* Energy Selector */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
            <Zap className="w-4 h-4" />
            Energia
          </label>
          <div className="flex gap-2 md:gap-4 justify-between">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setEnergy(level)}
                className={cn(
                  'flex-1 p-3 md:p-4 rounded-xl text-2xl md:text-3xl transition-all duration-300 hover:scale-110 active:scale-95',
                  energy === level
                    ? 'bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] shadow-lg scale-110'
                    : 'bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                {energyEmojis[level - 1]}
              </button>
            ))}
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="mb-6 p-4 md:p-6 bg-gradient-to-r from-[#3F51B5]/10 to-[#1E88E5]/10 dark:from-[#1E88E5]/20 dark:to-[#3F51B5]/20 rounded-xl border-l-4 border-[#3F51B5] dark:border-[#1E88E5]">
          <p className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200 italic">
            "{currentQuote}"
          </p>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
            Notas ou Reflexões (opcional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Como foi seu dia? O que você está sentindo?"
            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#3F51B5] dark:focus:ring-[#1E88E5] focus:border-transparent transition-all duration-300 resize-none text-gray-800 dark:text-gray-200"
            rows={4}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-4 bg-gradient-to-r from-[#3F51B5] to-[#1E88E5] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          <Save className="w-5 h-5" />
          Salvar Registro
        </button>

        {/* Success Message */}
        {showSaved && (
          <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-xl text-center font-medium animate-fade-in">
            ✅ Registro salvo com sucesso!
          </div>
        )}
      </div>

      {/* Statistics */}
      {entries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-[#3F51B5] dark:text-[#1E88E5]" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Registros</h3>
            </div>
            <p className="text-3xl font-bold text-[#3F51B5] dark:text-[#1E88E5]">{entries.length}</p>
          </div>

          <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-5 h-5 text-[#3F51B5] dark:text-[#1E88E5]" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Humor Médio</h3>
            </div>
            <p className="text-3xl font-bold text-[#3F51B5] dark:text-[#1E88E5]">{getAverageMood()}</p>
          </div>

          <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-[#3F51B5] dark:text-[#1E88E5]" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Energia Média</h3>
            </div>
            <p className="text-3xl font-bold text-[#3F51B5] dark:text-[#1E88E5]">{getAverageEnergy()}</p>
          </div>
        </div>
      )}

      {/* History */}
      {entries.length > 0 && (
        <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#3F51B5] dark:text-[#1E88E5]" />
            Histórico
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(entry.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                  <div className="flex gap-2">
                    <span className="text-xl">{moodEmojis[entry.mood - 1]}</span>
                    <span className="text-lg">{energyEmojis[entry.energy - 1]}</span>
                  </div>
                </div>
                {entry.notes && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{entry.notes}</p>
                )}
                <p className="text-xs text-gray-600 dark:text-gray-400 italic">"{entry.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
