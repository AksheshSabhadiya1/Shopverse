import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function EmptyOrders() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <ShoppingCart className="w-20 h-20 text-[#DB4444] mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold capitalize text-gray-800 mb-2">
                You haven't placed any orders yet
            </h2>
            <p className="text-base text-gray-500 mb-6">
                Looks like you haven't made your first purchase.
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
