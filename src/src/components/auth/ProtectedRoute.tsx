import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isProtected?: boolean;
  forAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isProtected,
  forAdmin,
}) => {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();

  if (isProtected && !isAuthenticated) {
    router.push('/login');
    return null;
  }

  if (forAdmin && !isAdmin) {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;