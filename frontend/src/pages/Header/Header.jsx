import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {Menu, X} from 'lucide-react'


export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

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
                            className="text-gray-800 w-70 bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm lg:px-5 py-2 lg:py-2.5 focus:outline-none"/>
                        <Link>
                            <img src="/icons/search.png" alt="search" className="relative end-10" />
                        </Link>
                        <Link>
                            <img src="/icons/wishlist.png" alt="search" className="mx-2" />
                        </Link>
                        <Link>
                            <img src="/icons/cart.png" alt="search" className="mx-2" />
                        </Link>
                    </div>

                    <button className="lg:hidden p-2 text-gray-700"
                            onClick={()=> setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} /> }
                    </button>

                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto space-x-6">
                        <NavLink to='/'
                            className={({ isActive }) =>
                                `${isActive ? "text-orange-700" : "text-gray-700"}
                                        text-gray-700 hover:text-orange-700`
                            }> <span className="mb-2 font-semibold">Home</span>
                        </NavLink>
                        <NavLink
                            to='/about'
                            className={({ isActive }) =>
                                `${isActive ? "text-orange-700" : "text-gray-700"}
                                        text-gray-700 hover:text-orange-700`
                            }> <span className="mb-2 font-semibold">About</span>
                        </NavLink>
                        <NavLink
                            to='/contact'
                            className={({ isActive }) =>
                                `${isActive ? "text-orange-700" : "text-gray-700"}
                                        text-gray-700 hover:text-orange-700`
                            }> <span className="mb-2 font-semibold">Contact</span>
                        </NavLink>

                        <NavLink
                            to='/signup'
                            className={({ isActive }) =>
                                `${isActive ? "text-orange-700" : "text-gray-700"}
                                        text-gray-700 hover:text-orange-700`
                            }> <span className="mb-2 font-semibold">Signup</span>
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
    )
}