import { useNavigate } from 'react-router-dom';
import SignupForm from '../ui/SignupForm';

function Signup() {
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <SignupForm onSuccess={handleSignupSuccess} />
    </div>
  );
}

export default Signup;
