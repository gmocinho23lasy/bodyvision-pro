"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  Camera, 
  TrendingUp, 
  Activity, 
  Calendar, 
  Award,
  Save,
  RefreshCw,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Target,
  Zap,
  Heart,
  Scale,
  Ruler,
  Percent,
  Dumbbell,
  Apple,
  Trophy,
  Flame,
  Droplet,
  Clock
} from "lucide-react";
import Link from "next/link";

// Tipos
interface UserData {
  // Informações Pessoais
  nome: string;
  idade: number;
  sexo: "masculino" | "feminino" | "outro";
  peso: number;
  altura: number;
  
  // Medidas Corporais
  medidas: {
    braco: number;
    peito: number;
    cintura: number;
    quadril: number;
    coxa: number;
    panturrilha: number;
  };
  
  // Composição Corporal
  gordura: number;
  massaMagra: number;
  imc: number;
  
  // Atividade e Experiência
  nivelAtividade: "sedentario" | "leve" | "moderado" | "intenso" | "muito-intenso";
  experienciaTreino: "iniciante" | "intermediario" | "avancado";
  objetivo: "perder-peso" | "ganhar-massa" | "definicao" | "recomposicao";
  
  // Saúde
  historicoLesoes: string;
  problemasArticulares: string;
  restricaoAlimentar: string;
  condicoesMedicas: string;
  observacoes: string;
}

interface WeeklyProgress {
  semana: number;
  data: string;
  peso: number;
  gordura: number;
  medidas: {
    braco: number;
    peito: number;
    cintura: number;
    quadril: number;
    coxa: number;
    panturrilha: number;
  };
}

