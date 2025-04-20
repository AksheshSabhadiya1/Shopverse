import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import SliderContext from "../../context/SliderData/SliderContext";
import { useForm } from "react-hook-form";


export default function AllOrders() {
  const { sliderOpen } = useContext(SliderContext);
  const [orderData, setOrderData] = useState([])
  const {pathname} = useLocation()
  const path = pathname.split('/').filter(Boolean)

  const form = useForm({
    defaultValues: {
      orderSearchBar: ""
    }
  })

  const { register, handleSubmit, trigger, watch, formState } = form
  const { errors } = formState

  const fetchOrderData = async(filterValue) => {
    try {
      const {data} = await axios.get('http://localhost:5000/admin/orders/all', {withCredentials:true})

      let filterData = data
      if(filterValue === 'pending') filterData = await data.filter(product => product.order_status === 'pending')
      if(filterValue === 'processing') filterData = await data.filter(product => product.order_status === 'processing')
      if(filterValue === 'shipped') filterData = await data.filter(product => product.order_status === 'shipped')
      if(filterValue === 'delivered') filterData = await data.filter(product => product.order_status === 'delivered')
      if(filterValue === 'returns') filterData = await data.filter(product => product.order_status === 'returns')

      setOrderData(filterData)
    } catch (error) {
      console.log("OrderData fetching error",error);
    }
  }

  const orderid = watch('orderSearchBar')

  const findOrderById = async() => {
    try {
      const {data} = await axios.get(`http://localhost:5000/admin/orders/${orderid}`, {withCredentials:true})
      setOrderData(data)
    } catch (error) {
      console.log("Order not found", error);
    }
  }

  useEffect(()=>{
    if(path.includes("pending")){
      fetchOrderData("pending")
    } else if (path.includes("processing")){
      fetchOrderData("processing")
    } else if(path.includes("shipped")){
      fetchOrderData("shipped")
    } else if(path.includes("delivered")){
      fetchOrderData("delivered")
    } else if(path.includes("returns")){
      fetchOrderData("returns")
    } else {
      fetchOrderData()
    }
  },[pathname])

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
            {...register('orderSearchBar', {required: "OrderID is required"})}
            className="flex-1 w-full bg-gray-100 text-gray-800 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
          /><p className="error ml-2 text-red-500">{errors.orderSearchBar?.message}</p>
          <button
            onClick={()=> trigger()}
            className="bg-[#DB4444] hover:scale-95 text-white font-semibold px-6 py-3 rounded-md transition">
            Search
          </button>
        </form>
      </div>
      }
      
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {orderData ? (
            orderData.map((product) =>
            (
              <div
                key={Math.random() * 1e9}
                className="relative flex flex-col justify-between p-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <img
                      src={`http://localhost:5000/uploads/products/${product.image}`}
                      alt={product.productname}
                      className="w-20 h-20 object-contain mb-4"
                    />
                <span className={`text-sm font-medium relative -top-8 capitalize px-3 py-2 rounded-full
                ${product.order_status === "pending" ? "bg-yellow-100 text-yellow-700"
                  : product.order_status === "processing" ? "bg-blue-100 text-blue-700"
                  : product.order_status === "delivered" ? "bg-green-100 text-green-700"
                  : product.order_status === "shipped" ? "bg-purple-100 text-purple-700"
                  : product.order_status === "returns" ? "bg-red-100 text-red-700"
                  : "bg-gray-200 text-gray-700"}`}>
                  {product.order_status}
                </span>
                  </div>
                  <h3 className="text-lg text-start font-semibold capitalize">{product.productname}</h3>
                  <p className="text-white truncate">OrderID: {product.order_id}</p>
                  <p className="text-white truncate">Ordered On: {product.created_at}</p>
                  <p className="text-start font-bold text-yellow-400 mb-2">₹{product.sellingprice}</p>
                </div>

                <div className="w-full border-t pt-4 flex justify-between items-center">

              <Link 
                to={`/admin/orders/${product.order_id}`}
                className="text-blue-500 text-sm hover:underline">
                  Track Order
              </Link>
            </div>

              </div>
            )
            )) : (
            <p className="text-center text-gray-300 text-lg col-span-full">No orders available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
