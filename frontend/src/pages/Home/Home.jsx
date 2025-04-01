import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductSlider from "../../components/ProductsAPI/ProductSlider";
import Clock from '../../components/Clock/Clock'
import CategorySlider from "../../components/ProductsAPI/CategorySlider";
import BestSellProduct from "../../components/ProductsAPI/BestSellProduct";

export default function Home() {
  
  


  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 lg:ml-40 lg:mr-30 lg:mb-10">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="relative w-full lg:w-64 bg-white text-black border-gray-200 divide-y divide-gray-100">
          <div className="py-1 space-y-1">
            {["Woman's Fashion", "Men's Fashion", "Electronics", "Home & Lifestyle", "Medicine", "Sports & Outdoor", "Baby's & Toys", "Groceries & Pets", "Health & Beauty"].map((category, index) => (
              <Link key={index} to="#" className="flex justify-between px-4 py-2 hover:bg-[#DB4444] hover:text-white">
                <p>{category}</p>
                <img src="/icons/arrow-left-icon.png" className="w-4 h-4" alt="arrow" />
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-center items-center bg-black text-white p-4 sm:p-10 lg:flex-grow">
          <div className="text-center sm:text-left">
            <div className="flex items-center text-center py-2">
              <img src="/icons/apple_logo 1.png" alt="Apple Logo" className="w-10 sm:w-12" />
              <p className="ml-4 text-sm sm:text-base">iPhone 14 Series</p>
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-semibold">Up to 10% off Voucher</p>
            <Link to="/" className="mt-4 flex items-center group">
              <span className="ml-2 underline group-hover:text-gray-300">Shop Now</span>
              <span className="group-hover:translate-x-1">🡢</span>
            </Link>
          </div>
          <img src="/images/iphone.png" alt="iPhone" className="w-78 sm:w-70 md:w-70 lg:w-75 mt-4" />
        </div>
      </div>

      
      <ProductSlider />

      <div className="mb-15 flex justify-center lg:mt-4">
        <button className="px-12 py-3 cursor-pointer font-semibold bg-[#DB4444] text-white rounded hover:bg-red-700">View All Products</button>
      </div>

      <CategorySlider />
      
      <BestSellProduct />
      
    </div>
  );
}
