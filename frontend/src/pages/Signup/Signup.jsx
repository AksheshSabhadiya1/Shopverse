import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
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
                    <h2 className="text-lg text-gray-600">Enter your details below</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <input
                            type="email"
                            name="email-phone"
                            placeholder="Email or Phone Number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Set Password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                        >
                            Create Account
                        </button>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg transition duration-300"
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
