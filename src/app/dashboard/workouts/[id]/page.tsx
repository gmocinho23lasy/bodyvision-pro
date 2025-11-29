"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  Play,
  Clock,
  Target,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Heart,
  Zap,
  Shield,
  Info,
  BookOpen,
  Award,
  X
} from "lucide-react";
import { exercises } from "@/lib/data/exercises";
import { Exercise } from "@/lib/types/workout";

export default function ExerciseDetailPage() {
  const params = useParams();
  const exerciseId = params?.id as string;
  
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [activeTab, setActiveTab] = useState<"video" | "execution" | "mistakes" | "variations" | "safety">("video");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const foundExercise = exercises.find(ex => ex.id === exerciseId);
    if (foundExercise) {
      setExercise(foundExercise);
    }

    // Verificar se é favorito
    const savedFavorites = localStorage.getItem("workout-favorites");
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      setIsFavorite(favorites.includes(exerciseId));
    }
  }, [exerciseId]);

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem("workout-favorites");
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    const newFavorites = isFavorite
      ? favorites.filter((id: string) => id !== exerciseId)
      : [...favorites, exerciseId];
    
    localStorage.setItem("workout-favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Exercício não encontrado</h2>
          <Link href="/dashboard/workouts">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors">
              Voltar para Treinos
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const intensityColors = {
    "baixa": "from-green-400 to-emerald-500",
    "moderada": "from-yellow-400 to-orange-500",
    "alta": "from-orange-400 to-red-500",
    "muito-alta": "from-red-500 to-pink-600"
  };

  // Dados do usuário (em produção, viriam do contexto)
  const userProfile = {
    objetivo: "perder-peso" as const,
    experienciaTreino: "intermediario" as const
  };

  const userRecommendation = exercise.recommendations.find(rec => rec.goal === userProfile.objetivo);
  const userVariation = exercise.variations.find(v => v.level === userProfile.experienciaTreino);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/workouts">
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
                </button>
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{exercise.name}</h1>
            </div>
            <button
              onClick={toggleFavorite}
              className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section com Vídeo */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative aspect-video bg-black">
            <iframe
              src={exercise.videoUrl}
              title={exercise.name}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-4 py-2 bg-gradient-to-r ${intensityColors[exercise.intensity]} text-white rounded-xl font-bold text-sm`}>
                Intensidade: {exercise.intensity}
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-bold text-sm flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{exercise.duration} segundos</span>
              </span>
              {exercise.experienceLevel.map((level) => (
                <span key={level} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl font-bold text-sm">
                  {level}
                </span>
              ))}
            </div>

            <p className="text-lg text-gray-700 mb-6">{exercise.description}</p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Músculos Trabalhados
                </h3>
                <div className="space-y-2">
                  {exercise.targetMuscles.map((muscle, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{muscle}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                  Equipamentos
                </h3>
                <div className="space-y-2">
                  {exercise.equipment.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recomendação Personalizada */}
        {userRecommendation && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Recomendação para Seu Objetivo</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <p className="text-sm text-white/80 mb-1">Séries</p>
                <p className="text-2xl font-bold">{userRecommendation.sets}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <p className="text-sm text-white/80 mb-1">Repetições</p>
                <p className="text-2xl font-bold">{userRecommendation.reps}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <p className="text-sm text-white/80 mb-1">Descanso</p>
                <p className="text-2xl font-bold">{userRecommendation.rest}</p>
              </div>
            </div>
            <p className="text-white/90">{userRecommendation.notes}</p>
          </div>
        )}

        {/* Tabs de Conteúdo */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Tab Headers */}
          <div className="flex overflow-x-auto border-b border-gray-200">
            <TabButton
              active={activeTab === "video"}
              onClick={() => setActiveTab("video")}
              icon={<Play className="w-5 h-5" />}
              label="Execução Correta"
            />
            <TabButton
              active={activeTab === "execution"}
              onClick={() => setActiveTab("execution")}
              icon={<CheckCircle2 className="w-5 h-5" />}
              label="Postura Ideal"
            />
            <TabButton
              active={activeTab === "mistakes"}
              onClick={() => setActiveTab("mistakes")}
              icon={<X className="w-5 h-5" />}
              label="Erros Comuns"
            />
            <TabButton
              active={activeTab === "variations"}
              onClick={() => setActiveTab("variations")}
              icon={<TrendingUp className="w-5 h-5" />}
              label="Variações"
            />
            <TabButton
              active={activeTab === "safety"}
              onClick={() => setActiveTab("safety")}
              icon={<Shield className="w-5 h-5" />}
              label="Segurança"
            />
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === "video" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Como Executar Corretamente</h3>
                {exercise.correctExecution.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-2xl">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 flex-1">{step}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "execution" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Postura Ideal</h3>
                {exercise.idealPosture.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-green-50 rounded-2xl">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 flex-1">{tip}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "mistakes" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Erros Comuns a Evitar</h3>
                {exercise.commonMistakes.map((mistake, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-red-50 rounded-2xl">
                    <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 flex-1">{mistake}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "variations" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Variações por Nível</h3>
                {exercise.variations.map((variation, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl border-2 ${
                      variation.level === userProfile.experienciaTreino
                        ? "bg-blue-50 border-blue-500"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold text-gray-900 capitalize">{variation.level}</h4>
                      {variation.level === userProfile.experienciaTreino && (
                        <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-bold">
                          Seu Nível
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-4">{variation.description}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white rounded-xl p-3">
                        <p className="text-sm text-gray-600 mb-1">Séries</p>
                        <p className="font-bold text-gray-900">{variation.sets}</p>
                      </div>
                      <div className="bg-white rounded-xl p-3">
                        <p className="text-sm text-gray-600 mb-1">Repetições</p>
                        <p className="font-bold text-gray-900">{variation.reps}</p>
                      </div>
                      <div className="bg-white rounded-xl p-3">
                        <p className="text-sm text-gray-600 mb-1">Descanso</p>
                        <p className="font-bold text-gray-900">{variation.rest}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "safety" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-green-600" />
                    Dicas de Segurança
                  </h3>
                  <div className="space-y-3">
                    {exercise.safetyTips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-green-50 rounded-2xl">
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <p className="text-gray-700 flex-1">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <AlertCircle className="w-6 h-6 mr-3 text-red-600" />
                    Contraindicações
                  </h3>
                  <div className="space-y-3">
                    {exercise.contraindications.map((contra, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-red-50 rounded-2xl">
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                        <p className="text-gray-700 flex-1">{contra}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Todas as Recomendações por Objetivo */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
            Recomendações por Objetivo
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {exercise.recommendations.map((rec, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border-2 ${
                  rec.goal === userProfile.objetivo
                    ? "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-500"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-gray-900 capitalize">
                    {rec.goal.replace("-", " ")}
                  </h4>
                  {rec.goal === userProfile.objetivo && (
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-bold">
                      Seu Objetivo
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">Séries</p>
                    <p className="font-bold text-gray-900 text-sm">{rec.sets}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">Reps</p>
                    <p className="font-bold text-gray-900 text-sm">{rec.reps}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">Descanso</p>
                    <p className="font-bold text-gray-900 text-sm">{rec.rest}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{rec.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-all whitespace-nowrap ${
        active
          ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
