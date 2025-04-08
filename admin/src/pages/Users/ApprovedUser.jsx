import React, { useState, useContext } from "react";
import SliderContext from "../../context/Slidercontext";

export default function ApprovedUser() {
    const [users, setProducts] = useState([
        { id: 1, name: "Wireless Headphones", price: "$99", description: "High-quality sound with noise cancellation.", image: "/images/headphones.png" },
        { id: 2, name: "Smartwatch", price: "$199", description: "Track your health and fitness with ease.", image: "/images/smartwatch.png" },
        { id: 3, name: "Gaming Mouse", price: "$49", description: "Ergonomic design with RGB lighting.", image: "/images/mouse.png" },
        { id: 4, name: "Bluetooth Speaker", price: "$79", description: "Portable speaker with deep bass.", image: "/images/speaker.png" },
    ]);

    const {sliderOpen} = useContext(SliderContext)


    return (
    <div className={`pt-15 ${sliderOpen ? " pl-64" : "pl-0"}`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex flex-col items-center p-6">
            <h2 className="text-3xl font-bold text-white mb-6">Approved users</h2>
            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="p-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl shadow-md hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
                        >
                            <img src={user.image} alt={user.name} className="w-24 h-24 object-contain mb-3" />
                            <h3 className="text-lg font-semibold">{user.name}</h3>
                            <p className="text-sm text-gray-300">{user.description}</p>
                            <p className="mt-2 text-lg font-bold text-blue-400">{user.price}</p>
                            <button title="click to toggle" className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                Approved
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-300 w-full col-span-4">No Approved users available.</p>
                )}
            </div>
        </div>
        </div>
    );
}
