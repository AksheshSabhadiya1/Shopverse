import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Signup() {
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

    const { register, formState, handleSubmit } = form;
    const { errors } = formState;
    const navigate = useNavigate();

    const CreateNewUser = async (data) => {
        try {
            await axios
                .post("http://localhost:5000/signup", data, { withCredentials: true })
                .then(() => navigate("/signin"))
                .catch((error) => console.log(error));
        } catch (error) {
            console.log("Signup failed");
        }
    };

    const signupWithGoogle = () => {
        window.open("http://localhost:5000/auth/google/callback", "_self");
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="flex flex-col md:flex-row min-h-screen items-center justify-center px-4 sm:px-6 lg:px-24 py-10">
            <div className="hidden md:block md:w-1/2 lg:w-2/5 mb-6 md:mb-0">
                <img
                    src="/icons/signinpage-image.png"
                    alt="Signup"
                    className="w-full h-auto"
                />
            </div>

            <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col items-center">
                <div className="w-full max-w-md space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
                    <h2 className="text-sm text-gray-600">Enter your details below</h2>

                    <form onSubmit={handleSubmit(CreateNewUser)} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="w-full">
                                <input
                                    type="text"
                                    {...register("firstname", { required: "Firstname is required" })}
                                    placeholder="First Name"
                                    className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                                />
                                <p className="text-red-500 text-sm mt-1">{errors.firstname?.message}</p>
                            </div>

                            <div className="w-full">
                                <input
                                    type="text"
                                    {...register("lastname", { required: "Lastname is required" })}
                                    placeholder="Last Name"
                                    className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                                />
                                <p className="text-red-500 text-sm mt-1">{errors.lastname?.message}</p>
                            </div>
                        </div>
                        <div>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="Email"
                                className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                            />
                            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                        </div>
                        <div>
                            <input
                                type="number"
                                {...register("mobile", { required: "Mobile Number is required" })}
                                placeholder="Mobile Number"
                                className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                            />
                            <p className="text-red-500 text-sm mt-1">{errors.mobile?.message}</p>
                        </div>
                        <div>
                            <input
                                type="password"
                                {...register("password", { required: "Password is required" })}
                                placeholder="Set New Password"
                                className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                            />
                            <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#DB4444] text-white font-semibold py-2 rounded-lg hover:opacity-90 transition duration-300"
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
                        onClick={signupWithGoogle}
                        className="w-full bg-white border flex items-center justify-center py-2 rounded-lg hover:opacity-90 transition duration-300"
                    >
                        <img src="/icons/Google-logo.png" alt="Google" className="me-4 w-5 h-5" />
                        Continue with Google
                    </button>

                    <p className="text-gray-600 text-sm text-center">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-orange-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
