import React from "react";
import { Link } from "react-router-dom";

export default function Signin(){
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
                    <h1 className="text-3xl font-bold text-gray-900">Signin to ShopVerse</h1>
                    <h2 className="text-lg text-gray-600">Enter your details below</h2>
                    <form className="space-y-4">
                        
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
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white cursor-pointer font-semibold py-3 rounded-lg transition duration-300"
                        >
                            Sign in
                        </button>
                        <Link to='/signin' className="text-red-500 hover:underline">forgot password?</Link>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}
