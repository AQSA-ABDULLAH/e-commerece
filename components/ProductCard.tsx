"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition cursor-pointer w-[300px] h-[400px] flex flex-col justify-between">
        {/* Image Container */}
        <div className="flex items-center justify-center h-[180px]">
          <img
            src={product.image}
            alt={product.title}
            className="rounded-md object-cover max-h-[140px]"
          />
        </div>
        {/* Title - Truncated to 2 lines */}
        <h3 className="text-[19px] mt-2 text-gray-900 dark:text-white line-clamp-2 overflow-hidden text-ellipsis">
          {product.title}
        </h3>
        {/* Price */}
        <p className="text-[22px] text-gray-700 dark:text-gray-300 font-bold">
          ${product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;