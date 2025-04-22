import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Mail, Phone, User } from 'lucide-react';

export default function OrderDetails() {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState([])
    const [orderItems, setOrderItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/orders/${orderId}`, {
                    withCredentials: true
                });
                setOrderDetails(data.ordersDetails)
                setOrderItems(getQuantity(data.ordersDetails, data.orderItems))
            } catch (err) {
                console.error("Order fetch failed:", err);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

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

    const order = orderDetails[0];

    return (
        <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-8 text-gray-800">

            <aside className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg space-y-5">
                <div>
                    <h2 className="text-xl font-bold mb-1">Order Summary </h2>
                    <p className="text-gray-600">Order ID: #{order.id}</p>
                </div>

                <div>
                    <h3 className="font-semibold mb-1">Customer Info</h3>
                    <p className='flex items-center text-gray-500'><User className='me-2' />{order.firstname} {order.lastname}</p>
                    <p className="text-sm flex items-center text-gray-500"><Mail className='me-2' />{order.email}</p>
                    <p className="text-sm flex items-center text-gray-500"><Phone className='me-2' /> {order.mobile}</p>
                </div>

                <div>
                    <h3 className="font-semibold mb-1">Shipping Address</h3>
                    <p className="text-sm">{order.floor}, {order.address},</p>
                    <p className="text-sm">{order.city}, {order.pincode}</p>
                    <p className="text-sm">{order.country}</p>
                </div>

                <div>
                    <h3 className="font-semibold mb-1">Payment</h3>
                    <p className="text-sm">Type: {order.payment_method}</p>
                    <p className="text-sm">Status: <span className="capitalize font-medium">{order.payment_status}</span></p>
                </div>

                <div>
                    <h3 className="font-semibold mb-1">Order Status</h3>
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

                <div className="border-t pt-3">
                    <p className="text-sm text-gray-600">Placed on: {new Date(order.created_at).toLocaleDateString()}</p>
                </div>

                <button
                    onClick={() => navigate('/')}
                    className="w-full mt-4 bg-[#DB4444] text-white py-2 rounded hover:opacity-90"
                >
                    Back to Home
                </button>
            </aside>

            <main className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-6">Ordered Items</h2>
                <div className="space-y-4">
                    {orderItems.map((item, idx) => (
                        <div key={idx} className="flex gap-4 border-b pb-4">
                            <img
                                src={`http://localhost:5000/uploads/products/${item.image}`}
                                alt={item.productname}
                                className="w-24 h-24 object-contain rounded"
                            />
                            <div className="flex justify-between w-full items-center">
                                <div>
                                    <p className="font-semibold">{item.productname}</p>
                                    <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                                </div>
                                <div className="text-right text-lg text-red-600 font-semibold">
                                    ₹{item.sellingprice}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-right space-y-1 text-gray-700 border-t pt-4">
                    <p>Subtotal: ₹{order.subtotal}</p>
                    <p>Shipping: ₹{order.shippingCharge}</p>
                    <p className="text-xl font-bold text-black">Total: ₹{order.total}</p>
                </div>
            </main>
        </div>


    );
}
