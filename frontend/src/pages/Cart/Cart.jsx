import React, { useContext, useEffect } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import CartContext from "../../context/Cart/CartContextProvider";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import EmptyCart from "../Error/EmptyCart";



export default function Cart() {

    const { cartItem, clearCart, setSessionItem, sessionItem, updateCart, removeFromCart } = useContext(CartContext)
    const navigate = useNavigate()
    const currentCart = cartItem.length === 0 ? sessionItem : cartItem
    const userToken = Cookies.get('userToken') || null


    const handleQuantityChange = async (id, value) => {
        try {
            if (cartItem.length > 0) {
                updateCart(id, value)
            }
            const updatedCart = sessionItem.map(product => {
                if (product.id === id) {
                    return { ...product, quantity: Math.max(product.quantity + value, 1) }
                }
                return product
            })
            setSessionItem(updatedCart);
            sessionStorage.setItem('cartitem', JSON.stringify(updatedCart))
        } catch (error) {
            console.log("Quantity Not Update", error);
        }
    }

    const getTotal = () => {
        if (cartItem.length > 0) {
            return cartItem?.reduce((count, product) => {
                return count + Math.max(product.quantity, 1) * product.sellingprice
            }, 0)
        }

        if (sessionItem.length > 0) {
            return sessionItem?.reduce((count, product) => {
                return count + Math.max(product.quantity, 1) * product.sellingprice
            }, 0)
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])


    return currentCart.length > 0 ? (
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:ml-30 lg:mr-30 lg:mb-10">
            <div className="flex justify-between items-center">
                <button onClick={() => navigate('/products')} className="mb-4 px-6 py-3 outline bg-white cursor-pointer text-black rounded hover:bg-[#DB4444] hover:text-white transition duration-300">
                    Contine Shopping
                </button>
                <button onClick={() => clearCart()} className="mb-4 px-6 py-3 outline bg-white cursor-pointer text-black rounded hover:bg-[#DB4444] hover:text-white transition duration-300">
                    Clear Cart
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 font-bold text-center border-b-2 py-4 border-gray-300 text-lg">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span>Action</span>
            </div>

            {currentCart.length > 0 && currentCart?.map(product => (
                <div key={product.id} className="grid grid-cols-2 sm:grid-cols-5 items-center text-center py-2 border-b border-gray-200">
                    <div onClick={() => navigate(`/products/${product.slug}`)} className="flex cursor-pointer justify-start items-center space-x-4">
                        <img src={`http://localhost:5000/uploads/products/${product.image}`} alt={product.productname} className="w-16 h-16 object-contain" />
                        <div className="text-start">
                            <span>{product.productname}</span>
                        </div>
                    </div>
                    <span className="text-lg">₹{product.sellingprice}</span>
                    <div className="flex justify-center items-center space-x-2">
                        <button onClick={() => handleQuantityChange(cartItem.length === 0 ? product.id : product.product_id, -1)} disabled={product.quantity === 1} className="p-1 rounded-full bg-gray-200 hover:bg-[#DB4444] disabled:opacity-50 hover:text-white">
                            <Minus />
                        </button>
                        <span>{product.quantity || 1}</span>
                        <button onClick={() => handleQuantityChange(cartItem.length === 0 ? product.id : product.product_id, 1)} disabled={product.stock_count < product.quantity || product.quantity === product.stock_count} className="p-1 rounded-full bg-gray-200 disabled:opacity-50 hover:bg-[#DB4444] hover:text-white ">
                            <Plus />
                        </button>
                    </div>
                    <span className="text-[#DB4444] text-lg font-semibold">₹{product.sellingprice * product.quantity}</span>
                    <button onClick={() => removeFromCart(cartItem.length === 0 ? product.id : product.product_id)} className="mx-auto hover:bg-red-500 hover:text-white transition-all duration-300 flex p-2 rounded-full">
                        <Trash2 className=" hover:scale-105" />
                    </button>
                </div>
            ))
            }


            <div className="flex flex-col lg:flex-row justify-between items-start mt-12 gap-6">
                <div className="flex space-x-3 w-full lg:w-auto">
                    <input
                        type="text"
                        name="coupon"
                        className="border border-gray-400 p-2 rounded w-full lg:w-64"
                        placeholder="Coupon Code"
                    />
                    <button className="px-6 py-2 font-semibold bg-[#DB4444] text-white rounded hover:bg-red-600 transition">
                        Apply Coupon
                    </button>
                </div>

                <div className="w-full lg:w-1/3 bg-gray-100 p-6 border rounded shadow">
                    <h3 className="text-xl font-semibold border-b pb-2">Cart Total</h3>
                    <div className="flex justify-between py-2">
                        <span>Subtotal:</span>
                        <span>₹{getTotal()}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between border-t pt-3 mt-3 text-lg font-semibold">
                        <span>Total:</span>
                        <span className="text-[#DB4444]">₹{getTotal()}</span>
                    </div>

                    <button onClick={() => userToken ? navigate('/checkout') : navigate('/signin')} className="w-full mt-4 px-6 py-3 bg-[#DB4444] text-white rounded hover:bg-red-600 transition">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
        : <EmptyCart />
}
