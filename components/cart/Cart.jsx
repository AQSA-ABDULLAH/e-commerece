"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";

const Cart = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.cart.cart);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  useEffect(() => {
    // Disable scrolling when the cart is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-[#0000007A] z-30"
        onClick={onClose}
      ></div>

      {/* Cart Container */}
      <div className="fixed right-0 top-0 bottom-0 w-[23%] bg-gray-100 text-black dark:bg-gray-900 dark:text-white z-40 shadow-lg">
        {/* Header */}
        <div className="text-[20px] px-6 py-4 flex justify-between border-b border-gray-300 dark:border-gray-700">
          <header className="font-semibold">Selected Items</header>

          {/* Close Button */}
          <button
            type="button"
            aria-label="Close"
            className="text-gray-700 dark:text-white hover:text-red-500"
            onClick={onClose}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
              ></path>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-2 flex-1 max-h-[80.5vh] overflow-y-auto custom-scrollbar">
          <CartItems />
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 w-full border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
          <div className="px-6 py-4 flex justify-between">
            <h2 className="text-lg font-semibold">Total:</h2>
            <h2 className="text-lg font-semibold">${totalPrice}</h2>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Cart;
