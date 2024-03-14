import { configureStore } from "@reduxjs/toolkit";
import CartService from "./Cart";

const ToyStore = configureStore({
  reducer: {
    Cart: CartService.reducer,
  },
});

export default ToyStore;
