import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import Navbar from "./components/navbar/Navbar";

const AuthRoutes = () => {
  return (
    <>
    <Navbar />
    <Routes>
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
        </Route>
    </Routes>
    </>
  );
};

export default AuthRoutes;

