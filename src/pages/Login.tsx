import LoginForm from '../ui/LoginForm';

function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
