import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios'
import UserDataContext from "../../context/UserData/UserDataContextProvider";
import CartContext from "../../context/Cart/CartContextProvider";


export default function Signin(){

    const form = useForm({
            defaultValues: {
                email: '',
                password: '',
            },
            mode: 'all',
        })
    
        const { register, handleSubmit, formState, reset, trigger } = form
        const { errors } = formState
        const navigate = useNavigate()
        const {setCurrentUser, fetchCurrentUserData} = useContext(UserDataContext)
        const {setCartItem, addToCart, fetchCart} = useContext(CartContext)
        const sessionData = JSON.parse(sessionStorage.getItem('cartitem'))

        const sesstionDataAddToCart = async() => {
            if(sessionData){
                await sessionData.map((product)=> addToCart(product))
                sessionStorage.removeItem('cartitem')
            }
        }


        const validateUser = async(data) => {
            try {
                console.log(data);
                const result = await axios.post('http://localhost:5000/signin', data, { withCredentials: true,})
                console.log(result);
                    if(sessionData){
                        sesstionDataAddToCart()
                    } 
                    const {data: userData} = await axios.get('http://localhost:5000/user',{ withCredentials: true })
                    const {data: cartData} = await axios.get('http://localhost:5000/cart',{ withCredentials: true })
                    userData ? setCurrentUser(userData) : null
                    cartData ? setCartItem(cartData) : []
                    navigate('/') 
            } catch (error) {
                console.error("Signin failed", error);
                reset();
            }
        }
    
        useEffect(()=>{
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
        },[])


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
                    <form onSubmit={handleSubmit(validateUser)} className="space-y-2.5">
                        
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            {...register('email', { required: "Email is required"})}
                            placeholder="Email"
                            className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
                        /><p className="error ml-2 text-red-500">{errors.email?.message}</p>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            placeholder="Password"
                            {...register('password', { required: "Password is required"})}
                            className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
                        /><p className="error ml-2 text-red-500">{errors.password?.message}</p>
                        <button
                            onClick={()=> trigger()}
                            className="w-full bg-[#DB4444] hover:bg-orange-700 text-white cursor-pointer font-semibold py-3 rounded-lg transition duration-300"
                        >
                            Sign in
                        </button>
                        <div className="flex justify-between items-center">
                        <Link to='/signup' className="text-red-500 hover:underline">forgot password?</Link>
                        <Link to='/signup' className="text-blue-500 text-right hover:underline">Create new Account?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
