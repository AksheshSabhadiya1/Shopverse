import React, { useContext, useState } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WishlistContext from "../../context/Wishlist/WishlistContextProvider";
import CartContext from "../../context/Cart/CartContextProvider";
import EmptyWishlist from "../Error/EmptyWishlist";
import ProductCategory from "../../components/ProductsAPI/ProductCategory";

export default function Wishlist() {
    const navigate = useNavigate()
    const { wishlistItem, clearWishlist, removeFromWishlist } = useContext(WishlistContext)
    const { addToCart } = useContext(CartContext)

    const moveAllProductInCart = () => {
        wishlistItem.map(product => addToCart(product))
        clearWishlist()
    }


    return wishlistItem.length > 0 ? (
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:ml-40 lg:mr-30 lg:mb-8">
            <div className="flex justify-between items-center">
                <button onClick={() => moveAllProductInCart()} className="mb-4 px-6 py-3 outline bg-white cursor-pointer text-black rounded hover:bg-[#DB4444] hover:text-white transition duration-300">
                    Move All To Cart
                </button>
                <button onClick={() => clearWishlist()} className="mb-4 px-6 py-3 outline bg-white cursor-pointer text-black rounded hover:bg-[#DB4444] hover:text-white transition duration-300">
                    Clear Wishlist
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 font-bold text-center border-b-2 py-4 border-gray-300 text-lg">
                <span>Product</span>
                <span>Price</span>
                <span>Stock</span>
                <span>Cart</span>
                <span>Action</span>
            </div>

            {wishlistItem.length > 0 && wishlistItem?.map(product => (
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
            <ProductCategory />
        </div>
    ) 
    : <EmptyWishlist />
}
