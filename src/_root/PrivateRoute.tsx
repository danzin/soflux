import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated } = useUserContext();
  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;