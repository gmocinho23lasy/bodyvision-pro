"use client";

import { useState } from "react";
import { Camera, Upload, Sparkles, TrendingDown, Activity, Ruler, Target, Zap, Calendar, Dumbbell, UtensilsCrossed, Save, Edit3, Check, X } from "lucide-react";
import { analyzeBodyImage } from "@/lib/openai";

interface BodyGoals {
  targetWeight: number;
  targetBodyFat: number;
  targetMeasurements: {
    chest: number;
    waist: number;
    hips: number;
    arms: number;
    legs: number;
  };
  timeline: number; // weeks
}

export default function BodyAnalysisPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showGoalEditor, setShowGoalEditor] = useState(false);
  const [goals, setGoals] = useState<BodyGoals>({
    targetWeight: 70,
    targetBodyFat: 15,
    targetMeasurements: {
      chest: 100,
      waist: 75,
      hips: 95,
      arms: 35,
      legs: 58
    },
    timeline: 12
  });
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const [personalizedPlan, setPersonalizedPlan] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError("Por favor, selecione uma imagem primeiro");
      return;
    }

    setAnalyzing(true);
    setError(null);
    setAnalysis(null); // Limpar análise anterior

    try {
      console.log('🔄 Iniciando análise da imagem...');
      
      // Chamar API real de análise com OpenAI Vision
      const result = await analyzeBodyImage(selectedImage);
      
      console.log('✅ Análise recebida:', result);
      
      // Validar que recebemos dados válidos
      if (!result.estimatedWeight || !result.estimatedBodyFat || !result.measurements) {
        throw new Error("Análise incompleta. Tente outra imagem com melhor qualidade.");
      }

      // Calcular massa magra
      const leanMass = result.estimatedWeight * (1 - result.estimatedBodyFat / 100);

      setAnalysis({
        weight: result.estimatedWeight,
        bodyFat: result.estimatedBodyFat,
        leanMass: leanMass,
        measurements: result.measurements,
        posture: {
          score: 7.5,
          issues: ["Análise de postura disponível em breve"]
        },
        aiAnalysis: result.analysis,
        recommendations: [
          "Treino de força 4-5x por semana",
          "Déficit calórico moderado (300-400 kcal)",
          `Proteína alta: ${(result.estimatedWeight * 2).toFixed(0)}g por dia`,
          "Exercícios de mobilidade e alongamento"
        ]
      });
      
      // Atualizar metas com base nos resultados
      setGoals({
        ...goals,
        targetWeight: Math.max(50, result.estimatedWeight - 5), // Meta inicial: -5kg
        targetBodyFat: Math.max(10, result.estimatedBodyFat - 5) // Meta inicial: -5%
      });
      
      setShowGoalEditor(true);
      
      console.log('✅ Análise completa e salva no estado');
    } catch (err: any) {
      console.error("❌ Erro na análise:", err);
      setError(err.message || "Erro ao analisar imagem. Verifique sua conexão e tente novamente.");
      setAnalysis(null);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleGeneratePlan = async () => {
    if (!analysis) return;
    
    setGeneratingPlan(true);
    setTimeout(() => {
      const weightDiff = Math.abs(goals.targetWeight - analysis.weight);
      const estimatedWeeks = goals.timeline;
      const weeklyWeightLoss = weightDiff / estimatedWeeks;
      
      setPersonalizedPlan({
        diet: {
          dailyCalories: 1850,
          macros: {
            protein: 150,
            carbs: 180,
            fat: 55
          },
          meals: [
            {
              name: "Café da Manhã",
              time: "07:00",
              foods: ["3 ovos mexidos", "2 fatias de pão integral", "1 banana", "Café preto"],
              calories: 420,
              macros: { protein: 25, carbs: 45, fat: 15 }
            },
            {
              name: "Lanche da Manhã",
              time: "10:00",
              foods: ["1 iogurte grego natural", "30g de granola", "10 amêndoas"],
              calories: 250,
              macros: { protein: 18, carbs: 25, fat: 10 }
            },
            {
              name: "Almoço",
              time: "12:30",
              foods: ["180g de frango grelhado", "5 colheres de arroz integral", "Brócolis e cenoura", "Salada verde com azeite"],
              calories: 580,
              macros: { protein: 45, carbs: 55, fat: 15 }
            },
            {
              name: "Lanche Pré-Treino",
              time: "16:00",
              foods: ["1 banana", "2 colheres de pasta de amendoim", "Café preto"],
              calories: 220,
              macros: { protein: 8, carbs: 30, fat: 10 }
            },
            {
              name: "Jantar",
              time: "19:30",
              foods: ["180g de salmão grelhado", "Batata doce média", "Aspargos grelhados", "Salada"],
              calories: 480,
              macros: { protein: 40, carbs: 35, fat: 18 }
            },
            {
              name: "Ceia",
              time: "21:30",
              foods: ["1 scoop de whey protein", "200ml de leite desnatado"],
              calories: 180,
              macros: { protein: 30, carbs: 10, fat: 3 }
            }
          ],
          shoppingList: [
            "Ovos (2 dúzias)",
            "Frango (1.5kg)",
            "Salmão (800g)",
            "Pão integral",
            "Arroz integral (1kg)",
            "Batata doce (2kg)",
            "Brócolis, cenoura, aspargos",
            "Bananas (1 cacho)",
            "Iogurte grego (6 unidades)",
            "Granola (500g)",
            "Amêndoas (200g)",
            "Pasta de amendoim",
            "Whey protein"
          ],
          supplements: [
            "Whey Protein (30g pós-treino)",
            "Creatina (5g/dia)",
            "Ômega 3 (2g/dia)",
            "Vitamina D3 (2000 UI/dia)"
          ]
        },
        workout: {
          frequency: 5,
          duration: "60-75 min",
          split: "Push/Pull/Legs/Upper/Lower",
          schedule: [
            {
              day: "Segunda - Push (Peito, Ombros, Tríceps)",
              exercises: [
                { name: "Supino Reto", sets: 4, reps: "8-10", rest: "90s", notes: "Foco em controle excêntrico" },
                { name: "Supino Inclinado com Halteres", sets: 3, reps: "10-12", rest: "75s" },
                { name: "Desenvolvimento com Barra", sets: 4, reps: "8-10", rest: "90s" },
                { name: "Elevação Lateral", sets: 3, reps: "12-15", rest: "60s" },
                { name: "Tríceps Testa", sets: 3, reps: "10-12", rest: "60s" },
                { name: "Tríceps Corda", sets: 3, reps: "12-15", rest: "60s" }
              ]
            },
            {
              day: "Terça - Pull (Costas, Bíceps)",
              exercises: [
                { name: "Barra Fixa", sets: 4, reps: "6-10", rest: "90s", notes: "Adicionar peso se necessário" },
                { name: "Remada Curvada", sets: 4, reps: "8-10", rest: "90s" },
                { name: "Puxada Frontal", sets: 3, reps: "10-12", rest: "75s" },
                { name: "Remada Unilateral", sets: 3, reps: "10-12", rest: "75s" },
                { name: "Rosca Direta", sets: 3, reps: "10-12", rest: "60s" },
                { name: "Rosca Martelo", sets: 3, reps: "12-15", rest: "60s" }
              ]
            },
            {
              day: "Quarta - Legs (Pernas Completo)",
              exercises: [
                { name: "Agachamento Livre", sets: 4, reps: "8-10", rest: "120s", notes: "Exercício principal" },
                { name: "Leg Press 45°", sets: 4, reps: "12-15", rest: "90s" },
                { name: "Stiff", sets: 3, reps: "10-12", rest: "90s" },
                { name: "Cadeira Extensora", sets: 3, reps: "12-15", rest: "60s" },
                { name: "Cadeira Flexora", sets: 3, reps: "12-15", rest: "60s" },
                { name: "Panturrilha em Pé", sets: 4, reps: "15-20", rest: "60s" }
              ]
            },
            {
              day: "Quinta - Upper (Superiores)",
              exercises: [
                { name: "Supino Inclinado", sets: 4, reps: "8-10", rest: "90s" },
                { name: "Remada Cavalinho", sets: 4, reps: "10-12", rest: "90s" },
                { name: "Desenvolvimento Arnold", sets: 3, reps: "10-12", rest: "75s" },
                { name: "Puxada Triângulo", sets: 3, reps: "10-12", rest: "75s" },
                { name: "Rosca Alternada", sets: 3, reps: "10-12", rest: "60s" },
                { name: "Tríceps Francês", sets: 3, reps: "10-12", rest: "60s" }
              ]
            },
            {
              day: "Sexta - Lower (Inferiores + Core)",
              exercises: [
                { name: "Agachamento Frontal", sets: 4, reps: "10-12", rest: "90s" },
                { name: "Levantamento Terra", sets: 4, reps: "6-8", rest: "120s", notes: "Foco em técnica" },
                { name: "Afundo Búlgaro", sets: 3, reps: "10-12", rest: "75s" },
                { name: "Cadeira Abdutora", sets: 3, reps: "15-20", rest: "60s" },
                { name: "Prancha", sets: 3, reps: "45-60s", rest: "60s" },
                { name: "Abdominal Canivete", sets: 3, reps: "15-20", rest: "60s" }
              ]
            }
          ],
          cardio: {
            frequency: "3x por semana",
            type: "HIIT ou Caminhada Inclinada",
            duration: "20-30 min",
            timing: "Pós-treino ou em jejum pela manhã"
          }
        },
        timeline: {
          estimatedWeeks,
          weeklyWeightLoss: weeklyWeightLoss.toFixed(2),
          milestones: [
            { week: 4, weight: analysis.weight - (weightDiff * 0.33), description: "Primeira avaliação - ajustes finos" },
            { week: 8, weight: analysis.weight - (weightDiff * 0.66), description: "Meio do caminho - reavaliação completa" },
            { week: 12, weight: goals.targetWeight, description: "Meta alcançada - fase de manutenção" }
          ],
          weeklyChecklist: [
            "Tirar foto de progresso (mesmo ângulo e iluminação)",
            "Medir peso e medidas corporais",
            "Registrar todas as refeições",
            "Completar todos os treinos programados",
            "Beber 3-4L de água por dia",
            "Dormir 7-9 horas por noite"
          ]
        },
        warnings: weeklyWeightLoss > 1 ? [
          "⚠️ Meta muito agressiva detectada. Perda saudável: 0.5-1kg por semana.",
          "⚠️ Recomendamos estender o prazo para evitar perda de massa magra.",
          "⚠️ Consulte um nutricionista antes de iniciar."
        ] : weeklyWeightLoss < 0.3 ? [
          "ℹ️ Meta muito conservadora. Você pode acelerar com segurança.",
          "ℹ️ Considere reduzir o prazo para 8-10 semanas."
        ] : [
          "✅ Meta realista e saudável!",
          "✅ Perda de peso sustentável e segura.",
          "✅ Ótimo equilíbrio entre resultados e saúde."
        ]
      });
      setGeneratingPlan(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
            Análise Corporal Avançada por IA
          </h1>
          <p className="text-slate-400">
            Análise completa + Definição de objetivos + Plano personalizado automático
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-400 mb-1">Erro na Análise</h3>
                <p className="text-sm text-red-300">{error}</p>
                {error.includes('API key') && (
                  <p className="text-xs text-red-300 mt-2">
                    Configure sua chave OpenAI em NEXT_PUBLIC_OPENAI_API_KEY
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step Indicator */}
        <div className="mb-8 bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <StepIndicator 
              number={1} 
              title="Enviar Foto" 
              active={!analysis} 
              completed={!!analysis}
            />
            <div className="flex-1 h-1 bg-slate-700 mx-4">
              <div className={`h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 ${analysis ? 'w-full' : 'w-0'}`}></div>
            </div>
            <StepIndicator 
              number={2} 
              title="Definir Objetivos" 
              active={analysis && !personalizedPlan} 
              completed={!!personalizedPlan}
            />
            <div className="flex-1 h-1 bg-slate-700 mx-4">
              <div className={`h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 ${personalizedPlan ? 'w-full' : 'w-0'}`}></div>
            </div>
            <StepIndicator 
              number={3} 
              title="Plano Pronto" 
              active={!!personalizedPlan} 
              completed={false}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Camera className="w-6 h-6 text-yellow-400" />
              <span>Passo 1: Enviar Foto Corporal</span>
            </h2>

            {!selectedImage ? (
              <div className="border-2 border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-yellow-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-10 h-10 text-slate-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Clique para enviar foto
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    ou arraste e solte aqui
                  </p>
                  <div className="inline-flex items-center space-x-2 bg-yellow-400/10 text-yellow-400 px-4 py-2 rounded-lg text-sm font-semibold border border-yellow-400/30">
                    <Upload className="w-4 h-4" />
                    <span>Escolher arquivo</span>
                  </div>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-96 object-cover"
                  />
                  {analysis && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                      <Check className="w-4 h-4" />
                      <span>Analisado</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <label
                    htmlFor="image-upload"
                    className="flex-1 text-center bg-slate-700 text-white py-3 rounded-xl font-semibold hover:bg-slate-600 transition-colors cursor-pointer"
                  >
                    Trocar Foto
                  </label>
                  <button
                    onClick={handleAnalyze}
                    disabled={analyzing || !!analysis}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {analyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                        <span>Analisando...</span>
                      </>
                    ) : analysis ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Análise Completa</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Analisar com IA</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-xl p-4 border border-yellow-400/30">
              <h3 className="font-semibold text-yellow-400 mb-2 flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Dicas para análise perfeita:</span>
              </h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Use roupas justas ou traje de banho</li>
                <li>• Tire foto em local bem iluminado (luz natural ideal)</li>
                <li>• Mantenha postura ereta e natural</li>
                <li>• Foto frontal, lateral ou costas</li>
                <li>• Evite filtros ou edições</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Activity className="w-6 h-6 text-green-400" />
              <span>Resultados da Análise</span>
            </h2>

            {!analysis ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-10 h-10 text-slate-500" />
                </div>
                <p className="text-slate-400">
                  Envie uma foto para ver os resultados da análise
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Main Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <StatBox
                    icon={TrendingDown}
                    label="Peso Estimado"
                    value={`${analysis.weight.toFixed(1)} kg`}
                    gradient="from-yellow-400 to-orange-500"
                  />
                  <StatBox
                    icon={Activity}
                    label="Gordura Corporal"
                    value={`${analysis.bodyFat.toFixed(1)}%`}
                    gradient="from-green-400 to-emerald-500"
                  />
                </div>

                <div className="bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-xl p-4 border border-cyan-400/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-cyan-400 mb-1">Massa Magra</div>
                      <div className="text-2xl font-bold text-white">{analysis.leanMass.toFixed(1)} kg</div>
                    </div>
                    <Zap className="w-10 h-10 text-cyan-400" />
                  </div>
                </div>

                {/* Measurements */}
                <div>
                  <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
                    <Ruler className="w-5 h-5" />
                    <span>Medidas Corporais (cm)</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <MeasurementItem label="Peitoral" value={analysis.measurements.chest} />
                    <MeasurementItem label="Cintura" value={analysis.measurements.waist} />
                    <MeasurementItem label="Quadril" value={analysis.measurements.hips} />
                    <MeasurementItem label="Braços" value={analysis.measurements.arms} />
                    <MeasurementItem label="Coxas" value={analysis.measurements.legs} />
                  </div>
                </div>

                {/* Posture Analysis */}
                <div className="bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-xl p-4 border border-purple-400/30">
                  <h3 className="font-semibold text-purple-400 mb-3 flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Análise de Postura</span>
                  </h3>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300">Score de Postura</span>
                      <span className="text-lg font-bold text-white">{analysis.posture.score}/10</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${analysis.posture.score * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  <ul className="text-sm text-slate-300 space-y-1">
                    {analysis.posture.issues.map((issue: string, i: number) => (
                      <li key={i}>• {issue}</li>
                    ))}
                  </ul>
                </div>

                {/* AI Analysis */}
                <div className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-xl p-6 border border-yellow-400/30">
                  <h3 className="font-semibold text-white mb-3 flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <span>Análise Completa da IA</span>
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    {analysis.aiAnalysis}
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-yellow-400">Recomendações:</div>
                    {analysis.recommendations.map((rec: string, i: number) => (
                      <div key={i} className="flex items-start space-x-2 text-sm text-slate-300">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Goal Editor Section */}
        {analysis && (
          <div className="mt-8 bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Target className="w-6 h-6 text-green-400" />
                <span>Passo 2: Defina Seus Objetivos</span>
              </h2>
              <button
                onClick={() => setShowGoalEditor(!showGoalEditor)}
                className="text-yellow-400 hover:text-yellow-300 font-semibold flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>{showGoalEditor ? 'Ocultar' : 'Editar'}</span>
              </button>
            </div>

            {showGoalEditor && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Current vs Goal */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white mb-4">Estado Atual</h3>
                    <div className="bg-slate-700/50 rounded-xl p-4 space-y-3 border border-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Peso:</span>
                        <span className="font-bold text-white">{analysis.weight.toFixed(1)} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Gordura:</span>
                        <span className="font-bold text-white">{analysis.bodyFat.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Cintura:</span>
                        <span className="font-bold text-white">{analysis.measurements.waist} cm</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-white mb-4">Objetivos</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Peso Alvo (kg)</label>
                        <input
                          type="number"
                          value={goals.targetWeight}
                          onChange={(e) => setGoals({...goals, targetWeight: Number(e.target.value)})}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Gordura Alvo (%)</label>
                        <input
                          type="number"
                          value={goals.targetBodyFat}
                          onChange={(e) => setGoals({...goals, targetBodyFat: Number(e.target.value)})}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Prazo (semanas)</label>
                        <input
                          type="number"
                          value={goals.timeline}
                          onChange={(e) => setGoals({...goals, timeline: Number(e.target.value)})}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Target Measurements */}
                <div>
                  <h3 className="font-semibold text-white mb-4">Medidas Alvo (cm)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm text-slate-400 mb-1 block">Peitoral</label>
                      <input
                        type="number"
                        value={goals.targetMeasurements.chest}
                        onChange={(e) => setGoals({
                          ...goals, 
                          targetMeasurements: {...goals.targetMeasurements, chest: Number(e.target.value)}
                        })}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-1 block">Cintura</label>
                      <input
                        type="number"
                        value={goals.targetMeasurements.waist}
                        onChange={(e) => setGoals({
                          ...goals, 
                          targetMeasurements: {...goals.targetMeasurements, waist: Number(e.target.value)}
                        })}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-1 block">Quadril</label>
                      <input
                        type="number"
                        value={goals.targetMeasurements.hips}
                        onChange={(e) => setGoals({
                          ...goals, 
                          targetMeasurements: {...goals.targetMeasurements, hips: Number(e.target.value)}
                        })}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-1 block">Braços</label>
                      <input
                        type="number"
                        value={goals.targetMeasurements.arms}
                        onChange={(e) => setGoals({
                          ...goals, 
                          targetMeasurements: {...goals.targetMeasurements, arms: Number(e.target.value)}
                        })}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-1 block">Coxas</label>
                      <input
                        type="number"
                        value={goals.targetMeasurements.legs}
                        onChange={(e) => setGoals({
                          ...goals, 
                          targetMeasurements: {...goals.targetMeasurements, legs: Number(e.target.value)}
                        })}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Comparison */}
                <div className="bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-xl p-6 border border-green-400/30">
                  <h3 className="font-semibold text-green-400 mb-4">Diferença Atual → Objetivo</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ComparisonItem 
                      label="Peso" 
                      diff={goals.targetWeight - analysis.weight} 
                      unit="kg"
                    />
                    <ComparisonItem 
                      label="Gordura" 
                      diff={goals.targetBodyFat - analysis.bodyFat} 
                      unit="%"
                    />
                    <ComparisonItem 
                      label="Cintura" 
                      diff={goals.targetMeasurements.waist - analysis.measurements.waist} 
                      unit="cm"
                    />
                    <ComparisonItem 
                      label="Braços" 
                      diff={goals.targetMeasurements.arms - analysis.measurements.arms} 
                      unit="cm"
                    />
                  </div>
                </div>

                {/* Generate Plan Button */}
                <button
                  onClick={handleGeneratePlan}
                  disabled={generatingPlan}
                  className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-slate-900 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {generatingPlan ? (
                    <>
                      <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                      <span>Gerando Plano Personalizado...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      <span>Gerar Plano Completo (Treino + Dieta)</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* History */}
        <div className="mt-8 bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6">
            Histórico de Análises
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <HistoryCard date="15 Jan 2024" weight="77.5 kg" bodyFat="24%" />
            <HistoryCard date="08 Jan 2024" weight="78 kg" bodyFat="25%" />
            <HistoryCard date="01 Jan 2024" weight="79 kg" bodyFat="26%" />
            <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 flex items-center justify-center text-slate-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors cursor-pointer">
              <div className="text-center">
                <Camera className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-semibold">Nova Análise</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ number, title, active, completed }: any) {
  return (
    <div className="flex items-center space-x-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
        completed ? 'bg-green-500 text-white' :
        active ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900' :
        'bg-slate-700 text-slate-500'
      }`}>
        {completed ? <Check className="w-5 h-5" /> : number}
      </div>
      <div className={`font-semibold ${
        active ? 'text-yellow-400' : completed ? 'text-green-400' : 'text-slate-500'
      }`}>
        {title}
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, label, value, gradient }: any) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-xl p-6 text-slate-900 shadow-lg`}>
      <Icon className="w-8 h-8 mb-3 opacity-80" />
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-90">{label}</div>
    </div>
  );
}

function MeasurementItem({ label, value }: any) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-3 hover:bg-slate-700 transition-colors border border-slate-600">
      <div className="text-sm text-slate-400 mb-1">{label}</div>
      <div className="text-xl font-bold text-white">{value} cm</div>
    </div>
  );
}

function ComparisonItem({ label, diff, unit }: any) {
  const isPositive = diff > 0;
  const isNegative = diff < 0;
  
  return (
    <div className="bg-slate-800 rounded-lg p-3 border border-green-400/30">
      <div className="text-sm text-slate-400 mb-1">{label}</div>
      <div className={`text-xl font-bold ${
        isNegative ? 'text-green-400' : isPositive ? 'text-orange-400' : 'text-slate-400'
      }`}>
        {isNegative ? '' : '+'}{diff.toFixed(1)} {unit}
      </div>
    </div>
  );
}

function HistoryCard({ date, weight, bodyFat }: any) {
  return (
    <div className="border border-slate-700 rounded-xl p-4 hover:shadow-lg hover:border-slate-600 transition-all cursor-pointer">
      <div className="text-sm text-slate-400 mb-3">{date}</div>
      <div className="space-y-2">
        <div>
          <div className="text-xs text-slate-500">Peso</div>
          <div className="text-lg font-bold text-white">{weight}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Gordura</div>
          <div className="text-lg font-bold text-white">{bodyFat}</div>
        </div>
      </div>
    </div>
  );
}
