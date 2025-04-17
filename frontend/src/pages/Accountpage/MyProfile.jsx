import AddressBook from "./AddressBook";
import PaymentOptions from "./PaymentOptions";
import React, { useContext, useEffect } from "react"
import { useForm } from "react-hook-form";
import UserDataContext from "../../context/UserData/UserDataContext";


export default function MyProfile(){

    const { currentUser } = useContext(UserDataContext)
    
        const form = useForm({
            defaultValues: {
                firstname: "",
                lastname: "",
                email: "",
                mobile: "",
                gender: "",
            },
            mode: "all",
        });
    
        const { register, formState, reset, watch, trigger } = form;
        const { errors } = formState;
    

        useEffect(() => {
            if (currentUser) {
                reset({
                    firstname: currentUser?.firstname,
                    lastname: currentUser?.lastname,
                    email: currentUser?.email,
                    mobile: currentUser?.mobile,
                    gender: currentUser?.gender,
                })
            }
        }, [currentUser])

    return(
            <div className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-medium m-1">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("firstname", {
                                        required: "firstname is required",
                                    })}
                                    required
                                    className="w-full p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md"
                                />
                                <p className="text-sm text-red-500">{errors.firstname?.message}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium m-1">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("lastname", {
                                        required: "lastname is required",
                                    })}
                                    required
                                    className="w-full p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md"
                                />
                                <p className="text-sm text-red-500">{errors.lastname?.message}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium m-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value:
                                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message: "Invalid Email Format",
                                        },
                                    })}
                                    required
                                    className="w-full p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md"
                                />
                                <p className="text-sm text-red-500">{errors.email?.message}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium m-1">
                                    Mobile <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    {...register("mobile", {
                                        required: "Mobile is required",
                                        validate: (value) =>
                                            value.length === 10 || "Please Enter Valid Mobile Number",
                                    })}
                                    required
                                    className="w-full p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md"
                                />
                                <p className="text-sm text-red-500">{errors.mobile?.message}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium m-1">
                                    Gender <span className="text-red-500">*</span>
                                </label>
                                <select
                                    {...register("gender", { required: "Gender is required" })}
                                    required
                                    className="w-full p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <p className="text-sm text-red-500">{errors.gender?.message}</p>
                            </div>
                        </div>
                    </form>
            <AddressBook />
            <PaymentOptions />  
        </div>
    )
}