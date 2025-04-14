import React, { useState, useEffect, useRef } from "react";
import Clock from "../Clock/Clock";
import { useQuery } from "@tanstack/react-query";
import { FetchProducts, FindProductById } from "../../API/API";
import { RingLoader } from "react-spinners";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Heart, Eye, ArrowRight, ArrowLeft, ShoppingCart } from "lucide-react";

export default function ProductSlider() {
    const [cartBtnVisible, setCartBtnVisible] = useState(null);
    const sliderRef = useRef(null);
    const { pathname } = useLocation();
    const nevigate = useNavigate();
    const path = pathname.split("/")[1];

    const ProductSliderScrollLeft = () =>
        sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    const ProductSliderScrollRight = () =>
        sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: () => FetchProducts(),
    });

    if (isLoading)
        return (
            <div className="flex justify-center items-center m-50">
                <RingLoader color="#DB4444" />
            </div>
        );
    if (isError)
        return (
            <div>
                <h1> Error : {error.message || "Something Went Wrong!!"} </h1>
            </div>
        );

    return (
        <div>
            {path !== "products" && (
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
                            <ArrowLeft />
                        </button>
                        <button
                            onClick={ProductSliderScrollRight}
                            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200"
                        >
                            <ArrowRight />
                        </button>
                    </div>
                </div>
            )}

            <div className="relative overflow-hidden">
                <div ref={sliderRef} className="flex gap-12 py-6 overflow-hidden">
                    {data?.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white/80 shadow-md hover:scale-110 duration-300 rounded p-4 min-w-[250px]"
                            onMouseEnter={() => setCartBtnVisible(product.id)}
                            onMouseLeave={() => setCartBtnVisible(null)}
                        >
                            <div className="">
                                <div className="relative left-50 cursor-pointer -top-2 w-8 p-1.5">
                                    <Heart className="hover:text-red-500" />
                                </div>
                                <div className="relative left-50 -top-2 cursor-pointer w-8 p-1.5">
                                    <button onClick={() => nevigate(`/products/${product.id}`)}>
                                        <Eye className="hover:text-blue-500" />
                                    </button>
                                </div>
                            </div>
                            <div className="h-50 w-50 flex flex-col transition-all duration-500 ease-in-out items-center">
                                <img
                                    src={`http://localhost:5000/uploads/products/${product.image}`}
                                    alt={product.productname}
                                    className="w-55 h-33 relative -top-15 object-contain"
                                />

                                <button
                                    className={`w-58 bg-black flex items-center justify-center relative left-2.5 text-white py-2 cursor-pointer rounded hover:bg-[#DB4444] transition-all duration-500 ease-in-out
                                    ${cartBtnVisible === product.id ? "opacity-100 -top-10" : "opacity-0 -top-8 pointer-events-none" }
                                    `}
                                > <ShoppingCart className="me-2 duration-300" />
                                    Add to Cart
                                </button>
                            </div>

                            <div className="-mt-15 w-50">
                                <p className="font-semibold text-base truncate">
                                    {product.productname}
                                </p>
                                <p className="text-[#DB4444] font-bold text-base">
                                    ₹{product.sellingprice} &nbsp;
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span
                                            key={index}
                                            className={
                                                index < product.rating
                                                    ? "text-yellow-500"
                                                    : "text-gray-500"
                                            }
                                        >
                                            ★
                                        </span>
                                    ))}
                                    <span className="text-base font-semibold ml-2 text-gray-400">
                                        ({product.rate_count})
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
