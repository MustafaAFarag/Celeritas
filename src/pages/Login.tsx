import LoginForm from '../features/authentication/LoginForm';

function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="w-full max-w-md transform rounded-xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
        <h1 className="mb-10 text-center text-4xl font-extrabold text-gray-800">
          Sign in!
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
