import { useQuery } from "@tanstack/react-query";
import React, { useState, useContext, useEffect, useRef } from "react";
import { BestProduct } from '../../API/API'
import { RingLoader } from 'react-spinners';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import CartContext from "../../context/Cart/CartContextProvider";


export default function BestSellProduct() {
    const [cartBtnVisible, setCartBtnVisible] = useState(null);
    const { pathname } = useLocation()
    const nevigate = useNavigate()
    const path = pathname.split('/').filter(Boolean).toString()

    const {addToCart} = useContext(CartContext)


    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['BestProducts'],
        queryFn: () => BestProduct()
    })

    useEffect(()=>{
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },[])


    if (isLoading) return <div className="flex justify-center items-center m-50"><RingLoader color="#DB4444" /></div>
    if (isError) return <div><h1> Error : {error.message || "Something Went Wrong!!"} </h1></div>


    return (

        <div className="mt-10 relative overflow-hidden">
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 py-6">
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
                                <button onClick={() => nevigate(`/products/${product.slug}`)}>
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
                            {
                                path === 'wishlist' && <button
                                onClick={()=> addToCart(product)}
                                className={`w-58 bg-black flex items-center justify-center relative left-2.5 text-white py-2 cursor-pointer rounded hover:bg-[#DB4444] transition-all duration-500 ease-in-out opacity-100 -top-10" `}
                            > <ShoppingCart className="me-2 duration-300" />
                                Add to Cart
                            </button>
                            }

                            <button onClick={()=> addToCart(product)}
                                className={`w-58 bg-black flex items-center justify-center relative left-2.5 text-white py-2 cursor-pointer rounded hover:bg-[#DB4444] transition-all duration-500 ease-in-out
                                                            ${cartBtnVisible === product.id ? "opacity-100 -top-10" : "opacity-0 -top-8 pointer-events-none"}
                                                            `}
                            > <ShoppingCart className="me-2 duration-300" />
                                Add to Cart
                            </button>
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
