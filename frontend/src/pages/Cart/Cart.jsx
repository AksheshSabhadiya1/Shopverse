import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; 
import React, { useState } from "react";
import { CartData } from "../../API/API";
import { Minus, Plus, Trash2 } from "lucide-react";


export default function Cart() {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["cartData"],
        queryFn: () => CartData(),
    });

    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (id, delta) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) + delta, 1)
        }));
    };

    const getQuantity = (id) => quantities[id] || 1;

    const getSubtotal = (product) => getQuantity(product.id) * product.sellingprice;

    const total = data?.reduce((acc, product) => acc + getSubtotal(product), 0) || 0;

    const deleteProduct = (id) => {
        // Here you'd call your delete API endpoint
        console.log("Delete product with id:", id);
        // Example: delete from backend and refetch cart data
        // await api.delete(`/cart/${id}`);
        queryClient.invalidateQueries(["cartData"]);
    };

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-5 font-bold text-center border-b-2 py-4 border-gray-300 text-lg">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span>Action</span>
            </div>

            {data?.map(product => (
                <div key={product.id} className="grid grid-cols-2 sm:grid-cols-5 items-center text-center py-6 border-b border-gray-200">
                    <div className="flex justify-center">
                        <img src={`http://localhost:5000/uploads/products/${product.image}`} alt={product.productname} className="w-16 h-16 object-contain" />
                    </div>
                    <span className="text-lg">₹{product.sellingprice}</span>
                    <div className="flex justify-center items-center space-x-2">
                        <button onClick={() => handleQuantityChange(product.id, -1)} className="p-1 rounded bg-gray-200 hover:bg-[#DB4444] hover:text-white">
                            <Minus  />
                        </button>
                        <span>{getQuantity(product.id)}</span>
                        <button onClick={() => handleQuantityChange(product.id, 1)} className="p-1 rounded bg-gray-200 hover:bg-[#DB4444] hover:text-white">
                            <Plus  />
                        </button>
                    </div>
                    <span className="text-[#DB4444] text-lg font-semibold">₹{getSubtotal(product)}</span>
                    <button onClick={() => deleteProduct(product.id)} className="mx-auto hover:text-red-500 border flex p-2 rounded-full">
                        <Trash2 className=" me-2" /> Delete
                    </button>
                </div>
            ))}


            <div className="flex flex-col lg:flex-row justify-between items-start mt-12 gap-6">
                <div className="flex space-x-3 w-full lg:w-auto">
                    <input
                        type="text"
                        name="coupon"
                        className="border border-gray-400 p-2 rounded w-full lg:w-64"
                        placeholder="Coupon Code"
                    />
                    <button className="px-6 py-2 font-semibold bg-[#DB4444] text-white rounded hover:bg-red-600 transition">
                        Apply Coupon
                    </button>
                </div>

                <div className="w-full lg:w-1/3 bg-gray-100 p-6 border rounded shadow">
                    <h3 className="text-xl font-semibold border-b pb-2">Cart Total</h3>
                    <div className="flex justify-between py-2">
                        <span>Subtotal:</span>
                        <span>₹{total}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between border-t pt-3 mt-3 text-lg font-semibold">
                        <span>Total:</span>
                        <span className="text-[#DB4444]">₹{total}</span>
                    </div>

                    <button className="w-full mt-4 px-6 py-3 bg-[#DB4444] text-white rounded hover:bg-red-600 transition">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
