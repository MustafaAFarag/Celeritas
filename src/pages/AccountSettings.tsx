import { FormEvent, useState, useEffect } from 'react';
import {
  getCurrentUser,
  updateUserProfile,
  updatePassword,
  deleteAccount,
  logout,
} from '../services/apiAuth';

const AccountSettings = () => {
  const [user, setUser] = useState<{ full_name: string; email: string } | null>(
    null,
  );
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        setFullName(currentUser.full_name);
        setEmail(currentUser.email);
      }
    };
    fetchUser();
  }, []);

  const handleProfileUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { user: updatedUser } = await updateUserProfile({
        fullName,
        email,
      });
      setUser(updatedUser);
      alert('Profile updated successfully');
    } catch (error) {
      if (error instanceof Error) {
        alert('Failed to update profile: ' + error.message);
      } else {
        alert('Failed to update profile: An unexpected error occurred.');
      }
    }
  };

  const handlePasswordUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await updatePassword({ password });
      alert('Password updated successfully');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (error instanceof Error) {
        alert('Failed to update password: ' + error.message);
      } else {
        alert('Failed to update password: An unexpected error occurred.');
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.',
      )
    ) {
      try {
        await deleteAccount();
        await logout();
        alert('Account deleted successfully');
        // Redirect to login page or home page
      } catch (error) {
        if (error instanceof Error) {
          alert('Failed to delete account: ' + error.message);
        } else {
          alert('Failed to delete account: An unexpected error occurred.');
        }
      }
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-xl">
      <h1 className="mb-6 text-2xl font-bold">Account Settings</h1>

      <form onSubmit={handleProfileUpdate} className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Update Profile</h2>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>

      <form onSubmit={handlePasswordUpdate} className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Change Password</h2>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Change Password
        </button>
      </form>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Delete Account</h2>
        <button
          onClick={handleDeleteAccount}
          className="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
