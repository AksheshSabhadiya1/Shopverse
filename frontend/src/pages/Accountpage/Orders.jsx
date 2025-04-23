import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Orders(props) {

    const [orderDetails, setOrderDetails] = useState([])
    const [orderItems, setOrderItems] = useState([])
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

            {orderItems.length > 0 && (
                <>
                    <div className="hidden sm:grid grid-cols-5 font-bold text-gray-600 text-center border-b-2 py-2 border-gray-300 text-lg">
                        <span>Product</span>
                        <span>Price</span>
                        <span>Order Details</span>
                        <span>Order Status</span>
                        <span>Track</span>
                    </div>

                    {orderItems.map((product) => (
                        <div
                            key={product.id}
                            className="grid grid-cols-1 sm:grid-cols-5 gap-y-4 items-center text-center py-4 border-b border-gray-200"
                        > 
                            <div
                                onClick={() => navigate(`/products/${product.slug}`)}
                                className="flex justify-center sm:justify-start items-center space-x-4 cursor-pointer"
                            >
                                <img
                                    src={`http://localhost:5000/uploads/products/${product.image}`}
                                    alt={product.productname}
                                    className="w-15 h-15 object-contain"
                                />
                                <div className="text-start flex-col w-30">
                                    <p className="font-medium">{product.productname}</p>
                                    <p className="font-semibold text-gray-500">Qty: {product.quantity}</p>
                                </div>
                            </div>

                            <div className="text-center">
                                <span className="text-green-600 font-bold text-lg block">
                                    ₹{product.sellingprice * product.quantity}
                                </span>
                                <span className="line-through text-gray-500 text-sm">
                                    ₹{product.originalprice * product.quantity}
                                </span>
                            </div>
                            {
                                orderDetails.map(order => (<>
                                    <div key={Math.floor(Math.random() * 1e8)} className="flex flex-col text-xs text-gray-600 items-center text-center">
                                        <div className="flex">
                                            <span className="font-semibold">Ordered On:</span>
                                            <p className="truncate">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex">
                                            <span className="font-semibold">Delivery On:</span>
                                            <p className="truncate">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <div key={Math.floor(Math.random() * 1e8)} className="text-center">
                                        <span
                                            className={`capitalize font-bold text-sm px-3 py-1 rounded-full inline-block ${order.order_status === 'shipped'
                                                ? 'bg-purple-100 text-purple-600'
                                                : order.order_status === 'delivered'
                                                    ? 'bg-green-100 text-green-600'
                                                    : order.order_status === 'processing'
                                                        ? 'bg-blue-100 text-blue-600'
                                                        : 'bg-yellow-100 text-yellow-600'
                                                }`}
                                        >
                                            {order.order_status}
                                        </span>
                                    </div> </>
                                ))
                            }

                            <div className="flex justify-center">
                                <button
                                    className="bg-white border px-4 py-2 rounded hover:bg-[#DB4444] hover:text-white transition-all"
                                >
                                    Track Order
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>



    )
}