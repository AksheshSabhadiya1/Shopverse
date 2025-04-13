import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
    Menu,
    X,
    Heart,
    ShoppingCart,
    User,
    Search,
    User2,
    ShoppingBag,
    Star,
    LogOutIcon,
} from "lucide-react";
import FilterContext from "../../context/FilterDropDown/FilterContext";
import UserDataContext from "../../context/UserData/UserDataContext";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userDropDown, setUserDropDown] = useState(false);

    const { filterMenu, setFilterMenu } = useContext(FilterContext);
    const { currentUser, setCurrentUser } = useContext(UserDataContext);

    const { pathname } = useLocation();
    const path = pathname
        .split("/")
        .filter((x) => x)
        .toString();

    const logoutUser = () => {
        setCurrentUser(null);
        setUserDropDown(false);
        console.log("Logout Successfully");
    };

    useEffect(() => {
        const time = setTimeout(() => {
            setUserDropDown(false);
        }, 8000);

        return () => clearTimeout(time);
    }, [userDropDown]);

    return (
        <header className="shadow sticky z-50 top-0">
            <div className="flex flex-wrap bg-black text-white justify-center py-0.5 items-center text-center">
                <p className="font-light sm:text-base mb-2 sm:mb-0 max-w-[60%] sm:max-w-full">
                    Summer Sale For All Swim Suits And Free Express Delivery -{" "}
                    <span className="font-bold">50% OFF!</span>
                    <Link to="#" className="flex-shrink-0">
                        <span className="ms-2 border-b font-bold hover:text-[#DB4444] transition-all">
                            Shop Now
                        </span>
                    </Link>
                </p>
                <div className="fixed right-0 flex items-center max-w-[50%] text-sm sm:text-base">
                    <span>English</span>
                    <img
                        src="/icons/DropDown.png"
                        alt="Dropdown"
                        className="w-4 h-4 ml-1"
                    />
                </div>
            </div>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-0">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div
                        className="font-bold px-5 py-2.5 focus:outline-none"
                        type="button"
                    >
                        <button
                            onClick={() => setFilterMenu(!filterMenu)}
                            className="text-gray-700"
                        >
                            {filterMenu ? <X size={28} /> : <Menu size={28} />}
                        </button>
                        <strong className="mx-6 text-3xl">ShopVerse</strong>
                    </div>

                    <div
                        className={`absolute left-0 md:left-45 h-auto top-full border-t border-r border-gray-200 w-48 sm:w-56 md:w-64 bg-white text-black divide-y divide-gray-100 transition-all duration-300 ${filterMenu ? "block" : "hidden"
                            }`}
                    >
                        <div className="py-1 space-y-1">
                            <Link
                                to="#"
                                className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition"
                            >
                                <div className="flex">
                                    <p>Woman's Fashion </p>{" "}
                                    <img
                                        src="/icons/arrow-left-icon.png"
                                        className="absolute right-5"
                                    />
                                </div>
                            </Link>
                            <Link
                                to="#"
                                className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition"
                            >
                                <p> Men's Fashion </p>{" "}
                                <img
                                    src="/icons/arrow-left-icon.png"
                                    className="absolute right-5"
                                />
                            </Link>
                            <Link
                                to="#"
                                className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition"
                            >
                                <p> Electronics </p>
                            </Link>
                            <Link
                                to="#"
                                className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition"
                            >
                                <p> Home & Lifestyle </p>
                            </Link>
                            <Link
                                to="#"
                                className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition"
                            >
                                <p> Medicine </p>
                            </Link>
                            <Link
                                to="#"
                                className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition"
                            >
                                <p> Sports & Outdoor </p>
                            </Link>
                            <Link
                                to="#"
                                className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition"
                            >
                                <p> Baby's & Toys </p>
                            </Link>
                            <Link
                                to="#"
                                className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition"
                            >
                                <p> Groceries & Pets </p>
                            </Link>
                            <Link
                                to="#"
                                className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition"
                            >
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
                        {!(path === "signup" || path === "signin") && (
                            <div className="hidden space-x-5 md:flex lg:flex justify-center items-center">
                                <div className="flex space-x-4 items-center">
                                    <Link to="/wishlist" className="relative flex items-center">
                                        <Heart className="hover:text-red-500 w-6 h-6 sm:w-7 sm:h-7" />
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                            0
                                        </span>
                                    </Link>
                                    <Link to="/cart" className="relative flex items-center">
                                        <ShoppingCart className="hover:text-blue-500 w-6 h-6 sm:w-7 sm:h-7" />
                                        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                            0
                                        </span>
                                    </Link>
                                </div>

                                {currentUser ? (
                                    <button
                                        onClick={() => setUserDropDown(!userDropDown)}
                                        className={`flex items-center justify-center ${userDropDown
                                            ? "w-8 h-8 text-white bg-red-500 rounded-full"
                                            : "w-8 h-8"
                                            }`}
                                    >
                                        {" "}
                                        <User />
                                    </button>
                                ) : (
                                    <div>
                                        {" "}
                                        <NavLink
                                            to="/signup"
                                            className={({ isActive }) =>
                                                `${isActive ? "text-orange-700" : "text-gray-700"
                                                } hover:text-orange-700`
                                            }
                                        >
                                            <span className="mb-2 font-semibold">Signup</span>
                                        </NavLink>{" "}
                                        |&nbsp;
                                        <NavLink
                                            to="/signin"
                                            className={({ isActive }) =>
                                                `${isActive ? "text-orange-700" : "text-gray-700"
                                                } hover:text-orange-700`
                                            }
                                        >
                                            <span className="mb-2 font-semibold">Signin</span>
                                        </NavLink>{" "}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="lg:hidden md:hidden flex justify-center items-center">
                            <Link to="/wishlist">
                                <Heart className="hover:text-red-500" />
                            </Link>
                            <Link to="/cart">
                                <div className="flex">
                                    <ShoppingCart className="hover:text-blue-500" />
                                    <span className="w-auto bg-red-400">0</span>
                                </div>
                            </Link>
                            <button
                                onClick={() => setUserDropDown(!userDropDown)}
                                className={`flex items-center justify-center ${userDropDown
                                    ? "w-8 h-8 text-white bg-red-500 rounded-full"
                                    : "w-8 h-8"
                                    }`}
                            >
                                {" "}
                                <User />
                            </button>
                        </div>

                        <div
                            className={`absolute right-0 md:right-30 top-26 w-48 sm:w-56 md:w-64 bg-white text-black divide-y divide-gray-300 rounded-lg border border-gray-300 shadow-lg transition-all duration-300 ${userDropDown ? "block" : "hidden"
                                }`}
                        >
                            <div className="px-4 py-3 text-sm">
                                <div className="font-semibold">
                                    {currentUser && currentUser.firstname}{" "}
                                    {currentUser && currentUser.lastname}
                                </div>
                                <div className="font-medium truncate text-gray-500">
                                    {currentUser && currentUser.email}
                                </div>
                            </div>
                            <div className="py-1 space-y-1">
                                <Link
                                    to="/my-account"
                                    className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition"
                                >
                                    <User2 className="me-4" />
                                    Manage My Account
                                </Link>
                                <Link
                                    to="#"
                                    className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition"
                                >
                                    <ShoppingBag className="me-4" /> My Order
                                </Link>
                                <Link
                                    to="#"
                                    className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition"
                                >
                                    <X className="me-4" /> My Cancellations
                                </Link>
                                <Link
                                    to="#"
                                    className="flex items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition"
                                >
                                    <Star className="me-4" /> My Reviews
                                </Link>
                                <Link
                                    onClick={() => logoutUser()}
                                    className="flex items-center px-4 py-2 rounded-lg hover:text-white hover:bg-red-700 transition"
                                >
                                    <LogOutIcon className="me-4" /> Logout
                                </Link>
                            </div>
                        </div>
                    </div>

                    <button
                        className="lg:hidden p-2 text-gray-700"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    <div className="hidden lg:flex space-x-6">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${isActive ? "text-orange-700" : "text-gray-700"
                                } hover:text-orange-700`
                            }
                        >
                            <span className="mb-2 font-semibold">Home</span>
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `${isActive ? "text-orange-700" : "text-gray-700"
                                } hover:text-orange-700`
                            }
                        >
                            <span className="mb-2 font-semibold">About</span>
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                `${isActive ? "text-orange-700" : "text-gray-700"
                                } hover:text-orange-700`
                            }
                        >
                            <span className="mb-2 font-semibold">Contact</span>
                        </NavLink>
                    </div>

                    {menuOpen && (
                        <div className="lg:hidden flex flex-col bg-white py-4 space-y-3 justify-center items-center text-center">
                            <NavLink
                                to="/"
                                className="text-gray-700 hover:text-orange-700"
                                onClick={() => setMenuOpen(false)}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/about"
                                className="text-gray-700 hover:text-orange-700"
                                onClick={() => setMenuOpen(false)}
                            >
                                About
                            </NavLink>
                            <NavLink
                                to="/contact"
                                className="text-gray-700 hover:text-orange-700"
                                onClick={() => setMenuOpen(false)}
                            >
                                Contact
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className="text-gray-700 hover:text-orange-700"
                            >
                                Sign Up
                            </NavLink>
                            {currentUser.length > 0 ? (
                                <button
                                    onClick={() => setUserDropDown(!userDropDown)}
                                    className={`flex items-center justify-center ${userDropDown
                                        ? "w-8 h-8 text-white bg-red-500 rounded-full"
                                        : "w-8 h-8"
                                        }`}
                                >
                                    {" "}
                                    <User />
                                </button>
                            ) : (
                                <div>
                                    {" "}
                                    <NavLink
                                        to="/signup"
                                        onClick={() => setMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `${isActive ? "text-orange-700" : "text-gray-700"
                                            } hover:text-orange-700`
                                        }
                                    >
                                        <span className="mb-2 font-semibold">Signup</span>
                                    </NavLink>{" "}
                                    |&nbsp;
                                    <NavLink
                                        to="/signin"
                                        onClick={() => setMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `${isActive ? "text-orange-700" : "text-gray-700"
                                            } hover:text-orange-700`
                                        }
                                    >
                                        <span className="mb-2 font-semibold">Signin</span>
                                    </NavLink>{" "}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
