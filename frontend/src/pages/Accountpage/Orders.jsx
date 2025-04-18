import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { wishlist } from "../../API/API";
import { Trash2 } from "lucide-react";


export default function Orders(props) {

    const propsValue = Object.values(props)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    const { data } = useQuery({
        queryKey: ["Orders"],
        queryFn: () => wishlist()
    })

    return (
        <div className={`${propsValue.includes('orders') ? 'w-full bg-white p-6 rounded-lg shadow-md' : ''}`}>
                <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">Your Orders</h2>

                <div className="grid gap-3">
                    {
                        data?.map((product) => (
                            <div
                                key={product.id}
                                className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm transition hover:shadow-md"
                            >
                                <div
                                    onClick={() => navigate(`/products/${product.slug}`)}
                                    className="flex items-center w-full sm:w-auto cursor-pointer gap-4"
                                >
                                    <img
                                        src={`http://localhost:5000/uploads/products/${product.image}`}
                                        alt={product.productname}
                                        className="w-20 h-20 object-contain rounded-md bg-white"
                                    />
                                    <div className="text-left max-w-xs">
                                        <div className="text-gray-800 font-semibold text-base truncate">{product.brand}{" "}{product.productname}</div>
                                        <div className="text-gray-500 text-sm line-clamp-2">{product.description}</div>
                                        <div className="mt-2 flex gap-4 text-sm text-gray-600">
                                            <span>Color: {product.productcolor}</span>
                                            <span>Size: {product.productsize}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right sm:text-left mt-4 sm:mt-0">
                                    <div className="text-[#DB4444] font-bold text-xl">
                                        ₹{product.sellingprice}
                                    </div>
                                    <div className="line-through text-gray-500 text-sm">
                                        ₹{product.originalprice}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
    )
}