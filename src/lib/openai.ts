// OpenAI Client para análises de IA com retry logic e tratamento robusto de erros

// Usar OPENAI_API_KEY para server-side (recomendado)
// Usar NEXT_PUBLIC_OPENAI_API_KEY apenas se necessário no cliente
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Função auxiliar para retry com backoff exponencial
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries: number = 2
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      // Se erro 5xx e ainda tem tentativas, retry
      if (response.status >= 500 && attempt < maxRetries) {
        const waitTime = 1000 * (attempt + 1); // 1s, 2s, 3s...
        console.log(`⚠️ Erro ${response.status}, tentando novamente em ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      
      return response;
    } catch (error) {
      // Se erro de rede e ainda tem tentativas, retry
      if (attempt < maxRetries) {
        const waitTime = 1000 * (attempt + 1);
        console.log(`⚠️ Erro de rede, tentando novamente em ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      throw error;
    }
  }
  
  throw new Error('Máximo de tentativas excedido');
}

/**
 * Analisa imagem corporal usando OpenAI Vision API
 * Retorna estimativas de peso, gordura corporal e medidas
 */
export async function analyzeBodyImage(imageBase64: string): Promise<{
  estimatedWeight: number;
  estimatedBodyFat: number;
  measurements: {
    chest: number;
    waist: number;
    hips: number;
    arms: number;
    legs: number;
  };
  analysis: string;
}> {
  try {
    // Validação de API key
    if (!OPENAI_API_KEY || OPENAI_API_KEY.trim() === '') {
      throw new Error('Configure a variável OPENAI_API_KEY (ou NEXT_PUBLIC_OPENAI_API_KEY) no arquivo .env.local para usar a análise por IA');
    }

    // Validar formato da imagem
    if (!imageBase64 || typeof imageBase64 !== 'string') {
      throw new Error('Imagem inválida. Por favor, selecione uma foto válida.');
    }

    console.log('🤖 Iniciando análise corporal com OpenAI...');

    const response = await fetchWithRetry(
      OPENAI_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Analise esta imagem corporal e forneça uma estimativa REALISTA dos seguintes dados em formato JSON puro (sem markdown, sem \`\`\`json):

{
  "estimatedWeight": número em kg (baseado na estrutura corporal visível - seja realista, pode variar de 50 a 120kg),
  "estimatedBodyFat": percentual de gordura corporal (número entre 8-35, seja preciso),
  "measurements": {
    "chest": circunferência do peitoral em cm (80-120),
    "waist": circunferência da cintura em cm (60-110),
    "hips": circunferência do quadril em cm (80-120),
    "arms": circunferência dos braços em cm (25-45),
    "legs": circunferência das coxas em cm (40-70)
  },
  "analysis": "análise detalhada em português sobre a composição corporal, postura e recomendações (2-3 frases)"
}

REGRAS CRÍTICAS:
- Forneça valores REAIS baseados na imagem
- NÃO use valores padrão ou mockados
- Seja preciso na estimativa do peso baseado na estrutura visível
- Retorne APENAS o JSON, sem texto adicional
- Todos os valores devem ser números válidos`
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
                  }
                }
              ]
            }
          ],
          max_tokens: 1000,
          temperature: 0.3 // Menor temperatura para respostas mais consistentes
        })
      },
      2 // máximo 2 retries
    );

    // Tratamento de erros HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || response.statusText;
      
      if (response.status === 401) {
        throw new Error('Chave da API OpenAI inválida. Verifique OPENAI_API_KEY no .env.local');
      }
      
      if (response.status === 429) {
        throw new Error('Limite de requisições excedido. Aguarde alguns minutos e tente novamente.');
      }
      
      if (response.status === 400) {
        throw new Error('Requisição inválida. Verifique o formato da imagem.');
      }
      
      throw new Error(`Erro na API OpenAI (${response.status}): ${errorMessage}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('Resposta vazia da API. Tente novamente.');
    }

    console.log('📝 Resposta recebida da OpenAI');

    // Limpar markdown se presente
    let cleanContent = content.trim();
    cleanContent = cleanContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    // Extrair JSON da resposta
    const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('❌ Conteúdo recebido:', content);
      throw new Error('Formato de resposta inválido da API. Tente outra imagem.');
    }

    const result = JSON.parse(jsonMatch[0]);
    
    // Validações robustas com mensagens específicas
    if (!result.estimatedWeight || typeof result.estimatedWeight !== 'number') {
      throw new Error('Peso estimado não foi retornado corretamente. Tente outra foto com melhor qualidade.');
    }

    if (result.estimatedWeight <= 0 || result.estimatedWeight > 300) {
      throw new Error(`Peso estimado fora do esperado (${result.estimatedWeight}kg). Tente uma foto mais clara do corpo completo.`);
    }

    if (!result.estimatedBodyFat || typeof result.estimatedBodyFat !== 'number') {
      throw new Error('Percentual de gordura não foi retornado. Tente outra foto.');
    }

    if (result.estimatedBodyFat <= 0 || result.estimatedBodyFat > 50) {
      throw new Error(`Percentual de gordura fora do esperado (${result.estimatedBodyFat}%). Tente uma foto mais clara.`);
    }

    if (!result.measurements || typeof result.measurements !== 'object') {
      throw new Error('Medidas corporais não foram retornadas. Tente uma foto de corpo completo.');
    }

    // Validar cada medida
    const requiredMeasurements = ['chest', 'waist', 'hips', 'arms', 'legs'];
    for (const measure of requiredMeasurements) {
      if (!result.measurements[measure] || typeof result.measurements[measure] !== 'number') {
        throw new Error(`Medida de ${measure} inválida. Tente uma foto mais clara do corpo completo.`);
      }
    }

    if (!result.analysis || typeof result.analysis !== 'string' || result.analysis.length < 20) {
      throw new Error('Análise incompleta. Tente novamente.');
    }

    console.log('✅ Análise bem-sucedida:', {
      weight: result.estimatedWeight,
      bodyFat: result.estimatedBodyFat
    });

    return result;
  } catch (error: any) {
    console.error('❌ Erro na análise corporal:', error);
    
    // Mensagens de erro mais específicas e úteis
    if (error.message.includes('OPENAI_API_KEY') || error.message.includes('Configure')) {
      throw error;
    }
    
    if (error.message.includes('API key') || error.message.includes('401')) {
      throw new Error('Chave da API OpenAI inválida. Configure OPENAI_API_KEY no .env.local');
    }

    if (error.message.includes('429') || error.message.includes('limite')) {
      throw new Error('Limite de requisições excedido. Aguarde alguns minutos e tente novamente.');
    }

    if (error.message.includes('network') || error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
      throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
    }
    
    // Se já é uma mensagem customizada, manter
    if (error.message.includes('Peso estimado') || 
        error.message.includes('gordura') || 
        error.message.includes('Medida') ||
        error.message.includes('foto')) {
      throw error;
    }
    
    throw new Error(error.message || 'Falha ao analisar imagem. Tente uma foto mais clara do corpo completo.');
  }
}

/**
 * Analisa imagem de refeição usando OpenAI Vision API
 * Retorna alimentos identificados, calorias e macros
 */
export async function analyzeMealImage(imageUrl: string): Promise<{
  foods: string[];
  totalCalories: number;
  macros: { protein: number; carbs: number; fat: number };
  analysis: string;
}> {
  // TODO: Implementar análise real com OpenAI Vision
  // Por enquanto, retorna dados simulados
  console.log('⚠️ analyzeMealImage ainda não implementado - retornando dados simulados');
  
  return {
    foods: ["Arroz integral", "Frango grelhado", "Brócolis", "Salada"],
    totalCalories: 520,
    macros: {
      protein: 45,
      carbs: 55,
      fat: 12
    },
    analysis: "Refeição balanceada com boa quantidade de proteína e vegetais. Ideal para objetivo de emagrecimento."
  };
}

/**
 * Gera plano personalizado de dieta e treino usando GPT-4
 */
export async function generatePersonalizedPlan(
  currentBody: any,
  goalBody: any,
  preferences: any
): Promise<any> {
  // TODO: Implementar geração real com GPT-4
  // Por enquanto, retorna plano simulado
  console.log('⚠️ generatePersonalizedPlan ainda não implementado - retornando dados simulados');
  
  const weightDiff = Math.abs(goalBody.targetWeight - currentBody.estimatedWeight);
  const estimatedWeeks = Math.ceil(weightDiff / 0.5); // 0.5kg por semana é saudável
  
  return {
    diet: {
      dailyCalories: 1800,
      meals: [
        {
          name: "Café da Manhã",
          time: "07:00",
          foods: ["2 ovos mexidos", "1 fatia de pão integral", "1 banana", "Café sem açúcar"],
          calories: 350
        },
        {
          name: "Lanche da Manhã",
          time: "10:00",
          foods: ["1 iogurte grego", "1 colher de granola"],
          calories: 150
        },
        {
          name: "Almoço",
          time: "12:30",
          foods: ["150g de frango grelhado", "4 colheres de arroz integral", "Brócolis e cenoura", "Salada verde"],
          calories: 520
        },
        {
          name: "Lanche da Tarde",
          time: "16:00",
          foods: ["1 maçã", "10 amêndoas"],
          calories: 180
        },
        {
          name: "Jantar",
          time: "19:30",
          foods: ["150g de peixe grelhado", "Legumes assados", "Salada"],
          calories: 400
        },
        {
          name: "Ceia",
          time: "21:30",
          foods: ["1 copo de leite desnatado"],
          calories: 100
        }
      ],
      macroSplit: {
        protein: 35,
        carbs: 40,
        fat: 25
      }
    },
    workout: {
      frequency: 5,
      exercises: [
        {
          name: "Agachamento",
          sets: 4,
          reps: "12-15",
          duration: "3 min"
        },
        {
          name: "Supino",
          sets: 4,
          reps: "10-12",
          duration: "3 min"
        },
        {
          name: "Remada",
          sets: 4,
          reps: "12-15",
          duration: "3 min"
        },
        {
          name: "Desenvolvimento",
          sets: 3,
          reps: "10-12",
          duration: "2.5 min"
        },
        {
          name: "Rosca Direta",
          sets: 3,
          reps: "12-15",
          duration: "2 min"
        },
        {
          name: "Tríceps Testa",
          sets: 3,
          reps: "12-15",
          duration: "2 min"
        },
        {
          name: "Prancha",
          sets: 3,
          reps: "30-60s",
          duration: "2 min"
        }
      ]
    },
    timeline: {
      estimatedWeeks,
      weeklyGoals: Array.from({ length: Math.min(estimatedWeeks, 12) }, (_, i) => ({
        week: i + 1,
        targetWeight: currentBody.estimatedWeight - (i + 1) * 0.5,
        targetCalories: 1800,
        workoutDays: 5
      }))
    },
    warnings: weightDiff > 20 ? [
      "Meta ambiciosa detectada. Recomendamos dividir em etapas menores.",
      "Consulte um profissional de saúde antes de iniciar."
    ] : []
  };
}
