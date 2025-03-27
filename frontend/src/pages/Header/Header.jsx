import React from "react";
import { Link, NavLink } from "react-router-dom";


export default function Header() {
    return (
        <header className="shadow sticky z-50 top-0">
            <div className="w-full py-2 bg-black text-white flex flex-wrap justify-center">
                <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
                <Link>
                    <span className='ms-2 underline font-bold'>ShopNow</span>
                </Link>
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
                            className="text-gray-800 w-70 bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        />
                        <Link>
                            <img src="/icons/search.png" alt="search" className="relative end-12" />
                        </Link>
                        <Link>
                            <img src="/icons/wishlist.png" alt="search" className="mx-2" />
                        </Link>
                        <Link>
                            <img src="/icons/cart.png" alt="search" className="mx-2" />
                        </Link>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to='/'
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 
                                        pl-3 duration-200 
                                        ${isActive ? "text-orange-700" : "text-gray-700"}
                                        border-b border-gray-100 
                                        hover:bg-gray-50 lg:hover:bg-transparent 
                                        lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                > <span className="mb-2">Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/about'
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 
                                        pl-3 duration-200 
                                        ${isActive ? "text-orange-700" : "text-gray-700"}
                                        border-b border-gray-100 
                                        hover:bg-gray-50 lg:hover:bg-transparent 
                                        lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/contact'
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 
                                        pl-3 duration-200 
                                        ${isActive ? "text-orange-700" : "text-gray-700"}
                                        border-b border-gray-100 
                                        hover:bg-gray-50 lg:hover:bg-transparent 
                                        lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to='/signup'
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 
                                        pl-3 duration-200 
                                        ${isActive ? "text-orange-700" : "text-gray-700"}
                                        border-b border-gray-100 
                                        hover:bg-gray-50 lg:hover:bg-transparent 
                                        lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Sign Up
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}