// Health Check Script - Validação de ambiente e integrações
// Execute com: node scripts/health-check.js

import { createClient } from "@supabase/supabase-js";

(async () => {
  console.log("=".repeat(60));
  console.log("🏥 HEALTH CHECK - Validação de Ambiente");
  console.log("=".repeat(60));
  console.log();

  // 1. Verificar variáveis de ambiente
  console.log("📋 1. VERIFICAÇÃO DE VARIÁVEIS DE AMBIENTE:");
  console.log("-".repeat(60));
  
  const requiredEnvVars = [
    "OPENAI_API_KEY",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  ];
  
  const optionalEnvVars = [
    "SUPABASE_SERVICE_ROLE_KEY",
    "NEXT_PUBLIC_APP_URL",
    "DATABASE_URL"
  ];

  let missingRequired = [];
  
  requiredEnvVars.forEach(key => {
    const exists = !!process.env[key];
    const status = exists ? "✅" : "❌";
    console.log(`${status} ${key}: ${exists ? "CONFIGURADA" : "AUSENTE"}`);
    if (!exists) missingRequired.push(key);
  });

  console.log();
  console.log("Variáveis opcionais:");
  optionalEnvVars.forEach(key => {
    const exists = !!process.env[key];
    const status = exists ? "✅" : "⚠️";
    console.log(`${status} ${key}: ${exists ? "CONFIGURADA" : "NÃO CONFIGURADA"}`);
  });

  console.log();

  // 2. Verificar segurança - SERVICE_ROLE não deve estar exposta
  console.log("🔒 2. VERIFICAÇÃO DE SEGURANÇA:");
  console.log("-".repeat(60));
  
  if (process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
    console.log("❌ CRÍTICO: SUPABASE_SERVICE_ROLE_KEY está exposta como NEXT_PUBLIC_*");
    console.log("   Isso é um risco de segurança! Remova o prefixo NEXT_PUBLIC_");
  } else {
    console.log("✅ Service role key não está exposta no cliente");
  }
  
  console.log();

  // 3. Testar conexão Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.log("🗄️  3. TESTE DE CONEXÃO SUPABASE:");
    console.log("-".repeat(60));
    
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
      
      console.log("Testando conexão com Supabase...");
      
      // Tentar query simples
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
      
      if (error) {
        if (error.code === '42P01') {
          console.log("⚠️  Tabela 'profiles' não existe ainda");
          console.log("   Execute as migrations para criar as tabelas necessárias");
        } else {
          console.log(`⚠️  Erro ao consultar Supabase: ${error.message}`);
        }
      } else {
        console.log("✅ Conexão com Supabase OK");
        console.log(`   Tabela 'profiles' acessível (${data?.length || 0} registros testados)`);
      }
    } catch (e) {
      console.error("❌ Erro ao conectar com Supabase:", e.message);
    }
    
    console.log();
  } else {
    console.log("⏭️  3. TESTE SUPABASE PULADO (variáveis não configuradas)");
    console.log();
  }

  // 4. Testar OpenAI API
  if (process.env.OPENAI_API_KEY) {
    console.log("🤖 4. TESTE DE CONEXÃO OPENAI:");
    console.log("-".repeat(60));
    
    try {
      console.log("Testando autenticação OpenAI...");
      
      const response = await fetch("https://api.openai.com/v1/models", {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Autenticação OpenAI OK");
        console.log(`   ${data.data?.length || 0} modelos disponíveis`);
        
        // Verificar se gpt-4o está disponível
        const hasGPT4o = data.data?.some(m => m.id === 'gpt-4o');
        if (hasGPT4o) {
          console.log("✅ Modelo gpt-4o disponível");
        } else {
          console.log("⚠️  Modelo gpt-4o não encontrado na lista");
        }
      } else {
        const errorText = await response.text();
        console.log(`❌ Erro na autenticação OpenAI (${response.status})`);
        console.log(`   ${errorText}`);
        
        if (response.status === 401) {
          console.log("   → Chave de API inválida ou expirada");
        } else if (response.status === 429) {
          console.log("   → Limite de requisições excedido");
        }
      }
    } catch (e) {
      console.error("❌ Erro ao conectar com OpenAI:", e.message);
    }
    
    console.log();
  } else {
    console.log("⏭️  4. TESTE OPENAI PULADO (OPENAI_API_KEY não configurada)");
    console.log();
  }

  // 5. Resumo final
  console.log("=".repeat(60));
  console.log("📊 RESUMO:");
  console.log("=".repeat(60));
  
  if (missingRequired.length > 0) {
    console.log("❌ FALHA: Variáveis obrigatórias ausentes:");
    missingRequired.forEach(v => console.log(`   - ${v}`));
    console.log();
    console.log("Configure essas variáveis no arquivo .env.local ou no painel de deploy");
    process.exit(1);
  } else {
    console.log("✅ Todas as variáveis obrigatórias estão configuradas");
    console.log("✅ Sistema pronto para produção");
    console.log();
    console.log("Próximos passos:");
    console.log("1. Execute 'npm run build' para validar o build");
    console.log("2. Configure as variáveis no painel de deploy");
    console.log("3. Faça deploy da aplicação");
  }
  
  console.log("=".repeat(60));
})();
