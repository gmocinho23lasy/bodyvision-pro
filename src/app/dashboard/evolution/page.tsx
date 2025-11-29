"use client";

import { useState } from "react";
import { TrendingUp, Calendar, Camera, Award, Target, Activity, Ruler, Scale, ChevronRight, Download } from "lucide-react";

export default function EvolutionPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Evolução</h1>
              <p className="text-sm text-slate-400">Acompanhe seu progresso ao longo do tempo</p>
            </div>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center space-x-2">
              <Camera className="w-5 h-5" />
              <span>Nova Foto</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Selector */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-slate-800 rounded-xl p-1 border border-slate-700">
            <button
              onClick={() => setTimeRange("week")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                timeRange === "week"
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setTimeRange("month")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                timeRange === "month"
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Mês
            </button>
            <button
              onClick={() => setTimeRange("year")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                timeRange === "year"
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Ano
            </button>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Exportar</span>
          </button>
        </div>

        {/* Progress Summary */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ProgressCard
            icon={Scale}
            label="Peso Perdido"
            value="-5.5 kg"
            change="-7.3%"
            positive={true}
            gradient="from-yellow-400 to-orange-500"
          />
          <ProgressCard
            icon={Activity}
            label="Gordura Reduzida"
            value="-6%"
            change="De 24% para 18%"
            positive={true}
            gradient="from-green-400 to-emerald-500"
          />
          <ProgressCard
            icon={TrendingUp}
            label="Massa Magra"
            value="+2 kg"
            change="+3.2%"
            positive={true}
            gradient="from-cyan-400 to-blue-500"
          />
          <ProgressCard
            icon={Award}
            label="Dias Consistentes"
            value="45"
            change="Sequência atual"
            positive={true}
            gradient="from-purple-400 to-pink-500"
          />
        </div>

        {/* Weight Chart */}
        <div className="mb-8 bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-yellow-400" />
            Evolução de Peso
          </h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[79, 78.5, 78, 77.5, 77, 76.5, 76, 75.5, 75, 74.5, 74, 73.5].map((weight, i) => {
              const height = ((79 - weight) / 5.5) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gradient-to-t from-yellow-400 to-orange-500 rounded-t-lg transition-all hover:opacity-80" style={{ height: `${height}%` }}></div>
                  <span className="text-xs text-slate-500 mt-2">{weight}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
            <span>Jan</span>
            <span>Fev</span>
            <span>Mar</span>
          </div>
        </div>

        {/* Body Measurements */}
        <div className="mb-8 bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Ruler className="w-6 h-6 mr-2 text-yellow-400" />
            Medidas Corporais
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MeasurementCard
              label="Peitoral"
              current={98}
              initial={95}
              target={100}
              unit="cm"
            />
            <MeasurementCard
              label="Cintura"
              current={82}
              initial={85}
              target={75}
              unit="cm"
            />
            <MeasurementCard
              label="Quadril"
              current={96}
              initial={98}
              target={95}
              unit="cm"
            />
            <MeasurementCard
              label="Braço Direito"
              current={34}
              initial={32}
              target={35}
              unit="cm"
            />
            <MeasurementCard
              label="Braço Esquerdo"
              current={34}
              initial={32}
              target={35}
              unit="cm"
            />
            <MeasurementCard
              label="Coxa"
              current={57}
              initial={55}
              target={58}
              unit="cm"
            />
          </div>
        </div>

        {/* Photo Timeline */}
        <div className="mb-8 bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Camera className="w-6 h-6 mr-2 text-yellow-400" />
            Linha do Tempo - Fotos
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <PhotoCard
              date="01 Jan 2024"
              weight="79 kg"
              bodyFat="24%"
              image="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=400&fit=crop"
            />
            <PhotoCard
              date="01 Fev 2024"
              weight="76 kg"
              bodyFat="21%"
              image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop"
            />
            <PhotoCard
              date="01 Mar 2024"
              weight="73.5 kg"
              bodyFat="18%"
              image="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=300&h=400&fit=crop"
              current={true}
            />
            <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-yellow-400 hover:text-yellow-400 transition-all cursor-pointer group">
              <Camera className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Adicionar Foto</span>
              <span className="text-xs text-slate-500 mt-1">Registre seu progresso</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2 text-yellow-400" />
            Conquistas
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AchievementCard
              icon={Target}
              title="Primeira Meta"
              description="Perdeu 5kg"
              unlocked={true}
            />
            <AchievementCard
              icon={Calendar}
              title="Consistência"
              description="45 dias seguidos"
              unlocked={true}
            />
            <AchievementCard
              icon={Activity}
              title="Atleta"
              description="100 treinos completos"
              unlocked={false}
            />
            <AchievementCard
              icon={TrendingUp}
              title="Evolução"
              description="10kg perdidos"
              unlocked={false}
            />
            <AchievementCard
              icon={Award}
              title="Dedicação"
              description="6 meses de treino"
              unlocked={false}
            />
            <AchievementCard
              icon={Scale}
              title="Meta Final"
              description="Peso ideal alcançado"
              unlocked={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressCard({ icon: Icon, label, value, change, positive, gradient }: any) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 group hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-slate-900" />
        </div>
      </div>
      
      <h3 className="text-sm font-semibold text-slate-400 mb-2">{label}</h3>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <p className={`text-sm font-semibold ${positive ? 'text-green-400' : 'text-red-400'}`}>
        {change}
      </p>
    </div>
  );
}

function MeasurementCard({ label, current, initial, target, unit }: any) {
  const progress = ((current - initial) / (target - initial)) * 100;
  const isPositive = current > initial;

  return (
    <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
      <h3 className="text-sm font-semibold text-slate-400 mb-3">{label}</h3>
      <div className="flex items-baseline space-x-2 mb-4">
        <span className="text-3xl font-bold text-white">{current}</span>
        <span className="text-sm text-slate-500">{unit}</span>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
        <span>Inicial: {initial}{unit}</span>
        <span>Meta: {target}{unit}</span>
      </div>
      <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${isPositive ? 'from-green-400 to-emerald-500' : 'from-yellow-400 to-orange-500'} rounded-full transition-all duration-500`}
          style={{ width: `${Math.abs(progress)}%` }}
        ></div>
      </div>
    </div>
  );
}

function PhotoCard({ date, weight, bodyFat, image, current }: any) {
  return (
    <div className={`rounded-xl overflow-hidden border-2 transition-all hover:shadow-xl ${
      current ? 'border-yellow-400' : 'border-slate-700'
    }`}>
      <div className="relative">
        <img src={image} alt={date} className="w-full h-64 object-cover" />
        {current && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
            Atual
          </div>
        )}
      </div>
      <div className="bg-slate-800 p-4">
        <div className="text-sm text-slate-400 mb-2">{date}</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500">Peso</div>
            <div className="font-bold text-white">{weight}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Gordura</div>
            <div className="font-bold text-white">{bodyFat}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AchievementCard({ icon: Icon, title, description, unlocked }: any) {
  return (
    <div className={`rounded-xl p-6 border transition-all ${
      unlocked 
        ? 'bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border-yellow-400/30' 
        : 'bg-slate-700/30 border-slate-600'
    }`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
        unlocked 
          ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
          : 'bg-slate-700'
      }`}>
        <Icon className={`w-6 h-6 ${unlocked ? 'text-slate-900' : 'text-slate-500'}`} />
      </div>
      <h3 className={`font-bold mb-1 ${unlocked ? 'text-white' : 'text-slate-500'}`}>
        {title}
      </h3>
      <p className={`text-sm ${unlocked ? 'text-slate-300' : 'text-slate-600'}`}>
        {description}
      </p>
      {unlocked && (
        <div className="mt-3 text-xs font-semibold text-yellow-400">
          ✓ Desbloqueado
        </div>
      )}
    </div>
  );
}
