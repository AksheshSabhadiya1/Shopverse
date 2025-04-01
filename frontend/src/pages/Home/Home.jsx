import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductSlider from "../../components/ProductsAPI/ProductSlider";
import Clock from '../../components/Clock/Clock'
import CategorySlider from "../../components/ProductsAPI/CategorySlider";
import BestSellProduct from "../../components/ProductsAPI/BestSellProduct";
import SaleClock from "../../components/Clock/SaleClock";
import AllProductSlider from "../../components/ProductsAPI/AllProductSlider";
import FeatureProducts from "../../components/ProductsAPI/FeatureProducts";

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

      <div className=" mt-20 mb-10 flex flex-col lg:flex-row items-center justify-between bg-black text-white p-6 lg:p-12">
        <div className="flex flex-col text-center lg:text-left max-w-lg">
          <span className="text-[#DB4444] text-lg font-semibold">Categories</span>
          <p className="text-3xl lg:text-5xl font-bold mt-2">Enhance Your Music Experience</p>
          <SaleClock />
          <div className="mt-6">
            <button className="px-8 py-3 cursor-pointer font-semibold bg-[#DB4444] text-white rounded-lg hover:bg-red-700">
              Buy Now
            </button>
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <img
            src="/images/JBL_BOOMBOX.png"
            alt="JBL Boombox"
            className="max-w-full h-auto"
          />
        </div>
      </div>

      <AllProductSlider />
      <div className="mb-25 flex justify-center lg:mt-4">
        <button className="px-12 py-3 cursor-pointer font-semibold bg-[#DB4444] text-white rounded hover:bg-red-700">View All Products</button>
      </div>

      <FeatureProducts />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mb-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <div className="w-full max-w-xs p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <img
                src="icons/truck-icon.png"
                alt="Fast Delivery"
                className="w-18 h-18 object-contain"
              />
            </div>
            <h3 className="uppercase font-bold text-sm md:text-base text-center mb-2">FREE AND FAST DELIVERY</h3>
            <p className="text-gray-500 text-xs sm:text-sm text-center">Free delivery for all orders over $140</p>
          </div>

          <div className="w-full max-w-xs p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <img
                src="icons/support-icon.png"
                alt="Fast Delivery"
                className="w-18 h-18 object-contain"
              />
            </div>
            <h3 className="uppercase font-bold text-sm md:text-base text-center mb-2">24/7 CUSTOMER SERVICE</h3>
            <p className="text-gray-500 text-xs sm:text-sm text-center">Friendly 24/7 customer support</p>
          </div>

          <div className="w-full max-w-xs p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <img
                src="icons/tick-icon.png"
                alt="Fast Delivery"
                className="w-18 h-18 object-contain"
              />
            </div>
            <h3 className="uppercase font-bold text-sm md:text-base text-center mb-2">MONEY BACK GUARANTEE</h3>
            <p className="text-gray-500 text-xs sm:text-sm text-center">We reurn money within 30 days</p>
          </div>
        </div>
      </div>

    </div>
  );
}
