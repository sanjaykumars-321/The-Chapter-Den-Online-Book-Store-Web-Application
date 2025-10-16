import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
import modalReducer from "./ui/modalSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    modal: modalReducer,
  },
});

export default store;
