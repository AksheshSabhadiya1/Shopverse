import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineSupportAgent } from "react-icons/md";


export default function EmptyProducts() {

    const navigate = useNavigate() 

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <img
                src="/images/empty product image.png"
                alt="Empty Product"
                className="w-140 h-auto mb-6"
            />
            <h2 className="text-3xl font-bold text-red-500 mb-2"> Your Products Not Found </h2>
            <button
                onClick={() => navigate('/contact')}
                className="bg-[#DB4444] flex items-center text-white px-5 py-2 rounded hover:bg-red-600 transition"
            > <MdOutlineSupportAgent className="me-2 w-6 h-6" /> Contact us
            </button>
        </div>
    )
}