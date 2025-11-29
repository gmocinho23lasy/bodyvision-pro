/**
 * Script de Teste Automático - Integração Supabase
 * Testa: SignUp → SignIn → Profile → Address CRUD
 */

import { signUp, signIn, getMyProfile, createAddress, getAddresses } from '../src/lib/supabase-auth';

async function runIntegrationTest() {
  console.log('🧪 INICIANDO TESTE DE INTEGRAÇÃO SUPABASE\n');
  
  const email = `lazyatest_${Date.now()}@gmail.com`;
  const password = "Test1234!";
  const testResults: any = {
    timestamp: new Date().toISOString(),
    email,
    steps: {},
    errors: []
  };

  try {
    // PASSO 1: SignUp
    console.log('📝 1. Testando SignUp...');
    const signupResult = await signUp({ 
      email, 
      password,
      full_name: "Test User",
      username: `testuser_${Date.now()}`
    });
    testResults.steps.signup = {
      success: true,
      userId: signupResult?.id,
      data: signupResult
    };
    console.log('✅ SignUp bem-sucedido:', signupResult?.id);

    // PASSO 2: SignIn
    console.log('\n🔐 2. Testando SignIn...');
    const signinResult = await signIn({ email, password });
    testResults.steps.signin = {
      success: true,
      userId: signinResult?.id,
      data: signinResult
    };
    console.log('✅ SignIn bem-sucedido:', signinResult?.id);

    // PASSO 3: Get Profile
    console.log('\n👤 3. Testando getMyProfile...');
    const profile = await getMyProfile();
    testResults.steps.profile = {
      success: true,
      profileId: profile?.id,
      data: profile
    };
    console.log('✅ Profile recuperado:', profile?.id);

    if (!profile?.id) {
      throw new Error('Profile não encontrado após signup');
    }

    // PASSO 4: Create Address
    console.log('\n🏠 4. Testando createAddress...');
    const address = await createAddress({
      profile_id: profile.id,
      label: "Casa",
      street: "Rua A",
      number: "123",
      city: "São Paulo",
      state: "SP",
      zipcode: "01234-567"
    });
    testResults.steps.createAddress = {
      success: true,
      addressId: address?.id,
      data: address
    };
    console.log('✅ Endereço criado:', address?.id);

    // PASSO 5: Get Addresses
    console.log('\n📋 5. Testando getAddresses...');
    const addresses = await getAddresses(profile.id);
    testResults.steps.getAddresses = {
      success: true,
      count: addresses?.length || 0,
      data: addresses
    };
    console.log('✅ Endereços recuperados:', addresses?.length);

    // RESULTADO FINAL
    testResults.success = true;
    testResults.summary = {
      totalSteps: 5,
      successfulSteps: 5,
      failedSteps: 0
    };

    console.log('\n✅ ===== TESTE COMPLETO - SUCESSO =====');
    console.log(JSON.stringify(testResults, null, 2));
    
    return testResults;

  } catch (error: any) {
    console.error('\n❌ ERRO NO TESTE:', error.message);
    testResults.success = false;
    testResults.errors.push({
      message: error.message,
      stack: error.stack
    });
    console.log('\n❌ ===== TESTE COMPLETO - FALHA =====');
    console.log(JSON.stringify(testResults, null, 2));
    
    return testResults;
  }
}

// Executar teste
runIntegrationTest()
  .then((results) => {
    process.exit(results.success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Erro fatal:', error);
    process.exit(1);
  });
