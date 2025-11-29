import Link from "next/link";
import { ArrowRight, Target, Zap, TrendingUp, Award, Users, CheckCircle2, Star, LucideIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Premium & Motivacional */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image com Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop&q=80" 
            alt="Transformação Fitness"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>

        {/* Conteúdo Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 px-5 py-2 rounded-full text-sm font-semibold mb-8">
              <Zap className="w-4 h-4" />
              <span>Transformação Real com IA</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Seu corpo ideal
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-2">
                começa agora
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-200 mb-10 leading-relaxed">
              Análise corporal inteligente, planos personalizados e acompanhamento total. 
              <span className="block mt-2 font-semibold text-white">Transforme-se com tecnologia de ponta.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/auth"
                className="group w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span>Iniciar Transformação</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Ver Planos
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>100% Grátis para começar</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Resultados em 30 dias</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Sem compromisso</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Motivacional com Imagens */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Transformações Reais
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Disciplina, foco e determinação. Veja o que é possível alcançar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Card Masculino */}
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop&q=80" 
                alt="Transformação Masculina"
                className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Força e Definição</h3>
                  <p className="text-gray-200 text-lg">Construa o corpo que você sempre quis</p>
                </div>
              </div>
            </div>

            {/* Card Feminino */}
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-pink-500/20 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&h=600&fit=crop&q=80" 
                alt="Transformação Feminina"
                className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Saúde e Bem-Estar</h3>
                  <p className="text-gray-200 text-lg">Conquiste sua melhor versão</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Motivacionais */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <MotivationalCard
              icon={Target}
              title="Foco no Objetivo"
              quote="Cada dia é uma nova chance de evoluir"
              gradient="from-blue-500 to-cyan-500"
            />
            <MotivationalCard
              icon={Zap}
              title="Energia e Disciplina"
              quote="Sua única limitação é você mesmo"
              gradient="from-purple-500 to-pink-500"
            />
            <MotivationalCard
              icon={Award}
              title="Conquiste Resultados"
              quote="O sucesso é a soma de pequenos esforços"
              gradient="from-orange-500 to-red-500"
            />
          </div>
        </div>
      </section>

      {/* Seção de Transformação e Narrativa */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=900&fit=crop&q=80" 
                alt="Treino Intenso"
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                A Jornada da Transformação
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Transformar o corpo não é apenas sobre estética. É sobre <span className="text-blue-400 font-semibold">disciplina</span>, 
                <span className="text-cyan-400 font-semibold"> superação</span> e <span className="text-green-400 font-semibold">consistência</span>.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Cada treino é uma vitória. Cada refeição saudável é um passo à frente. 
                Cada dia de dedicação te aproxima do seu objetivo. Com a tecnologia certa 
                e o mindset correto, você pode alcançar resultados extraordinários.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-300">Planos personalizados baseados em IA</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-300">Acompanhamento diário da sua evolução</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-300">Suporte completo em toda jornada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas e Prova Social */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="50K+" label="Usuários Ativos" />
            <StatCard number="2M+" label="Fotos Analisadas" />
            <StatCard number="95%" label="Taxa de Sucesso" />
            <StatCard number="4.9★" label="Avaliação Média" />
          </div>
        </div>
      </section>

      {/* CTA Final Poderoso */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&h=800&fit=crop&q=80" 
            alt="Motivação Fitness"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 to-cyan-600/95"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Comece Sua Transformação Hoje
          </h2>
          <p className="text-xl sm:text-2xl text-blue-100 mb-10 leading-relaxed">
            Não espere o momento perfeito. O momento é agora. 
            <span className="block mt-2 font-semibold text-white">Descubra seu verdadeiro potencial.</span>
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center space-x-3 bg-white text-blue-600 px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>Iniciar Agora Grátis</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="mt-6 text-blue-100 text-sm">
            Junte-se a milhares de pessoas transformando suas vidas
          </p>
        </div>
      </section>

      {/* Footer Elegante */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl"></div>
                <span className="text-2xl font-bold text-white">BodyVision Pro</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Plataforma completa de transformação corporal com inteligência artificial. 
                Alcance seus objetivos com tecnologia de ponta.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Produto</h3>
              <ul className="space-y-2">
                <li><Link href="/pricing" className="hover:text-white transition-colors">Planos</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Começar</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm">
              © 2025 BodyVision Pro. Todos os direitos reservados. Transforme-se com tecnologia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface MotivationalCardProps {
  icon: LucideIcon;
  title: string;
  quote: string;
  gradient: string;
}

function MotivationalCard({ icon: Icon, title, quote, gradient }: MotivationalCardProps) {
  return (
    <div className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      <div className={`relative w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="relative text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="relative text-lg text-gray-600 italic leading-relaxed">&quot;{quote}&quot;</p>
    </div>
  );
}

interface StatCardProps {
  number: string;
  label: string;
}

function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="p-8">
      <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-gray-600 font-semibold">{label}</div>
    </div>
  );
}
