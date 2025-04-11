import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import { BestProduct } from '../../API/API'
import { RingLoader } from 'react-spinners';
import { useLocation } from "react-router-dom";
import { Heart, Eye } from "lucide-react";


export default function BestSellProduct() {
    const [cartBtnVisible, setCartBtnVisible] = useState(null);
    const { pathname } = useLocation()
    const path = pathname.split('/').filter(x => x).toString()

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['BestProducts'],
        queryFn: () => BestProduct()
    })

    if (isLoading) return <div className="flex justify-center items-center m-50"><RingLoader color="#DB4444" /></div>
    if (isError) return <div><h1> Error : {error.message || "Something Went Wrong!!"} </h1></div>


    return (

        <div className="mt-10 relative overflow-hidden">
            <div className="flex gap-12 py-6 overflow-hidden">
                {data?.map((product) => (
                    <div key={product.id} className="bg-white rounded p-4 min-w-[250px] transition duration-300 ease-in-out" onMouseEnter={() => setCartBtnVisible(product.id)} onMouseLeave={() => setCartBtnVisible(null)}>
                        <div className="">
                            <div className="relative left-44 -top-8 w-8 p-1.5" title="Add to wishlist">
                                <Heart className="hover:text-red-500" />
                            </div>
                            <div className="relative left-44 -top-8 w-8 p-1.5" title="View details">
                                <Eye className="hover:text-blue-500" />
                            </div>
                        </div>
                        <div className="h-50 w-full flex flex-col items-center">
                            <img
                                src={`http://localhost:5000/uploads/products/${product.image}`}
                                alt={product.productname}
                                className="w-40 h-35 relative -top-10 object-contain"
                            />
                            {path === 'wishlist' && <button className="w-full flex justify-center transition-all duration-300 ease-in-out items-center mt-2 bg-black relative -top-10 text-white py-2 cursor-pointer rounded-b hover:bg-red-600"><img src="/icons/shopping-cart-white.png" alt="" className="w-6 h-6 mx-2" />Add to Cart</button>}

                            {cartBtnVisible === product.id && (
                                <button className="w-full mt-2 bg-black relative -top-10 transition-all duration-300 ease-in-out text-white py-2 rounded-b hover:bg-red-600 hover:scale-105">
                                    Add to Cart
                                </button>
                            )}
                        </div>

                        <div className="-mt-12 w-50">
                            <p className="font-semibold text-base truncate">{product.productname}</p>
                            <p className="text-[#DB4444] font-bold text-base">₹{product.sellingprice} <span className="text-gray-500 line-through text-sm ml-2">₹{product.originalprice}</span></p>
                            {
                                Array.from({ length: 5 }, (_, index) => (
                                    <span key={index} className={index < product.rating ? "text-yellow-500" : "text-gray-500"}>★</span>
                                ))
                            }<span className="text-base ml-2 font-semibold text-gray-400">({product.rate_count})</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
