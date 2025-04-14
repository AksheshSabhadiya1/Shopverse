import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { LogOut, Menu, User, X } from "lucide-react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import SliderContext from "../../context/SliderData/SliderContext";
import AdminDataContext from "../../context/AdminData/AdminDataContext";
import axios from "axios";

export default function Header() {
    const { sliderOpen, setSliderOpen } = useContext(SliderContext);
    const [adminDropDown, setAdminDropDown] = useState(false)
    const { pathname } = useLocation();
    const navigate = useNavigate()
    const path = pathname.split("/").filter(Boolean)[1]

    const {currentAdmin, setCurrentAdmin} = useContext(AdminDataContext)

    const logoutAdmin = async() => {
        await axios.get('http://localhost:5000/admin/logout',{ withCredentials: true })
        .then(() => setCurrentAdmin(null))
        .catch(()=> console.log("Logout not Done"))
        .finally(()=> {setAdminDropDown(false), navigate('/admin/signin')} )
    }


    return (
        <div className="flex w-full fixed top-0 z-50">
            {sliderOpen && (
                <div className="fixed top-0 left-0 h-full w-64 transition-all bg-white shadow-lg z-40">
                    <Sidebar />
                </div>
            )}

            <div className={`flex-1 transition-all duration-300 ${sliderOpen ? "ml-64" : "ml-0"}`}>
                <header className="bg-gradient-to-br from-black via-gray-800 to-black shadow-lg flex items-center px-2 py-2">
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setSliderOpen(!sliderOpen)}
                    >
                        {sliderOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    <nav className="lg:flex hidden space-x-4 lg:ml-5 items-center">
                        {path === "signin" || path === "signup" ? (
                            <div className="flex gap-3">
                                <NavLink
                                    to="/admin/signin"
                                    className={({ isActive }) =>
                                        `px-3 py-1 rounded transition ${isActive ? "bg-[#DB4444] text-white" : "text-white hover:bg-blue-500"}`
                                    }
                                >
                                    Signin
                                </NavLink>
                                <NavLink
                                    to="/admin/signup"
                                    className={({ isActive }) =>
                                        `px-3 py-1 rounded transition ${isActive ? "bg-[#DB4444] text-white" : "text-white hover:bg-blue-500"}`
                                    }
                                >
                                    Signup
                                </NavLink>
                            </div>
                        ) : (
                            <div className="flex justify-between mx-auto items-center w-full">
                                <div className="space-x-2 flex">
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
                                <div className={`${adminDropDown && "bg-[#DB4444] text-white"} w-8 h-8 flex items-center justify-center rounded-full absolute right-5 `}>
                                    <button onClick={() => setAdminDropDown(!adminDropDown)}>
                                        <User className="text-white" />
                                    </button>
                                </div>
                                {
                                    currentAdmin &&
                                <div
                                    className={`absolute right-0 md:right-0 top-12 w-28 sm:w-46 md:w-54 bg-white text-black divide-y divide-gray-100 rounded shadow-lg transition-all duration-300 ${adminDropDown ? "block" : "hidden"
                                        }`}
                                >
                                    <div className="px-4 py-3 text-sm">
                                        <div className="font-semibold">{currentAdmin.firstname} {currentAdmin.lastname}</div>
                                        <div className="font-medium truncate text-gray-500">{currentAdmin.email}</div>
                                    </div>
                                    <div className="mt-auto">
                                        <button onClick={()=> logoutAdmin()} className="w-full cursor-pointer flex items-center gap-4 px-4 py-3 bg-red-500 hover:bg-red-700 hover:text-white rounded-b transition-all">
                                                <LogOut className="sidebar-icon" /> <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                                }
                            </div>
                        )}
                    </nav>

                    <nav className="lg:hidden flex flex-col items-center space-y-4 py-4">
                        {path === "signin" || path === "signup" ? (
                            <div className="flex gap-3">
                                <NavLink
                                    to="/admin/signin"
                                    className={({ isActive }) =>
                                        `px-3 py-1 rounded transition ${isActive ? "bg-[#DB4444] text-white" : "text-white hover:bg-blue-500"}`
                                    }
                                >
                                    Signin
                                </NavLink>
                                <NavLink
                                    to="/admin/signup"
                                    className={({ isActive }) =>
                                        `px-3 py-1 rounded transition ${isActive ? "bg-[#DB4444] text-white" : "text-white hover:bg-blue-500"}`
                                    }
                                >
                                    Signup
                                </NavLink>
                            </div>
                        ) : (
                            <div className="space-y-4 text-center">
                                <NavLink
                                    to="/admin"
                                    className={({ isActive }) =>
                                        `block px-3 py-1 rounded transition ${isActive ? "bg-[#DB4444] text-white" : "text-white hover:bg-blue-500"}`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    to="/admin/products"
                                    className={({ isActive }) =>
                                        `block px-3 py-1 rounded transition ${isActive ? "bg-[#DB4444] text-white" : "text-white hover:bg-blue-500"}`
                                    }
                                >
                                    Products
                                </NavLink>
                                <NavLink
                                    to="/admin/users"
                                    className={({ isActive }) =>
                                        `block px-3 py-1 rounded transition ${isActive ? "bg-[#DB4444] text-white" : "text-white hover:bg-blue-500"}`
                                    }
                                >
                                    Users
                                </NavLink>
                                <div className={`${adminDropDown && "bg-[#DB4444] text-white"} w-8 h-8 flex items-center justify-center rounded-full`}>
                                    <button onClick={() => setAdminDropDown(!adminDropDown)} >
                                        <User className="text-white" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </nav>
                </header>

                <div className="w-full bg-gradient-to-br from-black via-gray-800 to-black py-3 px-4 shadow-inner">
                    <Breadcrumb />
                </div>
            </div>
        </div>
    );
}
