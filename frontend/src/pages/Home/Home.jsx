import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductSlider from "../../components/ProductsAPI/ProductSlider";
import CategorySlider from "../../components/ProductsAPI/CategorySlider";
import BestSellProduct from "../../components/ProductsAPI/BestSellProduct";
import SaleClock from "../../components/Clock/SaleClock";
import FeatureProducts from "../../components/ProductsAPI/FeatureProducts";
import ExpolreProductSlider from "../../components/ProductsAPI/ExploreProductSlider";
import { ArrowUp, ArrowRight, Truck, Headset, ShieldCheck } from 'lucide-react';
import FilterContext from "../../context/FilterDropDown/FilterContextProvider";

export default function Home() {
  const [isvisible, setIsVisible] = useState(false);
  const { filterMenu } = useContext(FilterContext);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 800) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 lg:ml-40 lg:mr-30 lg:mb-10">
      <div className={`flex flex-col lg:flex-row gap-6 lg:gap-8 ${filterMenu ? "ml-70" : "w-full"}`}>
        <div className="w-full flex flex-col sm:flex-row justify-center items-center bg-black text-white p-4 sm:p-10 lg:flex-grow">
          <div className="text-center sm:text-left max-w-md">
            <div className="flex items-center justify-center sm:justify-start py-2">
              <img src="/icons/apple_logo 1.png" alt="Apple Logo" className="w-10 sm:w-12" />
              <p className="ml-4 text-sm sm:text-base">iPhone 16 Series</p>
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-semibold">Up to 10% off Voucher</p>
            <Link to="/products/apple_iphone_16" className="mt-4 flex items-center justify-center sm:justify-start group">
              <span className="ml-2 underline group-hover:text-gray-300">Shop Now</span>
              <span className="group-hover:translate-x-1"><ArrowRight /></span>
            </Link>
          </div>
          <img src="/images/iphone.png" alt="iPhone" className="w-60 sm:w-72 md:w-80 lg:w-96 mt-4" />
        </div>
      </div>

      <div className="mt-10 lg:mt-20">
        <div className="flex items-center">
          <div className="w-5 h-10 bg-[#DB4444] rounded"></div>
          <span className="ml-4 text-[#DB4444] font-semibold">Today's</span>
        </div>
      </div>
      <ProductSlider />

      <div className="my-10 flex justify-center">
        <button onClick={() => navigate('/products')} className="px-12 py-3 font-semibold bg-[#DB4444] text-white rounded hover:scale-97 duration-300">View All Products</button>
      </div>

      <div className="border-t border-gray-300 pt-10">
        <div className="flex items-center">
          <div className="w-5 h-10 bg-[#DB4444] rounded"></div>
          <span className="ml-4 text-[#DB4444] font-semibold">Categories</span>
        </div>
      </div>
      <CategorySlider />

      <div className="border-t border-gray-300 pt-10">
        <div className="flex items-center">
          <div className="w-5 h-10 bg-[#DB4444] rounded"></div>
          <span className="ml-4 text-[#DB4444] font-semibold">This Month</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 mb-6 gap-4">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center md:text-left">
            Best Selling Products
          </p>
          <div className="flex justify-center">
            <button onClick={() => navigate('/products')} className="px-12 py-3 font-semibold bg-[#DB4444] text-white rounded hover:scale-97 duration-300">View All</button>
          </div>
        </div>
      </div>
      <BestSellProduct />

      <div className="mt-15 mb-10 flex flex-col lg:flex-row items-center justify-between bg-black text-white p-6 lg:p-12 rounded-lg gap-6">
        <div className="flex flex-col text-center lg:text-left lg:max-w-xl">
          <span className="text-[#DB4444] text-lg font-semibold">Categories</span>
          <p className="text-3xl lg:text-5xl font-bold mt-2">Enhance Your Music Experience</p>
          <SaleClock />
          <div className="mt-6">
            <button onClick={() => navigate('/products/wireless_headphones')} className="px-8 py-2 font-semibold bg-[#DB4444] text-white rounded-lg hover:scale-97 duration-300">
              Buy Now
            </button>
          </div>
        </div>

        <div className="w-full flex justify-center lg:justify-end">
          <img
            src="/images/JBL_BOOMBOX.png"
            alt="JBL Boombox"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>
      </div>

      <div className="mt-10 lg:mt-20">
        <div className="flex items-center">
          <div className="w-5 h-10 bg-[#DB4444]"></div>
          <span className="ml-4 text-[#DB4444] font-semibold">Our Products</span>
        </div>

        <div className="lg:mt-5 flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center md:text-left">
            Explore Our Products
          </p>
          <div className="flex justify-center">
            <button onClick={() => navigate('/products')} className="px-12 py-3 font-semibold bg-[#DB4444] text-white rounded hover:scale-97 duration-300">View All</button>
          </div>
        </div>
      </div>
      <ExpolreProductSlider />

      <div className="flex justify-center lg:mt-5">
        <button onClick={() => navigate('/products')} className="px-12 py-3 font-semibold bg-[#DB4444] text-white rounded hover:scale-97 duration-300">View All Products</button>
      </div>

      <FeatureProducts />

      <div className="container mx-auto px-4 py-8 mt-10 sm:py-12 mb-0">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 lg:gap-10">
          {[{
            icon: <Truck className="w-8 h-8" />,
            title: "FREE AND FAST DELIVERY",
            desc: "Free delivery for all orders over $140"
          }, {
            icon: <Headset className="w-8 h-8" />,
            title: "24/7 CUSTOMER SERVICE",
            desc: "Friendly 24/7 customer support"
          }, {
            icon: <ShieldCheck className="w-8 h-8" />,
            title: "MONEY BACK GUARANTEE",
            desc: "We return money within 30 days"
          }].map((item, index) => (
            <div key={index} className="w-full max-w-xs p-6 hover:shadow-md hover:bg-[#DB4444] duration-500 rounded-lg hover:text-white transition-shadow text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="w-18 h-18 bg-gray-300 rounded-full flex justify-center items-center">
                  <div className="w-13 h-13 bg-black rounded-full text-white flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
              </div>
              <h3 className="uppercase font-bold text-sm md:text-base">{item.title}</h3>
              <p className="opacity-80 text-xs sm:text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {isvisible && (
        <button onClick={scrollTop} className="fixed bottom-10 right-5 md:right-20 w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full shadow-lg hover:bg-gray-400 transition">
          <ArrowUp />
        </button>
      )}
    </div>
  );
}
