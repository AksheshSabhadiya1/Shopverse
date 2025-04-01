import React, { useState, useEffect, useRef } from "react";

export default function BestSellProduct() {
    const [products, setProducts] = useState([]);
    const [cartBtnVisible, setCartBtnVisible] = useState(null);


    useEffect(() => {
        fetch("https://fakestoreapi.com/products/")
            .then((res) => res.json())
            .then((res) => {
                const bestSellProduct = res.filter(item => item.rating.count >= 500)
                setProducts(bestSellProduct);
            })
            .catch((err) => console.error("Error fetching products:", err));
    }, []);



    return (

        <div className="border-t border-gray-300">
            <div className="mt-10 lg:mt-16">
                <div className="flex items-center">
                    <div className="w-5 h-10 bg-[#DB4444]"></div>
                    <span className="ml-4 text-[#DB4444] font-semibold">This Month</span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 mb-6 gap-4">
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center md:text-left">
                    Best Selling Products
                </p>
                <div className="flex justify-center">
                    <button className="px-12 py-3 cursor-pointer font-semibold bg-[#DB4444] text-white rounded hover:bg-red-700">View All</button>
                </div>
                
            </div>

            <div className="relative overflow-hidden">
                <div className="flex gap-6 py-6 overflow-hidden">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded p-4 min-w-[250px]" onMouseEnter={() => setCartBtnVisible(product.id)} onMouseLeave={() => setCartBtnVisible(null)}>
                            <div className="">
                                <div className="relative left-46 -top-8 bg-gray-200 rounded-full w-8 p-1.5">
                                    <img src="/icons/heart small.png" alt="" />
                                </div>
                                <div className="relative left-46 -top-5 bg-gray-200 rounded-full w-8 p-1.5">
                                    <img src="/icons/eye-icon.png" alt="" />
                                </div>
                            </div>
                            <div className="h-50 w-50 flex flex-col items-center">
                                <img src={product.image} alt={product.title} className="w-40 h-40 relative -top-10 object-contain" />
                                {cartBtnVisible === product.id && (
                                    <button className="w-full mt-2 bg-black relative -top-10 text-white py-2 rounded-b hover:bg-red-600">Add to Cart</button>
                                )}
                            </div>
                            <div className="-mt-6  w-50">
                                <p className="font-semibold text-base truncate">{product.title}</p>
                                <p className="text-[#DB4444] font-bold text-xl">₹{product.price} <span className="text-gray-500 line-through text-sm ml-2">₹{product.price + 100}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
