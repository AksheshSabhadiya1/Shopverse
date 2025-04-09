import React, {useContext, useEffect, useState} from "react";
import { FaBox, FaUsers } from "react-icons/fa";
import SliderContext from "../../context/Slidercontext";
import axios from "axios";
import { NavLink } from "react-router-dom";


export default function Dashboard(){
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    const {sliderOpen} = useContext(SliderContext)

    const fetchTotalProducts = async() => {
        try {
            const {data} = await axios.get('http://localhost:5000/admin/products', {
                withCredentials: true
            })
            data.length > 0 ? setTotalProducts(data.length) : 0
        } catch (error) {
            console.log("Error while fetching total products data");
        }
    }

    const fetchTotalUsers = async() => {
      try {
          const {data} = await axios.get('http://localhost:5000/admin/users', {
              withCredentials: true
          })
          data.length > 0 ? setTotalUsers(data.length) : 0
      } catch (error) {
          console.log("Error while fetching total users data");
      }
  }

  useEffect(()=>{
    fetchTotalProducts()
    fetchTotalUsers()
  },[])
    
    return (
      <div className={`pt-15 ${sliderOpen ? " pl-64" : "pl-0"}`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        <NavLink to='/admin/products' >
        <div className="bg-white/10 backdrop-blur-lg shadow-xl p-6 rounded-2xl flex items-center space-x-6 hover:scale-105 transition-all duration-300 border border-white">
          <FaBox className="text-blue-400 text-5xl" />
          <div>
            <h2 className="text-xl font-semibold text-white">Total Products</h2>
            <p className="text-2xl font-bold text-blue-300">{totalProducts}</p>
          </div>
        </div>
        </NavLink>
        <NavLink to='/admin/users' >
        <div className="bg-white/10 backdrop-blur-lg shadow-xl p-6 rounded-2xl flex items-center space-x-6 hover:scale-105 transition-all duration-300 border border-white">
          <FaUsers className="text-green-400 text-5xl" />
          <div>
            <h2 className="text-xl font-semibold text-white">Total Users</h2>
            <p className="text-2xl font-bold text-green-300">{totalUsers}</p>
          </div>
        </div>
        </NavLink>
      </div>
    </div>
    </div>
    )
}