import { FormEvent, useState, useEffect } from 'react';
import {
  getCurrentUser,
  updateUserProfile,
  updatePassword,
  deleteAccount,
  logout,
} from '../services/apiAuth';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const AccountSettings = () => {
  const queryClient = useQueryClient();
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
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Failed to update profile: ' + error.message);
      } else {
        toast.error('Failed to update profile: An unexpected error occurred.');
      }
    }
  };

  const handlePasswordUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await updatePassword({ password });
      toast.success('Password updated successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Failed to update password: ' + error.message);
      } else {
        toast.error('Failed to update password: An unexpected error occurred.');
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
        toast.success('Account deleted successfully');
      } catch (error) {
        if (error instanceof Error) {
          toast.error('Failed to delete account: ' + error.message);
        } else {
          toast.error(
            'Failed to delete account: An unexpected error occurred.',
          );
        }
      }
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="mx-auto mt-10 w-full rounded-lg bg-header-background p-6 shadow-xl">
      <h1 className="mb-6 text-2xl font-bold">Account Settings</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Update Profile Section */}
        <form onSubmit={handleProfileUpdate} className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Update Profile</h2>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-lg font-medium text-text"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-text"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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

        {/* Change Password Section */}
        <form onSubmit={handlePasswordUpdate} className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Change Password</h2>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-text"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-lg font-medium text-text"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
      </div>

      {/* Delete Account Section */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Delete Account</h2>
        <button
          onClick={handleDeleteAccount}
          className="inline-block rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
