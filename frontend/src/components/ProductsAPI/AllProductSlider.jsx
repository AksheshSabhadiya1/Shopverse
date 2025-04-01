import React, { useState, useEffect, useRef } from "react";

export default function AllProductSlider() {
    const [products, setProducts] = useState([]);
    const [cartBtnVisible, setCartBtnVisible] = useState(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/")
            .then((res) => res.json())
            .then((res) => {
                setProducts(res.reverse());
            })
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    return (
        <div>
            <div className="mt-10 lg:mt-20">
                <div className="flex items-center">
                    <div className="w-5 h-10 bg-[#DB4444]"></div>
                    <span className="ml-4 text-[#DB4444] font-semibold">Our Products</span>
                </div>
            </div>

            <div className="lg:mt-5 flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center md:text-left">
                    Explore Our Products
                </p>
                <div className="flex justify-center">
                    <button className="px-12 py-3 cursor-pointer font-semibold bg-[#DB4444] text-white rounded hover:bg-red-700">View All</button>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div ref={sliderRef} className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-12 py-6 overflow-x-auto whitespace-wrap">
                    {products.slice(0, 8).map((product) => (
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