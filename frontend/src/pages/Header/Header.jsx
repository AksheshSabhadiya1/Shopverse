import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userDropDown, setUserDropDown] = useState(false);

    const { pathname } = useLocation()
    const path = pathname.split('/').filter((x) => x).toString()

    return (
        <header className="shadow sticky z-50 top-0">
            <div className="flex flex-wrap bg-black text-white justify-center py-2 items-center text-center">
                <p className="font-light sm:text-base mb-2 sm:mb-0 max-w-[60%] sm:max-w-full">
                    Summer Sale For All Swim Suits And Free Express Delivery - <span className="font-bold">50% OFF!</span>
                    <Link to="#" className="flex-shrink-0">
                        <span className="ms-2 underline font-bold hover:text-orange-500 transition-all">Shop Now</span>
                    </Link>
                </p>
                <div className="fixed right-0 flex items-center max-w-[50%] text-sm sm:text-base">
                    <span>English</span>
                    <img src="/icons/DropDown.png" alt="Dropdown" className="w-4 h-4 ml-1" />
                </div>
            </div>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-4">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <strong className="mx-6">ShopVerse</strong>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            className="text-gray-800 w-70 bg-gray-200 focus:ring-2 focus:ring-orange-500 font-medium rounded-lg text-sm lg:px-5 py-2 lg:py-2.5 focus:outline-none"
                        />
                        <Link>
                            <img src="/icons/search.png" alt="search" className="relative end-10" />
                        </Link>
                        {
                            !(path === 'signup' || path === 'signin') && <div className="flex">
                                <Link>
                                    <img src="/icons/wishlist.png" alt="wishlist" className="mx-2" />
                                </Link>
                                <Link>
                                    <img src="/icons/cart.png" alt="cart" className="mx-2" />
                                </Link>
                                <button
                                    onClick={() => setUserDropDown(!userDropDown)}
                                    className="relative"
                                > {userDropDown ? <img src="/icons/login-user.png" alt="user" className="mx-2 w-8 h-8" /> : <img src="/icons/user.png" alt="user" className="mx-2 w-8 h-8" />}
                                </button>
                            </div>
                        }


                        <div
                            className={`absolute right-0 md:right-0 top-full mt-2 w-48 sm:w-56 md:w-64 bg-black/50 text-white divide-y divide-gray-100 rounded-lg shadow-lg transition-all duration-300 ${userDropDown ? "block" : "hidden"
                                }`}
                        >
                            <div className="px-4 py-3 text-sm">
                                <div className="font-semibold">Akshu Sabhadiya</div>
                                <div className="font-medium truncate text-gray-300">name@shopverse.com</div>
                            </div>
                            <div className="py-1 space-y-1">
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition">
                                    <img src="/icons/white-user.png" alt="Account" className="w-5 h-5 mr-3" /> Manage My Account
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition">
                                    <img src="/icons/bag-icon.png" alt="Orders" className="w-5 h-5 mr-3" /> My Order
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition">
                                    <img src="/icons/cancel-icon.png" alt="Cancellations" className="w-5 h-5 mr-3" /> My Cancellations
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition">
                                    <img src="/icons/star-icon.png" alt="Reviews" className="w-5 h-5 mr-3" /> My Reviews
                                </Link>
                                <Link to="#" className="flex items-center px-4 py-2 hover:bg-red-600 transition">
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
                        <div className="lg:hidden flex flex-col bg-white py-4 space-y-3 text-center">
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
