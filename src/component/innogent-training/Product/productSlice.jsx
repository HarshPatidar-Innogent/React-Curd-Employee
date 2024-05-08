import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  cart: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productCart(state, action) {
      state.cart = [...state.cart, action.payload];
    },

    changeProduct(state, action) {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeProduct, productCart } = productSlice.actions;

export default productSlice.reducer;
