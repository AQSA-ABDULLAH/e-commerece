"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/lib/features/cart/slice";
import useSWR from "swr";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, error } = useSWR(
    id ? `https://fakestoreapi.com/products/${id}` : null,
    fetcher
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart!", { position: "top-right" });
  };

  if (error)
    return (
      <div className="text-red-500 text-center text-lg">
        Failed to load product.
      </div>
    );

  return (
    <div className="container mx-auto p-6 flex justify-center items-center">
      <div className="flex flex-col md:flex-row w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
        {/* Shimmer Effect - Skeleton Loader */}
        {!product ? (
          <div className="animate-pulse flex space-x-4">
            <div className="bg-gray-300 dark:bg-gray-700 h-52 w-52 rounded-md"></div>
            <div className="space-y-4">
              <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Product Image */}
            <div className="w-full md:w-[30%] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                priority
                className="mx-auto object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-[70%] mt-6 md:mt-0 md:ml-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {product.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                {product.description}
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6">
                ${product.price}
              </p>

              {/* Add to Cart Button */}
              <div className="flex justify-center md:justify-start mt-6">
                <button
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg shadow-md transition-transform duration-300 hover:bg-blue-700 hover:scale-105 dark:bg-blue-500 dark:hover:bg-blue-600"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
