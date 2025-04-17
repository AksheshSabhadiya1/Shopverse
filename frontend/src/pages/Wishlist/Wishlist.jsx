import React, { useEffect, useRef } from "react"; 
import { useQuery } from "@tanstack/react-query";
import { RingLoader } from 'react-spinners';
import { wishlist } from "../../API/API";
import BestSellProduct from "../../components/ProductsAPI/BestSellProduct";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
    const sliderRef = useRef(null);
    const nevigate = useNavigate()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['wishlist'],
        queryFn: () => wishlist()
    });

    useEffect(()=>{
            fetchCart()
            setSessionItem(tempArr)
    },[])

    if (isLoading) return <div className="flex justify-center items-center m-20"><RingLoader color="#DB4444" /></div>;
    if (isError) return <div className="text-center"><h1 className="text-red-500">Error: {error.message || "Something Went Wrong!!"}</h1></div>;

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:ml-40 lg:mr-30 lg:mb-8">

            <div className="lg:mt-5 flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <p className="text-xl sm:text-3xl md:text-3xl font-semibold text-center md:text-left">
                    Wishlist ({data?.length || 0})
                </p>
                <div className="flex justify-center">
                    <button onClick={()=> nevigate('/cart')} className="px-12 py-3 cursor-pointer font-semibold bg-white text-black border border-gray-400 hover:text-white rounded hover:bg-[#DB4444] transition">
                        Move All To Bag
                    </button>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 py-6">
                    {data?.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white/80 shadow-md hover:scale-110 duration-300 rounded p-4 min-w-[250px]"
                        >
                            <div className="">
                                <div className="relative left-50 cursor-pointer -top-12 w-8 p-1.5">
                                    <Trash2 className="hover:text-red-400" />
                                </div>
                            </div>
                            <div className="h-50 w-50 flex flex-col items-center">
                                <img
                                    src={`http://localhost:5000/uploads/products/${product.image}`}
                                    alt={product.productname}
                                    className="w-55 h-33 relative -top-15 object-contain"
                                />
                                    <button className="w-58 bg-black flex items-center justify-center relative left-3 -top-10 text-white py-2 cursor-pointer rounded hover:bg-[#DB4444]">
                                        <ShoppingCart className="me-2" />
                                        Add to Cart
                                    </button>
                            </div>
                            <div className="-mt-15 w-50">
                            <p className="font-semibold text-base truncate">{product.productname}</p>
                            <p className="text-[#DB4444] font-bold text-base">₹{product.sellingprice} <span className="text-gray-500 line-through text-sm ml-2">₹{product.originalprice}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-10 lg:mt-16">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 mb-6 gap-4">
                    <div className="flex items-center">
                        <div className="w-5 h-10 bg-[#DB4444] rounded"></div>
                        <span className="ml-4 text-[#DB4444] font-semibold">Just For You</span>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={()=> nevigate('/products')} className="px-12 py-3 cursor-pointer font-semibold bg-white text-black border border-gray-400 hover:text-white rounded hover:bg-[#DB4444] transition">
                            See All
                        </button>
                    </div>
                </div>
            </div>

            <BestSellProduct />
        </div>
    );
}
