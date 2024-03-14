import { createSlice } from "@reduxjs/toolkit";

const CartService = createSlice({
  name: "Cart",
  initialState: {
    cartItems: [],
    clickedProductId: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const itemId = action.payload.id;
      state.cartItems.unshift(itemId);
    },

    setClickedProductId: (state, action) => {
      state.clickedProductId = action.payload.id;
    },
    deleteItem: (state, action) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((item) => item !== itemId);
    },
  },
});

export const CartAction = CartService.actions;
export default CartService;
