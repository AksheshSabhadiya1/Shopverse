import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import EditProfile from "./EditProfile";
import AddressBook from "./AddressBook";
import PaymentMethods from "./PaymentMethods";
import MyProfile from "./MyProfile";
import Orders from "./Orders";
import Cancellations from "./Cancellations";
import Wishlistpage from "./Wishlistpage";
import PasswordChange from "./PasswordChange";
import { BookMarked, Heart, IndianRupee, KeyRound, Package, User, UserPen, X } from "lucide-react";

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
                <div className="w-full lg:h-auto lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Manage My Account</h2>
                    <ul className="space-y-2 border-l-1 px-2 border-gray-500 text-gray-500 ml-2">
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink
                                to="/my_account"
                                className={({ isActive }) =>
                                    `${(isActive && path === 'my_Profile') ?  "text-[#DB4444]" : "text-gray-700"} bg-gray-100 p-2 rounded flex px-2 font-medium`
                                }
                            > <User className="me-2" />Your Profile
                            </NavLink>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink
                                to="/my_account/edit_profile"
                                className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} bg-gray-100 p-2 rounded flex px-2 font-medium`
                                }
                            > <UserPen className="me-2" />Edit Profile
                            </NavLink>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to='/my_account/edit_password'
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} bg-gray-100 p-2 rounded flex px-2 font-medium`
                                }><KeyRound className="me-2" />
                                    Edit Password</NavLink>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to='/my_account/addressbook'
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} bg-gray-100 p-2 rounded flex px-2 font-medium`
                                }><BookMarked className="me-2" />Address Book</NavLink>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to='/my_account/payments' 
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} bg-gray-100 p-2 rounded flex px-2 font-medium`
                                }><IndianRupee className="me-2" />Payment Options</NavLink>
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-4">My Orders</h2>
                    <ul className="space-y-2 border-l-1 px-2 border-gray-500 text-gray-500  ml-2">
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to='/my_account/orders' 
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} bg-gray-100 p-2 rounded flex px-2 font-medium`
                                }><Package className="me-2" />Orders</NavLink>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to='/my_account/cancellations' 
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} bg-gray-100 p-2 rounded flex px-2 font-medium`
                                }><X className="me-2" />Cancellations</NavLink>
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-4">My Wishlist</h2>
                    <ul className="space-y-2 border-l-1 px-2 border-gray-500 text-gray-500  ml-2">
                        <li className="hover:text-red-500 cursor-pointer">
                            <NavLink to="/my_account/wishlist" 
                                    className={({ isActive }) =>
                                    `${isActive ? "text-[#DB4444]" : "text-gray-700"} bg-gray-100 p-2 rounded flex px-2 font-medium`
                                }><Heart className="me-2" />Wishlist</NavLink>
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
