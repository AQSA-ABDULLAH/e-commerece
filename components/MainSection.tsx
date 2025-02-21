"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const MainSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("default");

  useEffect(() => {
    // Fetch Products
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });

    // Fetch Categories
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Handle Category Filtering
  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = products.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply Sorting
    if (sortOrder === "low-to-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortOrder, products]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {/* Filters Section */}
      <div className="flex gap-4 mb-4">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="default">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MainSection;
