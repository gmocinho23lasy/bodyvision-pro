"use client";

import { useState } from "react";
import { Activity, Utensils, Clock, Dumbbell, Play, ChevronRight } from "lucide-react";

export default function PlanPage() {
  const [activeTab, setActiveTab] = useState<"workout" | "diet">("workout");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Meu Plano</h1>
            <p className="text-sm text-slate-400">Treino e dieta criados especialmente para você pela IA</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Plan Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <OverviewCard
            icon={Activity}
            label="Meta de Peso"
            value="70 kg"
            subtitle="Faltam 5 kg"
            gradient="from-yellow-400 to-orange-500"
          />
          <OverviewCard
            icon={Clock}
            label="Tempo Estimado"
            value="10 semanas"
            subtitle="0.5 kg por semana"
            gradient="from-purple-400 to-pink-500"
          />
          <OverviewCard
            icon={Dumbbell}
            label="Treinos/Semana"
            value="5 dias"
            subtitle="Força + Cardio"
            gradient="from-cyan-400 to-blue-500"
          />
        </div>

        {/* Tabs */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="flex border-b border-slate-700">
            <button
              onClick={() => setActiveTab("workout")}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === "workout"
                  ? "bg-gradient-to-r from-yellow-400/10 to-orange-500/10 text-yellow-400 border-b-2 border-yellow-400"
                  : "text-slate-400 hover:bg-slate-700/50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Dumbbell className="w-5 h-5" />
                <span>Treino</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("diet")}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === "diet"
                  ? "bg-gradient-to-r from-green-400/10 to-emerald-500/10 text-green-400 border-b-2 border-green-400"
                  : "text-slate-400 hover:bg-slate-700/50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Utensils className="w-5 h-5" />
                <span>Dieta</span>
              </div>
            </button>
          </div>

          <div className="p-8">
            {activeTab === "workout" ? <WorkoutPlan /> : <DietPlan />}
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="mt-8 bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-6">
            Progresso Semanal
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <WeekCard week={1} completed weight="74.5 kg" />
            <WeekCard week={2} completed weight="74 kg" />
            <WeekCard week={3} current weight="73.5 kg" />
            <WeekCard week={4} weight="73 kg" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkoutPlan() {
  const workouts = [
    {
      day: "Segunda-feira",
      focus: "Peito e Tríceps",
      exercises: [
        { name: "Supino Reto", sets: "4x10", rest: "90s" },
        { name: "Supino Inclinado", sets: "3x12", rest: "60s" },
        { name: "Crucifixo", sets: "3x12", rest: "60s" },
        { name: "Tríceps Testa", sets: "3x12", rest: "60s" },
        { name: "Tríceps Corda", sets: "3x15", rest: "45s" }
      ]
    },
    {
      day: "Terça-feira",
      focus: "Costas e Bíceps",
      exercises: [
        { name: "Barra Fixa", sets: "4x8", rest: "90s" },
        { name: "Remada Curvada", sets: "4x10", rest: "90s" },
        { name: "Pulldown", sets: "3x12", rest: "60s" },
        { name: "Rosca Direta", sets: "3x12", rest: "60s" },
        { name: "Rosca Martelo", sets: "3x12", rest: "60s" }
      ]
    },
    {
      day: "Quarta-feira",
      focus: "Pernas",
      exercises: [
        { name: "Agachamento", sets: "4x12", rest: "120s" },
        { name: "Leg Press", sets: "4x15", rest: "90s" },
        { name: "Cadeira Extensora", sets: "3x15", rest: "60s" },
        { name: "Cadeira Flexora", sets: "3x15", rest: "60s" },
        { name: "Panturrilha", sets: "4x20", rest: "45s" }
      ]
    },
    {
      day: "Quinta-feira",
      focus: "Ombros e Abdômen",
      exercises: [
        { name: "Desenvolvimento", sets: "4x10", rest: "90s" },
        { name: "Elevação Lateral", sets: "3x12", rest: "60s" },
        { name: "Elevação Frontal", sets: "3x12", rest: "60s" },
        { name: "Prancha", sets: "3x60s", rest: "60s" },
        { name: "Abdominal", sets: "3x20", rest: "45s" }
      ]
    },
    {
      day: "Sexta-feira",
      focus: "Cardio e Core",
      exercises: [
        { name: "Esteira", sets: "30 min", rest: "-" },
        { name: "Bike", sets: "20 min", rest: "-" },
        { name: "Prancha Lateral", sets: "3x45s", rest: "60s" },
        { name: "Mountain Climbers", sets: "3x20", rest: "45s" },
        { name: "Burpees", sets: "3x15", rest: "60s" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {workouts.map((workout, index) => (
        <div key={index} className="border border-slate-700 rounded-xl p-6 hover:shadow-lg hover:border-slate-600 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">{workout.day}</h3>
              <p className="text-sm text-slate-400">{workout.focus}</p>
            </div>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 p-2 rounded-lg hover:shadow-lg transition-all">
              <Play className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            {workout.exercises.map((exercise, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                <span className="text-white font-medium">{exercise.name}</span>
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <span>{exercise.sets}</span>
                  <span className="text-slate-600">•</span>
                  <span>{exercise.rest}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DietPlan() {
  const meals = [
    {
      name: "Café da Manhã",
      time: "07:00",
      calories: 350,
      foods: [
        { name: "2 ovos mexidos", qty: "120g" },
        { name: "1 fatia de pão integral", qty: "50g" },
        { name: "1 banana", qty: "100g" },
        { name: "Café sem açúcar", qty: "200ml" }
      ]
    },
    {
      name: "Lanche da Manhã",
      time: "10:00",
      calories: 150,
      foods: [
        { name: "1 iogurte grego", qty: "150g" },
        { name: "1 colher de granola", qty: "20g" }
      ]
    },
    {
      name: "Almoço",
      time: "12:30",
      calories: 520,
      foods: [
        { name: "150g de frango grelhado", qty: "150g" },
        { name: "4 colheres de arroz integral", qty: "120g" },
        { name: "Brócolis e cenoura", qty: "100g" },
        { name: "Salada verde", qty: "80g" }
      ]
    },
    {
      name: "Lanche da Tarde",
      time: "16:00",
      calories: 180,
      foods: [
        { name: "1 maçã", qty: "150g" },
        { name: "10 amêndoas", qty: "15g" }
      ]
    },
    {
      name: "Jantar",
      time: "19:30",
      calories: 400,
      foods: [
        { name: "150g de peixe grelhado", qty: "150g" },
        { name: "Legumes assados", qty: "150g" },
        { name: "Salada", qty: "80g" }
      ]
    },
    {
      name: "Ceia",
      time: "21:30",
      calories: 100,
      foods: [
        { name: "1 copo de leite desnatado", qty: "200ml" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-xl p-6 border border-green-400/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Meta Diária</h3>
          <span className="text-2xl font-bold text-green-400">1.800 kcal</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Proteína</div>
            <div className="text-xl font-bold text-white">35%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Carboidratos</div>
            <div className="text-xl font-bold text-white">40%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Gorduras</div>
            <div className="text-xl font-bold text-white">25%</div>
          </div>
        </div>
      </div>

      {meals.map((meal, index) => (
        <div key={index} className="border border-slate-700 rounded-xl p-6 hover:shadow-lg hover:border-slate-600 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">{meal.name}</h3>
              <p className="text-sm text-slate-400">{meal.time}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">{meal.calories}</div>
              <div className="text-sm text-slate-500">kcal</div>
            </div>
          </div>
          <div className="space-y-2">
            {meal.foods.map((food, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                <span className="text-white">{food.name}</span>
                <span className="text-sm text-slate-400">{food.qty}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-xl p-6 border border-blue-400/30">
        <h3 className="font-semibold text-blue-400 mb-3">Substituições Permitidas:</h3>
        <ul className="text-sm text-slate-300 space-y-2">
          <li>• Frango → Peixe, Carne magra, Peru</li>
          <li>• Arroz integral → Batata doce, Quinoa, Macarrão integral</li>
          <li>• Banana → Maçã, Pera, Morango</li>
          <li>• Brócolis → Couve-flor, Espinafre, Vagem</li>
        </ul>
      </div>
    </div>
  );
}

function OverviewCard({ icon: Icon, label, value, subtitle, gradient }: any) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-xl p-6 text-slate-900 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}>
      <Icon className="w-8 h-8 mb-4 opacity-80" />
      <div className="text-sm opacity-90 mb-1">{label}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-80">{subtitle}</div>
    </div>
  );
}

function WeekCard({ week, completed = false, current = false, weight }: any) {
  return (
    <div className={`border-2 rounded-xl p-4 transition-all ${
      current 
        ? "border-yellow-400 bg-yellow-400/10" 
        : completed 
        ? "border-green-500 bg-green-500/10" 
        : "border-slate-700 bg-slate-800"
    }`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-400">Semana {week}</span>
        {completed && <span className="text-green-400 text-xs font-bold">✓ Completa</span>}
        {current && <span className="text-yellow-400 text-xs font-bold">• Atual</span>}
      </div>
      <div className="text-2xl font-bold text-white">{weight}</div>
    </div>
  );
}
