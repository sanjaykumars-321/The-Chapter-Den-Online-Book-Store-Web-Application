import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartClicked: false,
  addToCartClicked: false,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    CartClicked(state, action) {
      state.cartClicked = action.payload;
    },
    AddToCartClicked(state, action) {
      state.addToCartClicked = action.payload;
      state.cartClicked = action.payload;
    },
    getTotalQuantity(state, action) {
      state.totalQuantity = action.payload;
    },
  },
});

export const { CartClicked, AddToCartClicked, getTotalQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
