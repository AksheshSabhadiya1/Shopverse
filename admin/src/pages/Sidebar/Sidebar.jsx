import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBox, FaUsers, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
    const [productDropDown, setProductDropDown] = useState(false);
    const [userDropDown, setUserDropDown] = useState(false);

    useEffect(() => {
        function handleClick(event) {
            if (!event.target.closest(".dropdown-container")) {
                setProductDropDown(false);
            }
            if (!event.target.closest(".dropdown-container2")) {
                setUserDropDown(false);
            }
        }
        
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0 flex flex-col p-4 shadow-lg">
            <div className="text-2xl font-bold text-center py-4">
                ShopVerse <span className="text-blue-400">Admin</span>
            </div>
            <nav className="mt-4 space-y-5">
                <NavLink to="/admin" className="sidebar-link flex items-center space-x-4">
                    <FaHome className="sidebar-icon" /> <span>Dashboard</span>
                </NavLink>
                <div className="relative dropdown-container">
                    <button onClick={(e) => { e.stopPropagation(); setProductDropDown(!productDropDown); }}
                        className="sidebar-link flex items-center space-x-4 w-full text-left">
                        <FaBox className="sidebar-icon" /> <span>Products</span> <img src="/icons/arrow-down-white.png" alt="" className={`${productDropDown ? "rotate-180" : "rotate-0"} w-4 h-4`} />
                    </button>
                    {productDropDown && (
                        <div className=" bg-gray-800 rounded-md shadow-lg py-2 w-full mt-2">
                            <NavLink to="/admin/products" className="block px-4 py-2 hover:bg-[#DB4444] hover:text-white transition">View All Products</NavLink>
                            <NavLink to="/admin/products/addproduct" className="block px-4 py-2 hover:bg-[#DB4444] hover:text-white transition">Add Product</NavLink>
                            <NavLink to="/admin/products/editproduct" className="block px-4 py-2 hover:bg-[#DB4444] hover:text-white transition">Edit Product</NavLink>
                        </div>
                    )}
                </div>
                <div className="relative dropdown-container2">
                    <button onClick={(e) => { e.stopPropagation(); setUserDropDown(!userDropDown); }}
                        className="sidebar-link flex items-center space-x-4 w-full text-left">
                        <FaUsers className="sidebar-icon" /> <span>Users</span> <img src="/icons/arrow-down-white.png" alt="" className={`${userDropDown ? "rotate-180" : "rotate-0"} w-4 h-4`} />
                    </button>
                    {userDropDown && (
                        <div className=" bg-gray-800 rounded-md shadow-lg py-2 w-full mt-2">
                            <NavLink to="/admin/users" className="block px-4 py-2 hover:bg-[#DB4444] hover:text-white transition">View All Users</NavLink>
                            <NavLink to="/admin/users/approveduser" className="block px-4 py-2 hover:bg-[#DB4444] hover:text-white transition">Approved Users</NavLink>
                            <NavLink to="/admin/users/notapproveduser" className="block px-4 py-2 hover:bg-[#DB4444] hover:text-white transition">Not Approved Users</NavLink>
                        </div>
                    )}
                </div>
            </nav>
            <div className="mt-auto">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left bg-red-500 text-gray-300 text-white transition-all">
                    <FaSignOutAlt className="sidebar-icon" /> Logout
                </button>
            </div>
        </div>
    );
}