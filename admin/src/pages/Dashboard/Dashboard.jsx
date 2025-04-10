import React, { useContext, useEffect, useState } from "react";
import { FaBox, FaUsers } from "react-icons/fa";
import SliderContext from "../../context/Slidercontext";
import { NavLink } from "react-router-dom";
import {useQuery} from '@tanstack/react-query'
import { fetchAllProductData, fetchTotalUsers } from "../../API/API";
import {RingLoader} from 'react-spinners'



export default function Dashboard() {
  const { sliderOpen } = useContext(SliderContext);

  const {data: productdata, isError: isProductError, isLoading: isProductLoading} = useQuery({
    queryKey: ["products"],
    queryFn: ()=> fetchAllProductData()
  })

  const {data: userdata, isError: isUserError, isLoading: isUserLoading} = useQuery({
    queryKey: ["users"],
    queryFn: ()=> fetchTotalUsers()
  })

  if(isProductError) return <div><h1> Error : Product not found </h1></div>
  if(isUserError) return <div><h1> Error : User not found </h1></div>


  return (
    <div className={`pt-20 transition-all duration-300 ${sliderOpen ? "pl-64" : "pl-0"}`}>
      <div className="min-h-screen bg-gradient-to-br from-[#DB4444] via-gray-900 to-black px-4 sm:px-8 py-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-white mb-10 tracking-wide">Admin Dashboard</h1>
        
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
          <NavLink to="/admin/products" className="transform transition-all hover:scale-105">
            <div className="bg-white/10 backdrop-blur-md shadow-lg p-6 rounded-2xl flex items-center gap-6 border border-white/20 hover:border-blue-400 hover:shadow-blue-400/30 transition-all duration-300">
              <FaBox className="text-blue-400 text-5xl" />
              <div>
                <h2 className="text-xl font-semibold text-white">Total Products</h2>
                <p className="text-3xl font-bold text-blue-300">{productdata ? productdata.length : 0}</p>
              </div>
            </div>
          </NavLink>

          <NavLink to="/admin/users" className="transform transition-all hover:scale-105">
            <div className="bg-white/10 backdrop-blur-md shadow-lg p-6 rounded-2xl flex items-center gap-6 border border-white/20 hover:border-green-400 hover:shadow-green-400/30 transition-all duration-300">
              <FaUsers className="text-green-400 text-5xl" />
              <div>
                <h2 className="text-xl font-semibold text-white">Total Users</h2>
                <p className="text-3xl font-bold text-green-300">{userdata ? userdata.length : 0}</p>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
