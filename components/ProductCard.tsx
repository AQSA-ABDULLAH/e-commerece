'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition cursor-pointer">
        <Image 
          src={product.image} 
          alt={product.title} 
          width={150} 
          height={150} 
          className="mx-auto rounded-md"
        />
        <h3 className="text-lg font-semibold mt-2 text-gray-900 dark:text-white">{product.title}</h3>
        <p className="text-gray-700 dark:text-gray-300 font-bold">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;


