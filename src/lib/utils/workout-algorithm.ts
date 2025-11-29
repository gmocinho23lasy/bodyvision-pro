import { Exercise, WorkoutGoal, ExperienceLevel } from "../types/workout";
import { exercises } from "../data/exercises";

// Interface para dados do usuário (vindo do perfil)
interface UserProfile {
  peso: number;
  objetivo: WorkoutGoal;
  experienciaTreino: ExperienceLevel;
  historicoLesoes?: string;
  problemasArticulares?: string;
}

// Interface para progresso do usuário
interface UserProgress {
  weeklyProgress: {
    semana: number;
    peso: number;
  }[];
}

// Algoritmo de recomendação de exercícios
export function recommendExercises(
  userProfile: UserProfile,
  userProgress?: UserProgress
): Exercise[] {
  let recommendedExercises = [...exercises];

  // 1. Filtrar por nível de experiência
  recommendedExercises = recommendedExercises.filter(exercise =>
    exercise.experienceLevel.includes(userProfile.experienciaTreino)
  );

  // 2. Priorizar exercícios baseados no objetivo
  recommendedExercises = recommendedExercises.sort((a, b) => {
    const aHasGoal = a.recommendations.some(rec => rec.goal === userProfile.objetivo);
    const bHasGoal = b.recommendations.some(rec => rec.goal === userProfile.objetivo);
    
    if (aHasGoal && !bHasGoal) return -1;
    if (!aHasGoal && bHasGoal) return 1;
    return 0;
  });

  // 3. Ajustar baseado em lesões/problemas articulares
  if (userProfile.problemasArticulares || userProfile.historicoLesoes) {
    const problemasLower = (userProfile.problemasArticulares + " " + userProfile.historicoLesoes).toLowerCase();
    
    // Filtrar exercícios que podem ser problemáticos
    recommendedExercises = recommendedExercises.filter(exercise => {
      // Se tem problema no joelho, evitar agachamento pesado e levantamento terra
      if (problemasLower.includes("joelho") && 
          (exercise.id === "agachamento-livre" || exercise.id === "levantamento-terra")) {
        return false;
      }
      
      // Se tem problema no ombro, evitar desenvolvimento e barra fixa
      if (problemasLower.includes("ombro") && 
          (exercise.id === "desenvolvimento-ombros" || exercise.id === "barra-fixa")) {
        return false;
      }
      
      // Se tem problema lombar, evitar levantamento terra e remada curvada
      if ((problemasLower.includes("lombar") || problemasLower.includes("coluna")) && 
          (exercise.id === "levantamento-terra" || exercise.id === "remada-curvada")) {
        return false;
      }
      
      return true;
    });
  }

  // 4. Analisar progresso e ajustar intensidade
  if (userProgress && userProgress.weeklyProgress.length >= 3) {
    const recentWeeks = userProgress.weeklyProgress.slice(-3);
    const weightChange = recentWeeks[recentWeeks.length - 1].peso - recentWeeks[0].peso;
    
    // Se está estagnado (menos de 0.5kg de mudança em 3 semanas)
    if (Math.abs(weightChange) < 0.5) {
      // Para perda de peso: adicionar mais cardio e alta intensidade
      if (userProfile.objetivo === "perder-peso") {
        recommendedExercises = recommendedExercises.sort((a, b) => {
          const aIsCardio = a.muscleGroups.includes("cardio") || a.intensity === "muito-alta";
          const bIsCardio = b.muscleGroups.includes("cardio") || b.intensity === "muito-alta";
          
          if (aIsCardio && !bIsCardio) return -1;
          if (!aIsCardio && bIsCardio) return 1;
          return 0;
        });
      }
      
      // Para ganho de massa: priorizar compostos pesados
      if (userProfile.objetivo === "ganhar-massa") {
        recommendedExercises = recommendedExercises.sort((a, b) => {
          const aIsCompound = ["agachamento-livre", "levantamento-terra", "supino-reto", "barra-fixa"].includes(a.id);
          const bIsCompound = ["agachamento-livre", "levantamento-terra", "supino-reto", "barra-fixa"].includes(b.id);
          
          if (aIsCompound && !bIsCompound) return -1;
          if (!aIsCompound && bIsCompound) return 1;
          return 0;
        });
      }
    }
    
    // Se está progredindo bem (mais de 1kg de mudança)
    if (Math.abs(weightChange) > 1) {
      // Manter o que está funcionando, mas adicionar variedade
      // Não fazer mudanças drásticas
    }
  }

  return recommendedExercises;
}

