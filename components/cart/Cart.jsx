"use client";

import React, { Suspense } from "react";
import { useSelector } from "react-redux";

const CartItems = React.lazy(() => import("./CartItems"));

const Cart = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-[#0000007A] z-30" onClick={onClose}></div>

      <div className="fixed right-0 top-0 bottom-0 w-[23%] text-white bg-[#444] z-40">
        <div className="text-[20px] px-6 py-4 font-style flex justify-between">
          <header className="chakra-modal__header">Selected items</header>
          <button onClick={onClose} className="text-white">
            ✖
          </button>
        </div>

        <div className="px-6 py-2 flex-1 max-h-[80.5vh] overflow-y-auto custom-scrollbar">
          <Suspense fallback={<div className="text-gray-500">Loading items...</div>}>
            <CartItems />
          </Suspense>
        </div>

        <footer className="absolute bottom-0 w-full px-6 py-4 flex justify-between">
          <h2 className="text-lg font-semibold">Total:</h2>
          <h2 className="text-lg font-semibold">${totalPrice}</h2>
        </footer>
      </div>
    </>
  );
};

export default Cart;
