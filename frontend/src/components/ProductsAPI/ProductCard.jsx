import React, { useState, useEffect } from "react";


export default function ProductCard() {

    const [products, setProducts] = useState([])
    const [cartbtn, setCartBtn] = useState(false)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/').then(res => res.json())
            .then((res) => {
                const limit = res.slice(0, 4)
                setProducts(limit)
            })
            .catch(err => console.error("Error fetching products:", err));
    }, [])


    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
                {products?.map((product) => (
                    <div key={product.id} className="bg-white rounded p-4 h-auto transition-transform transform hover:scale-105" onMouseEnter={() => setCartBtn(!cartbtn)} onMouseLeave={() => setCartBtn(!cartbtn)} >
                        <div className="h-50">
                            <div className="w-full flex flex-col justify-center items-center">
                            <img src={product.image} alt={product.title} className={cartbtn ? "w-40 h-40 object-contain" : "w-40 h-40 object-contain"} />
                            {
                                cartbtn && <button className="w-full relative top-2 bg-black text-white py-2 rounded hover:bg-red-600 transition">Add to Cart</button>
                            }
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="font-semibold text-lg">{product.title}</p>
                            <p className="text-[#DB4444] font-bold text-xl mt-1">
                                ₹{product.price} <span className="text-gray-500 line-through text-sm ml-2">₹{product.price + 100}</span>
                            </p>
                            <p className="text-sm text-gray-600 flex items-center mt-1">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <span key={index} className={index < product.rating.rate ? "text-yellow-500" : "text-gray-400"}>
                                        ★
                                    </span>
                                ))}
                                <span className="ml-1 text-gray-500">({product.rating.count})</span>
                            </p>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}