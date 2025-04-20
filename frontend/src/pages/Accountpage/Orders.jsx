import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Orders(props) {

    const propsValue = Object.values(props)
    const [orderData, setOrderData] = useState([])
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
            await axios.get('http://localhost:5000/orders')
                .then((res) => setOrderData(res.data))
                .catch((error) => console.log(error))
        } catch (error) {
            console.log("Order Not Found");
        }
    }

    return (
        <div className="container mx-auto pt-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">Your Orders</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {orderData?.map(product =>
                    <div
                        key={product.id}
                        className="group flex flex-col bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                        <div className="flex max-w-30 h-40 items-center gap-4 p-4 cursor-pointer" onClick={() => navigate(`/products/${product.slug}`)}>
                            <img
                                src={`http://localhost:5000/uploads/products/${product.image}`}
                                alt={product.productname}
                                className="w-20 h-20 object-contain rounded-md bg-gray-100"
                            />
                            <div className="flex-1">
                                <div className="font-semibold text-lg text-gray-800">{product.brand} {product.productname}</div>
                                <div className="text-sm text-gray-500 truncate">{product.description}</div>
                                <div className="mt-2 flex gap-4 text-xs text-gray-600">
                                    <span>Color: {product.productcolor}</span>
                                    <span>Size: {product.productsize}</span>
                                </div>
                                <div className="mt-2 text-right sm:text-left">
                                    <span className="text-red-600 font-bold text-xl">₹{product.sellingprice}</span>
                                    <span className="line-through text-gray-500 text-sm">₹{product.originalprice}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-2 border-t border-gray-200 text-right sm:text-left">
                            <div className="text-base text-gray-600">Order Status:
                                <span className={`ml-2 font-bold capitalize text-xl ${product.order_status === 'shipped' ? 'text-green-500' : product.order_status === 'delivered' ? 'text-purple-600' : product.order_status === 'processing' ? 'text-blue-500' : 'text-yellow-500'} bg-${product.order_status === 'shipped' ? 'green' : product.order_status === 'delivered' ? 'purple' : product.order_status === 'processing' ? 'blue' : 'yellow'}-100 px-2 py-1 rounded-full inline-block`}>
                                    {product.order_status}
                                </span> </div>
                            <div className="text-gray-500 text-sm mt-1">Order Date: {product.order_date}</div>
                            {product.delivery_date && (
                                <div className="text-gray-500 text-sm">Delivered On: {product.delivery_date}</div>
                            )}
                            {product.tracking_number && (
                                <div className="text-gray-500 text-sm">Tracking: <a href="#" className="text-blue-500 hover:underline">{product.tracking_number}</a></div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>


    )
}