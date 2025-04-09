import React, { useState, useContext, useEffect } from "react";
import SliderContext from "../../context/Slidercontext";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";


export default function ProductDetails() {
    const [products, setProducts] = useState([]);
    const { sliderOpen } = useContext(SliderContext);
    const {id} = useParams()


    const fetchAllProductData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/admin/products/${id}`, {
                withCredentials: true
            })
            data.length > 0 ? setProducts(data) : null
        } catch (error) {
            console.log("Data Fetching Error", error);
        }
    }

    useEffect(() => {
        fetchAllProductData()
    }, [])


    return (
        <div className={`pt-15 ${sliderOpen ? "pl-64" : "pl-0"}`}>
            <div className=" min-h-screen pt-10 w-full bg-gradient-to-br from-gray-900 to-gray-700 flex justify-center p-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product.id}
                                className="relative h-full flex flex-col justify-between p-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl shadow-md hover:scale-105 transition-all duration-300 text-center"
                            >
                            <div>
                                    <img
                                        src={product.image}
                                        alt={product.productname}
                                        className="w-30 h-24 object-contain mx-auto mb-3"
                                    />
                                    <h3 className="text-lg font-semibold">{product.productname}</h3>
                                    <p className="text-sm text-gray-300">{product.description}</p>
                                    <p className="mt-2 text-lg font-bold text-blue-400">₹{product.price}</p>
                                </div>

                                <NavLink to={`/admin/products/editproduct/${product.id}`}>
                                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                        Edit
                                    </button>
                                </NavLink>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-300 w-full col-span-4">
                            No products available.
                        </p>
                    )}
        </div>
        </div>
    );
}
