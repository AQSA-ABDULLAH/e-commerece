// CartItem.jsx
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
        <h2 className="text-lg font-semibold">No Items in Cart</h2>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="my-[16px] rounded-[10px] p-[10px] bg-[#ffffff] text-[#000] font-style"
          >
            <div className="flex gap-8 items-center">
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={200}
                priority
                placeholder="blur"
                blurDataURL="/placeholder.jpg"
                className="w-14 h-14"
              />
              <div>
                <h3 className="font-semibold text-[12.8px]">{item.title}</h3>
                <p className="text-[16px] text-[#DA0037] font-bold mt-[8px]">
                  $ {item.price}
                </p>
              </div>
            </div>

            <div className="flex w-[100%] justify-end mt-[8px]">
              <button onClick={() => handleDelete(item.id)}>
                <AiOutlineDelete className="cursor-pointer" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CartItems;
