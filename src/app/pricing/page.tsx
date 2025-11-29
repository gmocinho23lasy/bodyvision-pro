"use client";

import Link from "next/link";
import { Check, X, Zap, Crown, Sparkles, Star, Shield, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const plans = [
    {
      id: "free",
      name: "FREE",
      icon: Zap,
      tagline: "Para começar sua jornada",
      priceMonthly: 0,
      priceAnnual: 0,
      popular: false,
      cta: "Começar Grátis Agora",
      features: [
        { text: "Acesso limitado ao app", included: true },
        { text: "Análise corporal básica com foto", included: true },
        { text: "Treinos iniciais simples", included: true },
        { text: "Algumas receitas gratuitas", included: true },
        { text: "Painel básico de evolução", included: true },
        { text: "Acesso à comunidade básica", included: true },
        { text: "Publicidade no app", included: true, isNegative: true },
        { text: "Treinos personalizados", included: false },
        { text: "Dietas completas", included: false },
        { text: "Análise 3D avançada", included: false },
      ],
    },
    {
      id: "standard",
      name: "STANDARD",
      icon: Star,
      tagline: "Ideal para resultados consistentes",
      priceMonthly: 29,
      priceAnnual: 199,
      savings: 43,
      popular: false,
      cta: "Liberar Versão STANDARD",
      features: [
        { text: "Tudo do plano FREE", included: true, highlight: true },
        { text: "Treinos completos personalizados", included: true },
        { text: "Dietas semanais ajustadas ao objetivo", included: true },
        { text: "Vídeos demonstrativos dos exercícios", included: true },
        { text: "Análise corporal avançada", included: true },
        { text: "Ajustes automáticos conforme evolução", included: true },
        { text: "Redução de anúncios", included: true },
        { text: "Suporte prioritário", included: true },
        { text: "Análise 3D avançada", included: false },
        { text: "Comunidade VIP", included: false },
      ],
      bonus: [
        "Acesso a conteúdos exclusivos",
        "Lista de compras personalizada",
      ],
    },
    {
      id: "pro",
      name: "PRO",
      icon: Crown,
      tagline: "Transformação completa e inteligente",
      priceMonthly: 49,
      priceAnnual: 399,
      savings: 32,
      popular: true,
      cta: "Quero Ser PRO",
      features: [
        { text: "Tudo do plano STANDARD", included: true, highlight: true },
        { text: "Análise corporal 3D avançada por foto", included: true },
        { text: "Ferramenta de transformação corporal", included: true },
        { text: "Sistema inteligente completo (treinos + dieta + planejamento)", included: true },
        { text: "Receitas completas com fotos reais", included: true },
        { text: "Biblioteca premium de vídeos", included: true },
        { text: "Zero anúncios", included: true },
        { text: "Acompanhamento inteligente diário", included: true },
        { text: "Acesso à comunidade VIP", included: true },
        { text: "Acesso antecipado a novas funções", included: true },
        { text: "Imagens motivacionais personalizadas", included: true },
      ],
      bonus: [
        "Mega bônus exclusivo",
        "Lives e desafios mensais",
        "Acesso VIP antecipado a recursos novos",
        "Pacote de motivação extra",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Transforme seu corpo com inteligência artificial</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Escolha o plano perfeito para sua{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
              transformação
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Do início gratuito até a experiência completa premium.{" "}
            <span className="text-yellow-400 font-semibold">Seu corpo, seu tempo, seu objetivo.</span>
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full p-1.5 inline-flex">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 shadow-lg shadow-yellow-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 relative ${
                billingCycle === "annual"
                  ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 shadow-lg shadow-yellow-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Anual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                -40%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnual;
            const isAnnual = billingCycle === "annual";

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-2 border-yellow-500/50 shadow-2xl shadow-yellow-500/20 scale-105"
                    : "bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    🔥 MAIS POPULAR
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        plan.popular
                          ? "bg-gradient-to-br from-yellow-500 to-amber-500"
                          : "bg-slate-700/50"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${plan.popular ? "text-slate-900" : "text-yellow-400"}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{plan.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline mb-2">
                    <span className="text-5xl font-bold text-white">
                      {price === 0 ? "Grátis" : `R$ ${price}`}
                    </span>
                    {price > 0 && (
                      <span className="text-gray-400 ml-2">
                        /{isAnnual ? "ano" : "mês"}
                      </span>
                    )}
                  </div>
                  {isAnnual && plan.savings && (
                    <div className="inline-flex items-center space-x-1 bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                      <TrendingUp className="w-3 h-3" />
                      <span>Economize {plan.savings}%</span>
                    </div>
                  )}
                  {!isAnnual && plan.priceAnnual > 0 && (
                    <p className="text-gray-500 text-sm mt-1">
                      ou R$ {plan.priceAnnual}/ano
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      {feature.included ? (
                        <Check
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            feature.isNegative
                              ? "text-red-400"
                              : feature.highlight
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        />
                      ) : (
                        <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-600" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? feature.highlight
                              ? "text-yellow-400 font-semibold"
                              : feature.isNegative
                              ? "text-red-400"
                              : "text-gray-300"
                            : "text-gray-600 line-through"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Bonus Section */}
                {plan.bonus && isAnnual && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
                    <p className="text-purple-400 font-semibold text-sm mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Bônus Plano Anual:
                    </p>
                    <ul className="space-y-1">
                      {plan.bonus.map((bonus, idx) => (
                        <li key={idx} className="text-gray-300 text-xs flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          {bonus}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <Link
                  href={`/checkout?plan=${plan.id}&billing=${billingCycle}`}
                  className={`block w-full text-center py-3.5 rounded-xl font-bold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 hover:shadow-xl hover:shadow-yellow-500/30 hover:scale-105"
                      : "bg-slate-700 text-white hover:bg-slate-600"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Guarantee Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8 text-center backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Garantia de Satisfação de 7 Dias
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experimente sem riscos. Se não ficar satisfeito, devolvemos 100% do seu investimento.
              Sem perguntas, sem complicações.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            O que nossos usuários dizem
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Carlos Silva",
                role: "Plano PRO",
                text: "Perdi 15kg em 3 meses! A análise 3D me motivou todos os dias a continuar.",
                rating: 5,
              },
              {
                name: "Ana Paula",
                role: "Plano STANDARD",
                text: "Os treinos personalizados são incríveis. Nunca me senti tão bem com meu corpo!",
                rating: 5,
              },
              {
                name: "Roberto Lima",
                role: "Plano PRO",
                text: "A IA realmente entende minhas necessidades. Resultados visíveis em semanas!",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-2xl p-12 backdrop-blur-sm">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            O próximo corpo que você vai transformar é o seu.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Escolha seu plano e comece hoje mesmo sua jornada de transformação.
          </p>
          <Link
            href="/auth"
            className="inline-block bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-yellow-500/30 hover:scale-105 transition-all duration-300"
          >
            Começar Agora
          </Link>
        </div>
      </div>
    </div>
  );
}
