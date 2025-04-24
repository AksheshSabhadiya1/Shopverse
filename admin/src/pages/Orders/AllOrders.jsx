import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import SliderContext from "../../context/SliderData/SliderContextProvider";
import EmptyOrders from "../../Error/EmptyOrders";
import { User, Mail, Phone } from 'lucide-react'


export default function AllOrders() {
  const { sliderOpen } = useContext(SliderContext);
  const [orderItem, setOrderItem] = useState([])
  const [orderDetails, setOrderDetails] = useState([])
  const { pathname } = useLocation()
  const path = pathname.split('/').filter(Boolean)
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      orderSearchBar: ""
    }
  })

  const { register, handleSubmit, trigger, watch, formState } = form
  const { errors } = formState

  const fetchOrderData = async (filterValue) => {
    try {
      const { data } = await axios.get('http://localhost:5000/admin/orders', { withCredentials: true })

      let filterData = data.orderDetails
      if (filterValue === 'pending') filterData = await data.filter(product => product.order_status === 'pending')
      if (filterValue === 'processing') filterData = await data.filter(product => product.order_status === 'processing')
      if (filterValue === 'shipped') filterData = await data.filter(product => product.order_status === 'shipped')
      if (filterValue === 'delivered') filterData = await data.filter(product => product.order_status === 'delivered')
      if (filterValue === 'returns') filterData = await data.filter(product => product.order_status === 'returns')

      setOrderItem(filterData)
      setOrderDetails(data.ordersDetails)
    } catch (error) {
      console.log("orderItem fetching error", error);
    }
  }

  const orderid = watch('orderSearchBar')

  const findOrderById = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/admin/orders/${orderid}`, { withCredentials: true }).catch(error => console.log(error))
      setOrderItem(data)
    } catch (error) {
      console.log("Order not found", error);
    }
  }

  useEffect(() => {
    if (path.includes("pending")) {
      fetchOrderData("pending")
    } else if (path.includes("processing")) {
      fetchOrderData("processing")
    } else if (path.includes("shipped")) {
      fetchOrderData("shipped")
    } else if (path.includes("delivered")) {
      fetchOrderData("delivered")
    } else if (path.includes("returns")) {
      fetchOrderData("returns")
    } else {
      fetchOrderData()
    }
  }, [pathname])

  return (
    <div className={`pt-20 ${sliderOpen ? "pl-64" : "pl-0"} transition-all duration-300`}>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-white border-b border-gray-700 pb-3 w-full max-w-4xl">
          {
            path.includes('pending') ? 'Pending Orders' :
              path.includes('processing') ? 'Processing Orders' :
                path.includes('shipped') ? 'Shipped Orders' :
                  path.includes('delivered') ? 'Delivered Orders' :
                    path.includes('returns') ? 'Return Orders' :
                      "Track Your Orders"
          }
        </h2>
        {
          path.length === 2 &&
          <div className="w-full max-w-3xl mb-10">
            <form onSubmit={handleSubmit(findOrderById)} className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                placeholder="Enter your Order ID"
                name="orderSearchBar"
                id="orderSearchBar"
                {...register('orderSearchBar', { required: "OrderID is required" })}
                className="flex-1 w-full bg-gray-100 text-gray-800 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
              /><p className="error ml-2 text-red-500">{errors.orderSearchBar?.message}</p>
              <button
                onClick={() => trigger()}
                className="bg-[#DB4444] hover:scale-95 text-white font-semibold px-6 py-3 rounded-md transition">
                Search
              </button>
            </form>
          </div>
        }

        <div className="max-w-full mx-auto p-6 gap-8 ">
          {orderDetails.length > 0 && orderDetails.map(order => (
            <div className="bg-transparent p-6 mt-2 text-white border border-gray-200 rounded-lg shadow-lg space-y-5">
              <div className="">
                <h2 className="text-xl text-[#DB4444] font-bold mb-1">Order ID: #{order.id} </h2>
              </div>

              <div className="hidden sm:grid grid-cols-6 font-bold text-white text-center border-b-2 py-2 border-gray-300 text-lg">
                <span>Customer Info</span>
                <span>Shipping Address</span>
                <span>Payment</span>
                <span>Order Status</span>
                <span>Placed On</span>
                <span>Track Order</span>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-6 gap-y-2 justify-center items-baseline text-center py-1 w-full'>
                <div className="text-gray-400">
                  <p className='flex text-sm items-center '><User className="me-2" />{order.firstname} {order.lastname}</p>
                  <p className="text-sm flex items-center"><Mail className='me-2' />{order.email}</p>
                  <p className="text-sm flex items-center"><Phone className='me-2' /> {order.mobile}</p>
                </div>

                <div className='text-center text-gray-400 text-sm'>
                  <p>{order.floor}, {order.address},</p>
                  <p>{order.city}, {order.pincode}</p>
                  <p>{order.country}</p>
                </div>

                <div className="text-sm text-gray-400">
                  <p>{order.payment_method}</p>
                  <p>Status: {order.payment_status === 'prepaid' ? <span className="text-green-500 ">prepaid</span> : <span className="text-red-500">unpaid</span>}</p>
                </div>

                <div>
                  <span className={`capitalize px-3 py-1 inline-block text-sm font-semibold rounded-full ${order.order_status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.order_status === "shipped"
                      ? "bg-purple-100 text-purple-700"
                      : order.order_status === "processing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                    {order.order_status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>

                <button
                  onClick={() => navigate(`/admin/orders/${order.order_id}`)}
                  className="bg-[#DB4444] text-white h-10 rounded hover:scale-97 duration-300"
                >
                  Track
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
