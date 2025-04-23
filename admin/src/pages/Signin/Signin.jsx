import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import SliderContext from "../../context/SliderData/SliderContextProvider";
import AdminDataContext from "../../context/AdminData/AdminDataContextProvider";

export default function Signin() {
    const { sliderOpen, setSliderOpen } = useContext(SliderContext);
    if (sliderOpen) setSliderOpen(false);

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'all',
    });

    const { register, handleSubmit, formState, trigger, reset } = form;
    const { errors } = formState;
    const navigate = useNavigate();
    const {setCurrentAdmin} = useContext(AdminDataContext)

    const validateAdmin = async (data) => {
        try {
            await axios.post('http://localhost:5000/admin/signin', data, {
                withCredentials: true,
            });
            const {data: result} = await axios.get('http://localhost:5000/admin/currentAdmin',{withCredentials:true})
            result ? setCurrentAdmin(result) : null
            navigate('/admin');
        } catch (error) {
            console.error("Signin failed", error);
            reset();
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4 md:px-12">
            <div className="hidden lg:flex justify-center md:block md:w-1/2">
                <img
                    src="/icons/signinpage-image.png"
                    alt="Signin Visual"
                    className="w-100 h-auto object-cover"
                />
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-lg space-y-6 border border-white/10">
                    <h1 className="text-3xl font-bold text-white text-center">Sign in to <span className="text-blue-400">ShopVerse Admin</span></h1>
                    <p className="text-sm text-gray-300 text-center">Enter your credentials below</p>

                    <form onSubmit={handleSubmit(validateAdmin)} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid Email Format",
                                    },
                                })}
                                required
                                className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                required
                                className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition duration-300"
                            onClick={() => trigger()}
                        >
                            Sign in
                        </button>

                        <div className="flex justify-between text-sm pt-2">
                            <Link to="/admin/signup" className="text-blue-400 hover:underline">
                                Create new account
                            </Link>
                            <Link to="/admin/signin" className="text-red-500 hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
