import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer  from "./slices/cartSlice"
import categoryReducer  from "./slices/categorySlice"
import colorReducer  from "./slices/colorSlice"

const loadCartState = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage", error);
    return [];
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    categories: categoryReducer,
    colors: colorReducer,
  },
  preloadedState: {
    cart: { items: loadCartState() }, // Restore cart in Redux on startup
  },
});
