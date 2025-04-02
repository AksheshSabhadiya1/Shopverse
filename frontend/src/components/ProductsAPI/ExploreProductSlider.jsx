import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import { ExploreProducts } from "../../API/API";
import {RingLoader} from 'react-spinners';


export default function ExpolreProductSlider() {
    const [cartBtnVisible, setCartBtnVisible] = useState(null);
    const sliderRef = useRef(null);

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['exploreProduct'],
        queryFn: () => ExploreProducts()
    })


    if(isLoading) return <div className="flex justify-center items-center m-50"><RingLoader color="#DB4444" /></div>
    if(isError) return <div><h1> Error : {error.message || "Something Went Wrong!!"} </h1></div>
    

    return (
        <div>
            

            <div className="relative overflow-hidden">
                <div ref={sliderRef} className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-12 py-6 overflow-x-auto whitespace-wrap">
                    {data?.map((product) => (
                        <div key={product.id} className="bg-white rounded p-4 min-w-[250px]" onMouseEnter={() => setCartBtnVisible(product.id)} onMouseLeave={() => setCartBtnVisible(null)}>
                            <div className="">
                                <div className="relative left-46 cursor-pointer -top-8 bg-gray-200 rounded-full w-8 p-1.5">
                                    <img src="/icons/heart small.png" alt="" />
                                </div>
                                <div className="relative left-46 -top-5 cursor-pointer bg-gray-200 rounded-full w-8 p-1.5">
                                    <img src="/icons/eye-icon.png" alt="" />
                                </div>
                            </div>
                            <div className="h-50 w-50 flex flex-col items-center">
                                <img src={product.image} alt={product.title} className="w-45 h-35 relative -top-10 object-contain" />
                                {cartBtnVisible === product.id && (
                                    <button className="w-full mt-2 bg-black relative -top-10 text-white py-2 cursor-pointer rounded-b hover:bg-red-600">Add to Cart</button>
                                )}
                            </div>
                            <div className="-mt-6 w-50">
                                <p className="font-semibold text-base truncate">{product.title}</p>
                                <p className="text-[#DB4444] font-bold text-base">₹{product.price} &nbsp;
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span key={index} className={index < product.rating.rate ? "text-yellow-500" : "text-gray-500"}>★</span>
                                    ))}
                                    <span className="text-base ml-2 text-gray-400">({product.rating.count})</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}