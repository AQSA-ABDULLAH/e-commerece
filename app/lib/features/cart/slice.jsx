import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  cart: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart")) || [] : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = {
        ...action.payload,
        id: nanoid(),
      };
      state.cart.push(product);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((cartItem) => cartItem.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;



