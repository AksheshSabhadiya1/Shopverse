import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CartContext from "../../context/Cart/CartContextProvider";
import UserDataContext from "../../context/UserData/UserDataContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Checkout() {

    const { cartItem, setCartItem, sessionItem } = useContext(CartContext)
    const { currentUser } = useContext(UserDataContext)
    const currentCart = cartItem.length === 0 ? sessionItem : cartItem
    const navigate = useNavigate()
   

    const form = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            floor: "",
            address: "",
            city: "",
            pincode: "",
            country: "",
            email: "",
            mobile: "",
            isSaveInfo: "",
            paymentType: "",
        },
        mode: "all",
    });

    const { register, handleSubmit, reset, formState, trigger } = form;
    const { errors } = formState;

    useEffect(() => {
        if (currentUser) {
            reset({
                firstname: currentUser?.firstname,
                lastname: currentUser?.lastname,
                floor: "",
                address: "",
                city: "",
                pincode: "",
                country: "",
                email: currentUser?.email,
                mobile: currentUser?.mobile,
                isSaveInfo: false,
                paymentType: "",
            })
        }
    }, [currentUser])


    const getTotal = () => {
        if (cartItem.length > 0) {
            return cartItem?.reduce((count, product) => {
                return count + Math.max(product.quantity || 1) * product.sellingprice
            }, 0)
        }

        if (sessionItem.length > 0) {
            return sessionItem?.reduce((count, product) => {
                return count + Math.max(product.quantity || 1) * product.sellingprice
            }, 0)
        }
    }

    const submitOrderData = async (data) => {
        try {
            await axios.post('http://localhost:5000/checkout', { ...data, 'subtotal': getTotal(), 'shippingCharge': 0, 'total': getTotal() }, { withCredentials: true })
            .then(res => console.log("Your Order Successfully Placed"), setCartItem([]) , navigate('/'))

        } catch (error) {
            console.log("Your Order Not Placed");
        }
    }

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    },[])

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Billing Details</h2>
            <div className="bg-white shadow-md rounded-2xl p-6 sm:p-10">
                <form onSubmit={handleSubmit(submitOrderData)} className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">First Name <span className="text-red-500">*</span></label>
                                <input type="text" {...register("firstname", { required: "firstname is required" })} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50" />
                                <p className="text-sm text-red-500 mt-1">{errors.firstname?.message}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Last Name <span className="text-red-500">*</span></label>
                                <input type="text" {...register("lastname", { required: "lastname is required" })} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50" />
                                <p className="text-sm text-red-500 mt-1">{errors.lastname?.message}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Apartment/floor<span className="text-red-500">*</span></label>
                            <input type="text" name="floor" {...register("floor", { required: "lastname is required" })} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50" />
                            <p className="text-sm text-red-500 mt-1">{errors.floor?.message}</p>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Shipping Address <span className="text-red-500">*</span></label>
                            <input type="text" name="address" {...register("address", { required: "address is required" })} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50" />
                            <p className="text-sm text-red-500 mt-1">{errors.address?.message}</p>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Town/City <span className="text-red-500">*</span></label>
                            <input type="text" name="city" {...register("city", { required: "Town/City is required" })} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50" />
                            <p className="text-sm text-red-500 mt-1">{errors.city?.message}</p>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Pincode <span className="text-red-500">*</span></label>
                            <input type="text" name="pincode" {...register("pincode", { required: "pincode is required" })} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50" />
                            <p className="text-sm text-red-500 mt-1">{errors.pincode?.message}</p>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Country <span className="text-red-500">*</span></label>
                            <input type="text" name="country" {...register("country", { required: "country is required" })} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50" />
                            <p className="text-sm text-red-500 mt-1">{errors.country?.message}</p>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Mobile Number <span className="text-red-500">*</span></label>
                            <input type="text" name="mobile" {...register("mobile", { required: "mobile is required" })} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50" />
                            <p className="text-sm text-red-500 mt-1">{errors.mobile?.message}</p>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email <span className="text-red-500">*</span></label>
                            <input type="email" {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid Email Format"
                                }
                            })} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50" />
                            <p className="text-sm text-red-500 mt-1">{errors.email?.message}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type="checkbox" name="isSaveInfo" {...register("isSaveInfo")} className="w-4 h-4" />
                            <span className="text-gray-600">Save this information for faster check-out next time</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {currentCart?.map(product => (
                            <div key={product.id} className="flex justify-between items-center pb-2">
                                <div key={product.slug} className="flex items-center space-x-2">
                                    <img src={`http://localhost:5000/uploads/products/${product.image}`} alt={product.productname} className="w-12 h-12 object-contain" />
                                    <span className="text-gray-700">{product.productname}</span>
                                </div>
                                <span className="text-gray-800 font-semibold">₹{product.sellingprice}</span>
                            </div>
                        ))}

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600" >Subtotal</span>
                                <span className="text-gray-800 font-medium" name="subtotal">₹{getTotal()}</span>
                            </div>
                            <div className="flex justify-between ">
                                <span className="text-gray-600">Shipping</span>
                                <span className="text-gray-800 font-medium" name="shippingCharge">Free</span>
                            </div>
                            <div className="flex justify-between font-semibold border-t">
                                <span className="text-gray-800">Total</span>
                                <span className="text-gray-900" name="total">₹{getTotal()}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <input type="radio" {...register("paymentType", { required: "payment Method Required" })} name="paymentType" value="Bank" /> <span>Bank</span>
                                <div className="flex items-center space-x-2">
                                    <img src="/images/bkashimage.png" alt="Bkash" className="w-10 h-6 object-contain" />
                                    <img src="/images/visacard.png" alt="Visa" className="w-10 h-6 object-contain" />
                                    <img src="/images/mastercard.png" alt="Mastercard" className="w-10 h-6 object-contain" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio" {...register("paymentType", { required: "payment Method Required" })} name="paymentType" value="Cash on delivery" /> <span>Cash on delivery</span>
                            </div><p className="text-sm text-red-500 mt-1">{errors.paymentType?.message}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0">
                            <input type="text" placeholder="Coupon Code" className="flex-1 border border-gray-400 p-2 rounded w-full" />
                            <button className="px-6 py-2 font-semibold bg-[#DB4444] text-white rounded hover:bg-red-600 transition">Apply Coupon</button>
                        </div>

                        <button onClick={() => trigger()} className="mt-4 px-6 py-2 font-semibold bg-[#DB4444] text-white rounded hover:bg-red-600 transition">Place Order</button>
                    </div>

                </form>
            </div>
        </div>

    )
}