// Gerar treino personalizado baseado no perfil
export function generateWorkoutPlan(
  userProfile: UserProfile,
  userProgress?: UserProgress
): {
  name: string;
  description: string;
  exercises: Exercise[];
  frequency: string;
  duration: string;
} {
  const recommended = recommendExercises(userProfile, userProgress);
  
  let workoutPlan = {
    name: "",
    description: "",
    exercises: [] as Exercise[],
    frequency: "",
    duration: ""
  };

  // Configurar baseado no objetivo
  switch (userProfile.objetivo) {
    case "perder-peso":
      workoutPlan.name = "Treino para Emagrecimento";
      workoutPlan.description = "Foco em alta intensidade e queima calórica máxima";
      workoutPlan.frequency = "5-6x por semana";
      workoutPlan.duration = "45-60 minutos";
      
      // Selecionar exercícios: mix de compostos + cardio
      workoutPlan.exercises = [
        ...recommended.filter(ex => ex.muscleGroups.includes("cardio")).slice(0, 2),
        ...recommended.filter(ex => ex.muscleGroups.includes("pernas")).slice(0, 2),
        ...recommended.filter(ex => ex.muscleGroups.includes("peito")).slice(0, 1),
        ...recommended.filter(ex => ex.muscleGroups.includes("costas")).slice(0, 1),
        ...recommended.filter(ex => ex.muscleGroups.includes("abdomen")).slice(0, 2)
      ];
      break;

    case "ganhar-massa":
      workoutPlan.name = "Treino para Hipertrofia";
      workoutPlan.description = "Foco em exercícios compostos e volume progressivo";
      workoutPlan.frequency = "4-5x por semana";
      workoutPlan.duration = "60-90 minutos";
      
      // Selecionar exercícios compostos pesados
      workoutPlan.exercises = [
        ...recommended.filter(ex => ["agachamento-livre", "levantamento-terra"].includes(ex.id)),
        ...recommended.filter(ex => ["supino-reto", "barra-fixa"].includes(ex.id)),
        ...recommended.filter(ex => ex.muscleGroups.includes("ombros")).slice(0, 1),
        ...recommended.filter(ex => ex.muscleGroups.includes("biceps")).slice(0, 1),
        ...recommended.filter(ex => ex.muscleGroups.includes("triceps")).slice(0, 1)
      ];
      break;

    case "definicao":
      workoutPlan.name = "Treino para Definição Muscular";
      workoutPlan.description = "Equilíbrio entre volume e intensidade para definição";
      workoutPlan.frequency = "5x por semana";
      workoutPlan.duration = "50-70 minutos";
      
      // Mix balanceado
      workoutPlan.exercises = [
        ...recommended.filter(ex => ex.muscleGroups.includes("peito")).slice(0, 2),
        ...recommended.filter(ex => ex.muscleGroups.includes("costas")).slice(0, 2),
        ...recommended.filter(ex => ex.muscleGroups.includes("pernas")).slice(0, 2),
        ...recommended.filter(ex => ex.muscleGroups.includes("abdomen")).slice(0, 2),
        ...recommended.filter(ex => ex.muscleGroups.includes("cardio")).slice(0, 1)
      ];
      break;

    case "recomposicao":
      workoutPlan.name = "Treino para Recomposição Corporal";
      workoutPlan.description = "Ganhar massa e perder gordura simultaneamente";
      workoutPlan.frequency = "4-5x por semana";
      workoutPlan.duration = "60-75 minutos";
      
      // Compostos + cardio moderado
      workoutPlan.exercises = [
        ...recommended.filter(ex => ["agachamento-livre", "supino-reto", "barra-fixa"].includes(ex.id)),
        ...recommended.filter(ex => ex.muscleGroups.includes("ombros")).slice(0, 1),
        ...recommended.filter(ex => ex.muscleGroups.includes("abdomen")).slice(0, 2),
        ...recommended.filter(ex => ex.muscleGroups.includes("cardio")).slice(0, 1)
      ];
      break;
  }

  // Remover duplicatas
  workoutPlan.exercises = Array.from(new Set(workoutPlan.exercises));

  return workoutPlan;
}

// Verificar se usuário precisa mudar treino (estagnação)
export function shouldUpdateWorkout(userProgress: UserProgress): {
  shouldUpdate: boolean;
  reason: string;
} {
  if (userProgress.weeklyProgress.length < 4) {
    return {
      shouldUpdate: false,
      reason: "Dados insuficientes para análise"
    };
  }

  const last4Weeks = userProgress.weeklyProgress.slice(-4);
  const weightChange = last4Weeks[last4Weeks.length - 1].peso - last4Weeks[0].peso;

  // Estagnação: menos de 0.3kg de mudança em 4 semanas
  if (Math.abs(weightChange) < 0.3) {
    return {
      shouldUpdate: true,
      reason: "Estagnação detectada. Seu corpo se adaptou ao treino atual. Vamos intensificar!"
    };
  }

  // Progresso muito rápido (pode ser insustentável)
  if (Math.abs(weightChange) > 3) {
    return {
      shouldUpdate: true,
      reason: "Progresso muito rápido. Vamos ajustar para garantir sustentabilidade."
    };
  }

  return {
    shouldUpdate: false,
    reason: "Progresso consistente. Continue com o treino atual!"
  };
}

// Selecionar exercício do dia (aleatório mas inteligente)
export function getDailyExercise(
  userProfile: UserProfile,
  previousDailyExercises: string[] = []
): Exercise {
  const recommended = recommendExercises(userProfile);
  
  // Filtrar exercícios que não foram mostrados recentemente
  const available = recommended.filter(ex => 
    !previousDailyExercises.slice(-7).includes(ex.id)
  );

  // Se todos foram mostrados, resetar
  const pool = available.length > 0 ? available : recommended;

  // Selecionar aleatoriamente
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}
