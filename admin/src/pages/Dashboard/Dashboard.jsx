import React, { useContext } from "react";
import { FaBox, FaUsers } from "react-icons/fa";
import { PiPackageDuotone } from "react-icons/pi";
import { TbMessageUser } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllProductData,
  fetchTotalContacts,
  fetchTotalOrders,
  fetchTotalUsers,
} from "../../API/API";
import SliderContext from "../../context/SliderData/SliderContextProvider";

export default function Dashboard() {
  const { sliderOpen } = useContext(SliderContext);

  const {
    data: productdata,
    isError: isProductError,
    isLoading: isProductLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProductData,
  });

  const {
    data: userdata,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchTotalUsers,
  });

  const {
    data: orderdata,
    isError: isOrderError,
    isLoading: isOrderLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchTotalOrders,
  });

  const {
    data: contactdata,
    isError: isContactError,
    isLoading: isContactLoading,
  } = useQuery({
    queryKey: ["Contacts"],
    queryFn: fetchTotalContacts,
  });

  if (isProductError)
    return (
      <div>
        <h1>Error: Product not found</h1>
      </div>
    );
  if (isUserError)
    return (
      <div>
        <h1>Error: User not found</h1>
      </div>
    );
  if (isOrderError)
    return (
      <div>
        <h1>Error: Order not found</h1>
      </div>
    );
  if (isContactError)
    return (
      <div>
        <h1>Error: Contact not found</h1>
      </div>
    );

  const cardBaseClasses =
    "bg-white/10 backdrop-blur-md shadow-lg p-6 rounded-2xl flex items-center gap-6 border border-white/20 transition-all duration-300";

  return (
    <div
      className={`pt-20 transition-all duration-300 ${
        sliderOpen ? "pl-64" : "pl-0"
      }`}
    >
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 sm:px-6 md:px-10 py-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-white mb-10 tracking-wide text-center">
          Admin Dashboard
        </h1>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-7xl">
          <NavLink
            to="/admin/products"
            className="hover:scale-105 transform transition-all"
          >
            <div
              className={`${cardBaseClasses} hover:border-blue-400 hover:shadow-blue-400/30`}
            >
              <FaBox className="text-blue-400 text-5xl" />
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Total Products
                </h2>
                <p className="text-3xl font-bold text-blue-300">
                  {isProductLoading ? "..." : productdata?.length || 0}
                </p>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/admin/users"
            className="hover:scale-105 transform transition-all"
          >
            <div
              className={`${cardBaseClasses} hover:border-green-400 hover:shadow-green-400/30`}
            >
              <FaUsers className="text-green-400 text-5xl" />
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Total Users
                </h2>
                <p className="text-3xl font-bold text-green-300">
                  {isUserLoading ? "..." : userdata?.length || 0}
                </p>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className="hover:scale-105 transform transition-all"
          >
            <div
              className={`${cardBaseClasses} hover:border-purple-400 hover:shadow-purple-400/30`}
            >
              <PiPackageDuotone className="text-purple-400 text-5xl" />
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Total Orders
                </h2>
                <p className="text-3xl font-bold text-purple-300">
                  {isOrderLoading ? "..." : orderdata?.ordersDetails?.length || 0}
                </p>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/admin/contact"
            className="hover:scale-105 transform transition-all"
          >
            <div
              className={`${cardBaseClasses} hover:border-red-400 hover:shadow-red-400/30`}
            >
              <TbMessageUser className="text-red-400 text-5xl" />
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Total Messages
                </h2>
                <p className="text-3xl font-bold text-red-300">
                  {isContactLoading ? "..." : contactdata?.length || 0}
                </p>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
