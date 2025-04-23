import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WishlistContext from "../../context/Wishlist/WishlistContextProvider";
import { ShoppingCart, Trash2 } from "lucide-react";
import EmptyWishlist from "../Error/EmptyWishlist";


export default function Wishlistpage(props) {
    const propsValue = Object.values(props)
    const {wishlistItem, removeFromWishlist} = useContext(WishlistContext)
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    return (
        <div className={`${propsValue.includes('wishlist') ? 'w-full bg-white p-6 rounded-lg shadow-md' : ''}`}>
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">Your Wishlist</h2>
            {
                wishlistItem.length > 0 ?
                <>
            <div className="grid grid-cols-2 sm:grid-cols-5 font-bold text-gray-600 text-center border-b-2 py-4 border-gray-300 text-lg">
                <span>Product</span>
                <span>Price</span>
                <span>Stock</span>
                <span>Cart</span>
                <span>Action</span>
            </div>

            {wishlistItem?.map(product => (
                <div key={product.id} className="grid grid-cols-2 sm:grid-cols-5 items-center text-center py-2 border-b border-gray-200">
                    <div onClick={() => navigate(`/products/${product.slug}`)} className="flex cursor-pointer justify-start items-center space-x-4">
                        <img src={`http://localhost:5000/uploads/products/${product.image}`} alt={product.productname} className="w-16 h-16 object-contain" />
                        <div className="text-start">
                            <span>{product.productname}</span>
                        </div>
                    </div>
                    <span className="text-lg">₹{product.sellingprice}</span>
                    <span className="text-[#DB4444] text-lg font-semibold">{product.stock_count > 0 ? <span className="text-green-500 ml-4">In Stock</span> : <span className="text-red-500 ml-4">Out of Stock</span>}</span>
                    <div className="flex justify-center items-center space-x-2">
                        <button
                            onClick={() => { addToCart(product), removeFromWishlist(product.id) }}
                            className={`w-58 bg-white flex items-center border justify-center relative left-2.5 text-black py-2 cursor-pointer rounded hover:bg-[#DB4444] hover:text-white transition-all duration-500 ease-in-out opacity-100 -top-10" `}>
                            <ShoppingCart className="me-2 duration-300" /> Add to Cart
                        </button>
                    </div>
                    <button onClick={() => removeFromWishlist(product.id)} className="mx-auto hover:bg-red-500 hover:text-white transition-all duration-300 flex p-2 rounded-full">
                        <Trash2 className=" hover:scale-105" />
                    </button>
                </div>
                ))
            } 
            </> : <EmptyWishlist />
        } 
        </div>       
    ) 
}