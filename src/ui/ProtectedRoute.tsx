import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isLoading && state.user === null) {
      navigate('/signup');
    }
  }, [state.isLoading, state.user, navigate]);

  if (state.isLoading) return <Loader />;

  return state.user ? children : null;
}

export default ProtectedRoute;
