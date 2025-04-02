import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { Categories } from "../../API/API";
import {RingLoader} from 'react-spinners';


export default function CategorySlider(){
    const categorysliderRef = useRef(null);
    const scrollCategoryLeft = () => categorysliderRef.current?.scrollBy({ left: -200, behavior: "smooth" });
    const scrollCategoryRight = () => categorysliderRef.current?.scrollBy({ left: 200, behavior: "smooth" });


    const {data, isError, isLoading, error} = useQuery({
        queryKey: ['categories'],
        queryFn: () => Categories()
    })

    if(isLoading) return <div className="flex justify-center items-center m-50"><RingLoader color="#DB4444" /></div>
    if(isError) return <div><h1> Error : {error.message || "Something Went Wrong!!"} </h1></div>


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
                    {data?.map((category, index) => (
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