'use client';

// Nutrivus.IA - Complete Viral Quiz Funnel (All 25 Steps)

import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, Heart, Target, TrendingUp, Award, CheckCircle, Loader2, Brain, Zap, Users, Shield, Star, Clock, Flame, Coffee, Utensils, Moon, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface QuizData {
  age?: string;
  gender?: string;
  mainGoal?: string;
  processedFood?: string;
  activityLevel?: string;
  challenges?: string[];
  nutritionConfidence?: string;
  dietHistory?: string;
  expectations?: string;
  motivation?: string;
  emotionalObstacles?: string;
  socialSupport?: string;
  selfConfidence?: string;
  commitment?: string;
  visualization?: string;
  currentWeight?: string;
  height?: string;
  weeklyActivity?: string;
  dietaryPreferences?: string[];
  email?: string;
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [quizData, setQuizData] = useState<QuizData>({
    challenges: [],
    dietaryPreferences: []
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const totalSteps = 20;

  useEffect(() => {
    const questionSteps = [1, 2, 3, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    const currentQuestionIndex = questionSteps.indexOf(step);
    if (currentQuestionIndex !== -1) {
      setProgress(((currentQuestionIndex + 1) / questionSteps.length) * 100);
    }
  }, [step]);

  const updateQuizData = (key: string, value: any) => {
    setQuizData(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: string, value: string) => {
    setQuizData(prev => {
      const currentArray = (prev[key as keyof QuizData] as string[]) || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [key]: newArray };
    });
  };

  const nextStep = () => {
    if (step === 21) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setStep(22);
      }, 4000);
    } else {
      setStep(prev => prev + 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ProgressBar = () => (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#0099CC]/20 backdrop-blur-xl border-b border-white/10">
      <div className="h-2 bg-gradient-to-r from-[#00FF00] to-[#00CC00] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-[#00FF00] animate-pulse" />
          <span className="text-white font-semibold text-sm">Nutrivus.IA</span>
        </div>
        <div className="text-white/60 text-sm">
          {Math.round(progress)}% completo
        </div>
      </div>
    </div>
  );

  // STEP 0: Welcome
  if (step === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pt-20">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-in fade-in duration-700">
          <div className="inline-block p-4 bg-gradient-to-r from-[#00FF00] to-[#00CC00] rounded-full mb-4 animate-bounce">
            <Sparkles className="w-12 h-12 text-[#00BFFF]" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Descubra em poucos minutos como o{' '}
            <span className="bg-gradient-to-r from-[#00FF00] to-[#00CC00] bg-clip-text text-transparent">
              Nutrivus.IA
            </span>{' '}
            pode transformar sua jornada de emagrecimento!
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Responda a algumas perguntas rápidas e receba insights personalizados para alcançar seus objetivos de forma eficaz.
          </p>
          
          <Button
            onClick={nextStep}
            size="lg"
            className="bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] hover:opacity-90 text-lg px-8 py-6 rounded-full shadow-lg shadow-[#00FF00]/20 transition-all duration-300 hover:scale-105"
          >
            Iniciar Quiz Gratuito
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#00FF00]" />
              <span>Leva apenas 3 minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#00FF00]" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#00FF00]" />
              <span>Resultados Personalizados</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
            {[
              { icon: Users, value: '50k+', label: 'Usuários' },
              { icon: Star, value: '4.9★', label: 'Avaliação' },
              { icon: Award, value: '87%', label: 'Sucesso' }
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                  <Icon className="w-6 h-6 text-[#00FF00] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (step > 0 && step < 22) {
    return (
      <>
        <ProgressBar />
        <div className="pt-24">
          {renderStep()}
        </div>
      </>
    );
  }

  function renderStep() {
    const QuestionWrapper = ({ children, stepNum, title, subtitle }: any) => (
      <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-right duration-500">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00FF00]/10 rounded-full border border-[#00FF00]/20">
            <Target className="w-4 h-4 text-[#00FF00]" />
            <span className="text-[#00FF00] font-semibold text-sm">Pergunta {stepNum} de 20</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
          {subtitle && <p className="text-white/60">{subtitle}</p>}
        </div>
        {children}
      </div>
    );

    // STEP 1: Age
    if (step === 1) {
      return (
        <QuestionWrapper stepNum={1} title="Qual é a sua idade?" subtitle="Isso nos ajuda a personalizar seu plano nutricional">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-[#00FF00]/30 transition-all duration-300">
            <Input
              type="number"
              placeholder="Digite sua idade"
              value={quizData.age || ''}
              onChange={(e) => updateQuizData('age', e.target.value)}
              className="text-2xl text-center h-16 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-[#00FF00] transition-all"
            />
          </div>
          
          <div className="flex gap-4">
            <Button onClick={prevStep} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Voltar
            </Button>
            <Button onClick={nextStep} disabled={!quizData.age} className="flex-1 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] hover:opacity-90 disabled:opacity-50 transition-all hover:scale-105">
              Continuar
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </QuestionWrapper>
      );
    }

    // STEP 2: Gender
    if (step === 2) {
      return (
        <QuestionWrapper stepNum={2} title="Qual é o seu sexo?" subtitle="Ajuda a calcular suas necessidades calóricas">
          <RadioGroup value={quizData.gender} onValueChange={(value) => updateQuizData('gender', value)}>
            <div className="space-y-4">
              {['Masculino', 'Feminino', 'Prefiro não dizer'].map((option) => (
                <label key={option} className={cn('flex items-center gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 group', quizData.gender === option ? 'border-[#00FF00] bg-[#00FF00]/10 scale-[1.02] shadow-lg shadow-[#00FF00]/20' : 'border-white/10 bg-white/5 hover:border-[#00FF00]/50 hover:bg-white/10 hover:scale-[1.01]')}>
                  <RadioGroupItem value={option} id={option} className="border-white/40" />
                  <span className="text-lg text-white group-hover:text-[#00FF00] transition-colors">{option}</span>
                  {quizData.gender === option && <CheckCircle className="w-5 h-5 text-[#00FF00] ml-auto animate-in zoom-in duration-300" />}
                </label>
              ))}
            </div>
          </RadioGroup>
          
          <div className="flex gap-4">
            <Button onClick={prevStep} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Voltar
            </Button>
            <Button onClick={nextStep} disabled={!quizData.gender} className="flex-1 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] hover:opacity-90 disabled:opacity-50 transition-all hover:scale-105">
              Continuar
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </QuestionWrapper>
      );
    }

    // STEP 3: Main Goal
    if (step === 3) {
      return (
        <QuestionWrapper stepNum={3} title="Qual é o seu principal objetivo?" subtitle="Vamos personalizar seu plano baseado nisso">
          <RadioGroup value={quizData.mainGoal} onValueChange={(value) => updateQuizData('mainGoal', value)}>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { value: 'Perder peso', icon: TrendingUp, desc: 'Emagrecer de forma saudável' },
                { value: 'Ganhar massa muscular', icon: Award, desc: 'Aumentar músculos' },
                { value: 'Melhorar a saúde geral', icon: Heart, desc: 'Mais qualidade de vida' },
                { value: 'Outro', icon: Target, desc: 'Objetivo personalizado' }
              ].map((option) => {
                const Icon = option.icon;
                return (
                  <label key={option.value} className={cn('flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 group', quizData.mainGoal === option.value ? 'border-[#00FF00] bg-[#00FF00]/10 scale-[1.02] shadow-lg shadow-[#00FF00]/20' : 'border-white/10 bg-white/5 hover:border-[#00FF00]/50 hover:bg-white/10 hover:scale-[1.01]')}>
                    <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                    <div className={cn('p-3 rounded-full transition-all', quizData.mainGoal === option.value ? 'bg-gradient-to-r from-[#00FF00] to-[#00CC00]' : 'bg-white/10 group-hover:bg-white/20')}>
                      <Icon className={cn('w-6 h-6 transition-colors', quizData.mainGoal === option.value ? 'text-[#00BFFF]' : 'text-[#00FF00]')} />
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-white group-hover:text-[#00FF00] transition-colors">{option.value}</div>
                      <div className="text-sm text-white/60">{option.desc}</div>
                    </div>
                    {quizData.mainGoal === option.value && <CheckCircle className="w-5 h-5 text-[#00FF00] animate-in zoom-in duration-300" />}
                  </label>
                );
              })}
            </div>
          </RadioGroup>
          
          <div className="flex gap-4">
            <Button onClick={prevStep} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Voltar
            </Button>
            <Button onClick={nextStep} disabled={!quizData.mainGoal} className="flex-1 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] hover:opacity-90 disabled:opacity-50 transition-all hover:scale-105">
              Continuar
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </QuestionWrapper>
      );
    }

    // STEP 4: Education
    if (step === 4) {
      return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700">
          <div className="bg-gradient-to-br from-[#00FF00]/20 to-[#00CC00]/20 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-[#00FF00]/20">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="p-4 bg-gradient-to-r from-[#00FF00] to-[#00CC00] rounded-full animate-pulse">
                <Brain className="w-8 h-8 text-[#00BFFF]" />
              </div>
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white">Por que o Nutrivus.IA é diferente?</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  O Nutrivus.IA utiliza <span className="text-[#00FF00] font-semibold">inteligência artificial avançada</span> para criar planos alimentares personalizados. Com base em dados clínicos e preferências pessoais, oferecemos orientações precisas para alcançar resultados duradouros.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['IA Avançada', 'Personalizado', 'Resultados Reais', 'Suporte 24/7'].map((badge) => (
                    <span key={badge} className="px-4 py-2 bg-[#00BFFF]/20 rounded-full text-[#00FF00] text-sm font-semibold border border-[#00FF00]/20">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Button onClick={nextStep} className="w-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] hover:opacity-90 py-6 text-lg">
            Continuar
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      );
    }

    // STEPS 5-20: All remaining questions
    const questions = [
      { step: 5, num: 4, title: 'Com que frequência você consome alimentos processados?', key: 'processedFood', options: ['Diariamente', 'Algumas vezes por semana', 'Raramente', 'Nunca'] },
      { step: 6, num: 5, title: 'Qual é o seu nível de atividade física semanal?', key: 'activityLevel', options: ['Sedentário', 'Levemente ativo', 'Moderadamente ativo', 'Muito ativo'] },
      { step: 7, num: 6, title: 'Quais desafios você enfrenta ao tentar emagrecer?', key: 'challenges', options: ['Falta de tempo para cozinhar', 'Dificuldade em controlar a fome', 'Falta de motivação', 'Não sei o que comer'], multiple: true },
      { step: 8, num: 7, title: 'Você se sente confiante em identificar alimentos saudáveis?', key: 'nutritionConfidence', options: ['Sim', 'Não', 'Às vezes'] },
      { step: 9, num: 8, title: 'Você já tentou outras dietas antes?', key: 'dietHistory', options: ['Sim, com sucesso', 'Sim, sem sucesso', 'Não'] },
      { step: 10, num: 9, title: 'Quais resultados você espera alcançar?', key: 'expectations', options: ['Perder peso rapidamente', 'Melhorar hábitos alimentares', 'Aumentar energia', 'Ter mais saúde'] },
      { step: 12, num: 10, title: 'O que mais te motiva a alcançar seus objetivos?', key: 'motivation', options: ['Melhorar a saúde', 'Aumentar autoestima', 'Sentir-se mais disposto(a)', 'Ficar mais atraente'] },
      { step: 13, num: 11, title: 'Quais emoções mais dificultam seu progresso?', key: 'emotionalObstacles', options: ['Ansiedade', 'Estresse', 'Tristeza', 'Frustração'] },
      { step: 14, num: 12, title: 'Você tem apoio de amigos ou familiares?', key: 'socialSupport', options: ['Sim, totalmente', 'Sim, parcialmente', 'Não'] },
      { step: 15, num: 13, title: 'Você acredita que pode alcançar seus objetivos?', key: 'selfConfidence', options: ['Sim', 'Não', 'Talvez'] },
      { step: 16, num: 14, title: 'Quão comprometido(a) você está?', key: 'commitment', options: ['Totalmente comprometido(a)', 'Parcialmente comprometido(a)', 'Não estou certo(a)'] },
      { step: 17, num: 15, title: 'Como você se imagina após alcançar seus objetivos?', key: 'visualization', options: ['Mais saudável e feliz', 'Com mais energia', 'Com maior autoestima', 'Vivendo minha melhor versão'] },
      { step: 19, num: 17, title: 'Quantas vezes por semana você pratica atividades físicas?', key: 'weeklyActivity', options: ['Nenhuma', '1-2 vezes', '3-4 vezes', '5 ou mais vezes'] },
    ];

    const currentQuestion = questions.find(q => q.step === step);
    
    if (currentQuestion) {
      const { num, title, key, options, multiple } = currentQuestion;
      
      if (multiple) {
        return (
          <QuestionWrapper stepNum={num} title={title} subtitle="Selecione todos que se aplicam">
            <div className="space-y-4">
              {options.map((option) => (
                <label key={option} className={cn('flex items-center gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all duration-300', (quizData[key as keyof QuizData] as string[])?.includes(option) ? 'border-[#00FF00] bg-[#00FF00]/10' : 'border-white/10 bg-white/5 hover:border-white/20')}>
                  <Checkbox checked={(quizData[key as keyof QuizData] as string[])?.includes(option)} onCheckedChange={() => toggleArrayItem(key, option)} className="border-white/40" />
                  <span className="text-lg text-white">{option}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-4">
              <Button onClick={prevStep} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Voltar
              </Button>
              <Button onClick={nextStep} disabled={!(quizData[key as keyof QuizData] as string[])?.length} className="flex-1 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] hover:opacity-90 disabled:opacity-50 transition-all hover:scale-105">
                Continuar
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </QuestionWrapper>
        );
      }

      return (
        <QuestionWrapper stepNum={num} title={title}>
          <RadioGroup value={quizData[key as keyof QuizData] as string} onValueChange={(value) => updateQuizData(key, value)}>
            <div className="space-y-4">
              {options.map((option) => (
                <label key={option} className={cn('flex items-center gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 group', quizData[key as keyof QuizData] === option ? 'border-[#00FF00] bg-[#00FF00]/10 scale-[1.02] shadow-lg shadow-[#00FF00]/20' : 'border-white/10 bg-white/5 hover:border-[#00FF00]/50 hover:bg-white/10 hover:scale-[1.01]')}>
                  <RadioGroupItem value={option} id={option} className="border-white/40" />
                  <span className="text-lg text-white group-hover:text-[#00FF00] transition-colors">{option}</span>
                  {quizData[key as keyof QuizData] === option && <CheckCircle className="w-5 h-5 text-[#00FF00] ml-auto animate-in zoom-in duration-300" />}
                </label>
              ))}
            </div>
          </RadioGroup>
          <div className="flex gap-4">
            <Button onClick={prevStep} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Voltar
            </Button>
            <Button onClick={nextStep} disabled={!quizData[key as keyof QuizData]} className="flex-1 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] hover:opacity-90 disabled:opacity-50 transition-all hover:scale-105">
              Continuar
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </QuestionWrapper>
      );
    }

    // STEP 11: Scientific Explanation
    if (step === 11) {
      return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700">
          <div className="bg-gradient-to-br from-[#00FF00]/20 to-[#00CC00]/20 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-[#00FF00]/20">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="p-4 bg-gradient-to-r from-[#00FF00] to-[#00CC00] rounded-full animate-pulse">
                <Zap className="w-8 h-8 text-[#00BFFF]" />
              </div>
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white">A Ciência por trás do Nutrivus.IA</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  Estudos demonstram que a personalização da dieta <span className="text-[#00FF00] font-semibold">aumenta significativamente as chances de sucesso</span> no emagrecimento. O Nutrivus.IA utiliza algoritmos avançados para criar planos que se ajustam ao seu perfil único.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Taxa de Sucesso', value: '87%' },
                    { label: 'Usuários Ativos', value: '50k+' },
                    { label: 'Satisfação', value: '4.9★' }
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4 bg-[#00BFFF]/10 rounded-xl">
                      <div className="text-2xl font-bold text-[#00FF00]">{stat.value}</div>
                      <div className="text-sm text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Button onClick={nextStep} className="w-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] hover:opacity-90 py-6 text-lg">
            Continuar
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      );
    }

    // STEP 18: Weight & Height
    if (step === 18) {
      return (
        <QuestionWrapper stepNum={16} title="Qual é o seu peso e altura atuais?">
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <label className="text-white/80 mb-2 block">Peso atual (kg)</label>
              <Input type="number" placeholder="Ex: 75" value={quizData.currentWeight || ''} onChange={(e) => updateQuizData('currentWeight', e.target.value)} className="text-xl h-14 bg-white/5 border-white/20 text-white placeholder:text-white/40" />
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <label className="text-white/80 mb-2 block">Altura (cm)</label>
              <Input type="number" placeholder="Ex: 170" value={quizData.height || ''} onChange={(e) => updateQuizData('height', e.target.value)} className="text-xl h-14 bg-white/5 border-white/20 text-white placeholder:text-white/40" />
            </div>
          </div>
          <div className="flex gap-4">
            <Button onClick={prevStep} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Voltar
            </Button>
            <Button onClick={nextStep} disabled={!quizData.currentWeight || !quizData.height} className="flex-1 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] hover:opacity-90 disabled:opacity-50 transition-all hover:scale-105">
              Continuar
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </QuestionWrapper>
      );
    }

    // STEP 20: Dietary Preferences
    if (step === 20) {
      return (
        <QuestionWrapper stepNum={18} title="Você possui alguma restrição alimentar?" subtitle="Selecione todos que se aplicam">
          <div className="space-y-4">
            {['Vegetariano(a)', 'Vegano(a)', 'Sem glúten', 'Sem lactose', 'Nenhuma restrição'].map((option) => (
              <label key={option} className={cn('flex items-center gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all duration-300', quizData.dietaryPreferences?.includes(option) ? 'border-[#00FF00] bg-[#00FF00]/10' : 'border-white/10 bg-white/5 hover:border-white/20')}>
                <Checkbox checked={quizData.dietaryPreferences?.includes(option)} onCheckedChange={() => toggleArrayItem('dietaryPreferences', option)} className="border-white/40" />
                <span className="text-lg text-white">{option}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-4">
            <Button onClick={prevStep} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Voltar
            </Button>
            <Button onClick={nextStep} disabled={!quizData.dietaryPreferences?.length} className="flex-1 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] hover:opacity-90 disabled:opacity-50 transition-all hover:scale-105">
              Continuar
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </QuestionWrapper>
      );
    }

    // STEP 21: Email
    if (step === 21) {
      return (
        <QuestionWrapper stepNum={20} title="Para receber seu plano personalizado, informe seu e-mail" subtitle="Enviaremos insights exclusivos e seu plano completo">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <Input type="email" placeholder="seu@email.com" value={quizData.email || ''} onChange={(e) => updateQuizData('email', e.target.value)} className="text-xl h-16 bg-white/5 border-white/20 text-white placeholder:text-white/40" />
          </div>
          <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/10 backdrop-blur-xl rounded-2xl p-6 border border-[#00FF00]/20">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-[#00FF00] flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="text-white font-semibold">Seus dados estão 100% seguros</p>
                <p className="text-white/70 text-sm">Não compartilhamos suas informações com terceiros.</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button onClick={prevStep} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Voltar
            </Button>
            <Button onClick={nextStep} disabled={!quizData.email || !quizData.email.includes('@')} className="flex-1 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] hover:opacity-90 disabled:opacity-50 transition-all hover:scale-105">
              Gerar Meu Plano Gratuito
              <Sparkles className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </QuestionWrapper>
      );
    }

    return null;
  }

  // STEP 22: Loading
  if (step === 22 || isAnalyzing) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in duration-700">
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-[#00FF00] to-[#00CC00] rounded-full animate-pulse" />
            <Loader2 className="w-16 h-16 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Analisando suas respostas com IA...</h2>
          <p className="text-xl text-white/80">Estamos criando um plano alimentar personalizado para você.</p>
          <div className="flex flex-col gap-4 text-left max-w-md mx-auto">
            {[
              { text: 'Calculando necessidades calóricas', delay: 0 },
              { text: 'Personalizando macronutrientes', delay: 200 },
              { text: 'Ajustando preferências alimentares', delay: 400 },
              { text: 'Gerando plano personalizado', delay: 600 }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-white/70 animate-in slide-in-from-left" style={{ animationDelay: `${item.delay}ms` }}>
                <div className="w-8 h-8 rounded-full bg-[#00FF00]/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#00FF00]" />
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // STEP 23: Authority
  if (step === 23) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700 pt-20">
        <div className="bg-gradient-to-br from-[#00FF00]/20 to-[#00CC00]/20 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-[#00FF00]/20">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="p-4 bg-gradient-to-r from-[#00FF00] to-[#00CC00] rounded-full animate-pulse">
              <Users className="w-8 h-8 text-[#00BFFF]" />
            </div>
            <div className="space-y-4 flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Junte-se a milhares de pessoas transformadas!</h3>
              <p className="text-lg text-white/80 leading-relaxed">
                O Nutrivus.IA já ajudou <span className="text-[#00FF00] font-semibold">mais de 50.000 pessoas</span> a atingirem seus objetivos. Nossos usuários relatam perda de <span className="text-[#00FF00] font-semibold">5-8 kg</span> nos primeiros 3 meses.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Star, label: 'Avaliação', value: '4.9/5.0' },
                  { icon: Users, label: 'Usuários', value: '50k+' },
                  { icon: Award, label: 'Sucesso', value: '87%' },
                  { icon: Heart, label: 'Satisfação', value: '95%' }
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="flex flex-col items-center gap-2 p-4 bg-[#00BFFF]/10 rounded-xl border border-[#00FF00]/20">
                      <Icon className="w-6 h-6 text-[#00FF00]" />
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/60">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Button onClick={nextStep} className="w-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] hover:opacity-90 py-6 text-lg">
          Ver Meu Plano
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    );
  }

  // STEP 24: Results
  if (step === 24) {
    const bmi = quizData.currentWeight && quizData.height ? (parseFloat(quizData.currentWeight) / Math.pow(parseFloat(quizData.height) / 100, 2)).toFixed(1) : '0';
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pt-20">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-gradient-to-r from-[#00FF00] to-[#00CC00] rounded-full mb-4 animate-bounce">
            <Award className="w-12 h-12 text-[#00BFFF]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Parabéns!</h1>
          <p className="text-xl text-white/80">Criamos um plano alimentar personalizado para você.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-[#00FF00]" />
              Seu Perfil
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Idade', value: `${quizData.age} anos` },
                { label: 'Objetivo', value: quizData.mainGoal },
                { label: 'Atividade', value: quizData.activityLevel },
                { label: 'IMC', value: bmi }
              ].map((item) => (
                <div key={item.label} className="flex justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70">{item.label}:</span>
                  <span className="text-white font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#00FF00]/20 to-[#00CC00]/20 backdrop-blur-xl rounded-2xl p-6 border border-[#00FF00]/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#00FF00]" />
              Recursos Exclusivos
            </h3>
            <ul className="space-y-3">
              {['Acompanhamento diário', 'Receitas saudáveis', 'Suporte de nutricionistas', 'Análise com IA', 'Comunidade exclusiva', 'Gamificação'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-[#00FF00]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Button onClick={nextStep} className="w-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] hover:opacity-90 py-6 text-lg">
          Ver Oferta Especial
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    );
  }

  // STEP 25: Final Offer
  if (step === 25) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pt-20">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Comece Sua Transformação <span className="text-[#00FF00]">Hoje!</span>
          </h1>
        </div>
        <div className="bg-gradient-to-br from-[#00FF00]/20 to-[#00CC00]/20 backdrop-blur-xl rounded-2xl p-8 md:p-12 border-2 border-[#00FF00]/40 relative">
          <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Oferta Limitada!
          </div>
          <div className="text-center space-y-6">
            <div>
              <div className="text-white/60 line-through text-2xl">R$ 99,90</div>
              <div className="text-6xl md:text-7xl font-bold text-white">R$ 49,90</div>
              <div className="text-[#00FF00] text-2xl font-semibold">por mês</div>
            </div>
            <div className="space-y-3 max-w-md mx-auto">
              {['Plano personalizado com IA', 'Análise de fotos', 'Acompanhamento', 'Controle de hidratação', 'Suporte 24/7', 'Comunidade', 'Gamificação', 'Atualizações'].map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-white/90 p-3 bg-white/5 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#00FF00]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button size="lg" className="bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#00BFFF] hover:opacity-90 text-xl px-12 py-8 rounded-full shadow-2xl shadow-[#00FF00]/30 w-full md:w-auto">
              Assinar Agora
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
