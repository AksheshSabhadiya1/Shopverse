import React from "react";
import { useNavigate } from "react-router-dom";


export default function EmptyWishlist() {

    const navigate = useNavigate() 

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <img
                src="/images/empty wishlist image.png"
                alt="Empty Wishlist"
                className="w-140 h-auto mb-6"
            />
            <h2 className="text-3xl font-bold text-red-500 mb-2"> Your Wishlist is Empty </h2>
            <p className="text-blue-500 text-base font-semibold"> Browse our store and add your favorite items to your wishlist.</p>
            <span className="text-blue-500 text-base font-semibold mb-4">Make a Wish!</span>
            <button
                onClick={() => navigate('/products')}
                className="bg-[#DB4444] text-white px-5 py-2 mb-15 rounded hover:scale-98 transition duration-300"
            > Start Shopping
            </button>
        </div>
    )
}