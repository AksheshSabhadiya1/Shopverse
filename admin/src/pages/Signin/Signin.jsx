import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import SliderContext from "../../context/Slidercontext";
import axios from 'axios'


export default function Signin() {

    const { sliderOpen, setSliderOpen } = useContext(SliderContext)
    if (sliderOpen) setSliderOpen(!sliderOpen)

    const form = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            mobile: '',
            password: '',
        },
        mode: 'all',
    })

    const { register, handleSubmit, formState, trigger, reset } = form
    const { errors } = formState


    const nevigate = useNavigate()

    const validateAdmin = async (data) => {
        try {
            await axios.post('http://localhost:5000/admin/signin', data, {
                withCredentials: true
            })
            nevigate('/admin')
        } catch (error) {
            console.log("Signin failed", error)
            reset()
        }
    }


    return (
        <div className="flex flex-col md:flex-row h-screen items-center -mt-10 justify-center px-4 md:px-12 lg:px-24">
            <div className="hidden md:block md:w-1/2 lg:w-2/5">
                <img
                    src="/icons/signinpage-image.png"
                    alt="Signup"
                    className="w-full h-auto"
                />
            </div>

            <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col items-center">
                <div className="w-full max-w-md space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">Signin to ShopVerse</h1>
                    <h2 className="text-lg text-gray-600">Enter your details below</h2>
                    <form onSubmit={handleSubmit(validateAdmin)} className="space-y-4">

                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            {...register('email', {
                                required: "Email is required", 
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid Email Format"
                                }
                            })}
                            placeholder="Email"
                            className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        /><p className="error ml-2 text-red-500">{errors.email?.message}</p>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            placeholder="Password"
                            {...register('password', { required: "Password is required" })}
                            className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        /><p className="error ml-2 text-red-500">{errors.password?.message}</p>
                        <button
                            type="submit"
                            className="w-full bg-[#DB4444] hover:bg-orange-700 text-white cursor-pointer font-semibold py-3 rounded-lg transition duration-300"
                            onClick={()=> trigger()}
                        >
                            Sign in
                        </button>
                        <div className="flex justify-between">
                            <Link to='/admin/signup' className="text-blue-500 hover:underline">create new account</Link>
                            <Link to='/admin/signin' className="text-red-500 hover:underline">forgot password?</Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
