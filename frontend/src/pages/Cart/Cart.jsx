import { useQuery } from "@tanstack/react-query"; 
import React from "react";
import { CartData } from "../../API/API";

export default function Cart() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["cartData"],
        queryFn: () => CartData(),
    });

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:ml-40 lg:mr-30 lg:mb-10">
            <div className="grid grid-cols-4 text-center font-bold border-b-2 py-4 border-gray-300 text-lg">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
            </div>

            {data?.map((product) => (
                <div key={product.id} className="grid grid-cols-4 items-center text-center py-6 border-b border-gray-200">
                    <div className="flex justify-center">
                        <img src={product.image} alt="" className="w-16 h-16 object-contain" />
                    </div>
                    <span className="text-lg font-medium">₹{product.price}</span>
                    <div className="flex justify-center">
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            max="5"
                            defaultValue="1"
                            className="text-center w-16 border border-gray-400 rounded py-1"
                        />
                    </div>
                    <span className="text-lg font-semibold text-[#DB4444]">₹{product.price}</span>
                </div>
            ))}

            <div className="flex flex-wrap justify-between items-center mt-8">
                <button className="px-8 py-3 font-semibold bg-white text-black border cursor-pointer border-gray-400 hover:text-white rounded hover:bg-[#DB4444] transition">
                    Return To Shop
                </button>
                <button className="px-8 py-3 font-semibold bg-white text-black border cursor-pointer border-gray-400 hover:text-white rounded hover:bg-[#DB4444] transition">
                    Update Cart
                </button>
            </div>

            <div className="flex flex-wrap justify-between items-center mt-16">
                <div className="flex space-x-3 lg:mt-4 lg:relative md:relative -top-30">
                    <input
                        type="text"
                        name="coupon"
                        className="border border-gray-400 p-2 rounded w-64"
                        placeholder="Coupon Code"
                    />
                    <button className="px-6 py-2 font-semibold bg-[#DB4444] cursor-pointer text-white rounded hover:bg-red-600 transition">
                        Apply Coupon
                    </button>
                </div>

                <div className="w-full md:w-1/3 bg-gray-100 mt-4 p-6 border rounded shadow-md">
                    <h3 className="text-xl font-semibold border-b pb-2">Cart Total</h3>
                    <div className="flex justify-between py-2">
                        <span>Subtotal:</span>
                        <span className="font-semibold">₹8888</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span>Shipping:</span>
                        <span className="font-semibold">Free</span>
                    </div>
                    <div className="flex justify-between border-t pt-3 mt-3">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-lg font-bold text-[#DB4444]">₹8888</span>
                    </div>
                    
                    <button className="w-full mt-4 px-6 py-3 cursor-pointer font-semibold bg-[#DB4444] text-white rounded hover:bg-red-600 transition">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
