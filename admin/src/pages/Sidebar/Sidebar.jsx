import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
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
        <div className="h-screen w-64 bg-gradient-to-br from-black via-gray-800 to-black text-white fixed left-0 top-0 flex flex-col p-4 shadow-lg overflow-y-auto">
            <div className="text-2xl flex font-bold text-center mx-2 py-5 tracking-wide border-b border-white/20">
                ShopVerse <span className="text-blue-400">Admin</span>
            </div>

            <nav className="mt-6 flex-1 space-y-4">
                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        `sidebar-link flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-blue-400 transition ${isActive ? "bg-blue-500" : ""}`
                    }
                >
                    <FaHome className="sidebar-icon" /> <span className="font-medium">Dashboard</span>
                </NavLink>

                <div className="relative dropdown-container">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setProductDropDown(!productDropDown);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2 rounded bg-white/5 hover:bg-white/10 transition-all duration-200 backdrop-blur-lg border border-white/10"
                    >
                        <div className="flex items-center gap-3">
                            <FaBox className="text-blue-400 text-lg" />
                            <span className="text-white font-medium">Products</span>
                        </div>
                        <img
                            src="/icons/arrow-down-white.png"
                            alt="Dropdown"
                            className={`w-4 h-4 transform transition-transform duration-300 ${productDropDown ? "rotate-180" : ""}`}
                        />
                    </button>

                    {productDropDown && (
                        <div className="mt-2 ml-2 pl-2 border-l border-blue-500 space-y-1 transition-all duration-300 ease-in-out">
                            <NavLink
                                to="/admin/products"
                                className="block px-4 py-2 text-white rounded-md hover:bg-blue-500 hover:text-white transition-all"
                            >
                                View All Products
                            </NavLink>
                            <NavLink
                                to="/admin/products/addproduct"
                                className="block px-4 py-2 text-white rounded-md hover:bg-green-500 hover:text-white transition-all"
                            >
                                Add New Product
                            </NavLink>
                        </div>
                    )}
                </div>


                <div className="relative dropdown-container2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setUserDropDown(!userDropDown);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2 rounded bg-white/5 hover:bg-white/10 transition-all duration-200 backdrop-blur-lg border border-white/10"
                    >
                        <div className="flex items-center gap-3">
                            <FaUsers className="text-blue-400 text-lg" />
                            <span className="text-white font-medium">Users</span>
                        </div>
                        <img
                            src="/icons/arrow-down-white.png"
                            alt="Dropdown"
                            className={`w-4 h-4 transform transition-transform duration-300 ${userDropDown ? "rotate-180" : ""}`}
                        />
                    </button>

                    {userDropDown && (
                        <div className="mt-2 ml-2 pl-2 border-l border-blue-500 space-y-1 transition-all duration-300 ease-in-out">
                            <NavLink
                                to="/admin/users"
                                className="block px-4 py-2 text-white rounded-md hover:bg-blue-500 hover:text-white transition-all"
                            >
                                View All Users
                            </NavLink>
                            <NavLink
                                to="/admin/users/approveduser"
                                className="block px-4 py-2 text-white rounded-md hover:bg-green-500 hover:text-white transition-all"
                            >
                                Approved Users
                            </NavLink>
                            <NavLink
                                to="/admin/users/notapproveduser"
                                className="block px-4 py-2 text-white rounded-md hover:bg-red-500 hover:text-white transition-all"
                            >
                                Not Approved Users
                            </NavLink>
                        </div>
                    )}
                </div>
            </nav>

            <div className="mt-auto pt-4 border-t border-white/20">
                <Link to="/admin/signin">
                    <button className="w-full flex items-center gap-4 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md transition-all">
                        <FaSignOutAlt className="sidebar-icon" /> <span>Logout</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}
