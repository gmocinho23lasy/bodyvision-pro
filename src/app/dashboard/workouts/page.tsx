"use client";

import { useState, useEffect } from "react";
import {
  Dumbbell,
  Filter,
  Heart,
  Play,
  Clock,
  TrendingUp,
  Star,
  Plus,
  Zap,
  Target,
  ChevronRight,
  Search,
  X,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { exercises } from "@/lib/data/exercises";
import { Exercise, MuscleGroup, CustomWorkout } from "@/lib/types/workout";
import { recommendExercises, generateWorkoutPlan, getDailyExercise } from "@/lib/utils/workout-algorithm";

export default function WorkoutsPage() {
  const [selectedFilter, setSelectedFilter] = useState<MuscleGroup | "todos">("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [customWorkouts, setCustomWorkouts] = useState<CustomWorkout[]>([]);
  const [showCreateWorkout, setShowCreateWorkout] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [dailyExercise, setDailyExercise] = useState<Exercise | null>(null);
  const [showDailyNotification, setShowDailyNotification] = useState(false);

  // Dados do usuário (em produção, viriam do contexto/API)
  const userProfile = {
    peso: 78.5,
    objetivo: "perder-peso" as const,
    experienciaTreino: "intermediario" as const,
    historicoLesoes: "",
    problemasArticulares: ""
  };

  // Carregar favoritos e treinos customizados do localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("workout-favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedCustomWorkouts = localStorage.getItem("custom-workouts");
    if (savedCustomWorkouts) {
      setCustomWorkouts(JSON.parse(savedCustomWorkouts));
    }

    // Exercício do dia
    const today = new Date().toDateString();
    const savedDailyExercise = localStorage.getItem("daily-exercise");
    const savedDailyDate = localStorage.getItem("daily-exercise-date");

    if (savedDailyExercise && savedDailyDate === today) {
      setDailyExercise(JSON.parse(savedDailyExercise));
    } else {
      const newDailyExercise = getDailyExercise(userProfile);
      setDailyExercise(newDailyExercise);
      localStorage.setItem("daily-exercise", JSON.stringify(newDailyExercise));
      localStorage.setItem("daily-exercise-date", today);
      setShowDailyNotification(true);
      setTimeout(() => setShowDailyNotification(false), 5000);
    }
  }, []);

  // Salvar favoritos
  const toggleFavorite = (exerciseId: string) => {
    const newFavorites = favorites.includes(exerciseId)
      ? favorites.filter(id => id !== exerciseId)
      : [...favorites, exerciseId];
    
    setFavorites(newFavorites);
    localStorage.setItem("workout-favorites", JSON.stringify(newFavorites));
  };

  // Filtrar exercícios
  const filteredExercises = exercises.filter(exercise => {
    const matchesFilter = selectedFilter === "todos" || exercise.muscleGroups.includes(selectedFilter);
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Exercícios recomendados
  const recommendedExercises = recommendExercises(userProfile);

  // Criar treino personalizado
  const handleCreateCustomWorkout = () => {
    if (selectedExercises.length === 0) return;

    const newWorkout: CustomWorkout = {
      id: Date.now().toString(),
      name: `Meu Treino ${customWorkouts.length + 1}`,
      description: "Treino personalizado",
      exercises: selectedExercises,
      createdAt: new Date().toISOString(),
      isFavorite: false
    };

    const updatedWorkouts = [...customWorkouts, newWorkout];
    setCustomWorkouts(updatedWorkouts);
    localStorage.setItem("custom-workouts", JSON.stringify(updatedWorkouts));
    
    setSelectedExercises([]);
    setShowCreateWorkout(false);
  };

  const muscleGroups: { value: MuscleGroup | "todos"; label: string; icon: string }[] = [
    { value: "todos", label: "Todos", icon: "💪" },
    { value: "peito", label: "Peito", icon: "🦾" },
    { value: "costas", label: "Costas", icon: "🏋️" },
    { value: "pernas", label: "Pernas", icon: "🦵" },
    { value: "ombros", label: "Ombros", icon: "💪" },
    { value: "biceps", label: "Bíceps", icon: "💪" },
    { value: "triceps", label: "Tríceps", icon: "💪" },
    { value: "abdomen", label: "Abdômen", icon: "🔥" },
    { value: "gluteos", label: "Glúteos", icon: "🍑" },
    { value: "cardio", label: "Cardio", icon: "❤️" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-20">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <button className="p-2 hover:bg-slate-700 rounded-xl transition-colors">
                  <ChevronRight className="w-5 h-5 text-slate-400 rotate-180" />
                </button>
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold text-white">Treinos</h1>
            </div>
            <button
              onClick={() => setShowCreateWorkout(!showCreateWorkout)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Criar Treino</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notificação do Exercício do Dia */}
      {showDailyNotification && dailyExercise && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right max-w-sm">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 p-4 rounded-2xl shadow-2xl">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span className="font-bold">Exercício do Dia!</span>
              </div>
              <button onClick={() => setShowDailyNotification(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm font-semibold">{dailyExercise.name}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Exercício do Dia com Imagem Real */}
        {dailyExercise && (
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1200&h=400&fit=crop" 
              alt="Daily Exercise"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-20 p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-8 h-8 text-yellow-400" />
                <h2 className="text-2xl font-bold">Exercício do Dia</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{dailyExercise.name}</h3>
                  <p className="text-slate-300 mb-4">{dailyExercise.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dailyExercise.muscleGroups.map((muscle) => (
                      <span key={muscle} className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-semibold">
                        {muscle}
                      </span>
                    ))}
                  </div>
                  <Link href={`/dashboard/workouts/${dailyExercise.id}`}>
                    <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 rounded-xl font-bold hover:shadow-xl transition-all">
                      <Play className="w-5 h-5" />
                      <span>Ver Exercício</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Barra de Busca */}
        <div className="bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-700">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar exercícios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-700 border-2 border-slate-600 text-white placeholder-slate-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all"
            />
          </div>
        </div>

        {/* Filtros por Grupo Muscular */}
        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <Filter className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-bold text-white">Filtrar por Grupo Muscular</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {muscleGroups.map((group) => (
              <button
                key={group.value}
                onClick={() => setSelectedFilter(group.value)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  selectedFilter === group.value
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 shadow-lg scale-105"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                <span className="mr-2">{group.icon}</span>
                {group.label}
              </button>
            ))}
          </div>
        </div>

        {/* Treinos Recomendados */}
        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-bold text-white">Recomendados para Você</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedExercises.slice(0, 6).map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                isFavorite={favorites.includes(exercise.id)}
                onToggleFavorite={toggleFavorite}
                isSelected={selectedExercises.includes(exercise.id)}
                onToggleSelect={() => {
                  if (showCreateWorkout) {
                    setSelectedExercises(prev =>
                      prev.includes(exercise.id)
                        ? prev.filter(id => id !== exercise.id)
                        : [...prev, exercise.id]
                    );
                  }
                }}
                showCreateWorkout={showCreateWorkout}
              />
            ))}
          </div>
        </div>

        {/* Todos os Exercícios */}
        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">
              Todos os Exercícios ({filteredExercises.length})
            </h3>
            {showCreateWorkout && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-slate-400">
                  {selectedExercises.length} selecionados
                </span>
                <button
                  onClick={handleCreateCustomWorkout}
                  disabled={selectedExercises.length === 0}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                    selectedExercises.length > 0
                      ? "bg-gradient-to-r from-green-400 to-emerald-500 text-slate-900 hover:shadow-lg"
                      : "bg-slate-700 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  Criar Treino
                </button>
              </div>
            )}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                isFavorite={favorites.includes(exercise.id)}
                onToggleFavorite={toggleFavorite}
                isSelected={selectedExercises.includes(exercise.id)}
                onToggleSelect={() => {
                  if (showCreateWorkout) {
                    setSelectedExercises(prev =>
                      prev.includes(exercise.id)
                        ? prev.filter(id => id !== exercise.id)
                        : [...prev, exercise.id]
                    );
                  }
                }}
                showCreateWorkout={showCreateWorkout}
              />
            ))}
          </div>
        </div>

        {/* Meus Treinos Personalizados */}
        {customWorkouts.length > 0 && (
          <div className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700">
            <div className="flex items-center space-x-3 mb-6">
              <Star className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Meus Treinos Personalizados</h3>
            </div>
            <div className="space-y-4">
              {customWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="bg-slate-700 rounded-2xl p-6 border-2 border-yellow-400/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white">{workout.name}</h4>
                      <p className="text-sm text-slate-400">{workout.exercises.length} exercícios</p>
                    </div>
                    <button className="p-2 hover:bg-slate-600 rounded-xl transition-colors">
                      <ChevronRight className="w-6 h-6 text-yellow-400" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {workout.exercises.slice(0, 5).map((exerciseId) => {
                      const exercise = exercises.find(ex => ex.id === exerciseId);
                      return exercise ? (
                        <span key={exerciseId} className="px-3 py-1 bg-slate-600 rounded-full text-sm font-semibold text-slate-200">
                          {exercise.name}
                        </span>
                      ) : null;
                    })}
                    {workout.exercises.length > 5 && (
                      <span className="px-3 py-1 bg-slate-600 rounded-full text-sm font-semibold text-slate-400">
                        +{workout.exercises.length - 5} mais
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente de Card de Exercício
function ExerciseCard({
  exercise,
  isFavorite,
  onToggleFavorite,
  isSelected,
  onToggleSelect,
  showCreateWorkout
}: {
  exercise: Exercise;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isSelected: boolean;
  onToggleSelect: () => void;
  showCreateWorkout: boolean;
}) {
  const intensityColors = {
    "baixa": "bg-green-400/20 text-green-400",
    "moderada": "bg-yellow-400/20 text-yellow-400",
    "alta": "bg-orange-400/20 text-orange-400",
    "muito-alta": "bg-red-400/20 text-red-400"
  };

  return (
    <div
      className={`bg-slate-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 ${
        isSelected ? "border-yellow-400 ring-4 ring-yellow-400/20" : "border-slate-600"
      }`}
    >
      <div className="relative">
        <img
          src={exercise.thumbnailUrl}
          alt={exercise.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(exercise.id);
            }}
            className="p-2 bg-slate-800/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-slate-300"
              }`}
            />
          </button>
          {showCreateWorkout && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleSelect();
              }}
              className={`p-2 backdrop-blur-sm rounded-full hover:scale-110 transition-transform ${
                isSelected ? "bg-yellow-400" : "bg-slate-800/90"
              }`}
            >
              <CheckCircle2
                className={`w-5 h-5 ${
                  isSelected ? "text-slate-900" : "text-slate-300"
                }`}
              />
            </button>
          )}
        </div>
        <div className="absolute bottom-3 left-3 flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${intensityColors[exercise.intensity]}`}>
            {exercise.intensity}
          </span>
          <span className="px-3 py-1 bg-slate-800/70 backdrop-blur-sm text-white rounded-full text-xs font-bold flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{exercise.duration}s</span>
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="text-lg font-bold text-white mb-2">{exercise.name}</h4>
        <p className="text-sm text-slate-400 mb-3 line-clamp-2">{exercise.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {exercise.muscleGroups.slice(0, 3).map((muscle) => (
            <span key={muscle} className="px-2 py-1 bg-yellow-400/10 text-yellow-400 rounded-lg text-xs font-semibold">
              {muscle}
            </span>
          ))}
        </div>

        <Link href={`/dashboard/workouts/${exercise.id}`}>
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 rounded-xl font-semibold hover:shadow-lg transition-all">
            <Play className="w-5 h-5" />
            <span>Ver Detalhes</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
