"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";
import { 
  CreditCard, 
  Lock, 
  Check, 
  ArrowLeft, 
  Shield,
  Zap,
  Star,
  Crown
} from "lucide-react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "free";
  const billing = searchParams.get("billing") || "monthly";
  
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "pix">("credit");
  const [isProcessing, setIsProcessing] = useState(false);

  // Dados dos planos
  const planDetails: Record<string, any> = {
    free: {
      name: "FREE",
      icon: Zap,
      priceMonthly: 0,
      priceAnnual: 0,
      features: [
        "Acesso limitado ao app",
        "Análise corporal básica",
        "Treinos iniciais simples",
        "Algumas receitas gratuitas"
      ]
    },
    standard: {
      name: "STANDARD",
      icon: Star,
      priceMonthly: 29,
      priceAnnual: 199,
      features: [
        "Treinos completos personalizados",
        "Dietas semanais ajustadas",
        "Vídeos demonstrativos",
        "Análise corporal avançada",
        "Suporte prioritário"
      ]
    },
    pro: {
      name: "PRO",
      icon: Crown,
      priceMonthly: 49,
      priceAnnual: 399,
      features: [
        "Análise corporal 3D avançada",
        "Transformação corporal IA",
        "Sistema inteligente completo",
        "Zero anúncios",
        "Comunidade VIP",
        "Acesso antecipado a recursos"
      ]
    }
  };

  const currentPlan = planDetails[planId];
  const Icon = currentPlan.icon;
  const price = billing === "monthly" ? currentPlan.priceMonthly : currentPlan.priceAnnual;
  const isFree = price === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simula processamento de pagamento
    setTimeout(() => {
      setIsProcessing(false);
      alert("Pagamento processado com sucesso! Redirecionando para o dashboard...");
      window.location.href = "/dashboard";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/pricing"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar para planos</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Resumo do Pedido */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Resumo do Pedido</h2>
            
            {/* Plan Card */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Plano {currentPlan.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {billing === "monthly" ? "Cobrança mensal" : "Cobrança anual"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">
                    {isFree ? "Grátis" : `R$ ${price}`}
                  </p>
                  <p className="text-gray-400 text-sm">
                    /{billing === "monthly" ? "mês" : "ano"}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                {currentPlan.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Breakdown */}
            {!isFree && (
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>R$ {price}</span>
                </div>
                {billing === "annual" && (
                  <div className="flex justify-between text-green-400 font-semibold">
                    <span>Desconto anual</span>
                    <span>-40%</span>
                  </div>
                )}
                <div className="border-t border-slate-700 pt-3 flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {price}</span>
                </div>
              </div>
            )}

            {/* Guarantee Badge */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold mb-1">Garantia de 7 dias</p>
                  <p className="text-gray-400 text-sm">
                    100% do seu dinheiro de volta se não ficar satisfeito
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {isFree ? "Criar Conta Grátis" : "Informações de Pagamento"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              {/* Método de Pagamento */}
              {!isFree && (
                <>
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-3">
                      Método de Pagamento
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("credit")}
                        className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                          paymentMethod === "credit"
                            ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900"
                            : "bg-slate-900/50 border border-slate-700 text-gray-300 hover:border-slate-600"
                        }`}
                      >
                        <CreditCard className="w-5 h-5" />
                        <span>Cartão</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("pix")}
                        className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                          paymentMethod === "pix"
                            ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900"
                            : "bg-slate-900/50 border border-slate-700 text-gray-300 hover:border-slate-600"
                        }`}
                      >
                        <Zap className="w-5 h-5" />
                        <span>PIX</span>
                      </button>
                    </div>
                  </div>

                  {/* Campos do Cartão */}
                  {paymentMethod === "credit" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-semibold mb-2">
                          Número do Cartão
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="1234 5678 9012 3456"
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 text-sm font-semibold mb-2">
                            Validade
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="MM/AA"
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm font-semibold mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="123"
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PIX Info */}
                  {paymentMethod === "pix" && (
                    <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                      <p className="text-gray-300 text-sm mb-3">
                        Após confirmar, você receberá um QR Code PIX para realizar o pagamento.
                      </p>
                      <p className="text-yellow-400 text-sm font-semibold">
                        ⚡ Aprovação instantânea após o pagamento
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Security Badge */}
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Lock className="w-4 h-4" />
                <span>Pagamento 100% seguro e criptografado</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-yellow-500/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    <span>Processando...</span>
                  </span>
                ) : isFree ? (
                  "Criar Conta Grátis"
                ) : (
                  `Confirmar Pagamento - R$ ${price}`
                )}
              </button>

              {/* Terms */}
              <p className="text-gray-500 text-xs text-center">
                Ao confirmar, você concorda com nossos{" "}
                <a href="#" className="text-yellow-400 hover:underline">
                  Termos de Serviço
                </a>{" "}
                e{" "}
                <a href="#" className="text-yellow-400 hover:underline">
                  Política de Privacidade
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
