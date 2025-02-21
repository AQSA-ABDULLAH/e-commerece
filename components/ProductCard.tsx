
// ProductCard.tsx
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
    <Link href={`/product/${product.id}`}>
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition cursor-pointer">
        <Image src={product.image} alt={product.title} width={150} height={150} className="mx-auto" />
        <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
        <p className="text-gray-700 font-bold">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;

