import { createClient, SupabaseClient } from "@supabase/supabase-js";

type SignUpInput = {
  email: string;
  password: string;
  full_name?: string;
  username?: string;
};

type SignInInput = {
  email: string;
  password: string;
};

type ProfileUpdate = {
  full_name?: string;
  username?: string;
  phone?: string;
};

type AddressInput = {
  label?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
};

// ---------------------------
// 1) Inicialização do client
// ---------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase env vars not found. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// ---------------------------
// 2) Helpers
// ---------------------------
async function requireUser() {
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr) throw userErr;
  const user = userData?.user;
  if (!user) throw new Error("Usuário não autenticado.");
  return user;
}

// Optional: check email confirmed (uncomment where needed)
// function isEmailConfirmed(user) {
//   return !!user?.email_confirmed_at;
// }

// ---------------------------
// 3) Auth: signup / signin / signout
// ---------------------------
export async function signUp(input: SignUpInput) {
  // Nota: se sua instância exige confirmação de email, data.session pode ser null até o usuário confirmar.
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
  });

  if (error) throw error;

  // Se houver sessão (ou user) imediata, podemos tentar upsert no profile.
  // Mas só faça upsert com sessão válida (data.session existindo) para evitar inconsistências.
  if (data?.user && data?.session) {
    try {
      await supabase
        .from("profiles")
        .upsert(
          {
            id: data.user.id,
            email: data.user.email ?? input.email,
            full_name: input.full_name ?? null,
            username: input.username ?? null,
          },
          { onConflict: "id" }
        );
    } catch (upsertErr) {
      // não interromper o signup por causa de um upsert — logamos o erro
      // frontend pode chamar updateMyProfile posteriormente
      // eslint-disable-next-line no-console
      console.error("Profile upsert after signUp failed:", upsertErr);
    }
  }

  return data; // contém user e possivelmente session (frontend deve checar)
}

export async function signIn(input: SignInInput) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  if (error) {
    // Retornar mensagem genérica para UX (frontend pode traduzir)
    throw new Error("E-mail ou senha inválidos.");
  }

  // data contains { user, session }
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}

// ---------------------------
// 4) Profile helpers
// ---------------------------
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user ?? null;
}

export async function getMyProfile() {
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr) {
    console.log(userErr);
    throw userErr;
  }
  console.log(userData);
  const user = userData?.user;
  if (!user) return null;

  // opcional: bloquear se email não confirmado
  // if (!isEmailConfirmed(user)) throw new Error('Confirme seu e-mail antes de usar o app.');

  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  if (error) throw error;
  return data;
}

export async function upsertMyProfile(updates: ProfileUpdate) {
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr) throw userErr;
  const user = userData?.user;
  if (!user) throw new Error("Usuário não autenticado.");

  const payload = { id: user.id, ...updates };

  const { data, error } = await supabase
    .from("profiles")
    .upsert(payload, { onConflict: "id" })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ---------------------------
// 5) Addresses (CRUD)
// ---------------------------
export async function getMyAddresses() {
  const user = await requireUser();
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createAddress(address: AddressInput) {
  const user = await requireUser();

  const payload = {
    profile_id: user.id,
    ...address,
  };

  const { data, error } = await supabase.from("addresses").insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateAddress(addressId: string, updates: AddressInput) {
  const user = await requireUser();
  const { data, error } = await supabase
    .from("addresses")
    .update(updates)
    .eq("id", addressId)
    .eq("profile_id", user.id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteAddress(addressId: string) {
  const user = await requireUser();
  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId)
    .eq("profile_id", user.id);
  if (error) throw error;
  return true;
}
