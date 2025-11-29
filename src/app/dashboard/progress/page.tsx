"use client";

import { useState } from "react";
import { TrendingDown, TrendingUp, Camera, Calendar, Award, Target } from "lucide-react";

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "all">("month");

  const weightData = [
    { date: "01 Jan", weight: 79 },
    { date: "08 Jan", weight: 78 },
    { date: "15 Jan", weight: 77.5 },
    { date: "22 Jan", weight: 76 },
    { date: "29 Jan", weight: 75 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Sua Evolução
          </h1>
          <p className="text-gray-600">
            Acompanhe seu progresso e conquistas
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={TrendingDown}
            label="Peso Perdido"
            value="4 kg"
            change="+0.5 kg esta semana"
            positive
          />
          <StatCard
            icon={Target}
            label="Meta Atingida"
            value="44%"
            change="Faltam 5 kg"
          />
          <StatCard
            icon={Calendar}
            label="Dias Consecutivos"
            value="21"
            change="Melhor sequência"
            positive
          />
          <StatCard
            icon={Award}
            label="Conquistas"
            value="12"
            change="+3 este mês"
            positive
          />
        </div>

        {/* Weight Chart */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Evolução de Peso</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setTimeRange("week")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  timeRange === "week"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setTimeRange("month")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  timeRange === "month"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Mês
              </button>
              <button
                onClick={() => setTimeRange("all")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  timeRange === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Tudo
              </button>
            </div>
          </div>

          {/* Simple Chart */}
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-end justify-between space-x-2">
              {weightData.map((data, index) => {
                const maxWeight = Math.max(...weightData.map(d => d.weight));
                const minWeight = Math.min(...weightData.map(d => d.weight));
                const range = maxWeight - minWeight;
                const height = ((data.weight - minWeight) / range) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg transition-all hover:opacity-80 cursor-pointer relative group"
                      style={{ height: `${height}%`, minHeight: "20%" }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.weight} kg
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mt-2 text-center">{data.date}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              <span className="text-gray-600">Peso atual: <span className="font-bold text-gray-900">75 kg</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">Progresso: <span className="font-bold text-green-600">-4 kg</span></span>
            </div>
          </div>
        </div>

        {/* Photo Comparison */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Comparação de Fotos</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center space-x-2">
              <Camera className="w-4 h-4" />
              <span>Nova Foto</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <PhotoCard
              label="Início"
              date="01 Jan 2024"
              weight="79 kg"
              bodyFat="26%"
            />
            <PhotoCard
              label="Atual"
              date="29 Jan 2024"
              weight="75 kg"
              bodyFat="22%"
              current
            />
          </div>

          <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingDown className="w-6 h-6 text-green-600" />
              <h3 className="font-bold text-gray-900">Progresso Visual</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-600 mb-1">Peso</div>
                <div className="text-xl font-bold text-green-600">-4 kg</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Gordura</div>
                <div className="text-xl font-bold text-green-600">-4%</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Cintura</div>
                <div className="text-xl font-bold text-green-600">-6 cm</div>
              </div>
            </div>
          </div>
        </div>

        {/* Measurements */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Medidas Corporais
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MeasurementCard
              label="Peitoral"
              current={93}
              initial={95}
              unit="cm"
            />
            <MeasurementCard
              label="Cintura"
              current={79}
              initial={85}
              unit="cm"
            />
            <MeasurementCard
              label="Quadril"
              current={95}
              initial={98}
              unit="cm"
            />
            <MeasurementCard
              label="Braço"
              current={31}
              initial={32}
              unit="cm"
            />
            <MeasurementCard
              label="Coxa"
              current={53}
              initial={55}
              unit="cm"
            />
            <MeasurementCard
              label="Panturrilha"
              current={36}
              initial={37}
              unit="cm"
            />
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
          <div className="flex items-center space-x-3 mb-6">
            <Award className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Conquistas Desbloqueadas</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AchievementBadge
              title="Primeira Semana"
              description="7 dias consecutivos"
              unlocked
            />
            <AchievementBadge
              title="5kg Perdidos"
              description="Meta intermediária"
              unlocked
            />
            <AchievementBadge
              title="30 Treinos"
              description="Consistência total"
              unlocked
            />
            <AchievementBadge
              title="10kg Perdidos"
              description="Grande conquista"
              locked
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, positive }: any) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <Icon className={`w-8 h-8 mb-4 ${positive ? "text-green-500" : "text-gray-400"}`} />
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600 mb-2">{label}</div>
      <div className={`text-sm font-semibold ${positive ? "text-green-600" : "text-gray-600"}`}>
        {change}
      </div>
    </div>
  );
}

function PhotoCard({ label, date, weight, bodyFat, current = false }: any) {
  return (
    <div className={`border-2 rounded-xl p-6 ${current ? "border-blue-500" : "border-gray-200"}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{label}</h3>
          <p className="text-sm text-gray-600">{date}</p>
        </div>
        {current && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
            Atual
          </span>
        )}
      </div>

      <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center mb-4">
        <Camera className="w-12 h-12 text-gray-400" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-600 mb-1">Peso</div>
          <div className="text-xl font-bold text-gray-900">{weight}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Gordura</div>
          <div className="text-xl font-bold text-gray-900">{bodyFat}</div>
        </div>
      </div>
    </div>
  );
}

function MeasurementCard({ label, current, initial, unit }: any) {
  const diff = initial - current;
  const isPositive = diff > 0;

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="text-sm text-gray-600 mb-2">{label}</div>
      <div className="flex items-baseline space-x-2 mb-2">
        <span className="text-3xl font-bold text-gray-900">{current}</span>
        <span className="text-gray-600">{unit}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500">Inicial: {initial}{unit}</span>
        {diff !== 0 && (
          <span className={`text-xs font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? "-" : "+"}{Math.abs(diff)}{unit}
          </span>
        )}
      </div>
    </div>
  );
}

function AchievementBadge({ title, description, unlocked = false, locked = false }: any) {
  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 ${locked ? "opacity-50" : ""}`}>
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
        <Award className={`w-6 h-6 ${locked ? "text-white/50" : "text-yellow-300"}`} />
      </div>
      <div className="text-lg font-bold mb-1">{title}</div>
      <div className="text-blue-100 text-sm">{description}</div>
      {locked && (
        <div className="mt-2 text-xs text-blue-200">🔒 Bloqueado</div>
      )}
    </div>
  );
}
