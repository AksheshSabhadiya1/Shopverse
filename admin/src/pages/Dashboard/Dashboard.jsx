import React, {useState} from "react";
import { FaBox, FaUsers } from "react-icons/fa";


export default function Dashboard(){
    const [totalProducts, setTotalProducts] = useState(120);
    const [totalUsers, setTotalUsers] = useState(50);
    
    return (
      <div className="">
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        <div className="bg-white/10 backdrop-blur-lg shadow-xl p-6 rounded-2xl flex items-center space-x-6 hover:scale-105 transition-all duration-300 border border-white">
          <FaBox className="text-blue-400 text-5xl" />
          <div>
            <h2 className="text-xl font-semibold text-white">Total Products</h2>
            <p className="text-2xl font-bold text-blue-300">{totalProducts}</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg shadow-xl p-6 rounded-2xl flex items-center space-x-6 hover:scale-105 transition-all duration-300 border border-white">
          <FaUsers className="text-green-400 text-5xl" />
          <div>
            <h2 className="text-xl font-semibold text-white">Total Users</h2>
            <p className="text-2xl font-bold text-green-300">{totalUsers}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    )
}