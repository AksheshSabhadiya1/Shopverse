import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import {BestProduct} from '../../API/API'
import {RingLoader} from 'react-spinners';
import { useLocation } from "react-router-dom";



export default function BestSellProduct() {
    const [cartBtnVisible, setCartBtnVisible] = useState(null);
    const {pathname} = useLocation()
    const path = pathname.split('/').filter(x => x).toString()

    const {data, isError, isLoading, error} = useQuery({
        queryKey: ['BestProducts'],
        queryFn: () => BestProduct()
    })

    if(isLoading) return <div className="flex justify-center items-center m-50"><RingLoader color="#DB4444" /></div>
    if(isError) return <div><h1> Error : {error.message || "Something Went Wrong!!"} </h1></div>


    return (

        <div>         
            <div className="mt-10 relative overflow-hidden">
                <div className="flex gap-15 py-6 overflow-hidden">
                    {data?.map((product) => (
                        <div key={product.id} className="bg-white rounded p-4 min-w-[250px]" onMouseEnter={() => setCartBtnVisible(product.id)} onMouseLeave={() => setCartBtnVisible(null)}>
                            <div className="">
                                {path !== 'wishlist' && <div className="relative left-46 -top-8 bg-gray-200 rounded-full w-8 p-1.5">
                                    <img src="/icons/heart small.png" alt="" />
                                </div> }
                                <div className="relative left-46 -top-5 bg-gray-200 rounded-full w-8 p-1.5">
                                    <img src="/icons/eye-icon.png" alt="" />
                                </div>
                            </div>
                            <div className="h-50 w-50 flex flex-col items-center">
                                <img src={product.image} alt={product.title} className="w-40 h-40 relative -top-10 object-contain" />
                                
                                {path === 'wishlist' && <button className="w-full flex justify-center items-center mt-2 bg-black relative -top-10 text-white py-2 cursor-pointer rounded-b hover:bg-red-600"><img src="/icons/shopping-cart-white.png" alt="" className="w-6 h-6 mx-2" />Add to Cart</button>}

                                {(cartBtnVisible === product.id && path !== 'wishlist') && (
                                    <button className="w-full mt-2 bg-black relative -top-10 text-white py-2 rounded-b hover:bg-red-600">Add to Cart</button>
                                )}
                            </div>
                            <div className="-mt-6  w-50">
                                <p className="font-semibold text-base truncate">{product.title}</p>
                                <p className="text-[#DB4444] font-bold text-base">₹{product.price} {path !== 'wishlist' && <span className="text-gray-500 line-through text-sm ml-2">₹{product.price + 100}</span>} </p>
                                {
                                    Array.from({ length: 5 }, (_, index) => (
                                        <span key={index} className={index < product.rating.rate ? "text-yellow-500" : "text-gray-500"}>★</span>
                                    ) )
                                }<span className="text-base text-gray-500 ml-2">({product.rating.count})</span> 
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
