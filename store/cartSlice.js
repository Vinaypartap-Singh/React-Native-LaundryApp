import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart(state, action) {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload.id
      );

      state.cart = removeItem;
    },
    increaseQuantity(state, action) {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      existingItem.quantity++;
    },
    decreaseQuantity(state, action) {
      const existingItem = state.cart.find(
        (data) => data.id === action.payload.id
      );

      if (existingItem.quantity == 1) {
        existingItem.quantity = 0;
        const removeItem = state.cart.filter(
          (data) => data.id !== action.payload.id
        );

        state.cart = removeItem;
      } else {
        existingItem.quantity--;
      }
    },
    cleanCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  cleanCart,
} = cartSlice.actions;

export default cartSlice.reducer;
