import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return <div className="p-4 text-center">Loading session...</div>;
  }

  if (!user) {
    // User is not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Checks if user's role is allowed
  const isAuthorized = allowedRoles.includes(user.role);

  return isAuthorized ? children : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
