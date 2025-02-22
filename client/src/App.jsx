import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { checkAuth } from "./redux/slices/authSlice";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import { Login, Register } from "./pages/AuthPage";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "./components/Toaster";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";

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
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/all-products" element={<Shop />} />
        <Route exact path="/product/:name/:id" element={<ProductDetails />} />
        <Route element={<RedirectIfAuthenticated />}>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;

