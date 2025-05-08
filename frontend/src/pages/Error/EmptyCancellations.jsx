import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function EmptyCancellations() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 sm:px-6 lg:px-8 text-center">
            <ShoppingCart className="w-16 h-16 sm:w-20 sm:h-20 text-red-500 mb-4" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold capitalize text-gray-800 mb-2">
                You haven't cancelled any orders yet
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-md">
                You can view or cancel items after making a purchase. <br /> Explore our products and start shopping now!
            </p>
            <button
                onClick={() => navigate("/products")}
                className="bg-[#DB4444] text-white px-5 py-2 mb-15 rounded hover:scale-98 transition duration-300" 
            >
                Go to Store
            </button>
        </div>
    );
}
