import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import UserDataContext from "../../context/UserData/UserDataContext";


export default function PaymentMethods(props) {
    const propsValue = Object.values(props)
    const {currentUser, fetchCurrentUserData} = useContext(UserDataContext)


    const form = useForm({
        defaultValues: {
            payment: "",
        },
        mode: "all",
    });

    const { register, handleSubmit, formState, reset, watch, trigger } = form;
    const { errors } = formState;

    const updatePayment = async(data) => {
        try {
            await axios.post('http://localhost:5000/updatePayment', {...data, ...currentUser}, {withCredentials: true})
            .then(()=> console.log("Payment Method Updated"))
            .catch(error => console.log(error))

        } catch (error) {
            console.log("Payment Method Not Updated");
        }
    }

    useEffect(()=>{
        reset({
            payment: currentUser?.payment_method
        })
    },[currentUser])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        fetchCurrentUserData()
    }, [])

    return (
        <div className={`${propsValue.includes('payments') ? 'w-full bg-white p-6 rounded-lg shadow-md' : ''}`}>
            {
                propsValue.includes('payments') && <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">Payment Method</h2>
            }
            <form onSubmit={handleSubmit(updatePayment)} className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium m-1 mt-2">
                            Default payment method <span className="text-red-500">*</span>
                        </label>
                        <select
                            type="text"
                            {...register("payment", {
                                required: "Payment method is required",
                            })}
                            disabled={!(propsValue.includes('payments'))}
                            required
                            className="w-full p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md"
                        >
                            <option value="" className="text-gray-400">Select payment method</option>
                            <option value="Cash On Delivery">Cash On Delivery</option>
                            <option value="Bank">Bank</option>
                        </select>
                        <p className="text-sm text-red-500">{errors.payment?.message}</p>
                    </div>
                </div>
                {
                    propsValue.includes('payments') && <div className="flex justify-start space-x-4">
                        <NavLink to="/my_account">
                            <button
                                type="button"
                                className="text-black border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                        </NavLink>
                        <button
                            onClick={() => trigger()}
                            className="bg-[#DB4444] text-white px-6 py-2 rounded hover:bg-red-600 transition"
                        >
                            Update Changes
                        </button>
                    </div>
                }
            </form>
        </div>
    )
}