import React from "react";
import { Link } from "react-router-dom";

export default function FeatureProducts() {
    return (
        <div>
            <div className="mt-10 lg:mt-20">
                <div className="flex items-center">
                    <div className="w-5 h-10 bg-[#DB4444]"></div>
                    <span className="ml-4 text-[#DB4444] font-semibold">Featured</span>
                </div>
            </div>

            <div className="lg:mt-5 flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center md:text-left">
                    New Arrival
                </p>
            </div>

            <div className="mt-10 w-full flex flex-col lg:flex-row lg:space-x-8">
                <div className="w-full lg:w-1/2 h-auto bg-black rounded overflow-hidden">
                    <div className="relative">
                        <img src="/images/ps5-playstation_large.png" alt="PlayStation 5" className="w-full relative top-17 object-cover p-10" />
                        <div className="text-white absolute bottom-0 left-5">
                            <h3 className="text-2xl font-bold">PlayStation 5</h3>
                            <p className="w-70">Black and White version of the PS5 coming out on sale.</p>
                            <Link href="#" className="text-white border-b">Shop Now</Link>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 space-y-8 mt-8 lg:mt-0">
                    <div className="bg-black text-white rounded overflow-hidden">
                        <div className="relative">
                            <img src="/images/attractive-woman-wearing-hat.png" alt="Women's Collections" className="w-auto h-auto object-cover relative left-35" />
                            <div className="absolute bottom-5 left-5">
                                <h3 className="text-xl font-bold">Women's Collections</h3>
                                <p className="w-65">Featured woman collections that give you another vibe.</p>
                                <Link href="#" className="text-white border-b">Shop Now</Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-8">
                        <div className="w-1/2 bg-black rounded overflow-hidden">
                            <div className="relative">
                                <img src="/images/speakers.png" alt="Speakers" className="w-auto h-auto object-cover p-6" />
                                <div className="absolute bottom-3 left-5 text-white">
                                    <h3 className="text-xl font-bold">Speakers</h3>
                                    <p>Amazon wireless speakers</p>
                                    <Link href="#" className="text-white border-b">Shop Now</Link>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/2 bg-black rounded overflow-hidden">
                            <div className="relative">
                                <img src="/images/Gucci-perfume.png" alt="Perfume" className="w-full h-auto object-cover p-6" />
                                <div className="absolute bottom-6 left-5 text-white">
                                    <h3 className="text-xl font-bold">Perfume</h3>
                                    <p>GUCCI INTENSE OUD EDP</p>
                                    <Link href="#" className="text-white border-b">Shop Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}