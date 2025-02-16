import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { checkAuth } from "./redux/slices/authSlice";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import { Login, Register } from "./pages/AuthPage";

const refresh = import.meta.env.VITE_INTERVAL_CHECKAUTH;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    const interval = setInterval(() => {
      dispatch(checkAuth());
    }, parseInt(refresh));

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route element={<RedirectIfAuthenticated />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
