import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import EditProfile from "./EditProfile";
import AddressBook from "./AddressBook";
import PaymentOptions from "./PaymentOptions";
import MyProfile from "./MyProfile";

export default function AccountPage() {

    const [currentPage, setCurrentPage] = useState('my_account')

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
                                onClick={()=> setCurrentPage('my_account')}
                                className={({ isActive }) =>
                                    `${(isActive && currentPage === 'my_account') ?  "text-[#DB4444]" : "text-gray-700"} font-medium`
                                }
                            >
                                My Profile
                            </NavLink>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink
                                to="/my_account/edit_profile"
                                onClick={()=> setCurrentPage('edit_profile')}
                                className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} font-medium`
                                }
                            >
                                Edit Profile
                            </NavLink>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to='/my_account/addressbook'
                                    onClick={()=> setCurrentPage('addressbook')}
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} font-medium`
                                }>Address Book</NavLink>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to='/my_account/payments' 
                                    onClick={()=> setCurrentPage('payments')}
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} font-medium`
                                }>My Payment Options</NavLink>
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-4">My Orders</h2>
                    <ul className="space-y-2 border-l-1 px-2 border-gray-500 text-gray-500  ml-2">
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to='/my_account/returns' 
                                    onClick={()=> setCurrentPage('returns')}
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} font-medium`
                                }>My Returns</NavLink>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to='/my_account/cancellations' 
                                    onClick={()=> setCurrentPage('cancellations')}
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} font-medium`
                                }>My Cancellations</NavLink>
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-4">My Wishlist</h2>
                    <ul className="space-y-2 border-l-1 px-2 border-gray-500 text-gray-500  ml-2">
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to="/my_account/wishlist" 
                                    onClick={()=> setCurrentPage('wishlist')}
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} font-medium`
                                }>My Wishlist</NavLink>
                        </li>
                    </ul>
                </div>
                
                {
                    currentPage === 'my_account' && <MyProfile />
                }
                {
                    currentPage === 'edit_profile' && <EditProfile props={currentPage}  />
                }
                {
                    currentPage === 'addressbook' && <AddressBook props={currentPage} />
                }
                {
                    currentPage === 'payments' && <PaymentOptions props={currentPage}  />
                }
                {
                    currentPage === 'returns' && <EditProfile props={currentPage}  />
                }
                {
                    currentPage === 'cancellations' && <EditProfile props={currentPage}  />
                }
                {
                    currentPage === 'wishlist' && <EditProfile props={currentPage}  />
                }
            </div>
        </div>
    );
}
