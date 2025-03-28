import React, { useState } from "react"; 
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userDropDown, setUserDropDown] = useState(false);

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
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <strong>ShopVerse</strong>
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
                        <Link>
                            <img src="/icons/wishlist.png" alt="wishlist" className="mx-2" />
                        </Link>
                        <Link>
                            <img src="/icons/cart.png" alt="cart" className="mx-2" />
                        </Link>

                        <button 
                            onClick={() => setUserDropDown(!userDropDown)} 
                            className="relative"
                        > <img src="/icons/user.png" alt="user" className="mx-2" />
                        </button>

                        <div 
                            className={`absolute right-5 top-22 mt-2 w-50 bg-white divide-y divide-gray-100 rounded-lg shadow-lg transition-all duration-300 ${userDropDown ? "block" : "hidden"}`}
                        >
                            <div className="px-4 py-3 text-sm text-gray-900">
                                <div>Bonnie Green</div>
                                <div className="font-medium truncate">name@flowbite.com</div>
                            </div>
                            <Link className="flex items-center hover:bg-gray-100">
                                <img src="/icons/user.png" alt="user" className="mx-2" /> Manage My Account
                            </Link>
                            <Link className="flex items-center hover:bg-gray-100">
                                <img src="/icons/user.png" alt="user" className="mx-2" /> My Order
                            </Link>
                            <Link className="flex items-center hover:bg-gray-100">
                                <img src="/icons/user.png" alt="user" className="mx-2" /> My Cancellations
                            </Link>
                            <Link className="flex items-center hover:bg-gray-100">
                                <img src="/icons/user.png" alt="user" className="mx-2" /> My Reviews
                            </Link>
                            <Link className="flex items-center hover:bg-gray-100">
                                <img src="/icons/user.png" alt="user" className="mx-2" /> Logout
                            </Link>
                            <ul className="py-2 text-sm text-gray-700">
                                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a></li>
                                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a></li>
                                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Earnings</a></li>
                            </ul>
                            <div className="py-2">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
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
