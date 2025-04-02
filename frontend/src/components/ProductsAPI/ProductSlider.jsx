import React, { useState, useEffect, useRef } from "react";
import Clock from "../Clock/Clock";
import {useQuery} from '@tanstack/react-query'
import { fetchProducts } from "../../API/API";
import {RingLoader} from 'react-spinners';
import { useLocation } from "react-router-dom";


export default function ProductSlider() {
    const [cartBtnVisible, setCartBtnVisible] = useState(null);
    const sliderRef = useRef(null);
    const {pathname} = useLocation()
    const path = pathname.split('/')[1]
    console.log(path);

    const ProductSliderScrollLeft = () => sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    const ProductSliderScrollRight = () => sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });


    const {data, isError, isLoading, error} = useQuery({
        queryKey: ['products'],
        queryFn: () => fetchProducts()
    })


    if(isLoading) return <div className="flex justify-center items-center m-50"><RingLoader color="#DB4444" /></div>
    if(isError) return <div><h1> Error : {error.message || "Something Went Wrong!!"} </h1></div>


    return (

        <div>
            
            {
                path !== 'product' && 
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center md:text-left">
                    Flash Sales
                </p>
                <Clock />   


                <div className="flex space-x-2 justify-center md:justify-end">
                    <button
                        onClick={ProductSliderScrollLeft}
                        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200"
                    >
                        🡠
                    </button>
                    <button
                        onClick={ProductSliderScrollRight}
                        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200"
                    >
                        🡢
                    </button>
                </div>
            </div>
            }
            

            <div className="relative overflow-hidden">
                <div ref={sliderRef} className="flex gap-12 py-6 overflow-hidden">
                    {data?.map((product) => (
                        <div key={product.id} className="bg-white rounded p-4 min-w-[250px]" onMouseEnter={() => setCartBtnVisible(product.id)} onMouseLeave={() => setCartBtnVisible(null)}>
                            <div className="">
                                <div className="relative -left-4 top-0 bg-[#DB4444] text-white rounded w-12 text-center p-1">
                                    <p className="font-light">-{((((product.price+100)-product.price)/product.price)*10).toFixed(0)}%</p>
                                </div>
                                <div className="relative left-46 -top-8 bg-gray-200 rounded-full w-8 p-1.5">
                                    <img src="/icons/heart small.png" alt="" />
                                </div>
                                <div className="relative left-46 -top-5 bg-gray-200 rounded-full w-8 p-1.5">
                                    <img src="/icons/eye-icon.png" alt="" />
                                </div>
                            </div>
                            <div className="h-50 w-full flex flex-col items-center">
                                <img src={product.image} alt={product.title} className="w-40 h-40 relative -top-10 object-contain" />
                                {cartBtnVisible === product.id && (
                                    <button className="w-full mt-2 bg-black relative -top-10 text-white py-2 rounded-b hover:bg-red-600">Add to Cart</button>
                                )}
                            </div>
                            <div className="-mt-6 w-50">
                                <p className="font-semibold text-base truncate">{product.title}</p>
                                <p className="text-[#DB4444] font-bold text-base">₹{product.price} <span className="text-gray-500 line-through text-sm ml-2">₹{product.price + 100}</span></p>
                                {
                                    Array.from({ length: 5 }, (_, index) => (
                                        <span key={index} className={index < product.rating.rate ? "text-yellow-500" : "text-gray-500"}>★</span>
                                    ) )
                                }<span className="text-base ml-2">({product.rating.count})</span> 
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
