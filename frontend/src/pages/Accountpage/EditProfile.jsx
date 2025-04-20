import React, { useContext, useEffect } from "react"
import { useForm } from "react-hook-form";
import UserDataContext from "../../context/UserData/UserDataContext";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function EditProfile(props) {
    const { currentUser, fetchCurrentUserData } = useContext(UserDataContext)
    const navigate = useNavigate()
    const propsValue = Object.values(props)

    const form = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
            gender: "",
            address: "",
            password: "",
        },
        mode: "all",
    });

    const { register, handleSubmit, formState, watch, reset, trigger } = form;
    const { errors } = formState;

    const updateUserData = async (data) => {
        try {
            await axios.post('http://localhost:5000/signup', data, { withCredentials: true })
                .then(() => navigate('/my_account'))
                .catch(error => console.log(error))

        } catch (error) {
            console.log("Update failed", error);
        }
    }


    useEffect(() => {
        if (currentUser) {
            reset({
                firstname: currentUser?.firstname,
                lastname: currentUser?.lastname,
                email: currentUser?.email,
                mobile: currentUser?.mobile,
                gender: currentUser?.gender,
                address: currentUser?.address,
                password: currentUser?.password,
            })
        }
    }, [currentUser])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        fetchCurrentUserData()
    }, [])

    return (
        <div className={`${propsValue.includes('edit_profile') ? 'w-full bg-white p-6 rounded-lg shadow-md' : ''}`}>
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">{propsValue.includes('edit_profile') ? 'Edit Your Profile' : 'Your Profile'}</h2>

            <form onSubmit={handleSubmit(updateUserData)} className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
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
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
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
                        !propsValue.includes('edit_profile') &&
                        <div className="mx-auto space-x-2">
                            <label className="block text-gray-700 font-medium m-1">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter New Password"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                disabled={!(propsValue.includes('edit_profile'))}
                                className="w-50 p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md mb-2"
                            />
                            <NavLink
                                to='/my_account/edit_password'
                                className="bg-[#DB4444] text-white px-6 py-2 rounded hover:bg-red-600 transition"
                            >
                                Edit
                            </NavLink>
                        </div>
                    }

                    {
                        propsValue.includes('edit_profile') && <div>
                            <label className="block text-gray-700 font-medium m-1">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <div className="flex justify-center items-center space-x-1">
                                <textarea
                                    type="text"
                                    {...register("address", {
                                        required: "Address is required",
                                    })}
                                    disabled={(propsValue.includes('edit_profile'))}
                                    required
                                    className="w-full p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md"
                                />
                                <p className="text-sm text-red-500">{errors.address?.message}</p>
                                <NavLink
                                    to='/my_account/addressbook'
                                    className="bg-[#DB4444] text-white px-6 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Edit
                                </NavLink>
                            </div>

                        </div>
                    }
                </div>
                {
                    propsValue.includes('edit_profile') &&
                    <div className="flex justify-start space-x-4">
                        <NavLink to="/my_account">
                            <button
                                className="text-black border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                        </NavLink>
                        <button
                            onClick={() => trigger()}
                            className="bg-[#DB4444] text-white px-6 py-2 rounded hover:bg-red-600 transition"
                        >
                            Update Profile
                        </button>
                    </div>
                }
            </form>
        </div>
    )
}