import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import EditProfile from "./EditProfile";
import AddressBook from "./AddressBook";
import PaymentMethods from "./PaymentMethods";
import MyProfile from "./MyProfile";
import Orders from "./Orders";
import Cancellations from "./Cancellations";
import Wishlistpage from "./Wishlistpage";
import PasswordChange from "./PasswordChange";

export default function AccountPage() {

    const {pathname} = useLocation()
    const path = pathname.split('/')[2] || 'my_Profile'

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])


    return (
        <div className="container mx-auto px-4 sm:px-8 lg:px-30 mt-2 mb-16">
            <div className="flex flex-col-reverse lg:flex-row gap-10">
                <div className="w-full lg:h-120 lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Manage My Account</h2>
                    <ul className="space-y-2 border-l-1 px-2 border-gray-500 text-gray-500 ml-2">
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink
                                to="/my_account"
                                className={({ isActive }) =>
                                    `${(isActive && path === 'my_Profile') ?  "text-[#DB4444]" : "text-gray-700"} font-medium`
                                }
                            >
                                Your Profile
                            </NavLink>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink
                                to="/my_account/edit_profile"
                                className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} font-medium`
                                }
                            >
                                Edit Profile
                            </NavLink>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to='/my_account/edit_password'
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} font-medium`
                                }>Edit Password</NavLink>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to='/my_account/addressbook'
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} font-medium`
                                }>Address Book</NavLink>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to='/my_account/payments' 
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} font-medium`
                                }>Payment Options</NavLink>
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-4">My Orders</h2>
                    <ul className="space-y-2 border-l-1 px-2 border-gray-500 text-gray-500  ml-2">
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to='/my_account/orders' 
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} font-medium`
                                }>Orders</NavLink>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to='/my_account/cancellations' 
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} font-medium`
                                }>Cancellations</NavLink>
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-4">My Wishlist</h2>
                    <ul className="space-y-2 border-l-1 px-2 border-gray-500 text-gray-500  ml-2">
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to="/my_account/wishlist" 
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} font-medium`
                                }>Wishlist</NavLink>
                        </li>
                    </ul>
                </div>
                
                {
                    path === 'my_Profile' &&  <MyProfile />
                }
                {
                    path === 'edit_profile' && <EditProfile props={path}  />
                }
                {
                    path === 'addressbook' && <AddressBook props={path} />
                }
                {
                    path === 'edit_password' && <PasswordChange props={path} />
                }
                {
                    path === 'payments' && <PaymentMethods props={path}  />
                }
                {
                    path === 'orders' && <Orders props={path}  />
                } 
                {
                    path === 'cancellations' && <Cancellations props={path}  />
                }
                {
                    path === 'wishlist' && <Wishlistpage props={path}  />
                }
            </div>
        </div>
    );
}
