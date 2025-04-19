import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/orders/${orderId}`)
            .then(res => setOrder(res.data))
            .catch(err => console.error(err));
    }, [orderId]);

    if (!order) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Order Details</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Order Info</h4>
                        <p><strong>Order ID:</strong> {order.id}</p>
                        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> <span className="text-[#DB4444] font-semibold">{order.status}</span></p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Shipping Address</h4>
                        <p>{order.shipping.name}</p>
                        <p>{order.shipping.address}</p>
                        <p>{order.shipping.city}, {order.shipping.state}</p>
                        <p>{order.shipping.zip}, {order.shipping.country}</p>
                    </div>
                </div>

                <h4 className="text-xl font-semibold text-gray-800 mb-4">Items</h4>
                <div className="divide-y">
                    {order.products.map(product => (
                        <div key={product.id} className="flex flex-col sm:flex-row items-center justify-between py-4">
                            <div className="flex items-center gap-4 w-full sm:w-2/3">
                                <img src={`http://localhost:5000/uploads/products/${product.image}`} alt={product.name} className="w-20 h-20 object-contain rounded" />
                                <div>
                                    <p className="font-medium text-gray-800">{product.name}</p>
                                    <p className="text-sm text-gray-600">Color: {product.color} | Size: {product.size}</p>
                                    <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                                </div>
                            </div>
                            <div className="text-right text-[#DB4444] font-semibold">
                                ₹{product.price * product.quantity}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 border-t pt-6">
                    <div className="flex justify-between text-gray-700 mb-2">
                        <span>Subtotal:</span>
                        <span>₹{order.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 mb-2">
                        <span>Shipping:</span>
                        <span>₹{order.shippingCost}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-gray-900">
                        <span>Total:</span>
                        <span>₹{order.total}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
