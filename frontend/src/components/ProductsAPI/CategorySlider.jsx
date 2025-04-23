import React, { useRef } from "react";
import { ArrowRight, ArrowLeft, Smartphone, Headphones, House, BoomBox, BriefcaseMedical } from 'lucide-react'
import { IoIosMan, IoIosWoman  } from "react-icons/io";
import { GiRunningShoe, GiFruitTree } from "react-icons/gi";
import { MdDevicesOther } from "react-icons/md";
import { Link } from "react-router-dom";


export default function CategorySlider(){
    const categorysliderRef = useRef(null);
    const scrollCategoryLeft = () => categorysliderRef.current?.scrollBy({ left: -200, behavior: "smooth" });
    const scrollCategoryRight = () => categorysliderRef.current?.scrollBy({ left: 200, behavior: "smooth" });


    return(
        <div className=" lg:mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 mb-6 gap-4">
                            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center md:text-left">
                                Browse By Category
                            </p>
            
                            <div className="flex space-x-2 justify-center md:justify-end">
                                <button
                                    onClick={scrollCategoryLeft}
                                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200"
                                >
                                    <ArrowLeft />
                                </button>
                                <button
                                    onClick={scrollCategoryRight}
                                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200"
                                >
                                    <ArrowRight />
                                </button>
                            </div>
                        </div>

            <div className="relative overflow-hidden">
                <div
                    ref={categorysliderRef}
                    className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto scroll-smooth no-scrollbar py-4"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    <Link to="/products/allCategory/Men's_Fashion">
                        <div className="w-40 h-35 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <IoIosMan className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Men's Fashion</h3>
                        </div>
                    </Link>
                    <Link to="/products/allCategory/Women's_Fashion">
                        <div className="w-40 h-35 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <IoIosWoman className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-base md:text-base text-center">Women's Fashion</h3>
                        </div>
                    </Link>
                    <Link to="/products/allCategory/Footwear">
                        <div className="w-40 h-35 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <GiRunningShoe  className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Footwear</h3>
                        </div>
                    </Link>
                    <Link to="/products/allCategory/Electronics">
                        <div className="w-40 h-35 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <Smartphone className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Electronics</h3>
                        </div>
                    </Link>
                    <Link to="/products/allCategory/Bluetooth_&_Speakers">
                        <div className="w-40 h-35 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <BoomBox className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Bluetooth & Speakers</h3>
                        </div>
                    </Link>
                    <Link to="/products/allCategory/Home_&_Kitchen">
                        <div className="w-40 h-35 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <House className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Home & Kitchen</h3>
                        </div>
                    </Link>
                    <Link to="/products/allCategory/Groceries_&_Pets">
                        <div className="w-40 h-35 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <GiFruitTree  className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Groceries & Pets</h3>
                        </div>
                    </Link>
                    <Link to="/products/allCategory/Electronics">
                        <div className="w-40 h-35 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <Headphones className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Headphones</h3>
                        </div>
                    </Link>
                    <Link to="/products/allCategory/Accessories">
                        <div className="w-40 h-35 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <MdDevicesOther className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Accessories</h3>
                        </div>
                    </Link>
                    <Link to="/products/allCategory/Medicine">
                        <div className="w-40 h-35 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <BriefcaseMedical className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Medicine</h3>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}