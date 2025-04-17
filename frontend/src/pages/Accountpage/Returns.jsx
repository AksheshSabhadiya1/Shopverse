import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";


export default function Returns(props) {
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

    return (
        <div className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Options</h2>

            <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium m-1">
                            Default payment type <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("address", {
                                required: "Address is required",
                            })}
                            required
                            className="w-full p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md"
                        />
                        <p className="text-sm text-red-500">{errors.address?.message}</p>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <NavLink to="/my_account">
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
            </form>
        </div>
    )
}