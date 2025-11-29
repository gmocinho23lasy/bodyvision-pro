'use client'

import { useState } from 'react'
import { ArrowLeft, Check, Crown, Sparkles, Shield, Users, Zap, Star, TrendingUp, Award } from 'lucide-react'
import Link from 'next/link'

export default function MeuPlanoPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')

  const plans = [
    {
      name: 'FREE',
      subtitle: 'Gratuito',
      price: { monthly: 0, annual: 0 },
      icon: Sparkles,
      popular: false,
      features: [
        'Acesso limitado ao app',
        'Análise corporal básica com foto',
        'Treinos iniciais simples',
        'Algumas receitas gratuitas',
        'Painel básico de evolução',
        'Acesso a comunidade básica',
        'Publicidade aparecendo no app'
      ],
      cta: 'Começar grátis agora',
      gradient: 'from-slate-600 to-slate-700'
    },
    {
      name: 'STANDARD',
      subtitle: 'Intermediário',
      price: { monthly: 49.90, annual: 29.90 },
      icon: Zap,
      popular: false,
      features: [
        'Tudo do plano FREE',
        'Treinos completos personalizados',
        'Dietas semanais ajustadas ao objetivo',
        'Vídeos demonstrativos dos exercícios',
        'Análise corporal avançada',
        'Ajustes automáticos conforme evolução',
        'Redução de anúncios',
        'Suporte prioritário'
      ],
      cta: 'Liberar versão STANDARD',
      gradient: 'from-blue-500 to-cyan-600',
      bonus: [
        'E-book exclusivo de receitas fit',
        'Acesso a desafios mensais'
      ]
    },
    {
      name: 'PRO',
      subtitle: 'Completo',
      price: { monthly: 99.90, annual: 59.90 },
      icon: Crown,
      popular: true,
      features: [
        'Tudo do plano STANDARD',
        'Análise corporal 3D avançada por foto',
        'Ferramenta de transformação corporal',
        'Sistema de inteligência que cria treinos, dietas e planejamento completo',
        'Receitas completas com fotos reais',
        'Biblioteca premium de vídeos',
        'Zero anúncios',
        'Acompanhamento inteligente diário',
        'Acesso à comunidade VIP',
        'Acesso antecipado a novas funções',
        'Imagens motivacionais personalizadas'
      ],
      cta: 'Quero ser PRO',
      gradient: 'from-yellow-400 to-orange-500',
      bonus: [
        'Consultoria mensal com especialista',
        'Plano de suplementação personalizado',
        'Lives exclusivas semanais',
        'Acesso vitalício a conteúdos premium'
      ]
    }
  ]

  const testimonials = [
    {
      name: 'Carlos Silva',
      role: 'Perdeu 15kg em 3 meses',
      text: 'O plano PRO mudou minha vida! A análise 3D e os treinos personalizados fizeram toda a diferença.',
      avatar: '👨'
    },
    {
      name: 'Ana Paula',
      role: 'Ganhou 8kg de massa muscular',
      text: 'Nunca imaginei que conseguiria resultados tão rápidos. O acompanhamento diário é incrível!',
      avatar: '👩'
    },
    {
      name: 'Roberto Mendes',
      role: 'Definição muscular em 2 meses',
      text: 'A comunidade VIP e as receitas premium valem cada centavo. Recomendo demais!',
      avatar: '👨‍🦱'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar</span>
            </Link>
            <h1 className="text-xl font-bold text-white">Meu Plano</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20 rounded-full mb-6">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">Transforme seu corpo hoje</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Escolha o plano perfeito para sua transformação
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
            Do início gratuito até a experiência completa premium. Seu corpo, seu tempo, seu objetivo.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-3 rounded-lg font-medium transition-all relative ${
              billingCycle === 'annual'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            Anual
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              -40%
            </span>
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual
            
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-yellow-400 shadow-2xl shadow-yellow-400/20'
                    : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 text-sm font-bold rounded-full">
                    MAIS POPULAR
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${plan.gradient}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <p className="text-sm text-slate-400">{plan.subtitle}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">
                      R$ {price.toFixed(2)}
                    </span>
                    <span className="text-slate-400">/mês</span>
                  </div>
                  {billingCycle === 'annual' && price > 0 && (
                    <p className="text-sm text-green-400 mt-1">
                      Economize até 40% no plano anual
                    </p>
                  )}
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all mb-6 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 hover:shadow-lg hover:shadow-yellow-400/50'
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                  }`}
                >
                  {plan.cta}
                </button>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.bonus && billingCycle === 'annual' && (
                  <div className="pt-6 border-t border-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="font-semibold text-white">Bônus Exclusivos</span>
                    </div>
                    <ul className="space-y-2">
                      {plan.bonus.map((bonus, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Award className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-400">{bonus}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            O que nossos usuários dizem
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
          <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Garantia de Satisfação</h3>
          <p className="text-slate-300 mb-4">
            Experimente por 7 dias. Se não gostar, devolvemos 100% do seu dinheiro.
          </p>
          <div className="inline-flex items-center gap-2 text-green-400 font-semibold">
            <Check className="w-5 h-5" />
            <span>Sem riscos, sem complicações</span>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            O próximo corpo que você vai transformar é o seu.
          </h3>
          <p className="text-xl text-slate-400 mb-8">
            Escolha seu plano e comece hoje.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Users className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">+50.000 usuários transformados</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm">98% de satisfação</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
