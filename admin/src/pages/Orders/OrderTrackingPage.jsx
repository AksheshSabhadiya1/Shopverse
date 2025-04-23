import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
<<<<<<< HEAD
import { useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SliderContext from '../../context/SliderData/SliderContextProvider';
import { Mail, Phone, User } from 'lucide-react';
=======
import { useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SliderContext from '../../context/SliderData/SliderContextProvider';
>>>>>>> 0cea7e57c91d7df5ebbf4d4f8986583f1f5736d0

const OrderTrackingPage = () => {
    const [orderItem, setOrderItem] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const { pathname } = useLocation()
    const orderid = pathname.split('/').filter(Boolean)[2]
    const { sliderOpen } = useContext(SliderContext);

    const form = useForm({
        defaultValues: {
            orderStatusList: ""
        }
    })

    const { register, handleSubmit, trigger, reset, formState } = form
    const { errors } = formState

    const fetchOrder = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/admin/orders/${orderid}`, { withCredentials: true });
            setOrderItem(data.orderItems);
            setOrderDetails(data.ordersDetails)
        } catch (error) {
            console.error("Error fetching order:", error);
        }
    };

    const updateOrderStatus = async (data) => {
        try {
            await axios.post('http://localhost:5000/admin/orders/updateOrderStatus', { ...data, orderid }, { withCredentials: true }).then(res => console.log("Update Succesfully"))
                .then(() => fetchOrder())
                .catch(error => console.log("Not Updated", error))
        } catch (error) {
            console.log("Error while Updating Status", error);
        }
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    return (
        <div className={`pt-20 ${sliderOpen ? "pl-64" : "pl-0"} transition-all duration-300`}>
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className='flex justify-between border-b border-gray-700 mb-10'>
                        <h2 className="text-3xl font-bold text-center mb-2 text-white  pb-3 w-full max-w-4xl">
                            Order ID: {orderid}</h2>
                        <div className="mb-0">
                            <form
                                onSubmit={handleSubmit(updateOrderStatus)}
                                className="flex items-center gap-2"
                            >
                                <select
                                    {...register(`orderStatusList`, {
                                        required: "Order Status Not Selected"
                                    })}
                                    className="max-w-2xl border rounded px-3 py-2 text-white"
                                >
                                    <option value="" className='bg-black'>Update Order Status</option>
                                    <option value="pending" className="bg-yellow-100 text-yellow-700">Pending</option>
                                    <option value="processing" className="bg-blue-100 text-blue-700">Processing</option>
                                    <option value="shipped" className="bg-purple-100 text-purple-700">Shipped</option>
                                    <option value="delivered" className="bg-green-100 text-green-700">Delivered</option>
                                    <option value="returns" className="bg-red-100 text-red-700">Returns</option>
                                </select>
                                <button
                                    type="submit"
                                    className="bg-[#DB4444] hover:scale-95 text-white font-semibold px-4 py-2 rounded transition"
                                >
                                    Update
                                </button>
                            </form>
                            <p className="ml-2 text-red-500 text-sm">
                                {errors.orderStatusList?.message}
                            </p>
                        </div>
                    </div>
                    <div className="max-w-full mx-auto p-6 gap-8 ">
                        {orderDetails.length > 0 && orderDetails.map(order => (
                            <div className="bg-white/10 p-6 text-white rounded-lg shadow-lg space-y-5">
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
                                                    : order.order_status === "returns"
                                                        ? "bg-red-100 text-red-700"
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
                <div className="bg-white/10 mx-auto gap-8 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl text-white font-semibold border-b mb-4 py-4">Ordered Items</h2>
                <div className="space-y-4">
                    {orderItem.map((item, idx) => (
                        <Link to={`/admin/products/${item.slug}`}>
                        <div key={idx} className="flex gap-4 border-b p-2 border-gray-400 pb-2">
                            <img
                                src={`http://localhost:5000/uploads/products/${item.image}`}
                                alt={item.productname}
                                className="w-15 h-15 object-contain rounded"
                            />
                            <div className="flex justify-between w-full items-center">
                                <div className='text-gray-500'>
                                    <p className="font-semibold">{item.productname}</p>
                                    <p className="text-sm">Brand: {item.brand}</p>
                                    <p className="text-sm">Quantity: {item.quantity || 1}</p>
                                </div>
                                <div className="text-right text-lg text-red-600 font-semibold">
                                    ₹{item.sellingprice}
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
                {
                    orderDetails.map(order => (
                <div className="mt-8 text-right space-y-1 text-white border-t pt-4">
                    <p>Subtotal: ₹{order.subtotal}</p>
                    <p>Shipping: ₹{order.shippingCharge}</p>
                    <p className="text-xl font-bold">Total: ₹{order.total}</p>
                </div>
                    ))
                }
                </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTrackingPage;
