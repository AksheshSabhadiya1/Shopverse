import React, { useContext, useEffect, useState } from "react";
import { FaBox, FaUsers } from "react-icons/fa";
import SliderContext from "../../context/Slidercontext";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const { sliderOpen } = useContext(SliderContext);

  const fetchTotalProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/admin/products", {
        withCredentials: true,
      });
      if (data?.length) setTotalProducts(data.length);
    } catch (error) {
      console.log("Error while fetching total products data");
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/admin/users", {
        withCredentials: true,
      });
      if (data?.length) setTotalUsers(data.length);
    } catch (error) {
      console.log("Error while fetching total users data");
    }
  };

  useEffect(() => {
    fetchTotalProducts();
    fetchTotalUsers();
  }, []);

  return (
    <div className={`pt-20 transition-all duration-300 ${sliderOpen ? "pl-64" : "pl-0"}`}>
      <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 sm:px-8 py-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-white mb-10 tracking-wide">Admin Dashboard</h1>
        
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
          <NavLink to="/admin/products" className="transform transition-all hover:scale-105">
            <div className="bg-white/10 backdrop-blur-md shadow-lg p-6 rounded-2xl flex items-center gap-6 border border-white/20 hover:border-blue-400 hover:shadow-blue-400/30 transition-all duration-300">
              <FaBox className="text-blue-400 text-5xl" />
              <div>
                <h2 className="text-xl font-semibold text-white">Total Products</h2>
                <p className="text-3xl font-bold text-blue-300">{totalProducts}</p>
              </div>
            </div>
          </NavLink>

          <NavLink to="/admin/users" className="transform transition-all hover:scale-105">
            <div className="bg-white/10 backdrop-blur-md shadow-lg p-6 rounded-2xl flex items-center gap-6 border border-white/20 hover:border-green-400 hover:shadow-green-400/30 transition-all duration-300">
              <FaUsers className="text-green-400 text-5xl" />
              <div>
                <h2 className="text-xl font-semibold text-white">Total Users</h2>
                <p className="text-3xl font-bold text-green-300">{totalUsers}</p>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
