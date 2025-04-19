import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserDataContext from "../../context/UserData/UserDataContext";
import axios from "axios";


export default function AddressBook(props) {
    const propsValue = Object.values(props)
    const navigate = useNavigate()
    const { currentUser } = useContext(UserDataContext)

    const form = useForm({
        defaultValues: {
            defaultAddress: "",
        },
        mode: "all",
    });

    useEffect(() => {
        reset({
            defaultAddress: currentUser?.address,
        })
    }, [currentUser])

    const updateAddress = async(data) => {
        try {
            await axios.post('http://localhost:5000/updateAddress', {...data, ...currentUser}, {withCredentials:true})
            .then(()=> navigate('/my_account'))
            .catch(error => console.log("Address Not Updated"))
        } catch (error) {
            console.log("Address not Updated", error);
        }
    }

    const { register, handleSubmit, formState, reset, trigger } = form;
    const { errors } = formState;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    return (
        <div className={`${propsValue.includes('addressbook') ? 'w-full bg-white p-6 rounded-lg shadow-md' : ''}`}>
            {
                propsValue.includes('addressbook') && <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">Address Book</h2>
            }
            <form onSubmit={handleSubmit(updateAddress)} className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="w-full">
                        <label className="block text-gray-700 font-medium m-1 mt-2">
                            Default Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            type="text"
                            {...register("defaultAddress", {
                                required: "defaultAddress is required",
                            })}
                            disabled={!(propsValue.includes('addressbook'))}
                            required
                            className="w-full p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md"
                        />
                        <p className="text-sm text-red-500">{errors.defaultAddress?.message}</p>
                    </div>
                </div>
                {
                    propsValue.includes('addressbook') && <div className="flex justify-start space-x-4">
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
                            Save Address
                        </button>
                        
                    </div>
                }
            </form>
        </div>
    )
}