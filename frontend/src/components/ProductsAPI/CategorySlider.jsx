import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import {RingLoader} from 'react-spinners';
import {ArrowRight, ArrowLeft, LaptopMinimal, Smartphone, Watch, Camera, Headphones, Gamepad, Tablet, Speaker,  } from 'lucide-react'


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
                        <div className="w-40 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <Smartphone className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Phones</h3>
                        </div>
                        <div className="w-40 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <LaptopMinimal className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Computers</h3>
                        </div>
                        <div className="w-40 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <Watch className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">SmartWatch</h3>
                        </div>
                        <div className="w-40 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <Camera  className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Camera</h3>
                        </div>
                        <div className="w-40 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <Headphones className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Headphones</h3>
                        </div>
                        <div className="w-40 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <Gamepad className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Gaming</h3>
                        </div>
                        <div className="w-40 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <Tablet  className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Tablet</h3>
                        </div>
                        <div className="w-40 hover:text-white sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <Speaker  className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">Speakers</h3>
                        </div>
                </div>
            </div>
        </div>
    )
}