import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FindProductDetails } from "../../API/API";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ProductSlider from "../../components/ProductsAPI/ProductSlider";

export default function ProductDetails() {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const { pathname } = useLocation();
    const path = pathname.split('/')[2];

    const { data } = useQuery({
        queryKey: ['productDetails'],
        queryFn: () => FindProductDetails(path)
    });

    const handleQuantityChange = (value) => {
        const newQuantity = quantity + value;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {data?.map((product) => (
                <div key={product.id} className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 order-1">
                        <div className="border border-gray-200 rounded-lg p-8 flex justify-center items-center bg-white h-auto">
                            <div className="absolute top-58 left-41">
                            <button className="p-2 border border-gray-300 w-10 rounded-md hover:bg-gray-100 transition-colors">
                                <img src="/icons/wishlist.png" alt="Add to wishlist" className="w-6 h-6" />
                            </button>
                            </div>
                            <img src={product.image} alt={product.title} className="w-full max-h-[500px] object-contain" />
                            
                        </div>
                        <div className="flex gap-4 justify-center mt-5 order-2">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="border border-gray-200 rounded-lg p-1 w-25 h-25 flex justify-center items-center hover:border-[#DB4444] transition-colors cursor-pointer">
                                    <img src={product.image} alt={`Thumbnail ${item}`} className="w-full h-full object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="lg:w-1/3 space-y-6 order-3">
                        <div className="space-y-4">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.title}</h1>

                            <div className="flex items-center">
                                <div className="flex">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span
                                            key={index}
                                            className={index < product.rating.rate ? "text-yellow-500" : "text-gray-300"}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <span className="text-gray-500 ml-2">({product.rating.count} Reviews)</span>
                                <span className="text-green-500 ml-4">In Stock</span>
                            </div>

                            <p className="text-2xl font-semibold text-gray-900">₹{product.price * quantity}</p>

                            <p className="text-gray-600">{product.description}</p>
                        </div>

                        <div className="border-t border-b border-gray-200 py-6">
                            <div className="mb-6">
                                <h3 className="font-semibold text-lg mb-3">Color:</h3>
                                <div className="flex gap-3">
                                    {["Red", "Green", "Blue", "Black"].map((color) => (
                                        <label key={color} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="color"
                                                value={color}
                                                checked={selectedColor === color}
                                                onChange={() => setSelectedColor(color)}
                                                className="hidden"
                                            />
                                            <div className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-gray-300'} flex items-center justify-center`}>
                                                <div
                                                    className="w-6 h-6 rounded-full"
                                                    style={{ backgroundColor: color.toLowerCase() }}
                                                ></div>
                                            </div>
                                            <span>{color}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-3">Size:</h3>
                                <div className="flex gap-2">
                                    {["XS", "S", "M", "L", "XL"].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-10 h-10 border rounded-md flex items-center justify-center transition-colors ${selectedSize === size
                                                    ? 'bg-[#DB4444] text-white border-[#DB4444]'
                                                    : 'border-gray-300 hover:bg-[#DB4444] hover:text-white'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row sm:flex-row gap-4">
                            <div className="flex items-center border w-31 border-gray-300 rounded">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="px-4 py-2 text-lg hover:bg-[#DB4444] rounded-s hover:border-gray-400 hover:text-white"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="px-4 py-2 text-lg hover:bg-[#DB4444] rounded-e hover:border-gray-400 hover:text-white"
                                >
                                    +
                                </button>
                            </div>

                            <button className="md:flex-1 bg-[#DB4444] sm:flex-1 text-white py-2 px-6 rounded hover:bg-[#c33a3a] transition-colors">
                                Buy Now
                            </button>

                            
                        </div>

                        <div className="border border-gray-200 rounded p-4 mt-6">
                            <div className="flex flex-col sm:flex-row items-start gap-4 pb-4 border-b border-gray-200">
                                <img src="/icons/delivery-icon.png" alt="Delivery" className="w-6 h-6 sm:w-8 sm:h-8 mt-1" />
                                <div>
                                    <p className="font-medium text-base sm:text-lg">Free Delivery</p>
                                    <Link to="#" className="text-[#DB4444] border-b border-[#DB4444] text-sm sm:text-base">
                                        Enter your postal code for Delivery Availability
                                    </Link>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                                <img src="/icons/return-icon.png" alt="Return" className="w-6 h-6 sm:w-8 sm:h-8 mt-1" />
                                <div>
                                    <p className="font-medium text-base sm:text-lg">Return Delivery</p>
                                    <p className="text-sm sm:text-base">
                                        Free 30 Days Delivery Returns.{" "}
                                        <Link to="#" className="text-[#DB4444] border-b border-[#DB4444]">
                                            Details
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ))}

            <div className="px-6 py-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-4">
                    <div className="flex items-center">
                        <div className="w-5 h-10 bg-[#DB4444] rounded"></div>
                        <span className="ml-4 text-[#DB4444] font-semibold">Related Items</span>
                    </div>
                </div>
                <ProductSlider />
            </div>

        </div>
    );
}