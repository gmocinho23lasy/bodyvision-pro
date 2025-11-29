"use client";

import { useState } from "react";
import { Utensils, Plus, Clock, Flame, Apple, Search, Filter, ChevronRight, Camera, Sparkles } from "lucide-react";

export default function MealsPage() {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Refeições</h1>
              <p className="text-sm text-slate-400">Gerencie sua alimentação diária</p>
            </div>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Nova Refeição</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Flame}
            label="Calorias Hoje"
            value="1.450"
            target="1.800"
            unit="kcal"
            progress={80}
            gradient="from-yellow-400 to-orange-500"
          />
          <StatCard
            icon={Apple}
            label="Proteína"
            value="95g"
            target="150g"
            unit=""
            progress={63}
            gradient="from-green-400 to-emerald-500"
          />
          <StatCard
            icon={Utensils}
            label="Refeições"
            value="3"
            target="6"
            unit=""
            progress={50}
            gradient="from-cyan-400 to-blue-500"
          />
          <StatCard
            icon={Clock}
            label="Próxima"
            value="16:00"
            target="Lanche"
            unit=""
            progress={0}
            gradient="from-purple-400 to-pink-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8 bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-lg font-bold text-white mb-4">Ações Rápidas</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <QuickActionButton
              icon={Camera}
              label="Escanear Refeição"
              description="Tire foto do prato"
              gradient="from-yellow-400 to-orange-500"
            />
            <QuickActionButton
              icon={Search}
              label="Buscar Alimento"
              description="Adicionar manualmente"
              gradient="from-green-400 to-emerald-500"
            />
            <QuickActionButton
              icon={Sparkles}
              label="Sugestão IA"
              description="Refeição personalizada"
              gradient="from-cyan-400 to-blue-500"
            />
          </div>
        </div>

        {/* Today's Meals */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Utensils className="w-6 h-6 mr-2 text-yellow-400" />
              Refeições de Hoje
            </h2>
            <button className="text-slate-400 hover:text-white transition-colors flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filtrar</span>
            </button>
          </div>

          <div className="space-y-4">
            <MealCard
              name="Café da Manhã"
              time="07:00"
              calories={420}
              macros={{ protein: 25, carbs: 45, fat: 15 }}
              foods={["3 ovos mexidos", "2 fatias de pão integral", "1 banana", "Café preto"]}
              completed={true}
            />
            <MealCard
              name="Lanche da Manhã"
              time="10:00"
              calories={250}
              macros={{ protein: 18, carbs: 25, fat: 10 }}
              foods={["1 iogurte grego natural", "30g de granola", "10 amêndoas"]}
              completed={true}
            />
            <MealCard
              name="Almoço"
              time="12:30"
              calories={580}
              macros={{ protein: 45, carbs: 55, fat: 15 }}
              foods={["180g de frango grelhado", "5 colheres de arroz integral", "Brócolis e cenoura", "Salada verde"]}
              completed={true}
            />
            <MealCard
              name="Lanche da Tarde"
              time="16:00"
              calories={220}
              macros={{ protein: 8, carbs: 30, fat: 10 }}
              foods={["1 banana", "2 colheres de pasta de amendoim", "Café preto"]}
              completed={false}
              upcoming={true}
            />
            <MealCard
              name="Jantar"
              time="19:30"
              calories={480}
              macros={{ protein: 40, carbs: 35, fat: 18 }}
              foods={["180g de salmão grelhado", "Batata doce média", "Aspargos grelhados", "Salada"]}
              completed={false}
            />
            <MealCard
              name="Ceia"
              time="21:30"
              calories={180}
              macros={{ protein: 30, carbs: 10, fat: 3 }}
              foods={["1 scoop de whey protein", "200ml de leite desnatado"]}
              completed={false}
            />
          </div>
        </div>

        {/* Macros Chart */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-6">Distribuição de Macros</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <MacroCard
              label="Proteína"
              current={95}
              target={150}
              unit="g"
              color="green"
            />
            <MacroCard
              label="Carboidratos"
              current={155}
              target={180}
              unit="g"
              color="blue"
            />
            <MacroCard
              label="Gorduras"
              current={43}
              target={55}
              unit="g"
              color="orange"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, target, unit, progress, gradient }: any) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 group hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-slate-900" />
        </div>
      </div>
      
      <h3 className="text-sm font-semibold text-slate-400 mb-2">{label}</h3>
      <div className="flex items-baseline space-x-2 mb-3">
        <span className="text-2xl font-bold text-white">{value}</span>
        {target && <span className="text-sm text-slate-500">/ {target} {unit}</span>}
      </div>
      
      {progress > 0 && (
        <>
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-500`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">{progress}% concluído</p>
        </>
      )}
    </div>
  );
}

function QuickActionButton({ icon: Icon, label, description, gradient }: any) {
  return (
    <button className="bg-slate-700/50 hover:bg-slate-700 rounded-xl p-4 transition-all group text-left border border-slate-600 hover:border-slate-500">
      <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
        <Icon className="w-5 h-5 text-slate-900" />
      </div>
      <h3 className="font-bold text-white mb-1">{label}</h3>
      <p className="text-xs text-slate-400">{description}</p>
    </button>
  );
}

function MealCard({ name, time, calories, macros, foods, completed, upcoming }: any) {
  return (
    <div className={`bg-slate-800 rounded-2xl p-6 border transition-all hover:shadow-lg ${
      completed ? 'border-green-500/30 bg-green-500/5' : 
      upcoming ? 'border-yellow-400/30 bg-yellow-400/5' : 
      'border-slate-700'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {completed && (
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
          )}
          {upcoming && (
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-slate-900" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-white">{name}</h3>
            <p className="text-sm text-slate-400">{time}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-yellow-400">{calories}</div>
          <div className="text-xs text-slate-500">kcal</div>
        </div>
      </div>

      <div className="mb-4">
        <ul className="space-y-2">
          {foods.map((food: string, i: number) => (
            <li key={i} className="text-sm text-slate-300 flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
              <span>{food}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
        <div className="flex items-center space-x-4 text-xs text-slate-400">
          <span className="flex items-center space-x-1">
            <span className="text-green-400">P:</span>
            <span>{macros.protein}g</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="text-blue-400">C:</span>
            <span>{macros.carbs}g</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="text-orange-400">G:</span>
            <span>{macros.fat}g</span>
          </span>
        </div>
        {!completed && (
          <button className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center space-x-1">
            <span className="text-sm font-semibold">Registrar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function MacroCard({ label, current, target, unit, color }: any) {
  const percentage = (current / target) * 100;
  const colors: any = {
    green: "from-green-400 to-emerald-500",
    blue: "from-cyan-400 to-blue-500",
    orange: "from-yellow-400 to-orange-500"
  };

  return (
    <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
      <h3 className="text-sm font-semibold text-slate-400 mb-3">{label}</h3>
      <div className="flex items-baseline space-x-2 mb-4">
        <span className="text-3xl font-bold text-white">{current}</span>
        <span className="text-sm text-slate-500">/ {target} {unit}</span>
      </div>
      <div className="w-full bg-slate-600 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${colors[color]} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      <p className="text-xs text-slate-500 mt-2">{percentage.toFixed(0)}% da meta</p>
    </div>
  );
}
