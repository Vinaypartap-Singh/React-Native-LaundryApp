import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    product: [],
  },
  reducers: {
    getProducts(state, action) {
      state.product.push({ ...action.payload });
    },
    increamentQty(state, action) {
      const existingItem = state.product.find(
        (item) => item.id === action.payload.id
      );
      existingItem.quantity++;
    },
    decrementQty(state, action) {
      const existingItem = state.product.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem.quantity == 1) {
        existingItem.quantity = 0;
        const removeItem = state.product.filter(
          (item) => item.id !== action.payload.id
        );

        state.cart = removeItem;
      } else {
        existingItem.quantity--;
      }
    },
  },
});

export const { getProducts, increamentQty, decrementQty } =
  productSlice.actions;

export default productSlice.reducer;
