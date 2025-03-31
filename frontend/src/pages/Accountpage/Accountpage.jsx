import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AccountPage() {
    const form = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            address: "",
            current_password: "",
            new_password: "",
            confirm_password: "",
        },
        mode: "all",
    });

    const { register, formState, trigger } = form;

    const { errors } = formState;

    return (
        <div className="container mx-auto px-4 sm:px-8 lg:px-9 m-40 mt-0 mb-10 py-10">
            <div className="flex flex-col justify-end items-center sm:items-start lg:flex-row lg:ml-10 xl:ml-20 gap-8">
                <div className="w-full lg:w-1/4 p-6">
                    <h2 className="text-xl font-semibold mb-4">Manage My Account</h2>
                    <ul className="space-y-2 text-gray-700 mx-4 sm:mx-8">
                        <li className="hover:text-red-500 cursor-pointer">
                            <Link to="/">My Profile</Link>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <Link>Address Book</Link>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <Link>My Payment Options</Link>
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-4">My Orders</h2>
                    <ul className="space-y-2 text-gray-700 mx-4 sm:mx-8">
                        <li className="hover:text-red-500 cursor-pointer">
                            <Link>My Returns</Link>
                        </li>
                        <li className="hover:text-red-500 cursor-pointer">
                            <Link>My Cancellations</Link>
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-4">My Wishlist</h2>
                </div>

                <div className="w-full lg:w-2/4 bg-white mx-auto p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Edit Your Profile
                    </h2>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    First Name <span className="text-red-500">*</span>{" "}
                                </label>
                                <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    {...register("firstname", {
                                        required: "firstname is required",
                                    })}
                                    required
                                    className="w-full p-2 bg-gray-100 focus:ring-2 focus:ring-red-400 rounded-md"
                                />
                                <p className="error text-red-500">
                                    {errors.firstname?.message}
                                </p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    {...register("lastname", {
                                        required: "lastname is required",
                                    })}
                                    required
                                    className="w-full p-2 bg-gray-100 focus:ring-2 focus:ring-red-400 rounded-md"
                                />
                                <p className="error text-red-500">{errors.lastname?.message}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value:
                                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message: "Invalid Email Format",
                                        },
                                    })}
                                    required
                                    className="w-full p-2 bg-gray-100 focus:ring-2 focus:ring-red-400 rounded-md"
                                />
                                <p className="error text-red-500">{errors.email?.message}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    {...register("address", { required: "address is required" })}
                                    required
                                    className="w-full p-2 bg-gray-100 focus:ring-2 focus:ring-red-400 rounded-md"
                                />
                                <p className="error text-red-500">{errors.address?.message}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">
                                Password Changes <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="current_password"
                                id="current_password"
                                {...register("current_password", {
                                    required: "current_password is required",
                                })}
                                required
                                placeholder="Current Password"
                                className="w-full p-2 bg-gray-100 focus:ring-2 focus:ring-red-400 rounded-md mt-2"
                            />
                            <p className="error text-red-500">
                                {errors.current_password?.message}
                            </p>
                            <input
                                type="password"
                                name="new_password"
                                required
                                id="new_password"
                                {...register("new_password", {
                                    required: "new_password is required",
                                })}
                                placeholder="New Password"
                                className="w-full p-2 bg-gray-100 focus:ring-2 focus:ring-red-400 rounded-md mt-2"
                            />
                            <p className="error text-red-500">
                                {errors.new_password?.message}
                            </p>
                            <input
                                type="password"
                                name="confirm_password"
                                required
                                id="confirm_password"
                                {...register("confirm_password", {
                                    required: "confirm_password is required",
                                })}
                                placeholder="Confirm New Password"
                                className="w-full p-2 bg-gray-100 focus:ring-2 focus:ring-red-400 rounded-md mt-2"
                            />
                            <p className="error text-red-500">
                                {errors.confirm_password?.message}
                            </p>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Link to="/">
                                <button
                                    type="button"
                                    className="text-black py-2 px-4 rounded hover:bg-red-500 cursor-pointer hover:text-white transition"
                                >
                                    Cancel
                                </button>
                            </Link>
                            <button
                                type="button"
                                onClick={() => trigger()}
                                className="bg-[#DB4444] text-white py-2 px-6 cursor-pointer rounded hover:bg-red-600 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
