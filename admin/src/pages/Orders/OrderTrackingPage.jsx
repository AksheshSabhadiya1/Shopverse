import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SliderContext from '../../context/SliderData/SliderContextProvider';

const OrderTrackingPage = () => {
    const [orderData, setOrderData] = useState([]);
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
            setOrderData(data);
        } catch (error) {
            console.error("Error fetching order:", error);
        }
    };

    const updateOrderStatus = async (data) => {
        try {
            await axios.post('http://localhost:5000/admin/orders/updateOrderStatus', { ...data, orderid }, { withCredentials: true }).then(res => console.log("Update Succesfully"))
            .then(() => fetchOrder())
            .catch(error => console.log("Not Updated"))
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
                <div className="max-w-4xl mx-auto">
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
                    {orderData && orderData.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                            {orderData.map((item, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex justify-between items-center">
                                        <img
                                            src={`http://localhost:5000/uploads/products/${item.image}`}
                                            alt={item.productname}
                                            className="w-20 h-20 object-contain mb-4"
                                        />
                                        <span className={`text-sm font-medium relative -top-8 capitalize px-3 py-2 rounded-full
                                            ${item.order_status === "pending" ? "bg-yellow-100 text-yellow-700"
                                                : item.order_status === "processing" ? "bg-blue-100 text-blue-700"
                                                    : item.order_status === "delivered" ? "bg-green-100 text-green-700"
                                                        : item.order_status === "shipped" ? "bg-purple-100 text-purple-700"
                                                            : item.order_status === "returns" ? "bg-red-100 text-red-700"
                                                                : "bg-gray-200 text-gray-700"}`}>
                                            {item.order_status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl flex justify-between items-center font-semibold text-center capitalize">{item.productname}<p className="text-yellow-400 text-xl font-bold text-center">₹{item.sellingprice}</p></h3>
                                    <p className="text-sm text-start mt-1">Order ID: {item.order_id}</p>
                                    <p className="text-sm text-start mb-2">Ordered On: {item.created_at}</p>

                                        
                                </div>
                            ))}
                        </div>
                    ) : orderid ? (
                        <p className="text-center text-gray-300">No orders found for this ID.</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default OrderTrackingPage;
