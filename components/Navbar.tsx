"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import Cart from "./cart/Cart";
import { useSelector } from "react-redux"; // ✅ Import useSelector

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItems = useSelector((state: any) => state.cart.cart); // ✅ Get cart items from Redux
  const cartCount = cartItems.length; // ✅ Get the count of cart items

  return (
    <nav className="bg-white shadow-md p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          E-Shop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Products
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900">
            Contact
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon - Opens Cart Sidebar */}
          <button
            className="relative text-gray-700 hover:text-gray-900"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={24} />
            {/* ✅ Show badge only if cart is not empty */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4">
          <Link href="/products" className="block py-2 text-gray-700 hover:text-gray-900">
            Products
          </Link>
          <Link href="/about" className="block py-2 text-gray-700 hover:text-gray-900">
            About
          </Link>
          <Link href="/contact" className="block py-2 text-gray-700 hover:text-gray-900">
            Contact
          </Link>
        </div>
      )}

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;


