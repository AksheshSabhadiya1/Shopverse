import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Heart, ShoppingCart, User, Search } from 'lucide-react';
import FilterContext from "../../context/FilterContext";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userDropDown, setUserDropDown] = useState(false);

    const {filterMenu, setFilterMenu} = useContext(FilterContext)

    const { pathname } = useLocation()
    const path = pathname.split('/').filter((x) => x).toString()

    useEffect(()=>{
        const time = setTimeout(()=>{
            setUserDropDown(false)
        },8000)

        return ()=> clearTimeout(time)
    }, [userDropDown])


    return (
        <header className="shadow sticky z-50 top-0">
            <div className="flex flex-wrap bg-black text-white justify-center py-2 items-center text-center">
                <p className="font-light sm:text-base mb-2 sm:mb-0 max-w-[60%] sm:max-w-full">
                    Summer Sale For All Swim Suits And Free Express Delivery - <span className="font-bold">50% OFF!</span>
                    <Link to="#" className="flex-shrink-0">
                        <span className="ms-2 border-b font-bold hover:text-orange-500 transition-all">Shop Now</span>
                    </Link>
                </p>
                <div className="fixed right-0 flex items-center max-w-[50%] text-sm sm:text-base">
                    <span>English</span>
                    <img src="/icons/DropDown.png" alt="Dropdown" className="w-4 h-4 ml-1" />
                </div>
            </div>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-4">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div className="font-bold px-5 py-2.5 focus:outline-none" type="button">
                        <button onClick={() => setFilterMenu(!filterMenu)}  className="text-gray-700">
                            {filterMenu ? <X size={28} /> : <Menu size={28} />}
                        </button>
                        <strong className="mx-6 text-3xl">ShopVerse</strong>
                    </div>

                    <div className={`absolute left-0 md:left-45 h-auto top-full border-t border-r border-gray-200 w-48 sm:w-56 md:w-64 bg-white text-black divide-y divide-gray-100 transition-all duration-300 ${filterMenu ? "block" : "hidden" }`}>
                            <div className="py-1 space-y-1">
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition">
                                <div className="flex">
                                    <p>Woman's Fashion </p> <img src="/icons/arrow-left-icon.png" className="absolute right-5" />
                                </div>
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition">
                                    <p> Men's Fashion </p> <img src="/icons/arrow-left-icon.png" className="absolute right-5" />
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition">
                                    <p> Electronics </p>
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition">
                                    <p> Home & Lifestyle </p>
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition">
                                    <p> Medicine </p>
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition">
                                    <p> Sports & Outdoor </p>
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition">
                                    <p> Baby's & Toys </p>
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition">
                                    <p> Groceries & Pets </p>
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition">
                                    <p> Health & Beauty </p>
                                </Link>
                            </div>
                        </div>
                    
                    <div className="flex items-center lg:order-2">
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            className="text-gray-800 w-70 bg-gray-200 focus:ring-2 focus:ring-orange-500 font-medium rounded-lg text-sm lg:px-5 py-2 lg:py-2.5 focus:outline-none"
                        />
                        <Link>
                            <Search className="relative end-10" />
                        </Link>
                        {
                            !(path === 'signup' || path === 'signin') && 
                            <div className="hidden space-x-5 md:flex lg:flex justify-center items-center">
                                <Link to='/wishlist'>
                                    <Heart className="hover:text-red-500" />
                                </Link>
                                <Link to='/cart'>
                                    <ShoppingCart className="hover:text-blue-500"  />
                                </Link>
                                <button
                                    onClick={() => setUserDropDown(!userDropDown)}
                                    className={`flex items-center justify-center ${userDropDown ? 'w-8 h-8 text-white bg-red-500 rounded-full' : 'w-8 h-8'}`}
                                > <User />
                                </button>
                            </div>
                        }

                            <div className="lg:hidden md:hidden flex justify-center items-center">
                                <Link to='/wishlist'>
                                    <Heart className="hover:text-red-500" />
                                </Link>
                                <Link to='/cart'>
                                    <ShoppingCart className="hover:text-blue-500"  />
                                </Link>
                                <button
                                    onClick={() => setUserDropDown(!userDropDown)}
                                    className={`flex items-center justify-center ${userDropDown ? 'w-8 h-8 text-white bg-red-500 rounded-full' : 'w-8 h-8'}`}
                                > <User />
                                </button>
                            </div>


                        <div
                            className={`absolute right-0 md:right-30 top-26 w-48 sm:w-56 md:w-64 bg-black/50 text-white divide-y divide-gray-100 rounded-lg shadow-lg transition-all duration-300 ${userDropDown ? "block" : "hidden"
                                }`}
                        >
                            <div className="px-4 py-3 text-sm">
                                <div className="font-semibold">Akshu Sabhadiya</div>
                                <div className="font-medium truncate text-gray-300">name@shopverse.com</div>
                            </div>
                            <div className="py-1 space-y-1">
                                <Link to="/my-account" className="flex items-center px-4 py-2 hover:bg-[#DB4444] transition">
                                    <img src="/icons/white-user.png" alt="Account" className="w-5 h-5 mr-3" /> Manage My Account
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-[#DB4444] transition">
                                    <img src="/icons/bag-icon.png" alt="Orders" className="w-5 h-5 mr-3" /> My Order
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-[#DB4444] transition">
                                    <img src="/icons/cancel-icon.png" alt="Cancellations" className="w-5 h-5 mr-3" /> My Cancellations
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-[#DB4444] transition">
                                    <img src="/icons/star-icon.png" alt="Reviews" className="w-5 h-5 mr-3" /> My Reviews
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-red-700 transition">
                                    <img src="/icons/logout-icon.png" alt="Logout" className="w-5 h-5 mr-3" /> Logout
                                </Link>
                            </div>
                        </div>

                    </div>

                    <button className="lg:hidden p-2 text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    <div className="hidden lg:flex space-x-6">
                        <NavLink to="/" className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`}>
                            <span className="mb-2 font-semibold">Home</span>
                        </NavLink>
                        <NavLink to="/about" className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`}>
                            <span className="mb-2 font-semibold">About</span>
                        </NavLink>
                        <NavLink to="/contact" className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`}>
                            <span className="mb-2 font-semibold">Contact</span>
                        </NavLink>
                        <NavLink to="/signup" className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`}>
                            <span className="mb-2 font-semibold">Signup</span>
                        </NavLink>
                    </div>

                    {menuOpen && (
                        <div className="lg:hidden flex flex-col bg-white py-4 space-y-3 justify-center items-center text-center">
                            <NavLink to="/" className="text-gray-700 hover:text-orange-700" onClick={() => setMenuOpen(false)}>Home</NavLink>
                            <NavLink to="/about" className="text-gray-700 hover:text-orange-700" onClick={() => setMenuOpen(false)}>About</NavLink>
                            <NavLink to="/contact" className="text-gray-700 hover:text-orange-700" onClick={() => setMenuOpen(false)}>Contact</NavLink>
                            <NavLink to="/signup" className="text-gray-700 hover:text-orange-700" onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
                        </div>
                        
                    )}
                </div>
            </nav>
        </header>
    );
}
