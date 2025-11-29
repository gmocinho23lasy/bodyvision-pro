import { Exercise } from "../types/workout";

// Banco de dados completo de exercícios
export const exercises: Exercise[] = [
  // PEITO
  {
    id: "supino-reto",
    name: "Supino Reto com Barra",
    videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg",
    thumbnailUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
    duration: 45,
    muscleGroups: ["peito", "triceps", "ombros"],
    intensity: "alta",
    experienceLevel: ["intermediario", "avancado"],
    
    description: "O supino reto é um exercício fundamental para desenvolvimento do peitoral maior, tríceps e ombros. Executado deitado em um banco horizontal com barra.",
    targetMuscles: ["Peitoral maior", "Tríceps braquial", "Deltóide anterior"],
    equipment: ["Barra", "Banco reto", "Anilhas"],
    
    correctExecution: [
      "Deite-se no banco com os pés firmes no chão",
      "Segure a barra com pegada um pouco mais larga que os ombros",
      "Desça a barra controladamente até tocar o peito",
      "Empurre a barra para cima até extensão completa dos braços",
      "Mantenha os cotovelos em ângulo de 45° em relação ao corpo"
    ],
    
    idealPosture: [
      "Costas levemente arqueadas, mantendo contato com o banco",
      "Escápulas retraídas (ombros para trás e para baixo)",
      "Pés firmes no chão para estabilidade",
      "Olhar fixo no teto",
      "Pegada firme mas não excessivamente apertada"
    ],
    
    commonMistakes: [
      "Arco excessivo nas costas (risco de lesão lombar)",
      "Barra descendo muito alta (no pescoço) ou muito baixa",
      "Cotovelos muito abertos (90° - sobrecarga nos ombros)",
      "Pés fora do chão ou instáveis",
      "Movimento muito rápido sem controle",
      "Não tocar a barra no peito (amplitude incompleta)"
    ],
    
    variations: [
      {
        level: "iniciante",
        description: "Supino com halteres ou na máquina Smith para maior estabilidade",
        sets: "3 séries",
        reps: "10-12 repetições",
        rest: "90 segundos"
      },
      {
        level: "intermediario",
        description: "Supino reto tradicional com barra livre",
        sets: "4 séries",
        reps: "8-10 repetições",
        rest: "60-90 segundos"
      },
      {
        level: "avancado",
        description: "Supino com pausa no peito ou com cadeias/elásticos",
        sets: "4-5 séries",
        reps: "6-8 repetições",
        rest: "2-3 minutos"
      }
    ],
    
    safetyTips: [
      "Sempre use um parceiro de treino ou travas de segurança",
      "Aqueça adequadamente antes de cargas pesadas",
      "Não faça pegada muito larga (risco de lesão no ombro)",
      "Mantenha os punhos retos, nunca dobrados",
      "Respire: inspire na descida, expire na subida"
    ],
    
    contraindications: [
      "Lesões no ombro (especialmente manguito rotador)",
      "Problemas no punho ou cotovelo",
      "Lesões lombares graves (devido ao arco)"
    ],
    
    recommendations: [
      {
        goal: "ganhar-massa",
        sets: "4-5 séries",
        reps: "6-10 repetições",
        rest: "2-3 minutos",
        notes: "Use cargas de 70-85% da sua 1RM. Foque em progressão de carga."
      },
      {
        goal: "definicao",
        sets: "3-4 séries",
        reps: "10-15 repetições",
        rest: "45-60 segundos",
        notes: "Cargas moderadas (60-70% 1RM) com descanso reduzido."
      },
      {
        goal: "perder-peso",
        sets: "3 séries",
        reps: "12-15 repetições",
        rest: "30-45 segundos",
        notes: "Foque em manter massa muscular durante o déficit calórico."
      },
      {
        goal: "recomposicao",
        sets: "4 séries",
        reps: "8-12 repetições",
        rest: "60-90 segundos",
        notes: "Equilíbrio entre volume e intensidade."
      }
    ]
  },

  {
    id: "flexao-solo",
    name: "Flexão de Braço no Solo",
    videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4",
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    duration: 30,
    muscleGroups: ["peito", "triceps", "ombros", "abdomen"],
    intensity: "moderada",
    experienceLevel: ["iniciante", "intermediario", "avancado"],
    
    description: "Exercício clássico de peso corporal que trabalha peito, tríceps, ombros e core. Pode ser feito em qualquer lugar sem equipamento.",
    targetMuscles: ["Peitoral maior", "Tríceps", "Deltóide anterior", "Core"],
    equipment: ["Nenhum (peso corporal)"],
    
    correctExecution: [
      "Posicione as mãos no chão, um pouco mais largas que os ombros",
      "Corpo em linha reta da cabeça aos pés",
      "Desça o corpo até o peito quase tocar o chão",
      "Empurre o corpo para cima até extensão completa dos braços",
      "Mantenha o core contraído durante todo o movimento"
    ],
    
    idealPosture: [
      "Corpo completamente alinhado (prancha)",
      "Cotovelos em 45° em relação ao corpo",
      "Olhar para o chão, pescoço neutro",
      "Abdômen contraído",
      "Glúteos ativados"
    ],
    
    commonMistakes: [
      "Quadril caído (lordose excessiva)",
      "Quadril muito elevado (perdendo tensão no peito)",
      "Cotovelos muito abertos",
      "Amplitude incompleta",
      "Cabeça projetada para frente",
      "Mãos muito à frente ou muito atrás"
    ],
    
    variations: [
      {
        level: "iniciante",
        description: "Flexão com joelhos apoiados ou na parede",
        sets: "3 séries",
        reps: "8-12 repetições",
        rest: "60 segundos"
      },
      {
        level: "intermediario",
        description: "Flexão tradicional no solo",
        sets: "3-4 séries",
        reps: "12-20 repetições",
        rest: "45-60 segundos"
      },
      {
        level: "avancado",
        description: "Flexão com pés elevados, diamante ou com palmas",
        sets: "4-5 séries",
        reps: "15-25 repetições",
        rest: "30-45 segundos"
      }
    ],
    
    safetyTips: [
      "Aqueça os punhos antes de começar",
      "Mantenha sempre o core ativado",
      "Não force se sentir dor nos ombros",
      "Progrida gradualmente nas variações",
      "Respire: inspire na descida, expire na subida"
    ],
    
    contraindications: [
      "Lesões agudas no punho",
      "Problemas graves no ombro",
      "Lesões lombares (use variação com joelhos)"
    ],
    
    recommendations: [
      {
        goal: "ganhar-massa",
        sets: "4 séries",
        reps: "15-25 repetições",
        rest: "60 segundos",
        notes: "Use variações mais difíceis ou adicione peso nas costas."
      },
      {
        goal: "definicao",
        sets: "3-4 séries",
        reps: "20-30 repetições",
        rest: "30-45 segundos",
        notes: "Foque em tempo sob tensão e descanso reduzido."
      },
      {
        goal: "perder-peso",
        sets: "3-4 séries",
        reps: "15-25 repetições",
        rest: "30 segundos",
        notes: "Ótimo para circuitos de alta intensidade."
      },
      {
        goal: "recomposicao",
        sets: "4 séries",
        reps: "15-20 repetições",
        rest: "45 segundos",
        notes: "Mantenha boa forma e progressão constante."
      }
    ]
  },

  // COSTAS
  {
    id: "barra-fixa",
    name: "Barra Fixa (Pull-up)",
    videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g",
    thumbnailUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    duration: 40,
    muscleGroups: ["costas", "biceps", "ombros"],
    intensity: "muito-alta",
    experienceLevel: ["intermediario", "avancado"],
    
    description: "Exercício composto de peso corporal considerado um dos melhores para desenvolvimento das costas, especialmente o grande dorsal.",
    targetMuscles: ["Grande dorsal", "Trapézio", "Bíceps", "Deltóide posterior"],
    equipment: ["Barra fixa"],
    
    correctExecution: [
      "Segure a barra com pegada pronada (palmas para frente)",
      "Mãos um pouco mais largas que os ombros",
      "Puxe o corpo para cima até o queixo passar da barra",
      "Desça controladamente até extensão completa dos braços",
      "Mantenha o core contraído e evite balanço"
    ],
    
    idealPosture: [
      "Escápulas retraídas no topo do movimento",
      "Peito projetado para a barra",
      "Cotovelos puxando para baixo e para trás",
      "Core ativado para evitar balanço",
      "Pernas podem estar cruzadas ou retas"
    ],
    
    commonMistakes: [
      "Usar impulso/balanço excessivo (kipping sem controle)",
      "Amplitude incompleta (não descer totalmente)",
      "Ombros elevados (não retrair escápulas)",
      "Pescoço projetado para frente",
      "Usar apenas os braços (não ativar as costas)"
    ],
    
    variations: [
      {
        level: "iniciante",
        description: "Barra fixa assistida (máquina ou elástico) ou negativas",
        sets: "3 séries",
        reps: "5-8 repetições",
        rest: "90-120 segundos"
      },
      {
        level: "intermediario",
        description: "Barra fixa tradicional com peso corporal",
        sets: "3-4 séries",
        reps: "8-12 repetições",
        rest: "90 segundos"
      },
      {
        level: "avancado",
        description: "Barra fixa com peso adicional ou variações (archer, typewriter)",
        sets: "4-5 séries",
        reps: "10-15 repetições",
        rest: "2 minutos"
      }
    ],
    
    safetyTips: [
      "Aqueça ombros e cotovelos adequadamente",
      "Não force se sentir dor aguda",
      "Evite balanço excessivo (risco de lesão no ombro)",
      "Progrida gradualmente no volume",
      "Use pegada firme mas não excessivamente apertada"
    ],
    
    contraindications: [
      "Lesões no manguito rotador",
      "Tendinite no cotovelo",
      "Problemas graves no ombro"
    ],
    
    recommendations: [
      {
        goal: "ganhar-massa",
        sets: "4-5 séries",
        reps: "6-10 repetições",
        rest: "2-3 minutos",
        notes: "Adicione peso quando conseguir 12+ repetições com boa forma."
      },
      {
        goal: "definicao",
        sets: "3-4 séries",
        reps: "10-15 repetições",
        rest: "60 segundos",
        notes: "Foque em contração máxima no topo do movimento."
      },
      {
        goal: "perder-peso",
        sets: "3 séries",
        reps: "8-12 repetições",
        rest: "45-60 segundos",
        notes: "Excelente para manter massa muscular durante déficit."
      },
      {
        goal: "recomposicao",
        sets: "4 séries",
        reps: "8-12 repetições",
        rest: "90 segundos",
        notes: "Exercício fundamental para desenvolvimento das costas."
      }
    ]
  },

  {
    id: "remada-curvada",
    name: "Remada Curvada com Barra",
    videoUrl: "https://www.youtube.com/embed/FWJR5Ve8bnQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&h=600&fit=crop",
    duration: 45,
    muscleGroups: ["costas", "biceps", "ombros"],
    intensity: "alta",
    experienceLevel: ["intermediario", "avancado"],
    
    description: "Exercício composto fundamental para espessura das costas, trabalhando grande dorsal, trapézio médio e rombóides.",
    targetMuscles: ["Grande dorsal", "Trapézio médio", "Rombóides", "Bíceps"],
    equipment: ["Barra", "Anilhas"],
    
    correctExecution: [
      "Fique em pé com joelhos levemente flexionados",
      "Incline o tronco para frente (45-60°)",
      "Segure a barra com pegada pronada, largura dos ombros",
      "Puxe a barra em direção ao abdômen",
      "Desça controladamente até extensão completa dos braços"
    ],
    
    idealPosture: [
      "Coluna neutra (não arredondada)",
      "Escápulas retraídas no topo do movimento",
      "Cotovelos próximos ao corpo",
      "Olhar para frente",
      "Core ativado para proteger a lombar"
    ],
    
    commonMistakes: [
      "Coluna arredondada (risco de lesão)",
      "Usar impulso excessivo do quadril",
      "Cotovelos muito abertos",
      "Amplitude incompleta",
      "Tronco muito vertical ou muito horizontal",
      "Usar apenas os braços (não ativar as costas)"
    ],
    
    variations: [
      {
        level: "iniciante",
        description: "Remada na máquina ou com halteres (maior estabilidade)",
        sets: "3 séries",
        reps: "10-12 repetições",
        rest: "90 segundos"
      },
      {
        level: "intermediario",
        description: "Remada curvada tradicional com barra",
        sets: "4 séries",
        reps: "8-10 repetições",
        rest: "90 segundos"
      },
      {
        level: "avancado",
        description: "Remada Pendlay (barra toca o chão a cada rep) ou com pausa",
        sets: "4-5 séries",
        reps: "6-8 repetições",
        rest: "2-3 minutos"
      }
    ],
    
    safetyTips: [
      "Mantenha SEMPRE a coluna neutra",
      "Não use carga que comprometa a forma",
      "Aqueça a lombar adequadamente",
      "Use cinto de musculação se necessário",
      "Respire: inspire na descida, expire na subida"
    ],
    
    contraindications: [
      "Lesões lombares graves",
      "Hérnia de disco",
      "Problemas graves no ombro"
    ],
    
    recommendations: [
      {
        goal: "ganhar-massa",
        sets: "4-5 séries",
        reps: "6-10 repetições",
        rest: "2-3 minutos",
        notes: "Exercício fundamental para espessura das costas."
      },
      {
        goal: "definicao",
        sets: "3-4 séries",
        reps: "10-15 repetições",
        rest: "60 segundos",
        notes: "Foque em contração máxima e tempo sob tensão."
      },
      {
        goal: "perder-peso",
        sets: "3 séries",
        reps: "12-15 repetições",
        rest: "45-60 segundos",
        notes: "Mantenha boa forma mesmo com descanso reduzido."
      },
      {
        goal: "recomposicao",
        sets: "4 séries",
        reps: "8-12 repetições",
        rest: "90 segundos",
        notes: "Equilíbrio entre volume e intensidade."
      }
    ]
  },

  // PERNAS
  {
    id: "agachamento-livre",
    name: "Agachamento Livre com Barra",
    videoUrl: "https://www.youtube.com/embed/ultWZbUMPL8",
    thumbnailUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=600&fit=crop",
    duration: 50,
    muscleGroups: ["pernas", "gluteos", "abdomen"],
    intensity: "muito-alta",
    experienceLevel: ["intermediario", "avancado"],
    
    description: "O rei dos exercícios para membros inferiores. Trabalha quadríceps, glúteos, posteriores e core de forma integrada.",
    targetMuscles: ["Quadríceps", "Glúteos", "Posteriores de coxa", "Core"],
    equipment: ["Barra", "Rack", "Anilhas"],
    
    correctExecution: [
      "Posicione a barra no trapézio (high bar) ou posterior do deltoide (low bar)",
      "Pés na largura dos ombros, pontas levemente abertas",
      "Desça controladamente até coxas paralelas ao chão (ou abaixo)",
      "Mantenha joelhos alinhados com os pés",
      "Empurre o chão para subir, mantendo o tronco estável"
    ],
    
    idealPosture: [
      "Coluna neutra durante todo o movimento",
      "Peito projetado para cima",
      "Olhar para frente ou levemente para cima",
      "Joelhos não ultrapassam muito a ponta dos pés",
      "Peso distribuído no meio do pé"
    ],
    
    commonMistakes: [
      "Joelhos colapsando para dentro (valgo)",
      "Coluna arredondada (butt wink excessivo)",
      "Calcanhar saindo do chão",
      "Amplitude incompleta (não descer o suficiente)",
      "Tronco muito inclinado para frente",
      "Subir primeiro com o quadril (good morning squat)"
    ],
    
    variations: [
      {
        level: "iniciante",
        description: "Agachamento goblet (com halter) ou no Smith",
        sets: "3 séries",
        reps: "10-12 repetições",
        rest: "90-120 segundos"
      },
      {
        level: "intermediario",
        description: "Agachamento livre tradicional",
        sets: "4 séries",
        reps: "8-10 repetições",
        rest: "2-3 minutos"
      },
      {
        level: "avancado",
        description: "Agachamento frontal, com pausa ou com cadeias",
        sets: "4-5 séries",
        reps: "6-8 repetições",
        rest: "3-4 minutos"
      }
    ],
    
    safetyTips: [
      "SEMPRE use travas de segurança no rack",
      "Aqueça adequadamente (mobilidade de tornozelo e quadril)",
      "Não use carga que comprometa a forma",
      "Use cinto de musculação para cargas pesadas",
      "Respire: inspire antes de descer, segure, expire na subida"
    ],
    
    contraindications: [
      "Lesões graves no joelho",
      "Problemas lombares graves",
      "Falta de mobilidade (trabalhe antes de carregar)"
    ],
    
    recommendations: [
      {
        goal: "ganhar-massa",
        sets: "4-5 séries",
        reps: "6-10 repetições",
        rest: "3-4 minutos",
        notes: "Exercício fundamental. Use 70-85% da 1RM."
      },
      {
        goal: "definicao",
        sets: "3-4 séries",
        reps: "12-15 repetições",
        rest: "60-90 segundos",
        notes: "Cargas moderadas com descanso reduzido."
      },
      {
        goal: "perder-peso",
        sets: "3 séries",
        reps: "15-20 repetições",
        rest: "60 segundos",
        notes: "Alto gasto calórico. Mantenha boa forma."
      },
      {
        goal: "recomposicao",
        sets: "4 séries",
        reps: "8-12 repetições",
        rest: "2-3 minutos",
        notes: "Exercício essencial para qualquer objetivo."
      }
    ]
  },

  {
    id: "levantamento-terra",
    name: "Levantamento Terra (Deadlift)",
    videoUrl: "https://www.youtube.com/embed/op9kVnSso6Q",
    thumbnailUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop",
    duration: 50,
    muscleGroups: ["costas", "pernas", "gluteos"],
    intensity: "muito-alta",
    experienceLevel: ["intermediario", "avancado"],
    
    description: "Exercício composto completo que trabalha praticamente todo o corpo, com ênfase em posteriores, glúteos e lombar.",
    targetMuscles: ["Posteriores de coxa", "Glúteos", "Eretores da espinha", "Trapézio", "Antebraços"],
    equipment: ["Barra", "Anilhas"],
    
    correctExecution: [
      "Fique em pé com barra sobre o meio do pé",
      "Segure a barra com pegada pronada, largura dos ombros",
      "Flexione joelhos até canelas tocarem a barra",
      "Peito para cima, coluna neutra",
      "Empurre o chão com os pés e estenda quadril e joelhos simultaneamente"
    ],
    
    idealPosture: [
      "Coluna SEMPRE neutra (não arredondada)",
      "Escápulas sobre a barra (vista de cima)",
      "Barra próxima ao corpo durante todo o movimento",
      "Quadril e ombros sobem juntos",
      "Olhar neutro ou levemente para cima"
    ],
    
    commonMistakes: [
      "Coluna arredondada (MUITO PERIGOSO)",
      "Barra longe do corpo",
      "Quadril subindo primeiro (transformando em stiff)",
      "Hiperextensão lombar no topo",
      "Usar os braços para puxar (risco de bíceps)",
      "Descer a barra rápido demais"
    ],
    
    variations: [
      {
        level: "iniciante",
        description: "Levantamento terra romeno ou com trap bar",
        sets: "3 séries",
        reps: "8-10 repetições",
        rest: "2-3 minutos"
      },
      {
        level: "intermediario",
        description: "Levantamento terra convencional",
        sets: "4 séries",
        reps: "5-8 repetições",
        rest: "3-4 minutos"
      },
      {
        level: "avancado",
        description: "Levantamento terra sumo, deficit ou com pausa",
        sets: "4-5 séries",
        reps: "3-6 repetições",
        rest: "4-5 minutos"
      }
    ],
    
    safetyTips: [
      "NUNCA comprometa a forma pela carga",
      "Use cinto de musculação para cargas pesadas",
      "Aqueça MUITO bem antes de cargas máximas",
      "Use straps se a pegada for limitante",
      "Respire: inspire antes de puxar, segure, expire no topo"
    ],
    
    contraindications: [
      "Lesões lombares graves",
      "Hérnia de disco não tratada",
      "Problemas graves no joelho"
    ],
    
    recommendations: [
      {
        goal: "ganhar-massa",
        sets: "4-5 séries",
        reps: "5-8 repetições",
        rest: "3-5 minutos",
        notes: "Um dos melhores para ganho de massa total."
      },
      {
        goal: "definicao",
        sets: "3-4 séries",
        reps: "8-12 repetições",
        rest: "2-3 minutos",
        notes: "Alto gasto energético. Mantenha forma perfeita."
      },
      {
        goal: "perder-peso",
        sets: "3 séries",
        reps: "10-12 repetições",
        rest: "90-120 segundos",
        notes: "Excelente para manter massa durante déficit."
      },
      {
        goal: "recomposicao",
        sets: "4 séries",
        reps: "6-10 repetições",
        rest: "3 minutos",
        notes: "Exercício fundamental para força e massa."
      }
    ]
  },

  // OMBROS
  {
    id: "desenvolvimento-ombros",
    name: "Desenvolvimento de Ombros com Barra",
    videoUrl: "https://www.youtube.com/embed/2yjwXTZQDDI",
    thumbnailUrl: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&h=600&fit=crop",
    duration: 40,
    muscleGroups: ["ombros", "triceps"],
    intensity: "alta",
    experienceLevel: ["intermediario", "avancado"],
    
    description: "Exercício fundamental para desenvolvimento dos deltóides, especialmente anterior e médio, além de tríceps.",
    targetMuscles: ["Deltóide anterior", "Deltóide médio", "Tríceps", "Trapézio superior"],
    equipment: ["Barra", "Banco com encosto", "Anilhas"],
    
    correctExecution: [
      "Sente-se com costas apoiadas no banco (90°)",
      "Segure a barra um pouco mais larga que os ombros",
      "Desça a barra controladamente até altura do queixo",
      "Empurre a barra para cima até extensão completa",
      "Mantenha core ativado e evite arco excessivo"
    ],
    
    idealPosture: [
      "Costas totalmente apoiadas no banco",
      "Escápulas retraídas",
      "Cotovelos em linha com os ombros",
      "Olhar para frente",
      "Pés firmes no chão"
    ],
    
    commonMistakes: [
      "Arco excessivo nas costas (usar pernas para impulso)",
      "Descer a barra atrás da cabeça (risco de lesão)",
      "Cotovelos muito à frente ou muito atrás",
      "Amplitude incompleta",
      "Cabeça projetada para frente",
      "Usar carga excessiva comprometendo a forma"
    ],
    
    variations: [
      {
        level: "iniciante",
        description: "Desenvolvimento com halteres ou na máquina",
        sets: "3 séries",
        reps: "10-12 repetições",
        rest: "90 segundos"
      },
      {
        level: "intermediario",
        description: "Desenvolvimento com barra sentado",
        sets: "4 séries",
        reps: "8-10 repetições",
        rest: "90-120 segundos"
      },
      {
        level: "avancado",
        description: "Desenvolvimento militar em pé ou com pausa",
        sets: "4-5 séries",
        reps: "6-8 repetições",
        rest: "2-3 minutos"
      }
    ],
    
    safetyTips: [
      "Aqueça os ombros adequadamente (manguito rotador)",
      "Não desça a barra atrás da cabeça",
      "Use cinto se fizer em pé com cargas pesadas",
      "Não force se sentir dor no ombro",
      "Respire: inspire na descida, expire na subida"
    ],
    
    contraindications: [
      "Lesões no manguito rotador",
      "Tendinite no ombro",
      "Problemas graves na cervical"
    ],
    
    recommendations: [
      {
        goal: "ganhar-massa",
        sets: "4-5 séries",
        reps: "6-10 repetições",
        rest: "2-3 minutos",
        notes: "Exercício fundamental para ombros volumosos."
      },
      {
        goal: "definicao",
        sets: "3-4 séries",
        reps: "10-15 repetições",
        rest: "60 segundos",
        notes: "Foque em contração e tempo sob tensão."
      },
      {
        goal: "perder-peso",
        sets: "3 séries",
        reps: "12-15 repetições",
        rest: "45-60 segundos",
        notes: "Mantenha massa muscular nos ombros."
      },
      {
        goal: "recomposicao",
        sets: "4 séries",
        reps: "8-12 repetições",
        rest: "90 segundos",
        notes: "Equilíbrio entre volume e intensidade."
      }
    ]
  },

  {
    id: "elevacao-lateral",
    name: "Elevação Lateral com Halteres",
    videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo",
    thumbnailUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
    duration: 35,
    muscleGroups: ["ombros"],
    intensity: "moderada",
    experienceLevel: ["iniciante", "intermediario", "avancado"],
    
    description: "Exercício de isolamento para deltóide médio, essencial para criar largura nos ombros.",
    targetMuscles: ["Deltóide médio", "Trapézio superior"],
    equipment: ["Halteres"],
    
    correctExecution: [
      "Fique em pé com halteres nas mãos, ao lado do corpo",
      "Cotovelos levemente flexionados (10-15°)",
      "Eleve os braços lateralmente até altura dos ombros",
      "Pause brevemente no topo",
      "Desça controladamente até posição inicial"
    ],
    
    idealPosture: [
      "Tronco estável, sem balanço",
      "Cotovelos levemente flexionados (não retos)",
      "Palmas voltadas para baixo no topo",
      "Ombros para baixo (não encolher)",
      "Core ativado"
    ],
    
    commonMistakes: [
      "Usar impulso/balanço do corpo",
      "Elevar acima da linha dos ombros (trapézio assume)",
      "Cotovelos completamente retos",
      "Usar carga excessiva",
      "Encolher os ombros (usar trapézio)",
      "Descer muito rápido (perder tensão)"
    ],
    
    variations: [
      {
        level: "iniciante",
        description: "Elevação lateral unilateral ou na polia",
        sets: "3 séries",
        reps: "12-15 repetições",
        rest: "60 segundos"
      },
      {
        level: "intermediario",
        description: "Elevação lateral bilateral com halteres",
        sets: "3-4 séries",
        reps: "12-15 repetições",
        rest: "45-60 segundos"
      },
      {
        level: "avancado",
        description: "Elevação lateral com pausa, drop sets ou 21s",
        sets: "4-5 séries",
        reps: "15-20 repetições",
        rest: "30-45 segundos"
      }
    ],
    
    safetyTips: [
      "Use cargas moderadas (foco na técnica)",
      "Não force se sentir dor no ombro",
      "Mantenha movimento controlado",
      "Aqueça os ombros antes",
      "Respire normalmente durante o exercício"
    ],
    
    contraindications: [
      "Lesões agudas no ombro",
      "Tendinite no manguito rotador",
      "Bursite no ombro"
    ],
    
    recommendations: [
      {
        goal: "ganhar-massa",
        sets: "4-5 séries",
        reps: "12-15 repetições",
        rest: "60 segundos",
        notes: "Essencial para largura dos ombros. Foque em tensão constante."
      },
      {
        goal: "definicao",
        sets: "3-4 séries",
        reps: "15-20 repetições",
        rest: "30-45 segundos",
        notes: "Use cargas moderadas com alto volume."
      },
      {
        goal: "perder-peso",
        sets: "3 séries",
        reps: "15-20 repetições",
        rest: "30 segundos",
        notes: "Ótimo para circuitos de ombros."
      },
      {
        goal: "recomposicao",
        sets: "4 séries",
        reps: "12-15 repetições",
        rest: "45 segundos",
        notes: "Mantenha consistência e progressão."
      }
    ]
  },

  // BÍCEPS
  {
    id: "rosca-direta",
    name: "Rosca Direta com Barra",
    videoUrl: "https://www.youtube.com/embed/kwG2ipFRgfo",
    thumbnailUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop",
    duration: 35,
    muscleGroups: ["biceps"],
    intensity: "moderada",
    experienceLevel: ["iniciante", "intermediario", "avancado"],
    
    description: "Exercício clássico de isolamento para bíceps, trabalhando ambas as cabeças do músculo.",
    targetMuscles: ["Bíceps braquial", "Braquial", "Braquiorradial"],
    equipment: ["Barra reta ou W", "Anilhas"],
    
    correctExecution: [
      "Fique em pé com barra nas mãos, pegada supinada",
      "Cotovelos fixos ao lado do corpo",
      "Flexione os cotovelos levando a barra até os ombros",
      "Pause brevemente no topo com contração",
      "Desça controladamente até extensão completa"
    ],
    
    idealPosture: [
      "Tronco estável, sem balanço",
      "Cotovelos fixos (não vão para frente ou trás)",
      "Ombros para baixo e para trás",
      "Olhar para frente",
      "Pés na largura dos ombros"
    ],
    
    commonMistakes: [
      "Usar impulso do corpo (balanço)",
      "Cotovelos indo para frente",
      "Amplitude incompleta (não estender totalmente)",
      "Usar carga excessiva",
      "Ombros elevados",
      "Descer muito rápido"
    ],
    
    variations: [
      {
        level: "iniciante",
        description: "Rosca com barra W ou halteres alternados",
        sets: "3 séries",
        reps: "10-12 repetições",
        rest: "60 segundos"
      },
      {
        level: "intermediario",
        description: "Rosca direta com barra reta",
        sets: "3-4 séries",
        reps: "8-12 repetições",
        rest: "60 segundos"
      },
      {
        level: "avancado",
        description: "Rosca 21s, com pausa ou drop sets",
        sets: "4-5 séries",
        reps: "10-15 repetições",
        rest: "45 segundos"
      }
    ],
    
    safetyTips: [
      "Use cargas que permitam boa forma",
      "Não force se sentir dor no cotovelo",
      "Barra W é mais confortável para os punhos",
      "Mantenha movimento controlado",
      "Respire: inspire na descida, expire na subida"
    ],
    
    contraindications: [
      "Tendinite no cotovelo",
      "Lesões no punho",
      "Epicondilite"
    ],
    
    recommendations: [
      {
        goal: "ganhar-massa",
        sets: "4 séries",
        reps: "8-12 repetições",
        rest: "60-90 segundos",
        notes: "Foque em progressão de carga e contração máxima."
      },
      {
        goal: "definicao",
        sets: "3-4 séries",
        reps: "12-15 repetições",
        rest: "45 segundos",
        notes: "Use tempo sob tensão e descanso reduzido."
      },
      {
        goal: "perder-peso",
        sets: "3 séries",
        reps: "12-15 repetições",
        rest: "30-45 segundos",
        notes: "Mantenha massa muscular nos braços."
      },
      {
        goal: "recomposicao",
        sets: "3-4 séries",
        reps: "10-12 repetições",
        rest: "60 segundos",
        notes: "Equilíbrio entre volume e intensidade."
      }
    ]
  },

  // TRÍCEPS
  {
    id: "triceps-testa",
    name: "Tríceps Testa (Skull Crusher)",
    videoUrl: "https://www.youtube.com/embed/d_KZxkY_0cM",
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    duration: 35,
    muscleGroups: ["triceps"],
    intensity: "moderada",
    experienceLevel: ["intermediario", "avancado"],
    
    description: "Exercício de isolamento para tríceps, especialmente efetivo para a cabeça longa do músculo.",
    targetMuscles: ["Tríceps braquial (todas as cabeças)"],
    equipment: ["Barra W ou reta", "Banco reto", "Anilhas"],
    
    correctExecution: [
      "Deite-se no banco com barra acima da cabeça",
      "Braços perpendiculares ao chão, cotovelos fixos",
      "Flexione apenas os cotovelos, descendo a barra até a testa",
      "Estenda os cotovelos até posição inicial",
      "Mantenha cotovelos fixos durante todo o movimento"
    ],
    
    idealPosture: [
      "Cotovelos fixos (não abrem para os lados)",
      "Braços perpendiculares ao chão",
      "Costas apoiadas no banco",
      "Pés firmes no chão",
      "Movimento apenas nos cotovelos"
    ],
    
    commonMistakes: [
      "Cotovelos abrindo para os lados",
      "Usar ombros no movimento",
      "Amplitude incompleta",
      "Usar carga excessiva",
      "Movimento muito rápido",
      "Cotovelos indo para frente ou trás"
    ],
    
    variations: [
      {
        level: "iniciante",
        description: "Tríceps testa com halteres ou na polia",
        sets: "3 séries",
        reps: "10-12 repetições",
        rest: "60 segundos"
      },
      {
        level: "intermediario",
        description: "Tríceps testa com barra W",
        sets: "3-4 séries",
        reps: "10-12 repetições",
        rest: "60 segundos"
      },
      {
        level: "avancado",
        description: "Tríceps testa com barra reta ou com pausa",
        sets: "4 séries",
        reps: "12-15 repetições",
        rest: "45 segundos"
      }
    ],
    
    safetyTips: [
      "Use cargas moderadas (foco na técnica)",
      "Não force se sentir dor no cotovelo",
      "Barra W é mais confortável",
      "Mantenha cotovelos fixos",
      "Respire: inspire na descida, expire na subida"
    ],
    
    contraindications: [
      "Tendinite no cotovelo",
      "Lesões no ombro",
      "Problemas no punho"
    ],
    
    recommendations: [
      {
        goal: "ganhar-massa",
        sets: "4 séries",
        reps: "10-12 repetições",
        rest: "60-90 segundos",
        notes: "Excelente para volume nos tríceps."
      },
      {
        goal: "definicao",
        sets: "3-4 séries",
        reps: "12-15 repetições",
        rest: "45 segundos",
        notes: "Foque em contração e tempo sob tensão."
      },
      {
        goal: "perder-peso",
        sets: "3 séries",
        reps: "12-15 repetições",
        rest: "30-45 segundos",
        notes: "Mantenha massa muscular nos braços."
      },
      {
        goal: "recomposicao",
        sets: "3-4 séries",
        reps: "10-12 repetições",
        rest: "60 segundos",
        notes: "Equilíbrio entre volume e intensidade."
      }
    ]
  },

  // ABDÔMEN
  {
    id: "abdominal-remador",
    name: "Abdominal Remador (Crunch)",
    videoUrl: "https://www.youtube.com/embed/Xyd_fa5zoEU",
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    duration: 30,
    muscleGroups: ["abdomen"],
    intensity: "baixa",
    experienceLevel: ["iniciante", "intermediario", "avancado"],
    
    description: "Exercício clássico para reto abdominal, seguro e efetivo quando executado corretamente.",
    targetMuscles: ["Reto abdominal"],
    equipment: ["Nenhum (peso corporal)"],
    
    correctExecution: [
      "Deite-se de costas com joelhos flexionados",
      "Mãos atrás da cabeça ou cruzadas no peito",
      "Contraia o abdômen elevando apenas os ombros do chão",
      "Pause no topo com contração máxima",
      "Desça controladamente até posição inicial"
    ],
    
    idealPosture: [
      "Lombar sempre em contato com o chão",
      "Queixo afastado do peito",
      "Movimento apenas na parte superior",
      "Olhar para o teto",
      "Pés firmes no chão"
    ],
    
    commonMistakes: [
      "Puxar o pescoço com as mãos",
      "Elevar muito (usar flexores do quadril)",
      "Movimento muito rápido",
      "Lombar saindo do chão",
      "Segurar a respiração",
      "Usar impulso"
    ],
    
    variations: [
      {
        level: "iniciante",
        description: "Crunch tradicional no solo",
        sets: "3 séries",
        reps: "15-20 repetições",
        rest: "45 segundos"
      },
      {
        level: "intermediario",
        description: "Crunch com pés elevados ou com peso",
        sets: "3-4 séries",
        reps: "20-25 repetições",
        rest: "30-45 segundos"
      },
      {
        level: "avancado",
        description: "Crunch com pausa, na polia ou com peso elevado",
        sets: "4 séries",
        reps: "25-30 repetições",
        rest: "30 segundos"
      }
    ],
    
    safetyTips: [
      "Nunca puxe o pescoço",
      "Mantenha lombar no chão",
      "Foque na contração, não na amplitude",
      "Respire: expire na subida, inspire na descida",
      "Movimento controlado sempre"
    ],
    
    contraindications: [
      "Lesões lombares graves",
      "Hérnia de disco",
      "Problemas cervicais"
    ],
    
    recommendations: [
      {
        goal: "ganhar-massa",
        sets: "3-4 séries",
        reps: "15-20 repetições",
        rest: "60 segundos",
        notes: "Adicione peso progressivamente."
      },
      {
        goal: "definicao",
        sets: "4 séries",
        reps: "20-30 repetições",
        rest: "30 segundos",
        notes: "Alto volume com descanso reduzido."
      },
      {
        goal: "perder-peso",
        sets: "3-4 séries",
        reps: "25-30 repetições",
        rest: "30 segundos",
        notes: "Combine com cardio para melhores resultados."
      },
      {
        goal: "recomposicao",
        sets: "3-4 séries",
        reps: "20-25 repetições",
        rest: "45 segundos",
        notes: "Consistência é chave para definição."
      }
    ]
  },

  {
    id: "prancha-abdominal",
    name: "Prancha Abdominal (Plank)",
    videoUrl: "https://www.youtube.com/embed/pSHjTRCQxIw",
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    duration: 60,
    muscleGroups: ["abdomen", "corpo-inteiro"],
    intensity: "moderada",
    experienceLevel: ["iniciante", "intermediario", "avancado"],
    
    description: "Exercício isométrico fundamental para core, trabalhando estabilidade e resistência do abdômen.",
    targetMuscles: ["Reto abdominal", "Transverso do abdômen", "Oblíquos", "Eretores da espinha"],
    equipment: ["Nenhum (peso corporal)"],
    
    correctExecution: [
      "Apoie antebraços e pontas dos pés no chão",
      "Corpo em linha reta da cabeça aos pés",
      "Cotovelos diretamente abaixo dos ombros",
      "Mantenha abdômen contraído",
      "Segure a posição pelo tempo determinado"
    ],
    
    idealPosture: [
      "Corpo completamente alinhado (sem curvas)",
      "Quadril na altura dos ombros",
      "Olhar para o chão",
      "Abdômen e glúteos contraídos",
      "Respiração constante"
    ],
    
    commonMistakes: [
      "Quadril caído (lordose)",
      "Quadril muito elevado",
      "Ombros elevados (tensão no pescoço)",
      "Segurar a respiração",
      "Cabeça projetada para frente ou para baixo",
      "Cotovelos muito à frente ou atrás"
    ],
    
    variations: [
      {
        level: "iniciante",
        description: "Prancha com joelhos apoiados ou na parede",
        sets: "3 séries",
        reps: "20-30 segundos",
        rest: "60 segundos"
      },
      {
        level: "intermediario",
        description: "Prancha tradicional",
        sets: "3-4 séries",
        reps: "45-60 segundos",
        rest: "45 segundos"
      },
      {
        level: "avancado",
        description: "Prancha com elevação de membros, lateral ou com peso",
        sets: "4 séries",
        reps: "60-90 segundos",
        rest: "30 segundos"
      }
    ],
    
    safetyTips: [
      "Mantenha sempre o alinhamento corporal",
      "Não force se sentir dor lombar",
      "Respire normalmente (não prenda)",
      "Progrida gradualmente no tempo",
      "Pare se perder a forma"
    ],
    
    contraindications: [
      "Lesões lombares agudas",
      "Problemas graves no ombro",
      "Lesões no punho"
    ],
    
    recommendations: [
      {
        goal: "ganhar-massa",
        sets: "3 séries",
        reps: "45-60 segundos",
        rest: "60 segundos",
        notes: "Core forte melhora todos os exercícios compostos."
      },
      {
        goal: "definicao",
        sets: "4 séries",
        reps: "60-90 segundos",
        rest: "30 segundos",
        notes: "Excelente para definição do core."
      },
      {
        goal: "perder-peso",
        sets: "3-4 séries",
        reps: "45-60 segundos",
        rest: "30 segundos",
        notes: "Combine com outros exercícios de core."
      },
      {
        goal: "recomposicao",
        sets: "3-4 séries",
        reps: "60 segundos",
        rest: "45 segundos",
        notes: "Fundamental para estabilidade e postura."
      }
    ]
  },

  // CARDIO
  {
    id: "burpee",
    name: "Burpee",
    videoUrl: "https://www.youtube.com/embed/TU8QYVW0gDU",
    thumbnailUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
    duration: 30,
    muscleGroups: ["corpo-inteiro", "cardio"],
    intensity: "muito-alta",
    experienceLevel: ["intermediario", "avancado"],
    
    description: "Exercício de corpo inteiro de alta intensidade que combina força e cardio, excelente para queima de calorias.",
    targetMuscles: ["Corpo inteiro", "Sistema cardiovascular"],
    equipment: ["Nenhum (peso corporal)"],
    
    correctExecution: [
      "Fique em pé, depois agache e apoie as mãos no chão",
      "Jogue os pés para trás (posição de flexão)",
      "Faça uma flexão de braço (opcional para iniciantes)",
      "Traga os pés de volta para perto das mãos",
      "Salte verticalmente com braços acima da cabeça"
    ],
    
    idealPosture: [
      "Corpo alinhado na posição de flexão",
      "Core ativado durante todo o movimento",
      "Aterrissagem suave do salto",
      "Movimento fluido e contínuo",
      "Respiração ritmada"
    ],
    
    commonMistakes: [
      "Quadril caído na posição de flexão",
      "Não fazer a flexão completa",
      "Aterrissagem pesada do salto",
      "Movimento muito lento (perder intensidade)",
      "Segurar a respiração",
      "Não estender completamente no salto"
    ],
    
    variations: [
      {
        level: "iniciante",
        description: "Burpee sem flexão e sem salto (step back)",
        sets: "3 séries",
        reps: "8-10 repetições",
        rest: "90 segundos"
      },
      {
        level: "intermediario",
        description: "Burpee tradicional completo",
        sets: "4 séries",
        reps: "12-15 repetições",
        rest: "60 segundos"
      },
      {
        level: "avancado",
        description: "Burpee com salto sobre caixa ou com peso",
        sets: "5 séries",
        reps: "15-20 repetições",
        rest: "45 segundos"
      }
    ],
    
    safetyTips: [
      "Aqueça bem antes de começar",
      "Aterrisse suavemente para proteger joelhos",
      "Mantenha core ativado",
      "Não force se sentir tontura",
      "Hidrate-se adequadamente"
    ],
    
    contraindications: [
      "Problemas graves no joelho",
      "Lesões no punho",
      "Problemas cardiovasculares não controlados",
      "Lesões lombares agudas"
    ],
    
    recommendations: [
      {
        goal: "ganhar-massa",
        sets: "3 séries",
        reps: "10-12 repetições",
        rest: "90 segundos",
        notes: "Use como finalizador ou aquecimento."
      },
      {
        goal: "definicao",
        sets: "4-5 séries",
        reps: "15-20 repetições",
        rest: "45 segundos",
        notes: "Excelente para queima de gordura e definição."
      },
      {
        goal: "perder-peso",
        sets: "5 séries",
        reps: "15-20 repetições",
        rest: "30-45 segundos",
        notes: "Um dos melhores exercícios para perda de peso."
      },
      {
        goal: "recomposicao",
        sets: "4 séries",
        reps: "12-15 repetições",
        rest: "60 segundos",
        notes: "Combine força e cardio eficientemente."
      }
    ]
  }
];

// Função auxiliar para buscar exercícios
export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(ex => ex.id === id);
}

export function getExercisesByMuscleGroup(muscleGroup: MuscleGroup): Exercise[] {
  return exercises.filter(ex => ex.muscleGroups.includes(muscleGroup));
}

export function getExercisesByLevel(level: ExperienceLevel): Exercise[] {
  return exercises.filter(ex => ex.experienceLevel.includes(level));
}

export function getExercisesByGoal(goal: WorkoutGoal): Exercise[] {
  return exercises.filter(ex => 
    ex.recommendations.some(rec => rec.goal === goal)
  );
}
