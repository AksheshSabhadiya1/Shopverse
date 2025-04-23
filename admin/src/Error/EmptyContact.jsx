import React from "react";
import { useNavigate } from "react-router-dom";


export default function EmptyContact() {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <h2 className="text-3xl font-bold text-red-500 mb-2"> Contact Message Not Found </h2>
            <button
                onClick={() => navigate('/admin')}
                className="bg-[#DB4444] text-white px-5 py-2 mb-5 rounded hover:bg-red-600 transition"
            > Go to Dashboard
            </button>
        </div>
    )
}