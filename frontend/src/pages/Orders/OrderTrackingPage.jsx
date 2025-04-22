import { useParams } from 'react-router-dom';
import { FaBox, FaTruck, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

const OrderTrackingPage = ({ order }) => {
    const { orderId } = useParams(); // If you're using dynamic routing

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Tracking</h1>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <img
                        src={`http://localhost:5000/uploads/products/${order.image}`}
                        alt={order.productname}
                        className="w-32 h-32 object-contain border rounded"
                    />
                    <div>
                        <h3 className="text-lg font-bold">{order.productname}</h3>
                        <p className="text-gray-600 mb-2">Order ID: #{orderId}</p>
                        <p className="text-red-600 font-semibold text-xl mb-1">₹{order.sellingprice}</p>
                        <p className="line-through text-gray-500 text-sm">₹{order.originalprice}</p>
                        <p className="text-sm text-gray-500 mt-2">Ordered on: {order.order_date}</p>
                    </div>
                </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="text-gray-700 space-y-2">
                    <p><FaMapMarkerAlt className="inline-block mr-2" />Delivery Address: {order.address}</p>
                    <p><FaTruck className="inline-block mr-2" />Delivery By: {order.expected_delivery}</p>
                    <p><FaBox className="inline-block mr-2" />Shipping Method: Standard Delivery</p>
                </div>
            </div>

            {/* Tracking Progress */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Tracking Status</h2>

                <div className="flex flex-col space-y-4">
                    {[
                        { label: 'Order Placed', status: 'done', date: order.order_date },
                        { label: 'Shipped', status: order.status === 'shipped' || order.status === 'delivered' ? 'done' : 'pending' },
                        { label: 'Out for Delivery', status: order.status === 'delivered' ? 'done' : 'pending' },
                        { label: 'Delivered', status: order.status === 'delivered' ? 'done' : 'pending' },
                    ].map((step, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.status === 'done' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                {step.status === 'done' ? <FaCheckCircle /> : index + 1}
                            </div>
                            <div>
                                <p className="font-medium">{step.label}</p>
                                {step.date && <p className="text-sm text-gray-500">{step.date}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderTrackingPage;
