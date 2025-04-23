import React, { useContext, useEffect } from "react"
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2'
import UserDataContext from "../../context/UserData/UserDataContextProvider";

export default function PasswordChange(props) {
    const { currentUser, fetchCurrentUserData } = useContext(UserDataContext)
    const navigate = useNavigate()
    const propsValue = Object.values(props)

    const form = useForm({
        defaultValues: {
            current_password: "",
            new_password: "",
            confirm_password: "",
        },
        mode: "all",
    });

    const { register, handleSubmit, formState, watch, trigger } = form;
    const { errors } = formState;

    const updateUserData = async (data) => {
        try {
            Swal.fire({
                title: "Do you want to change password?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then(async(result) => {
                if (result.isConfirmed) {
                    await axios.post('http://localhost:5000/updatePassword', { ...data, ...currentUser }, { withCredentials: true })
                        .then(() => {navigate('/my_account'), Swal.fire("Password Updated Successfully!!", "", "success")})
                        .catch(error => console.log(error))
                } else if (result.isDenied) {
                    Swal.fire("Password Not Updated!", "", "info");
                } else {
                    Swal.fire("Cancel Operation", "", "error");
                }
            });
        } catch (error) {
            console.log("Update Password failed", error);
        }
    }

    const newPassword = watch('new_password')

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        fetchCurrentUserData()
    }, [])

    return (
        <div className={`${propsValue.includes('edit_password') ? 'w-full bg-white p-6 rounded-lg shadow-md' : ''}`}>
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">Edit Your Password</h2>

            <form onSubmit={handleSubmit(updateUserData)} className="space-y-4">
                <div className="space-y-1">
                    <label className="block text-gray-700 font-medium m-1">
                        Password Change
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Current Password"
                        {...register("current_password", {
                            required: "Current Password is required",
                        })}
                        className="w-1/3 p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md mb-2"
                    />
                    <p className="text-sm m-1 text-red-500">{errors.current_password?.message}</p>

                    <input
                        type="password"
                        placeholder="Enter New Password"
                        {...register("new_password", {
                            required: "New Password is required",
                        })}
                        className="w-1/3 p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md mb-2"
                    />
                    <p className="text-sm m-1 text-red-500">{errors.new_password?.message}</p>

                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        {...register("confirm_password", {
                            required: "Confirm password is required",
                            validate: (value) =>
                                value === newPassword || "Password not matched",
                        })}
                        className="w-1/3 p-3 bg-gray-100 focus:ring-2 focus:ring-red-400 outline-none rounded-md"
                    />
                    <p className="text-sm m-1 text-red-500">{errors.confirm_password?.message}</p>
                </div>
                <div className="flex justify-start space-x-2">
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
                        Update Password
                    </button>

                </div>
            </form>
        </div>
    )
}