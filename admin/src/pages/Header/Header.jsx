import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Menu, X } from "lucide-react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import SliderContext from "../../context/Slidercontext";

export default function Header() {
    const [adminDropDown, setAdminDropDown] = useState(false);
    const { sliderOpen, setSliderOpen } = useContext(SliderContext)
    const { pathname } = useLocation()
    const path = pathname.split('/').filter(Boolean)[1]

    useEffect(() => {
        const time = setTimeout(() => {
            if (adminDropDown) setAdminDropDown(false);
        }, 2500);
        return () => clearTimeout(time);
    }, [adminDropDown]);

    return (
        <div className="flex fixed w-full">
            {sliderOpen && <div className={`fixed top-0 left-0 h-full transition-all duration-300 ${sliderOpen ? "w-64" : "w-0"} overflow-hidden`}>
                <Sidebar />
            </div>}

            <div className={`flex-1 transition-all duration-300 ${sliderOpen ? "ml-64" : "ml-0"}`}>
                <header className="shadow sticky z-50 top-0 bg-white flex justify-start items-center">
                    <button className="text-gray-700" onClick={() => setSliderOpen(!sliderOpen)}>
                        {sliderOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                    <nav className="px-4 lg:px-6 py-2">
                        <div className="hidden lg:flex space-x-4">

                            {
                                (path === 'signin' || path === 'signup') ? <p>Admin {path}</p> : <div className="flex space-x-3">
                                    <NavLink to="/admin" className={({ isActive }) => `${isActive ? "text-[#DB4444]" : "text-gray-700"} hover:text-orange-700`}>
                                        Dashboard
                                    </NavLink>

                                    <div className="relative">
                                        <NavLink to='/admin/products' className={({ isActive }) => `${isActive ? "text-[#DB4444]" : "text-gray-700"} hover:text-orange-700`}>
                                            Products
                                        </NavLink>
                                    </div>

                                    <div className="relative">
                                        <NavLink to='/admin/users' className={({ isActive }) => `${isActive ? "text-[#DB4444]" : "text-gray-700"} hover:text-orange-700`}>
                                            Users
                                        </NavLink>
                                    </div>
                                </div>
                            }
                        </div>
                    </nav>
                </header>
                <div className={`w-full bg-white transition-all duration-300 shadow-xl py-2 ${sliderOpen ? "w-64 " : "w-full px-0"}`}>
                    <Breadcrumb />
                </div>
            </div>
        </div>
    );
}
