import { FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { signup } from '../services/apiAuth';
import { Link, useNavigate } from 'react-router-dom';

function SignupForm() {
  const navigate = useNavigate();

  const { mutate: signupMutation, isPending } = useMutation({
    mutationFn: async ({
      fullName,
      email,
      password,
    }: {
      fullName: string;
      email: string;
      password: string;
    }) => {
      await signup({ fullName, email, password });
    },
    onSuccess: () => {
      toast.success('Signup Successful!');
      navigate('/', { replace: true });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Signup failed';
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    signupMutation({ fullName, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-center text-4xl font-extrabold text-gray-900">
        Sign Up
      </h2>
      <p className="text-center text-lg text-gray-500">
        Create your account by filling the details below
      </p>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-xl font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
        {isPending ? 'Signing up...' : 'Sign Up'}
      </button>

      <Link
        to="/login"
        className="mt-4 block text-center text-lg text-blue-600 hover:underline"
      >
        Already have an account? <span className="font-bold">Login!</span>
      </Link>
    </form>
  );
}

export default SignupForm;
