import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    product: productSlice,
  },
});
