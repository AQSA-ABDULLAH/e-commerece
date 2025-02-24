"use client";

import React, { useEffect, useState, Suspense } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
    <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
    <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
    <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
  </div>
);

const MainSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const productsPerPage = 6;

  useEffect(() => {
    setLoading(true);

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      });

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = products.filter((product) => product.category === selectedCategory);
    }

    if (sortOrder === "low-to-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, sortOrder, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      <div className="flex gap-4 mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
        >
          <option value="default">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: productsPerPage }).map((_, index) => <SkeletonLoader key={index} />)
          : currentProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 mr-2 rounded bg-gray-200 dark:bg-gray-800 dark:text-white ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ml-2 rounded bg-gray-200 dark:bg-gray-800 dark:text-white ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MainSection;

