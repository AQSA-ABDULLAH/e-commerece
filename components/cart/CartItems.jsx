import React from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { removeFromCart } from "../../app/lib/features/cart/slice";

function CartItems() {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="">
      {cartItems.length === 0 ? (
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          No Items in Cart
        </h2>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="my-4 rounded-lg p-4 bg-gray-100 text-black dark:bg-gray-800 dark:text-white shadow-md"
          >
            <div className="flex gap-6 items-center">
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={200}
                priority
                placeholder="blur"
                blurDataURL="/placeholder.jpg"
                className="w-14 h-14 rounded-md"
              />
              <div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-lg text-red-500 font-bold mt-2">
                  $ {item.price}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-3">
              <button onClick={() => handleDelete(item.id)} className="text-gray-600 dark:text-white hover:text-red-500">
                <AiOutlineDelete className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CartItems;

