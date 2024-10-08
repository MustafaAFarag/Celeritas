export type User = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  avatar: string;
  password: string;
};

const STATIC_USER = {
  email: 'mustafa.ashraf.saad@gmail.com',
  password: 'mypassword',
};

const USERS_KEY = 'mock_users';
const CURRENT_USER_KEY = 'mock_current_user';

function getUsers(): User[] {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function signup({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}): Promise<{ user: User }> {
  const users = getUsers();
  if (users.some((user) => user.email === email)) {
    throw new Error('User with this email already exists');
  }

  const newUser: User = {
    id: Date.now().toString(),
    full_name: fullName,
    email,
    role: 'basic',
    avatar: '',
    password,
  };

  // Store the password securely (for demonstration only)
  newUser['password'] = password; // Consider hashing in a real app

  users.push(newUser);
  saveUsers(users);

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

  return { user: newUser };
}

// src/services/apiAuth.ts

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ user: User }> {
  const users = getUsers();
  const user = users.find((u) => u.email === email);

  // Check against the static user
  if (email === STATIC_USER.email && password === STATIC_USER.password) {
    const staticUser: User = {
      id: '1', // Static user ID
      full_name: 'Mustafa Ashraf',
      email: STATIC_USER.email,
      role: 'admin',
      avatar: '',
      password,
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(staticUser));

    return { user: staticUser }; // Return the static user
  }

  // If user found in local storage, validate password
  if (user) {
    if (user.password !== password) {
      throw new Error('Incorrect password');
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return { user }; // Return the found user
  }

  // If no user found
  throw new Error('User not found');
}

export async function getCurrentUser(): Promise<User | null> {
  const currentUser = localStorage.getItem(CURRENT_USER_KEY);
  return currentUser ? JSON.parse(currentUser) : null;
}

export async function logout(): Promise<void> {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export async function updateUserProfile({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}): Promise<{ user: User }> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('No user logged in');
  }

  const users = getUsers();
  const updatedUsers = users.map((user) =>
    user.id === currentUser.id ? { ...user, full_name: fullName, email } : user,
  );

  saveUsers(updatedUsers);

  // Update the current user
  const updatedUser = { ...currentUser, full_name: fullName, email };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

  return { user: updatedUser };
}

export async function updatePassword({
  password,
}: {
  password: string;
}): Promise<{ user: User }> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('No user logged in');
  }

  const users = getUsers();
  const updatedUsers = users.map((user) =>
    user.id === currentUser.id ? { ...user, password } : user,
  );

  saveUsers(updatedUsers);

  // Update the current user
  const updatedUser = { ...currentUser, password };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

  return { user: updatedUser };
}

export async function deleteAccount(): Promise<void> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('No user logged in');
  }

  const users = getUsers();
  const updatedUsers = users.filter((user) => user.id !== currentUser.id);

  saveUsers(updatedUsers);

  // Remove current user from localStorage
  localStorage.removeItem(CURRENT_USER_KEY);
}
