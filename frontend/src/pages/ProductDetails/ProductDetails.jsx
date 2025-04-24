import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { FindProductById } from "../../API/API";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CircleCheck, CircleX, Heart, Minus, Plus } from "lucide-react";
import { SendHorizontal } from 'lucide-react';
import axios from "axios";
import EmptyProducts from "../Error/EmptyProduct";
import ProductCategory from "../../components/ProductsAPI/ProductCategory";
import CartContext from "../../context/Cart/CartContextProvider";
import WishlistContext from "../../context/Wishlist/WishlistContextProvider";
import Cookies from 'js-cookie'


export default function ProductDetails() {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [pincodeFound, SetPincodeFound] = useState("")
    const { id } = useParams()
    const { addToCart } = useContext(CartContext)
    const { addToWishlist } = useContext(WishlistContext)
    const userToken = Cookies.get('userToken') || null
    const navigate = useNavigate()


    const { data } = useQuery({
        queryKey: ['productDetails', id],
        queryFn: () => FindProductById(id)
    });

    const checkValidPincode = async () => {
        const pincode = document.getElementById('pincode').value
        const { data } = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`)

        const result = data[0].Status
        SetPincodeFound(result)
    }

    const handleQuantityChange = (value) => {
        const newQuantity = quantity + value;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {data?.length > 0 ? data?.map((product) => (<>
                <div key={product.id} className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 order-1">
                        <div className="border border-gray-200 rounded-lg p-8 flex justify-center items-center bg-white h-auto">
                            <div className="absolute top-50 left-45">
                                <button onClick={()=> userToken ? addToWishlist(product) : navigate('/signin')}>
                                    <Heart className="hover:text-red-500" />
                                </button>
                            </div>
                            <img src={`http://localhost:5000/uploads/products/${product.image}`} alt={product.produtname} className="w-full max-h-[500px] object-contain" />
                        </div>
                        <div className="flex gap-4 justify-center mt-5 order-2">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="border border-gray-200 rounded-lg p-1 w-25 h-25 flex justify-center items-center hover:border-[#DB4444] transition-colors cursor-pointer">
                                    <img src={`http://localhost:5000/uploads/products/${product.image}`} alt={`Thumbnail ${item}`} className="w-full h-full object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="lg:w-1/3 space-y-6 order-3">
                        <div className="space-y-4">
                            <h1 className="text-2xl md:text-3xl uppercase font-bold text-gray-900">{product.brand}{" "}{product.productname}</h1>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-2xl font-semibold text-gray-900">₹{product.sellingprice * quantity}</p>
                            <div className="flex items-center">
                                <div className="flex">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span
                                            key={index}
                                            className={index < product.rating ? "text-yellow-500" : "text-gray-300"}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <span className="text-gray-500 ml-2">({product.rate_count} Reviews)</span>
                                {
                                    product.stock_count > 0 ? <span className="text-green-500 ml-4">In Stock</span> : <span className="text-red-500 ml-4">Out of Stock</span>
                                }
                            </div>
                        </div>

                        {
                            product.productcolor.length > 0 &&

                            <div className="border-t border-gray-200 py-0 pt-4">
                                <div className="mb-6">
                                    <h3 className="font-semibold text-lg mb-3">Color:</h3>
                                    <div className="flex gap-3">
                                        {product.productcolor?.map((color) => (
                                            <label key={color} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="color"
                                                    value={color}
                                                    checked={selectedColor === color}
                                                    onChange={() => setSelectedColor(color)}
                                                    className="hidden"
                                                />
                                                <div className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-gray-300'} flex items-center justify-center`}>
                                                    <div
                                                        className={`w-6 h-6 rounded-full ${color.toLowerCase() === 'white' ? 'border border-gray-300' : ''}`}
                                                        style={{ backgroundColor: color.toLowerCase() }}
                                                    ></div>
                                                </div>
                                                <span>{color}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            product.productsize.length > 0 && <div>
                                <div className="border-t border-b border-gray-200 py-6">
                                    <h3 className="font-semibold text-lg mb-3">Size:</h3>
                                    <div className="flex gap-2">
                                        {product.productsize.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-10 h-10 border rounded-md flex items-center justify-center transition-colors ${selectedSize === size
                                                    ? 'bg-[#DB4444] text-white border-[#DB4444]'
                                                    : 'border-gray-300 hover:bg-[#DB4444] hover:text-white'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }


                        <div className="flex flex-row sm:flex-row gap-4">
                            <div className="flex items-center border w-30.5 border-gray-300 rounded">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="px-2 py-2.5 text-lg hover:bg-[#DB4444] rounded-s hover:border-gray-400 hover:text-white"
                                >
                                    <Minus />
                                </button>
                                <span className="px-4 py-2">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="px-2 py-2.5 text-lg hover:bg-[#DB4444] rounded-e hover:border-gray-400 hover:text-white"
                                >
                                    <Plus />
                                </button>
                            </div>

                            <button onClick={() => addToCart(product)} className="md:flex-1 bg-[#DB4444] sm:flex-1 text-white py-2 px-6 rounded hover:bg-[#c33a3a] transition-colors">
                                Buy Now
                            </button>


                        </div>

                        <div className="border border-gray-200 rounded p-4 mt-6">
                            <div className="flex flex-col sm:flex-row items-start gap-4 pb-4 border-b border-gray-200">
                                <img src="/icons/delivery-icon.png" alt="Delivery" className="w-6 h-6 sm:w-8 sm:h-8 mt-1" />
                                <div>
                                    <p className="font-medium text-base sm:text-lg">Free Delivery</p>
                                    <Link className="text-[#DB4444] border-b border-[#DB4444] text-sm sm:text-base">
                                        Enter your postal code for Delivery Availability
                                    </Link>

                                    <div>
                                        <div className="flex">
                                            <input type="text" id="pincode" placeholder="Enter pincode" className="w-full p-2 mt-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-[#DB4444]" />
                                            <SendHorizontal onClick={() => checkValidPincode()} className="relative right-8 top-4 text-gray-600 hover:text-[#DB4444] transition-all duration-300 hover:scale-115" />
                                        </div>
                                        <div name="pincodeResult" className="">
                                            {
                                                pincodeFound === 'Success' &&
                                                <span className='text-green-500 transition-all duration-300 flex items-center mt-1 ml-1'>Delivery Availabile <CircleCheck className="mx-1 w-5 h-5" /> </span>
                                            }
                                            {
                                                pincodeFound === 'Error' &&
                                                <span className='text-red-500 transition-all duration-300 flex items-center mt-1 ml-1'>Delivery Not Availabile <CircleX className="mx-1 w-5 h-5" /> </span>
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                                <img src="/icons/return-icon.png" alt="Return" className="w-6 h-6 sm:w-8 sm:h-8 mt-1" />
                                <div>
                                    <p className="font-medium text-base sm:text-lg">Return Delivery</p>
                                    <p className="text-sm sm:text-base">
                                        Free 30 Days Delivery Returns.{" "}
                                        <Link to="#" className="text-[#DB4444] border-b border-[#DB4444]">
                                            Details
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <div className="px-6 py-4 lg:mt-14 md:mt-10 mt-5">
                        <ProductCategory props={product.category} />
                    </div>
                </div>
            </>
            )) :
                <EmptyProducts />
            }

        </div>
    );
}