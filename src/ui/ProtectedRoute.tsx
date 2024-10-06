import { useEffect, useState } from 'react';
import { getCurrentUser, type User } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCurrentUser() {
      const user = await getCurrentUser();
      setCurrentUser(user);
      setLoading(false);
    }
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!loading && currentUser === null) {
      navigate('/signup');
    }
  }, [loading, currentUser, navigate]);

  if (loading) return <Loader />;

  return currentUser ? children : null;
}

export default ProtectedRoute;
