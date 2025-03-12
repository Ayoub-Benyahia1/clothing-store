import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" state={{ from: location }}/>;
};

export default ProtectedRoute;