interface Achievement {
  id: string;
  titulo: string;
  descricao: string;
  icone: any;
  conquistado: boolean;
  data?: string;
  progresso?: number;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData>({
    nome: "Gustavo",
    idade: 28,
    sexo: "masculino",
    peso: 78.5,
    altura: 175,
    medidas: {
      braco: 35,
      peito: 98,
      cintura: 82,
      quadril: 95,
      coxa: 55,
      panturrilha: 38
    },
    gordura: 18,
    massaMagra: 64,
    imc: 25.6,
    nivelAtividade: "moderado",
    experienciaTreino: "intermediario",
    objetivo: "perder-peso",
    historicoLesoes: "",
    problemasArticulares: "",
    restricaoAlimentar: "",
    condicoesMedicas: "",
    observacoes: ""
  });

  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress[]>([
    {
      semana: 1,
      data: "2025-01-01",
      peso: 82,
      gordura: 22,
      medidas: { braco: 34, peito: 96, cintura: 86, quadril: 98, coxa: 56, panturrilha: 38 }
    },
    {
      semana: 2,
      data: "2025-01-08",
      peso: 80.5,
      gordura: 20,
      medidas: { braco: 34.5, peito: 97, cintura: 84, quadril: 96, coxa: 55.5, panturrilha: 38 }
    },
    {
      semana: 3,
      data: "2025-01-15",
      peso: 78.5,
      gordura: 18,
      medidas: { braco: 35, peito: 98, cintura: 82, quadril: 95, coxa: 55, panturrilha: 38 }
    }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "1", titulo: "Primeira Pesagem", descricao: "Registrou seu peso pela primeira vez", icone: Scale, conquistado: true, data: "2025-01-01" },
    { id: "2", titulo: "-1kg", descricao: "Perdeu seu primeiro quilo", icone: TrendingUp, conquistado: true, data: "2025-01-08" },
    { id: "3", titulo: "7 Dias Seguidos", descricao: "Treinou por 7 dias consecutivos", icone: Flame, conquistado: true, data: "2025-01-07" },
    { id: "4", titulo: "-5kg Total", descricao: "Perdeu 5kg desde o início", icone: Trophy, conquistado: false, progresso: 70 },
    { id: "5", titulo: "Hidratação Perfeita", descricao: "Bebeu 3L de água por 7 dias seguidos", icone: Droplet, conquistado: false, progresso: 42 },
    { id: "6", titulo: "Mestre da Consistência", descricao: "30 dias de treino sem falhas", icone: Award, conquistado: false, progresso: 60 }
  ]);

  const [editMode, setEditMode] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showRecalculateAlert, setShowRecalculateAlert] = useState(false);

  // Calcular IMC automaticamente
  useEffect(() => {
    const alturaMetros = userData.altura / 100;
    const imcCalculado = userData.peso / (alturaMetros * alturaMetros);
    setUserData(prev => ({ ...prev, imc: parseFloat(imcCalculado.toFixed(1)) }));
  }, [userData.peso, userData.altura]);

  const handleSaveData = () => {
    setEditMode(false);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const handleRecalculateTreino = () => {
    setShowRecalculateAlert(true);
    setTimeout(() => setShowRecalculateAlert(false), 3000);
  };

  const handleAddWeeklyProgress = () => {
    const novaSemana: WeeklyProgress = {
      semana: weeklyProgress.length + 1,
      data: new Date().toISOString().split('T')[0],
      peso: userData.peso,
      gordura: userData.gordura,
      medidas: { ...userData.medidas }
    };
    setWeeklyProgress([...weeklyProgress, novaSemana]);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

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
              <h1 className="text-xl sm:text-2xl font-bold text-white">Meu Perfil</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setEditMode(!editMode)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  editMode 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 hover:shadow-lg'
                }`}
              >
                {editMode ? 'Cancelar' : 'Editar'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Alertas */}
      {showSuccessAlert && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
          <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-semibold">Dados salvos com sucesso!</span>
          </div>
        </div>
      )}

      {showRecalculateAlert && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
            <Zap className="w-6 h-6" />
            <span className="font-semibold">Treino recalculado com sucesso!</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Foto de Perfil e Info Rápida */}
        <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-slate-900 font-bold text-5xl ring-8 ring-yellow-400/20">
                {userData.nome.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-slate-700 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform border-2 border-yellow-400">
                <Camera className="w-5 h-5 text-yellow-400" />
              </button>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">{userData.nome}</h2>
              <p className="text-slate-400 mb-4">{userData.idade} anos • {userData.sexo === "masculino" ? "Masculino" : "Feminino"}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <QuickStat icon={Scale} label="Peso" value={`${userData.peso} kg`} />
                <QuickStat icon={Ruler} label="Altura" value={`${userData.altura} cm`} />
                <QuickStat icon={Percent} label="Gordura" value={`${userData.gordura}%`} />
                <QuickStat icon={Activity} label="IMC" value={userData.imc.toString()} />
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação Principais */}
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={handleSaveData}
            disabled={!editMode}
            className={`flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
              editMode
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl hover:scale-105'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Save className="w-6 h-6" />
            <span>Salvar Dados Corporais</span>
          </button>
          
          <button
            onClick={handleRecalculateTreino}
            className="flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 hover:shadow-xl hover:scale-105 transition-all shadow-lg"
          >
            <RefreshCw className="w-6 h-6" />
            <span>Recalcular Meu Treino</span>
          </button>
        </div>

        {/* Seção 1: Informações Pessoais e Corporais */}
        <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <User className="w-6 h-6 mr-3 text-yellow-400" />
            Informações Pessoais e Corporais
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField
              label="Peso Atual (kg)"
              value={userData.peso}
              onChange={(v) => setUserData({...userData, peso: parseFloat(v)})}
              disabled={!editMode}
              type="number"
              icon={Scale}
            />
            <InputField
              label="Altura (cm)"
              value={userData.altura}
              onChange={(v) => setUserData({...userData, altura: parseFloat(v)})}
              disabled={!editMode}
              type="number"
              icon={Ruler}
            />
            <InputField
              label="Idade"
              value={userData.idade}
              onChange={(v) => setUserData({...userData, idade: parseInt(v)})}
              disabled={!editMode}
              type="number"
              icon={Calendar}
            />
            <SelectField
              label="Sexo"
              value={userData.sexo}
              onChange={(v) => setUserData({...userData, sexo: v as any})}
              disabled={!editMode}
              options={[
                { value: "masculino", label: "Masculino" },
                { value: "feminino", label: "Feminino" },
                { value: "outro", label: "Outro" }
              ]}
            />
            <InputField
              label="Percentual de Gordura (%)"
              value={userData.gordura}
              onChange={(v) => setUserData({...userData, gordura: parseFloat(v)})}
              disabled={!editMode}
              type="number"
              icon={Percent}
            />
            <InputField
              label="Massa Magra (kg)"
              value={userData.massaMagra}
              onChange={(v) => setUserData({...userData, massaMagra: parseFloat(v)})}
              disabled={!editMode}
              type="number"
              icon={Dumbbell}
            />
            <div className="sm:col-span-2 lg:col-span-3">
              <div className="bg-yellow-400/10 border-2 border-yellow-400/30 rounded-2xl p-4">
                <p className="text-sm text-yellow-400 font-semibold mb-1">IMC Calculado Automaticamente</p>
                <p className="text-3xl font-bold text-yellow-400">{userData.imc}</p>
                <p className="text-sm text-slate-400 mt-1">
                  {userData.imc < 18.5 ? "Abaixo do peso" : 
                   userData.imc < 25 ? "Peso normal" : 
                   userData.imc < 30 ? "Sobrepeso" : "Obesidade"}
                </p>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-bold text-white mt-8 mb-4">Medidas Corporais (cm)</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField
              label="Braço"
              value={userData.medidas.braco}
              onChange={(v) => setUserData({...userData, medidas: {...userData.medidas, braco: parseFloat(v)}})}
              disabled={!editMode}
              type="number"
            />
            <InputField
              label="Peito"
              value={userData.medidas.peito}
              onChange={(v) => setUserData({...userData, medidas: {...userData.medidas, peito: parseFloat(v)}})}
              disabled={!editMode}
              type="number"
            />
            <InputField
              label="Cintura"
              value={userData.medidas.cintura}
              onChange={(v) => setUserData({...userData, medidas: {...userData.medidas, cintura: parseFloat(v)}})}
              disabled={!editMode}
              type="number"
            />
            <InputField
              label="Quadril"
              value={userData.medidas.quadril}
              onChange={(v) => setUserData({...userData, medidas: {...userData.medidas, quadril: parseFloat(v)}})}
              disabled={!editMode}
              type="number"
            />
            <InputField
              label="Coxa"
              value={userData.medidas.coxa}
              onChange={(v) => setUserData({...userData, medidas: {...userData.medidas, coxa: parseFloat(v)}})}
              disabled={!editMode}
              type="number"
            />
            <InputField
              label="Panturrilha"
              value={userData.medidas.panturrilha}
              onChange={(v) => setUserData({...userData, medidas: {...userData.medidas, panturrilha: parseFloat(v)}})}
              disabled={!editMode}
              type="number"
            />
          </div>

          <h4 className="text-xl font-bold text-white mt-8 mb-4">Atividade e Objetivo</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SelectField
              label="Nível de Atividade Física"
              value={userData.nivelAtividade}
              onChange={(v) => setUserData({...userData, nivelAtividade: v as any})}
              disabled={!editMode}
              options={[
                { value: "sedentario", label: "Sedentário" },
                { value: "leve", label: "Leve (1-2x/semana)" },
                { value: "moderado", label: "Moderado (3-4x/semana)" },
                { value: "intenso", label: "Intenso (5-6x/semana)" },
                { value: "muito-intenso", label: "Muito Intenso (diário)" }
              ]}
            />
            <SelectField
              label="Experiência com Treino"
              value={userData.experienciaTreino}
              onChange={(v) => setUserData({...userData, experienciaTreino: v as any})}
              disabled={!editMode}
              options={[
                { value: "iniciante", label: "Iniciante" },
                { value: "intermediario", label: "Intermediário" },
                { value: "avancado", label: "Avançado" }
              ]}
            />
            <SelectField
              label="Objetivo Principal"
              value={userData.objetivo}
              onChange={(v) => setUserData({...userData, objetivo: v as any})}
              disabled={!editMode}
              options={[
                { value: "perder-peso", label: "Perder Peso" },
                { value: "ganhar-massa", label: "Ganhar Massa" },
                { value: "definicao", label: "Definição" },
                { value: "recomposicao", label: "Recomposição Corporal" }
              ]}
            />
          </div>
        </div>

        {/* Seção 2: Condição Física e Saúde */}
        <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Heart className="w-6 h-6 mr-3 text-red-400" />
            Condição Física e Saúde
          </h3>
          
          <div className="space-y-6">
            <TextAreaField
              label="Histórico de Lesões"
              value={userData.historicoLesoes}
              onChange={(v) => setUserData({...userData, historicoLesoes: v})}
              disabled={!editMode}
              placeholder="Descreva lesões anteriores ou atuais..."
            />
            <TextAreaField
              label="Problemas Articulares"
              value={userData.problemasArticulares}
              onChange={(v) => setUserData({...userData, problemasArticulares: v})}
              disabled={!editMode}
              placeholder="Joelho, ombro, coluna, etc..."
            />
            <TextAreaField
              label="Restrição Alimentar"
              value={userData.restricaoAlimentar}
              onChange={(v) => setUserData({...userData, restricaoAlimentar: v})}
              disabled={!editMode}
              placeholder="Alergias, intolerâncias, vegetarianismo, etc..."
            />
            <TextAreaField
              label="Condições Médicas"
              value={userData.condicoesMedicas}
              onChange={(v) => setUserData({...userData, condicoesMedicas: v})}
              disabled={!editMode}
              placeholder="Diabetes, hipertensão, etc..."
            />
            <TextAreaField
              label="Observações Gerais"
              value={userData.observacoes}
              onChange={(v) => setUserData({...userData, observacoes: v})}
              disabled={!editMode}
              placeholder="Qualquer informação adicional relevante..."
            />
          </div>
        </div>

        {/* Seção 3: Sistema de Evolução */}
        <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-green-400" />
              Sistema de Evolução
            </h3>
            <button
              onClick={handleAddWeeklyProgress}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              + Nova Pesagem
            </button>
          </div>

          {/* Gráfico de Evolução (Simplificado) */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-white mb-4">Evolução de Peso</h4>
            <div className="bg-slate-700 rounded-2xl p-6 border-2 border-slate-600">
              <div className="flex items-end justify-between h-48 space-x-2">
                {weeklyProgress.map((week, index) => {
                  const maxPeso = Math.max(...weeklyProgress.map(w => w.peso));
                  const altura = (week.peso / maxPeso) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-gradient-to-t from-yellow-400 to-orange-500 rounded-t-lg transition-all hover:from-yellow-500 hover:to-orange-600" style={{ height: `${altura}%` }}></div>
                      <p className="text-xs font-bold text-white mt-2">{week.peso}kg</p>
                      <p className="text-xs text-slate-400">S{week.semana}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Histórico de Pesagens */}
          <h4 className="text-lg font-bold text-white mb-4">Histórico de Pesagens</h4>
          <div className="space-y-3">
            {weeklyProgress.map((week, index) => (
              <div key={index} className="bg-slate-700 rounded-xl p-4 flex items-center justify-between hover:bg-slate-600 transition-colors border border-slate-600">
                <div>
                  <p className="font-bold text-white">Semana {week.semana}</p>
                  <p className="text-sm text-slate-400">{new Date(week.data).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-yellow-400">{week.peso} kg</p>
                  <p className="text-sm text-slate-400">{week.gordura}% gordura</p>
                </div>
              </div>
            ))}
          </div>

          {/* Galeria de Fotos de Progresso */}
          <div className="mt-8">
            <h4 className="text-lg font-bold text-white mb-4">Fotos de Progresso</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <button key={item} className="aspect-square bg-slate-700 rounded-2xl flex items-center justify-center hover:bg-slate-600 transition-all border-2 border-dashed border-slate-600 hover:border-yellow-400">
                  <Camera className="w-8 h-8 text-slate-500" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Seção 4: Sistema de Conquistas */}
        <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-3 text-yellow-400" />
            Conquistas e Gamificação
          </h3>

          {/* Barra de Progresso Geral */}
          <div className="mb-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border-2 border-purple-500/30">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-white">Progresso Geral</p>
              <p className="text-2xl font-bold text-purple-400">Nível 8</p>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-sm text-slate-400 mt-2">650 / 1000 XP para o próximo nível</p>
          </div>

          {/* Grid de Conquistas */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>

        {/* Seção 5: Lembretes */}
        <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-orange-400" />
            Lembretes
          </h3>

          <div className="space-y-4">
            <ReminderCard
              icon={Dumbbell}
              title="Treino de Hoje"
              time="18:00"
              active={true}
              gradient="from-yellow-400 to-orange-500"
            />
            <ReminderCard
              icon={Droplet}
              title="Beber Água"
              time="A cada 2 horas"
              active={true}
              gradient="from-cyan-500 to-blue-500"
            />
            <ReminderCard
              icon={Apple}
              title="Registrar Refeições"
              time="Após cada refeição"
              active={true}
              gradient="from-green-500 to-emerald-500"
            />
            <ReminderCard
              icon={Camera}
              title="Foto Semanal"
              time="Toda segunda-feira"
              active={false}
              gradient="from-purple-500 to-pink-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Componentes Auxiliares
function QuickStat({ icon: Icon, label, value }: any) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-2">
        <Icon className="w-6 h-6 text-slate-900" />
      </div>
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  );
}

function InputField({ label, value, onChange, disabled, type = "text", icon: Icon }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-2">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon className="w-5 h-5 text-slate-500" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 rounded-xl border-2 transition-all ${
            disabled 
              ? 'bg-slate-700 border-slate-600 text-slate-400' 
              : 'bg-slate-700 border-slate-600 text-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20'
          }`}
        />
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, disabled, options }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
          disabled 
            ? 'bg-slate-700 border-slate-600 text-slate-400' 
            : 'bg-slate-700 border-slate-600 text-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20'
        }`}
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({ label, value, onChange, disabled, placeholder }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        rows={3}
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all resize-none ${
          disabled 
            ? 'bg-slate-700 border-slate-600 text-slate-400 placeholder-slate-600' 
            : 'bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20'
        }`}
      />
    </div>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = achievement.icone;
  return (
    <div className={`rounded-2xl p-6 border-2 transition-all ${
      achievement.conquistado 
        ? 'bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/50 shadow-lg' 
        : 'bg-slate-700 border-slate-600'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          achievement.conquistado 
            ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
            : 'bg-slate-600'
        }`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {achievement.conquistado && (
          <CheckCircle2 className="w-6 h-6 text-green-400" />
        )}
      </div>
      <h4 className="font-bold text-white mb-1">{achievement.titulo}</h4>
      <p className="text-sm text-slate-400 mb-3">{achievement.descricao}</p>
      {!achievement.conquistado && achievement.progresso && (
        <div>
          <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all"
              style={{ width: `${achievement.progresso}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 mt-1">{achievement.progresso}% completo</p>
        </div>
      )}
      {achievement.conquistado && achievement.data && (
        <p className="text-xs text-slate-500 mt-2">Conquistado em {new Date(achievement.data).toLocaleDateString('pt-BR')}</p>
      )}
    </div>
  );
}

function ReminderCard({ icon: Icon, title, time, active, gradient }: any) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
      active 
        ? 'bg-slate-700 border-slate-600 shadow-md' 
        : 'bg-slate-700/50 border-slate-600/50'
    }`}>
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="font-bold text-white">{title}</p>
          <p className="text-sm text-slate-400">{time}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={active} className="sr-only peer" readOnly />
        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-400/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-yellow-400 peer-checked:to-orange-500"></div>
      </label>
    </div>
  );
}
