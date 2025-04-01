import React, { useRef } from "react";


export default function CategorySlider(){
    const categorysliderRef = useRef(null);
    const scrollCategoryLeft = () => categorysliderRef.current?.scrollBy({ left: -200, behavior: "smooth" });
    const scrollCategoryRight = () => categorysliderRef.current?.scrollBy({ left: 200, behavior: "smooth" });

    const categories = [
        { name: "Phones", icon: "icons/mobile-phone-black.png" },
        { name: "Computers", icon: "icons/computer-black.png" },
        { name: "SmartWatch", icon: "icons/smartwatch-black.png" },
        { name: "Camera", icon: "icons/camera-black.png" },
        { name: "HeadPhones", icon: "icons/headphones-black.png" },
        { name: "Gaming", icon: "icons/gaming-black.png" },
        { name: "Tablets", icon: "icons/tablet-black.png" },
        { name: "Drones", icon: "icons/drone-black.png" },
        { name: "Speakers", icon: "icons/speaker-black.png" },
    ];


    return(
        <div className="border-t border-gray-300 lg:mb-12">
            <div className="mt-10 lg:mt-16">
                <div className="flex items-center">
                    <div className="w-5 h-10 bg-[#DB4444]"></div>
                    <span className="ml-4 text-[#DB4444] font-semibold">Categories</span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 mb-6 gap-4">
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center md:text-left">
                    Browse By Category
                </p>

                <div className="flex space-x-2 justify-center md:justify-end">
                    <button
                        onClick={scrollCategoryLeft}
                        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200"
                    >
                        🡠
                    </button>
                    <button
                        onClick={scrollCategoryRight}
                        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200"
                    >
                        🡢
                    </button>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div
                    ref={categorysliderRef}
                    className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto scroll-smooth no-scrollbar py-4"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {categories.map((category, index) => (
                        <div key={index} className="w-40 sm:w-48 flex-shrink-0 p-6 border border-gray-400 cursor-pointer hover:bg-[#DB4444] transition-shadow">
                            <div className="flex items-center justify-center mb-4">
                                <img src={category.icon} alt={category.name} className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="uppercase font-semibold text-sm md:text-base text-center">{category.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}