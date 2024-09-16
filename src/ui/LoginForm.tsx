import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getCurrentUser, login } from '../services/apiAuth';
import { useNavigate, Link } from 'react-router-dom';
import { FormEvent } from 'react';

function LoginForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      await login({ email, password });
    },
    onSuccess: async () => {
      try {
        const userDetails = await getCurrentUser();
        queryClient.setQueryData(['user'], userDetails);
        toast.success('Login Successful!');
        navigate('/', { replace: true });
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to fetch user Details';
        toast.error(errorMessage);
      }
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    loginMutation({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-center text-4xl font-extrabold text-gray-900">
        Login
      </h2>
      <p className="text-center text-lg text-gray-500">
        Please enter your credentials to log in
      </p>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-xl font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-xl font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 font-semibold text-white transition hover:from-blue-600 hover:to-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isPending ? 'Logging in...' : 'Login'}
      </button>

      <Link
        to="/signup"
        className="mt-4 block text-center text-lg text-blue-600 hover:underline"
      >
        Don't have an account? <span className="font-bold">SignUp!</span>
      </Link>
    </form>
  );
}

export default LoginForm;
