import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RedirectIfAuthenticated = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
  if (isAuthenticated) {
    // Redirect to previous location or fallback to dashboard
    const from = location.state?.from?.pathname || "/user/dashboard";
    return <Navigate to={from} />;
  }

  return <Outlet />;
};

export default RedirectIfAuthenticated;
