import React, { useState, useContext, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { BestProduct, FindProductByCategory } from "../../API/API";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Heart, Eye, ArrowRight, ArrowLeft, ShoppingCart } from "lucide-react";
import CartContext from "../../context/Cart/CartContextProvider";
import WishlistContext from "../../context/Wishlist/WishlistContextProvider";
import Cookies from 'js-cookie'


export default function ProductCategory({ props }) {
    const [cartBtnVisible, setCartBtnVisible] = useState(null);
    const sliderRef = useRef(null);
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext)
    const { addToWishlist } = useContext(WishlistContext)
    const userToken = Cookies.get('userToken') || null


    const ProductSliderScrollLeft = () =>
        sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    const ProductSliderScrollRight = () =>
        sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });

    const { data, isError, isLoading, error, refetch } = useQuery({
        queryKey: ["Categoryproducts"],
        queryFn: () => props ? FindProductByCategory(props) : BestProduct(),
    });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    useEffect(()=>{
        refetch()
    },[addToWishlist])

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-10 gap-4">
                <div className="flex items-center">
                    <div className="w-5 h-10 bg-[#DB4444] rounded"></div>
                    <span className="ml-4 text-[#DB4444] font-semibold">{props ? "Related Items" : "Best Products"}</span>
                </div>
                {data.length > 4 && <div className="flex space-x-2 justify-end">
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
                }
            </div>

            <div className="relative overflow-hidden">
                <div ref={sliderRef} className="flex gap-12 py-0 overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 py-6">
                        {data?.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white/80 shadow-md hover:scale-105 duration-300 rounded p-4 w-full sm:w-auto min-w-[250px]"
                                onMouseEnter={() => setCartBtnVisible(product.id)}
                                onMouseLeave={() => setCartBtnVisible(null)}
                            >
                                <div className="relative">
                                    <div className="absolute top-2 right-2 cursor-pointer w-8 p-1.5 z-10">
                                        <button onClick={() => userToken ? addToWishlist(product) : navigate('/signin')}>
                                            <Heart className={`${product.isFavourite === 1 ? "text-red-500" : "text-black" } hover:text-red-500`} />
                                        </button>
                                    </div>
                                    <div className="absolute top-10 right-2 cursor-pointer w-8 p-1.5 z-10">
                                        <button onClick={() => navigate(`/products/${product.slug}`)}>
                                            <Eye className="hover:text-blue-500" />
                                        </button>
                                    </div>
                                </div>

                                <div className="relative flex flex-col items-center justify-center">
                                    <div className="h-40 w-40 sm:h-48 sm:w-48 flex items-center justify-center transition-all duration-500 ease-in-out">
                                        <img
                                            src={`http://localhost:5000/uploads/products/${product.image}`}
                                            alt={product.productname}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>

                                    <button
                                        onClick={() => addToCart(product)}
                                        className={`absolute bottom-0 w-full bg-black flex items-center justify-center text-white py-2 cursor-pointer rounded transition-all duration-300 ease-in-out
                                                            ${cartBtnVisible === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
                                                        `}
                                    >
                                        <ShoppingCart className="me-2 duration-300" />
                                        Add to Cart
                                    </button>
                                </div>

                                <div className="mt-4 text-center">
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
                                        <span className="text-sm font-semibold ml-2 text-gray-400">
                                            ({product.rate_count})
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
