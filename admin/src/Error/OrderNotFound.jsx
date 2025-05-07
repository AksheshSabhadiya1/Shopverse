import React from "react";


export default function OrderNotFound({props, value}) {
    console.log(value);
    return (
        <div className="flex flex-col items-center min-h-[60vh] px-4 text-center">
            {
                value.length === 2 && <h2 className="text-3xl font-bold text-white mb-2">OrderID: #{props}</h2>
            }
            <h3 className="text-3xl font-bold text-red-500 mb-2"><span className="capitalize">{value[2]}</span> Order Not Found</h3>
        </div>
    )
}