import React, { useContext, useEffect } from "react"
import { useForm } from "react-hook-form";
import UserDataContext from "../../context/UserData/UserDataContext";
import { NavLink } from "react-router-dom";


export default function EditProfile(props) {
    const { currentUser } = useContext(UserDataContext)
    const propsValue = Object.values(props)
    
        const form = useForm({
            defaultValues: {
                firstname: "",
                lastname: "",
                email: "",
                mobile: "",
                gender: "",
                address: "",
                new_password: "",
                confirm_password: "",
            },
            mode: "all",
        });
    
        const { register, formState, reset, watch, trigger } = form;
        const { errors } = formState;
    
        const newPassword = watch('new_password')

        useEffect(() => {
            if (currentUser) {
                reset({
                    firstname: currentUser?.firstname,
                    lastname: currentUser?.lastname,
                    email: currentUser?.email,
                    mobile: currentUser?.mobile,
                    gender: currentUser?.gender,
                    address: currentUser?.address,
                })
            }
        }, [currentUser])

        useEffect(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
        }, [])

    return(
        <div className={`${propsValue.includes('edit_profile') ? 'w-full bg-white p-6 rounded-lg shadow-md' : ''}`}>
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">{ propsValue.includes('edit_profile') ? 'Edit Your Profile' : 'Your Profile' }</h2>

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
                                    disabled={!(propsValue.includes('edit_profile'))}
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
                                    disabled={!(propsValue.includes('edit_profile'))}
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
                                    disabled={!(propsValue.includes('edit_profile'))}
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
                                    disabled={!(propsValue.includes('edit_profile'))}
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
                                    disabled={!(propsValue.includes('edit_profile'))}
                                    required
                                    className="w-full p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <p className="text-sm text-red-500">{errors.gender?.message}</p>
                            </div>
                            {
                                propsValue.includes('edit_profile') && <div>
                                <label className="block text-gray-700 font-medium m-1">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("address", {
                                        required: "Address is required",
                                    })}
                                    disabled={!(propsValue.includes('edit_profile'))}
                                    required
                                    className="w-full p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md"
                                />
                                <p className="text-sm text-red-500">{errors.address?.message}</p>
                            </div>
                            }
                        </div>
                        {
                            propsValue.includes('edit_profile') && <>
                        <div>
                            <label className="block text-gray-700 font-medium m-1">
                                Password Changes
                            </label>
                            <input
                                type="password"
                                placeholder="Enter New Password"
                                {...register("new_password", {
                                    required: "New Password is required",
                                })}
                                className="w-full p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md mb-2"
                            />
                            <p className="text-sm text-red-500">{errors.new_password?.message}</p>
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                {...register("confirm_password", {
                                    required: "Confirm password is required",
                                    validate: (value) =>
                                        value === newPassword || "Password not matched",
                                })}
                                className="w-full p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md"
                            />
                            <p className="text-sm text-red-500">{errors.confirm_password?.message}</p>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <NavLink to="/">
                                <button
                                    type="button"
                                    className="text-black border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                            </NavLink>
                            <button
                                type="button"
                                onClick={() => trigger()}
                                className="bg-[#DB4444] text-white px-6 py-2 rounded hover:bg-red-600 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                        </>
                        }
                    </form>
                </div>
    )
}