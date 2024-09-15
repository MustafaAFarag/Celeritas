import supabase from './supabase.ts';

export type User = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  avatar: string;
};

async function createUserInDatabase(
  userId: string,
  fullName: string,
  email: string,
) {
  const { data, error } = await supabase.from('users').insert([
    {
      id: userId,
      full_name: fullName,
      email: email,
      role: 'basic',
      avatar: '',
    },
  ]);

  if (error) throw new Error(error.message);

  return data;
}

export async function signup({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  if (!data.user?.id) {
    throw new Error('User ID not found after signup.');
  }

  await createUserInDatabase(data.user.id, fullName, email);

  return data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error instanceof Error) {
    throw new Error(`Login error: ${error.message}`);
  }

  return data;
}

export async function getCurrentUser() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    throw new Error('Could not fetch session');
  }

  const userId = session.user.id;

  const { data: userDetails, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error instanceof Error) {
    throw new Error(`Login error: ${error.message}`);
  }

  return userDetails;
}
