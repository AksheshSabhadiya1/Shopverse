import React, { useEffect, useState } from "react";


export default function Cancellations(props) {

    const propsValue = Object.values(props)
    const [cancelProducts, setCancelProducts] = useState([])
    

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        fetchCancelOrderData()
    }, [])

    const fetchCancelOrderData = async () => {
        try {
            await axios.get('http://localhost:5000/cancellations', { withCredentials: true })
                .then((res) => setCancelProducts(res.data))
                .catch((error) => console.log(error))
        } catch (error) {
            console.log("Order Not Found");
        }
    }

    return (
        <div className={`${propsValue.includes('cancellations') ? 'w-full bg-white p-6 rounded-lg shadow-md' : ''}`}>
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">Your Cancellations</h2>
            
            <div className="grid gap-3">
                { cancelProducts.length > 0 ?
                    cancelProducts?.map((product) => (
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
                    )) : <div>Cancel Product Not Found</div>
                }
            </div>
        </div>
    )
}