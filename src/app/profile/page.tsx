"use client";

import { useState, useEffect } from "react";
import { User, Mail, Calendar, Weight, Ruler, Target, Save, ArrowLeft, Camera } from "lucide-react";
import Link from "next/link";
import { getMyProfile, upsertMyProfile } from "@/lib/supabase-auth";

interface UserData {
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  memberSince: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    age: 0,
    weight: 0,
    height: 0,
    goal: "",
    memberSince: "",
  });

  const [editData, setEditData] = useState<UserData>({ ...userData });

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getMyProfile();
        if (profile) {
          const profileData: UserData = {
            name: profile.name || "Usuário",
            email: profile.email || "",
            age: profile.age || 0,
            weight: profile.weight || 0,
            height: profile.height || 0,
            goal: profile.goal || "",
            memberSince: profile.created_at 
              ? new Date(profile.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
              : "Recente",
          };
          setUserData(profileData);
          setEditData(profileData);
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await upsertMyProfile({
        name: editData.name,
        phone: undefined, // Adicione campo de telefone se necessário
      });

      // Atualizar dados locais
      setUserData({ ...editData });
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Erro ao salvar perfil. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar ao Dashboard</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-gray-600 mt-2">Gerencie suas informações pessoais e objetivos</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-cyan-500 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {userData.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{userData.name}</h2>
                <p className="text-gray-600 mt-1">Membro desde {userData.memberSince}</p>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Editar Perfil
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Save className="w-5 h-5" />
                    <span>{saving ? "Salvando..." : "Salvar"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Informações Pessoais</h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <User className="w-4 h-4" />
                    <span>Nome Completo</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                      {userData.name}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Mail className="w-4 h-4" />
                    <span>E-mail</span>
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                    {userData.email}
                  </div>
                  <p className="text-xs text-gray-500">O e-mail não pode ser alterado</p>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Calendar className="w-4 h-4" />
                    <span>Idade</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.age}
                      onChange={(e) => setEditData({ ...editData, age: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                      {userData.age > 0 ? `${userData.age} anos` : "Não informado"}
                    </div>
                  )}
                </div>

                {/* Weight */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Weight className="w-4 h-4" />
                    <span>Peso Atual</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      step="0.1"
                      value={editData.weight}
                      onChange={(e) => setEditData({ ...editData, weight: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                      {userData.weight > 0 ? `${userData.weight} kg` : "Não informado"}
                    </div>
                  )}
                </div>

                {/* Height */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Ruler className="w-4 h-4" />
                    <span>Altura</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      step="0.01"
                      value={editData.height}
                      onChange={(e) => setEditData({ ...editData, height: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                      {userData.height > 0 ? `${userData.height} m` : "Não informado"}
                    </div>
                  )}
                </div>

                {/* Goal */}
                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Target className="w-4 h-4" />
                    <span>Objetivo</span>
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editData.goal}
                      onChange={(e) => setEditData({ ...editData, goal: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                      {userData.goal || "Nenhum objetivo definido"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <StatCard
                label="IMC"
                value={userData.weight > 0 && userData.height > 0 
                  ? (userData.weight / (userData.height * userData.height)).toFixed(1)
                  : "N/A"}
                gradient="from-blue-500 to-cyan-500"
              />
              <StatCard
                label="Peso Ideal"
                value={userData.height > 0 
                  ? `${(22 * userData.height * userData.height).toFixed(1)} kg`
                  : "N/A"}
                gradient="from-purple-500 to-pink-500"
              />
              <StatCard
                label="Meta Diária"
                value="2000 kcal"
                gradient="from-orange-500 to-red-500"
              />
            </div>
          </div>
        </div>

        {/* Additional Settings */}
        <div className="mt-8 bg-white rounded-3xl shadow-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Configurações da Conta</h3>
          <div className="space-y-4">
            <button className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
              <div className="font-semibold text-gray-900">Alterar Senha</div>
              <div className="text-sm text-gray-600 mt-1">Atualize sua senha de acesso</div>
            </button>
            <button className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
              <div className="font-semibold text-gray-900">Notificações</div>
              <div className="text-sm text-gray-600 mt-1">Gerencie suas preferências de notificação</div>
            </button>
            <button className="w-full text-left px-6 py-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
              <div className="font-semibold text-red-600">Excluir Conta</div>
              <div className="text-sm text-red-500 mt-1">Remover permanentemente sua conta</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, gradient }: { label: string; value: string; gradient: string }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl shadow-lg`}>
      <div className="text-white/80 text-sm font-semibold mb-2">{label}</div>
      <div className="text-white text-3xl font-bold">{value}</div>
    </div>
  );
}
