import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import SliderContext from "../../context/Slidercontext";


export default function Signin(){

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
    
        const { register, formState, trigger } = form
    
        const { errors } = formState

  const {sliderOpen, setSliderOpen} = useContext(SliderContext)

  if(sliderOpen) setSliderOpen(!sliderOpen)

  return (
    <div className={`pt-0 ${sliderOpen ? " pl-64" : "pl-0"}`}>
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
                    <form className="space-y-4">
                        
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            {...register('email', { required: "Email is required"})}
                            placeholder="Email"
                            className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        /><p className="error ml-2 text-red-500">{errors.email?.message}</p>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            placeholder="Password"
                            {...register('password', { required: "Password is required"})}
                            className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        /><p className="error ml-2 text-red-500">{errors.password?.message}</p>
                        <button
                            type="submit"
                            className="w-full bg-[#DB4444] hover:bg-orange-700 text-white cursor-pointer font-semibold py-3 rounded-lg transition duration-300"
                        >
                            Sign in
                        </button>
                        <Link to='/signin' className="text-red-500 hover:underline">forgot password?</Link>
                        
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
}
