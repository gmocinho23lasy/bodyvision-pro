"use client";

import Link from "next/link";
import { Camera, Utensils, Activity, TrendingUp, Dumbbell, Apple, Target, Users, User, Zap, Droplet, Flame, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { getMyProfile } from "@/lib/supabase-auth";

// Frases motivacionais que alternam diariamente
const motivationalQuotes = [
  "Seu único limite é você mesmo. Supere-se hoje!",
  "A transformação começa com uma decisão. Você já deu o primeiro passo.",
  "Cada treino é um investimento no seu futuro.",
  "Disciplina é fazer o que precisa ser feito, mesmo quando não quer.",
  "Seu corpo pode aguentar quase tudo. É sua mente que você precisa convencer.",
  "Resultados não vêm da zona de conforto.",
  "O sucesso é a soma de pequenos esforços repetidos dia após dia."
];

export default function DashboardPage() {
  const [userName, setUserName] = useState("Usuário");
  const [currentQuote, setCurrentQuote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Seleciona frase baseada no dia do ano
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setCurrentQuote(motivationalQuotes[dayOfYear % motivationalQuotes.length]);

    // Buscar dados do perfil do usuário
    async function loadProfile() {
      try {
        const profile = await getMyProfile();
        if (profile?.full_name) {
          // Pega apenas o primeiro nome
          const firstName = profile.full_name.split(" ")[0];
          setUserName(firstName);
        } else if (profile?.username) {
          setUserName(profile.username);
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header Moderno com Saudação */}
      <header className="bg-slate-800/80 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Foto de Perfil */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-slate-900 font-bold text-lg ring-4 ring-yellow-400/20">
                  {loading ? "..." : userName.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
              </div>
              
              {/* Saudação Dinâmica */}
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  {loading ? "Carregando..." : `Olá, ${userName}! 👋`}
                </h1>
                <p className="text-sm text-slate-400">Pronto para evoluir hoje?</p>
              </div>
            </div>

            {/* Ícones Minimalistas */}
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-slate-700 rounded-xl transition-colors">
                <Zap className="w-5 h-5 text-yellow-400" />
              </button>
              <button className="p-2 hover:bg-slate-700 rounded-xl transition-colors">
                <Award className="w-5 h-5 text-yellow-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Motivacional com Imagem Real */}
        <div className="mb-8 relative overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=400&fit=crop" 
            alt="Fitness Motivation"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 p-8 sm:p-12">
            <div className="flex items-center space-x-3 mb-4">
              <Flame className="w-8 h-8 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Motivação do Dia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight max-w-3xl">
              {currentQuote}
            </h2>
            <p className="text-slate-300 text-lg">Continue firme na sua jornada de transformação!</p>
          </div>
        </div>

        {/* Botões de Navegação Abaixo da Motivação */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <NavButton
            href="/dashboard/workouts"
            icon={Dumbbell}
            label="Treinos"
            gradient="from-yellow-400 to-orange-500"
          />
          <NavButton
            href="/dashboard/plan"
            icon={Apple}
            label="Dietas"
            gradient="from-green-400 to-emerald-500"
          />
          <NavButton
            href="/dashboard/progress"
            icon={Target}
            label="Metas"
            gradient="from-orange-400 to-red-500"
          />
          <NavButton
            href="/dashboard"
            icon={Users}
            label="Comunidade"
            gradient="from-purple-400 to-pink-500"
          />
          <NavButton
            href="/dashboard/profile"
            icon={User}
            label="Perfil"
            gradient="from-cyan-400 to-blue-500"
          />
        </div>

        {/* Cards de Progresso - Cores Vibrantes e Elegantes */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ProgressCard
            title="Progresso de Peso"
            current="78.5 kg"
            target="75 kg"
            progress={70}
            icon={TrendingUp}
            gradient="from-yellow-400 to-orange-500"
            change="-3.5 kg"
          />
          <ProgressCard
            title="Gordura Corporal"
            current="18%"
            target="12%"
            progress={60}
            icon={Activity}
            gradient="from-orange-400 to-red-500"
            change="-4%"
          />
          <ProgressCard
            title="Massa Magra"
            current="64 kg"
            target="68 kg"
            progress={50}
            icon={Dumbbell}
            gradient="from-yellow-500 to-amber-600"
            change="+2 kg"
          />
          <ProgressCard
            title="Hidratação Hoje"
            current="2.1 L"
            target="3.0 L"
            progress={70}
            icon={Droplet}
            gradient="from-cyan-400 to-blue-500"
            change="70%"
          />
        </div>

        {/* Planejamento do Dia */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-yellow-400" />
            Seu Dia de Hoje
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Treino do Dia */}
            <DayPlanCard
              title="Treino"
              icon={Dumbbell}
              gradient="from-yellow-400 to-orange-500"
              items={[
                { name: "Peito e Tríceps", time: "18:00", status: "pending" },
                { name: "Cardio 20min", time: "18:45", status: "pending" }
              ]}
            />

            {/* Dieta do Dia */}
            <DayPlanCard
              title="Dieta"
              icon={Apple}
              gradient="from-green-400 to-emerald-500"
              items={[
                { name: "Café da Manhã", time: "07:00", status: "completed" },
                { name: "Almoço", time: "12:30", status: "completed" },
                { name: "Lanche", time: "16:00", status: "pending" },
                { name: "Jantar", time: "19:30", status: "pending" }
              ]}
            />

            {/* Tarefas do Dia */}
            <DayPlanCard
              title="Metas"
              icon={Target}
              gradient="from-orange-400 to-red-500"
              items={[
                { name: "Beber 3L de água", time: "2.1/3.0L", status: "pending" },
                { name: "Registrar refeições", time: "2/5", status: "pending" },
                { name: "Tirar foto semanal", time: "Hoje", status: "pending" }
              ]}
            />
          </div>
        </div>

        {/* Acesso Rápido ao Scanner com Imagem Real */}
        <div className="mb-8">
          <Link href="/dashboard/body-analysis">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=300&fit=crop" 
                alt="Body Analysis"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-20 p-8 sm:p-10 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <Camera className="w-10 h-10 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Scanner Corporal</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Análise Corporal Completa
                  </h3>
                  <p className="text-slate-300 text-lg">
                    Tire uma foto e receba análise detalhada com IA
                  </p>
                </div>
                <div className="hidden sm:block">
                  <div className="w-20 h-20 bg-yellow-400/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Camera className="w-10 h-10 text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Componente de Card de Progresso
function ProgressCard({ title, current, target, progress, icon: Icon, gradient, change }: any) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 group hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-slate-900" />
        </div>
        <span className="text-sm font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
          {change}
        </span>
      </div>
      
      <h3 className="text-sm font-semibold text-slate-400 mb-2">{title}</h3>
      <div className="flex items-baseline space-x-2 mb-3">
        <span className="text-2xl font-bold text-white">{current}</span>
        <span className="text-sm text-slate-500">/ {target}</span>
      </div>
      
      {/* Barra de Progresso */}
      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-500`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs text-slate-500 mt-2">{progress}% concluído</p>
    </div>
  );
}

// Componente de Card de Planejamento do Dia
function DayPlanCard({ title, icon: Icon, gradient, items }: any) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-slate-900" />
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      
      <div className="space-y-3">
        {items.map((item: any, index: number) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${item.status === 'completed' ? 'bg-green-400' : 'bg-slate-600'}`}></div>
              <div>
                <p className={`font-medium ${item.status === 'completed' ? 'text-slate-500 line-through' : 'text-white'}`}>
                  {item.name}
                </p>
                <p className="text-xs text-slate-500">{item.time}</p>
              </div>
            </div>
            {item.status === 'completed' && (
              <span className="text-green-400 text-xs font-semibold">✓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente de Botão de Navegação
function NavButton({ href, icon: Icon, label, gradient }: any) {
  return (
    <Link href={href}>
      <div className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 group hover:-translate-y-1 cursor-pointer">
        <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
          <Icon className="w-7 h-7 text-slate-900" />
        </div>
        <p className="text-center font-bold text-white group-hover:text-yellow-400 transition-all">
          {label}
        </p>
      </div>
    </Link>
  );
}
