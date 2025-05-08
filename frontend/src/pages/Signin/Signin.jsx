import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import UserDataContext from "../../context/UserData/UserDataContextProvider";
import CartContext from "../../context/Cart/CartContextProvider";
import WishlistContext from "../../context/Wishlist/WishlistContextProvider";

export default function Signin() {

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'all',
    });

    const { register, handleSubmit, formState, reset, trigger } = form;
    const { errors } = formState;
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserDataContext);
    const { setCartItem, addToCart } = useContext(CartContext);
    const { setWishlistItem } = useContext(WishlistContext);
    const sessionData = JSON.parse(sessionStorage.getItem('cartitem'));

    const sesstionDataAddToCart = async () => {
        if (sessionData) {
            await sessionData.map((product) => addToCart(product));
            sessionStorage.removeItem('cartitem');
        }
    };

    const validateUser = async (data) => {
        try {
            await axios.post('http://localhost:5000/signin', data, { withCredentials: true });
            if (sessionData) {
                sesstionDataAddToCart();
            }
            const { data: userData } = await axios.get('http://localhost:5000/user', { withCredentials: true });
            const { data: cartData } = await axios.get('http://localhost:5000/cart', { withCredentials: true });
            const { data: wishlistData } = await axios.get('http://localhost:5000/wishlist', { withCredentials: true });
            userData && setCurrentUser(userData);
            cartData && setCartItem(cartData);
            wishlistData && setWishlistItem(wishlistData);
            navigate('/');
        } catch (error) {
            console.error("Signin failed", error);
            reset();
        }
    };

    const signinWithGoogle = () => {
        window.open("http://localhost:5000/auth/google/callback", "_self");
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className="flex flex-col md:flex-row h-screen items-center justify-center px-4 md:px-12 lg:px-24 py-10">
            <div className="hidden md:block md:w-1/2 lg:w-2/5">
                <img
                    src="/icons/signinpage-image.png"
                    alt="Signin"
                    className="w-full h-auto"
                />
            </div>

            <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col items-center">
                <div className="w-full max-w-md space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">Sign in to ShopVerse</h1>
                    <h2 className="text-lg text-gray-600">Enter your details below</h2>
                    <form onSubmit={handleSubmit(validateUser)} className="space-y-3">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            {...register('email', { required: "Email is required" })}
                            placeholder="Email"
                            className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
                        />
                        <p className="text-sm text-red-500 ml-2">{errors.email?.message}</p>

                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            placeholder="Password"
                            {...register('password', { required: "Password is required" })}
                            className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
                        />
                        <p className="text-sm text-red-500 ml-2">{errors.password?.message}</p>

                        <button
                            onClick={() => trigger()}
                            className="w-full bg-[#DB4444] hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                        >
                            Sign in
                        </button>
                    </form>

                    <div className="flex items-center justify-center text-gray-500 text-sm">
                        <span className="flex-grow border-t border-gray-300" />
                        <span className="px-2">or</span>
                        <span className="flex-grow border-t border-gray-300" />
                    </div>

                    <button
                        onClick={signinWithGoogle}
                        className="w-full bg-white text-black border hover:shadow-md flex justify-center items-center py-2 rounded-lg transition duration-300"
                    >
                        <img src="/icons/Google-logo.png" className="me-4 w-5 h-5" alt="Google" />
                        Continue with Google
                    </button>

                    <div className="flex flex-col sm:flex-row justify-between text-sm gap-2 sm:gap-0 text-center sm:text-left">
                        <Link to="/signup" className="text-red-500 hover:underline">Forgot password?</Link>
                        <Link to="/signup" className="text-blue-500 hover:underline">Create new Account?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
