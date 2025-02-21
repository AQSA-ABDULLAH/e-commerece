"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/lib/features/cart/slice"; // Import the action
import useSWR from "swr";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch(); // Get the dispatch function
  const { data: product, error } = useSWR(
    id ? `https://fakestoreapi.com/products/${id}` : null,
    fetcher
  );

  if (error)
    return (
      <div className="text-red-500 text-center text-lg">
        Failed to load product.
      </div>
    );
  if (!product)
    return <div className="text-gray-700 text-center text-lg">Loading...</div>;

  // Function to handle adding product to cart
  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Dispatch the product to Redux store
  };

  return (
    <div className="container mx-auto p-6 flex justify-center items-center">
      <div className="flex w-full bg-white border rounded-lg p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="w-[30%] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            priority
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
            className="mx-auto object-contain"
          />
        </div>

        <div className="w-[70%]">
          <h2 className="text-3xl font-bold mt-6 text-gray-900">
            {product.title}
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>
          <p className="text-2xl font-semibold text-gray-900 mt-6">
            ${product.price}
          </p>

          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg shadow-md transition-transform duration-300 hover:bg-blue-700 hover:scale-105"
              onClick={handleAddToCart} // Call function when button is clicked
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

