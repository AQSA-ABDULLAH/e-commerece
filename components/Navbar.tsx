"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, Sun, Moon } from "lucide-react";
import Cart from "./cart/Cart";
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const cartItems = useSelector((state: any) => state.cart.cart);
  const cartCount = cartItems.length;

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
          E-Shop
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Products
          </Link>
          <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-700 dark:text-gray-300" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          <button className="relative text-gray-700 dark:text-gray-300" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={24} />
            {isMounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </button>

          <button className="md:hidden text-gray-700 dark:text-gray-300" onClick={() => setIsOpen(!isOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md p-4">
          <Link href="/products" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Products
          </Link>
          <Link href="/about" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            About
          </Link>
          <Link href="/contact" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Contact
          </Link>
        </div>
      )}

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;



