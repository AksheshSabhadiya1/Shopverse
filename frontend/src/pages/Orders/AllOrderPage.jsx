import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Mail, Phone, User } from 'lucide-react';

export default function AllOrderPage() {
    const [orderDetails, setOrderDetails] = useState([])
    const [orderItems, setOrderItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/orders/`, {
                    withCredentials: true
                });
                setOrderDetails(data.ordersDetails)
                setOrderItems(getQuantity(data.ordersDetails, data.orderItems))
            } catch (err) {
                console.error("Order fetch failed:", err);
            }
        };
        fetchOrderDetails();
    }, []);

    const getQuantity = (ordersDetails, orderItems) => {
        const quantityMap = {};
        ordersDetails[0]?.allProducts_id_qty?.forEach(item => {
            quantityMap[item.product_id] = item.quantity;
        });
        const productsWithQuantity = orderItems.map(product => ({
            ...product,
            quantity: quantityMap[product.id] || 1
        }));
        if (productsWithQuantity) return productsWithQuantity
    }

    if (!orderDetails.length) return <div className="text-center py-10">Loading...</div>;

    return orderDetails.length > 0 && orderDetails.map(order => (
        <div className="max-w-7xl mx-auto p-6 gap-8 text-gray-800">
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-5">
                <div>
                    <h2 className="text-xl font-bold mb-1">Order ID: #{order.id} </h2>
                </div>

                <div className="hidden sm:grid grid-cols-6 font-bold text-gray-600 text-center border-b-2 py-2 border-gray-300 text-lg">
                        <span>Customer Info</span>
                        <span>Shipping Address</span>
                        <span>Payment</span>
                        <span>Order Status</span>
                        <span>Placed on:</span>
                        <span>Track Order</span>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-6 gap-y-2 items-center text-center py-1 w-full'>
                <div className='ml-6'>
                    <p className='flex items-center text-gray-500'><User className='me-2' />{order.firstname} {order.lastname}</p>
                    <p className="text-sm flex items-center text-gray-500"><Mail className='me-2' />{order.email}</p>
                    <p className="text-sm flex items-center text-gray-500"><Phone className='me-2' /> {order.mobile}</p>
                </div>

                <div className='text-center'>
                    <p className="text-sm">{order.floor}, {order.address},</p>
                    <p className="text-sm">{order.city}, {order.pincode}</p>
                    <p className="text-sm">{order.country}</p>
                </div>

                <div>
                    <p className="text-sm">{order.payment_method}</p>
                    <p className="text-sm"><span className="capitalize font-medium">{order.payment_status}</span></p>
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

                <div className="pt-3">
                    <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>

                <button
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="mt-4 bg-[#DB4444] text-white py-2 rounded hover:scale-98 duration-300"
                >
                    Track
                </button>
                </div>
            </div>
        </div>
    ));
}
