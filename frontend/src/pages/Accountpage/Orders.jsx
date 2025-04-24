import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Phone, User } from "lucide-react";


export default function Orders(props) {

    const [orderDetails, setOrderDetails] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        fetchOrderData()
    }, [])
    
    const fetchOrderData = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/orders').catch((error) => console.log(error))
            setOrderDetails(data.ordersDetails)
            setOrderItems(getQuantity(data.ordersDetails,data.orderItems))
        } catch (error) {
            console.log("Order Not Found");
        }
    }

    const getQuantity = (ordersDetails,orderItems) => {
        const quantityMap = {};
        ordersDetails[0]?.allProducts_id_qty?.forEach(item => {
            quantityMap[item.product_id] = item.quantity;
        });

        const productsWithQuantity = orderItems.map(product => ({
            ...product,
            quantity: quantityMap[product.id] || 1
        }));

        if(productsWithQuantity) return productsWithQuantity
    }

    return (
        <div className="container mx-auto pt-4 px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">
                Your Orders
            </h2>

        {orderDetails.length > 0 && orderDetails.map(order => (
        <div className="max-w-7xl mx-auto p-6 pt-0 gap-8 text-gray-800">
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-5">
                <div>
                    <h2 className="text-xl font-bold mb-1">Order ID: #{order.id} </h2>
                </div>

                <div className="hidden sm:grid grid-cols-6 font-bold text-gray-600 text-center border-b-2 py-2 border-gray-300 text-lg">
                        <span>Customer Info</span>
                        <span>Shipping Address</span>
                        <span>Payment</span>
                        <span>Order Status</span>
                        <span>Placed On</span>
                        <span>Track Order</span>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-6 gap-y-2 justify-center items-baseline text-center py-1 w-full'>
                <div className="text-gray-600">
                    <p className='flex text-sm items-center '><User className="me-2" />{order.firstname} {order.lastname}</p>
                    <p className="text-sm flex items-center"><Mail className='me-2' />{order.email}</p>
                    <p className="text-sm flex items-center"><Phone className='me-2' /> {order.mobile}</p>
                </div>

                <div className='text-center text-gray-600 text-sm'>
                    <p>{order.floor}, {order.address},</p>
                    <p>{order.city}, {order.pincode}</p>
                    <p>{order.country}</p>
                </div>

                <div className="text-sm text-gray-600">
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
                                    : order.order_status === "returns"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                        }`}>
                        {order.order_status}
                    </span>
                </div>

                <div>
                    <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>

                <button
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="bg-[#DB4444] text-white h-10 rounded hover:scale-97 duration-300"
                >
                    Track
                </button>
                </div>
            </div>
        </div>
    ))}
        </div>
    )
}