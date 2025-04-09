import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Menu, X } from "lucide-react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import SliderContext from "../../context/Slidercontext";

export default function Header() {
    const { sliderOpen, setSliderOpen } = useContext(SliderContext);
    const { pathname } = useLocation();
    const path = pathname.split("/").filter(Boolean)[1];


    return (
        <div className="flex w-full fixed top-0 z-50">
            {sliderOpen && (
                <div className="fixed top-0 left-0 h-full w-64 transition-all bg-white shadow-lg z-40">
                    <Sidebar />
                </div>
            )}

            <div className={`flex-1 transition-all duration-300 ${sliderOpen ? "ml-64" : "ml-0"}`}>
                <header className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] shadow-lg flex items-center px-2 py-2">
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setSliderOpen(!sliderOpen)}
                    >
                        {sliderOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    <nav className="hidden lg:flex space-x-4 lg:ml-5 items-center">
                        {path === "signin" || path === "signup" ? (
                            <div className="flex gap-3">
                                <NavLink
                                    to="/admin/signin"
                                    className="text-white hover:bg-blue-500 px-3 py-1 rounded transition"
                                >
                                    Signin
                                </NavLink>
                                <NavLink
                                    to="/admin/signup"
                                    className="text-white hover:bg-blue-500 px-3 py-1 rounded transition"
                                >
                                    Signup
                                </NavLink>
                            </div>
                        ) : (
                            <div className="flex gap-4">
                                <NavLink
                                    to="/admin"
                                    className={({ isActive }) =>
                                        `px-3 py-1 rounded transition ${isActive ? path === "products" || path === "users" ? "text-white hover:bg-blue-500" : "bg-[#DB4444] text-white" : "text-white hover:bg-blue-500"}`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    to="/admin/products"
                                    className={({ isActive }) =>
                                        `px-3 py-1 rounded transition ${isActive ? "bg-[#DB4444] text-white" : "text-white hover:bg-blue-500"}`
                                    }
                                >
                                    Products
                                </NavLink>
                                <NavLink
                                    to="/admin/users"
                                    className={({ isActive }) =>
                                        `px-3 py-1 rounded transition ${isActive ? "bg-[#DB4444] text-white" : "text-white hover:bg-blue-500"}`
                                    }
                                >
                                    Users
                                </NavLink>
                            </div>
                        )}
                    </nav>
                </header>

                <div className="w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] py-3 px-4 shadow-inner">
                    <Breadcrumb />
                </div>
            </div>
        </div>
    );
}
