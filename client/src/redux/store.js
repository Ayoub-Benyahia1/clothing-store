import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productsSlice";
import cartReducer  from "./slices/cartSlice"
import categoryReducer  from "./slices/categorySlice"
import colorReducer  from "./slices/colorSlice"
import sizeReducer  from "./slices/sizeSlice"

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
    products: productReducer,
    cart: cartReducer,
    categories: categoryReducer,
    colors: colorReducer,
    sizes: sizeReducer,
  },
  preloadedState: {
    cart: { items: loadCartState() }, // Restaurer le panier dans Redux au démarrage
  },
});
