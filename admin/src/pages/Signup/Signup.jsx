import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import SliderContext from "../../context/SliderData/SliderContextProvider";

export default function Signup() {
    const { sliderOpen, setSliderOpen } = useContext(SliderContext);
    if (sliderOpen) setSliderOpen(false);

    const form = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
            password: "",
        },
        mode: "all",
    });

    const { register, handleSubmit, formState, trigger, reset } = form;
    const { errors } = formState;
    const navigate = useNavigate();

    const CreateNewAdmin = async (data) => {
        try {
            await axios.post("http://localhost:5000/admin/signup", data, {
                withCredentials: true,
            });
            navigate("/admin/signin");
        } catch (error) {
            console.error("New Admin not Created", error);
            reset();
        }
    };

    const signupWithGoogle = () => {
        window.open("http://localhost:5000/admin/auth/google/callback", "_self");
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4 py-14 md:px-12">
            <div className="hidden md:flex justify-center w-full md:w-1/2 lg:w-2/5 mb-10 md:mb-0">
                <img
                    src="/icons/signinpage-image.png"
                    alt="Signup Visual"
                    className="w-full max-w-md h-auto object-contain"
                />
            </div>

            <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-6 mt-25 lg:mt-15 sm:p-8 shadow-lg space-y-6 border border-white/10">
                    <h1 className="text-3xl font-bold text-white text-center">Create an account</h1>
                    <p className="text-sm text-gray-300 text-center">Enter your details below</p>

                    <form onSubmit={handleSubmit(CreateNewAdmin)} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="w-full sm:w-1/2">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    {...register("firstname", { required: "First name is required" })}
                                    className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-red-400 text-sm mt-1">{errors.firstname?.message}</p>
                            </div>
                            <div className="w-full sm:w-1/2">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    {...register("lastname", { required: "Last name is required" })}
                                    className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-red-400 text-sm mt-1">{errors.lastname?.message}</p>
                            </div>
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email format",
                                    },
                                })}
                                className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-red-400 text-sm mt-1">{errors.email?.message}</p>
                        </div>

                        <div>
                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                {...register("mobile", { required: "Mobile number is required" })}
                                className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-red-400 text-sm mt-1">{errors.mobile?.message}</p>
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Set Password"
                                {...register("password", { required: "Password is required" })}
                                className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-red-400 text-sm mt-1">{errors.password?.message}</p>
                        </div>

                        <button
                            type="submit"
                            onClick={() => trigger()}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition duration-300"
                        >
                            Create Account
                        </button>

                    </form>
                    <div className="flex items-center justify-center text-gray-500 text-sm">
                        <span className="flex-grow border-t border-gray-300" />
                        <span className="px-2">or</span>
                        <span className="flex-grow border-t border-gray-300" />
                    </div>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg transition duration-300"
                            onClick={()=> signupWithGoogle()}
                            >
                            <img src="/icons/Google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                            Continue with Google
                        </button>

                    <p className="text-gray-300 text-center">
                        Already have an account?{" "}
                        <Link to="/admin/signin" className="text-orange-400 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
