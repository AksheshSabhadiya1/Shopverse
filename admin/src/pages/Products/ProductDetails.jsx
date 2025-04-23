import React, { useState, useContext, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fetchProductData } from "../../API/API";
import SliderContext from "../../context/SliderData/SliderContextProvider";


export default function ProductDetails() {
    const { sliderOpen } = useContext(SliderContext);
    const { id } = useParams();

    const {data: product, isError} = useQuery({
        queryKey: ['productDetails'],
        queryFn: ()=> fetchProductData(id)
    })

    if(isError) return <div><p className="text-gray-300 text-lg">No product data available.</p></div>

    return (
        <div className={`pt-0 ${sliderOpen ? "pl-64" : "pl-0"}`}>
            <div className="min-h-screen pt-10 w-full bg-gradient-to-br from-black via-gray-900 to-black flex justify-center items-center p-6">
                {product?.map((product) => (
                    <div key={product.id} className="max-w-5xl w-full bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-8">

                        <div className="w-full md:w-1/2 flex justify-center">
                            <img
                                src={`http://localhost:5000/uploads/products/${product.image}`}
                                alt={product.productname}
                                className="w-full h-80 object-contain rounded"
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold mb-3 capitalize">{product.productname}</h2>
                            <p className="text-gray-300 text-sm mb-2">{product.description}</p>
                            <div className="flex space-x-2">
                            <p className="text-blue-400 text-2xl font-semibold mb-4">₹{product.sellingprice}</p>
                            <p className="text-gray-400 text-base font-semibold line-through mb-4">₹({product.originalprice})</p>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-4">
                                <span>Category: <strong>{product.category}</strong></span>
                                <span>Brand: <strong>{product.brand}</strong></span>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-4">
                                <div className="flex justify-around items-center">Rating: 
                                    <span className="space-x-0.5">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span
                                            key={index}
                                            className={index < product.rating ? "text-yellow-500" : "text-gray-300"}
                                        >
                                            ★
                                        </span>
                                    ))}
                                    </span>({product.rating})
                                </div>
                                <span>Rated by: {product.rate_count} users</span>
                            </div>

                            <p className="text-sm text-gray-300 mb-4">Stock: {product.stock_count} units</p>

                            <NavLink to={`/admin/products/editproduct/${product.slug}`}>
                                <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white transition-all">
                                    Edit Product
                                </button>
                            </NavLink>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
