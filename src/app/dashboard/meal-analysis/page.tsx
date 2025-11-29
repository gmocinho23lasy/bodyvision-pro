"use client";

import { useState } from "react";
import { Camera, Upload, Sparkles, Flame, Apple, Beef } from "lucide-react";

export default function MealAnalysisPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalysis({
        foods: ["Arroz integral", "Frango grelhado", "Brócolis", "Salada verde"],
        totalCalories: 520,
        macros: {
          protein: 45,
          carbs: 55,
          fat: 12
        },
        withinGoal: true,
        aiAnalysis: "Refeição balanceada e saudável! Ótima quantidade de proteína e vegetais. Ideal para seu objetivo de emagrecimento."
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Análise de Refeições
          </h1>
          <p className="text-gray-600">
            Fotografe seu prato e descubra calorias e macros instantaneamente
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Fotografar Refeição
            </h2>

            {!selectedImage ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-purple-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="meal-upload"
                />
                <label htmlFor="meal-upload" className="cursor-pointer">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Fotografe seu prato
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    ou selecione uma foto da galeria
                  </p>
                  <div className="inline-flex items-center space-x-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-sm font-semibold">
                    <Upload className="w-4 h-4" />
                    <span>Escolher foto</span>
                  </div>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Meal preview"
                    className="w-full h-96 object-cover"
                  />
                </div>
                <div className="flex gap-3">
                  <label
                    htmlFor="meal-upload"
                    className="flex-1 text-center bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    Trocar Foto
                  </label>
                  <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {analyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Analisando...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Analisar Refeição</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 bg-purple-50 rounded-xl p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Dicas para melhor análise:</h3>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Fotografe de cima, mostrando todo o prato</li>
                <li>• Use boa iluminação</li>
                <li>• Evite sombras sobre a comida</li>
                <li>• Inclua todos os itens da refeição</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Análise Nutricional
            </h2>

            {!analysis ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Apple className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-600">
                  Fotografe sua refeição para ver a análise nutricional
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Status Badge */}
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                  analysis.withinGoal 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  <span className="font-semibold">
                    {analysis.withinGoal ? "Dentro da meta!" : "Acima da meta"}
                  </span>
                </div>

                {/* Total Calories */}
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
                  <div className="flex items-center space-x-3 mb-2">
                    <Flame className="w-8 h-8" />
                    <span className="text-lg font-semibold">Calorias Totais</span>
                  </div>
                  <div className="text-5xl font-bold">{analysis.totalCalories}</div>
                  <div className="text-purple-100 mt-1">kcal</div>
                </div>

                {/* Macros */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Macronutrientes</h3>
                  <div className="space-y-3">
                    <MacroBar
                      label="Proteína"
                      value={analysis.macros.protein}
                      color="blue"
                      icon={Beef}
                    />
                    <MacroBar
                      label="Carboidratos"
                      value={analysis.macros.carbs}
                      color="orange"
                      icon={Apple}
                    />
                    <MacroBar
                      label="Gorduras"
                      value={analysis.macros.fat}
                      color="yellow"
                      icon={Flame}
                    />
                  </div>
                </div>

                {/* Detected Foods */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Alimentos Detectados</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.foods.map((food: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {food}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span>Análise da IA</span>
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {analysis.aiAnalysis}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                    Registrar no Diário
                  </button>
                  <button className="px-6 bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                    Compartilhar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Today's Log */}
        <div className="mt-8 bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Diário de Hoje
            </h2>
            <div className="text-sm">
              <span className="text-gray-600">Total: </span>
              <span className="font-bold text-gray-900">1.650 / 1.800 kcal</span>
            </div>
          </div>

          <div className="space-y-4">
            <MealLogItem
              time="07:30"
              name="Café da Manhã"
              calories={350}
              foods={["Ovos mexidos", "Pão integral", "Banana"]}
            />
            <MealLogItem
              time="10:15"
              name="Lanche da Manhã"
              calories={150}
              foods={["Iogurte grego", "Granola"]}
            />
            <MealLogItem
              time="12:45"
              name="Almoço"
              calories={520}
              foods={["Arroz integral", "Frango", "Brócolis", "Salada"]}
              current
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MacroBar({ label, value, color, icon: Icon }: any) {
  const colors = {
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500"
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <span className="text-sm font-bold text-gray-900">{value}g</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${colors[color]} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(value, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}

function MealLogItem({ time, name, calories, foods, current = false }: any) {
  return (
    <div className={`border rounded-xl p-4 ${current ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-sm text-gray-600">{time}</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-gray-900">{calories} kcal</div>
          {current && (
            <div className="text-xs text-purple-600 font-semibold">Atual</div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {foods.map((food: string, index: number) => (
          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {food}
          </span>
        ))}
      </div>
    </div>
  );
}
