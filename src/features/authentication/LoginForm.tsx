import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login } from '../../services/apiAuth';
import { useAuth } from '../../context/AuthContext';

function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      setIsPending(false);
      return;
    }

    try {
      const { user } = await login({ email, password });

      // Immediately update the AuthContext state with the logged-in user
      dispatch({ type: 'SET_USER', payload: user });

      toast.success('Login Successful!');
      navigate('/', { replace: true });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed';
      toast.error(errorMessage);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 font-semibold text-white transition hover:from-blue-600 hover:to-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isPending ? (
          <svg
            className="mr-3 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        ) : (
          'Login'
        )}
      </button>

      <Link
        to="/signup"
        className="mt-4 block text-center text-lg text-blue-600 hover:underline"
      >
        Don't have an account? <span className="font-bold">Sign Up!</span>
      </Link>
    </form>
  );
}

export default LoginForm;
