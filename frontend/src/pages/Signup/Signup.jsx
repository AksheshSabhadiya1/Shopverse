import React from "react";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';


export default function Signup() {

    const form = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            email_phone: '',
            password: '',
        },
        mode: 'all',
    })

    const { register, formState, trigger } = form

    const { errors } = formState
    return (
        <div className="flex flex-col md:flex-row h-screen items-center justify-center -my-10 px-6 md:px-12 lg:px-24">
            <div className="hidden md:block md:w-1/2 lg:w-2/5">
                <img
                    src="/icons/signinpage-image.png"
                    alt="Signup"
                    className="w-full h-auto"
                />
            </div>

            <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col items-center">
                <div className="w-full max-w-md space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
                    <h2 className="text-3xs text-gray-600">Enter your details below</h2>
                    <form className="space-y-2.5">
                        <div className='w-full flex justify-center items-center mb-4'>
                            <div className="w-full me-2">
                                <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    {...register("firstname", { required: "Firstname is required" })}
                                    placeholder="First Name"
                                    required
                                    className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                                /><p className="error m-2 text-red-500">{errors.firstname?.message}</p>
                            </div>
                            <div className="w-full mx-2">
                                <input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    {...register("lastname", { required: "Lastname is required" })}
                                    placeholder="Last Name"
                                    required
                                    className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                                /><p className="error m-2 text-red-500">{errors.lastname?.message}</p>
                            </div>
                        </div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Email"
                            required
                            className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                        /><p className="error ml-2 text-red-500">{errors.email?.message}</p>
                        <input
                            type="number"
                            name="mobile"
                            id="mobile"
                            {...register("mobile", { required: "Mobile Number is required" })}
                            placeholder="Mobile Number"
                            required
                            className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                        /><p className="error ml-2 text-red-500">{errors.mobile?.message}</p>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            {...register("password", { required: "Password is required" })}
                            placeholder="Set Password"
                            required
                            className="w-full p-3 bg-gray-100 rounded focus:outline-none "
                        /><p className="error ml-2 text-red-500">{errors.password?.message}</p>
                        <button
                            type="submit"
                            className="w-full bg-[#DB4444] hover:bg-orange-700 text-white cursor-pointer font-semibold py-2 rounded-lg transition duration-300"
                        >
                            Create Account
                        </button>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center bg-white border cursor-pointer border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg transition duration-300"
                        >
                            <img
                                src="/icons/Google-logo.png"
                                alt="Google"
                                className="w-5 h-5 mr-2"
                            />
                            Sign up with Google
                        </button>
                    </form>
                    <p className="text-gray-600">
                        Already have an account? <Link to='/signin' className="text-orange-600 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
