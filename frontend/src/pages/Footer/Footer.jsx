import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-black text-white py-8 px-4">
            <div className="container mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center md:text-left">
                <div>
                    <Link to="/" className="flex justify-center md:justify-start items-center mb-2">
                        <strong className="text-lg font-extrabold">ShopVerse</strong>
                    </Link>
                    <h2 className="mb-6 font-bold">Subscribe</h2>
                    <p className="mb-2">Get 10% off your first order</p>
                    <div className="flex items-center justify-center md:justify-start">
                        <div>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="bg-black rounded border border-white px-2 py-1 w-full max-w-xs text-white"
                        />
                        </div>
                        <div className="p-1 bg-black -mx-8">
                            <img src="/icons/icon-send.png" alt="Send" className="w-5 h-5 cursor-pointer rounded" />
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="mb-4 text-sm font-semibold uppercase">Support</h2>
                    <ul className="text-gray-400">
                        <li className="mb-2">Surat, Gujarat, India</li>
                        <li className="mb-2">shopverse@gmail.com</li>
                        <li className="mb-2">+88015-88888-9999</li>
                    </ul>
                </div>

                <div>
                    <h2 className="mb-4 text-sm font-semibold uppercase">Account</h2>
                    <ul className="text-gray-400">
                        <li className="mb-2"><Link to="/" className="hover:underline">My Account</Link></li>
                        <li className="mb-2"><Link to="/signin" className="hover:underline">Signin</Link></li>
                        <li className="mb-2"><Link to="/signup" className="hover:underline">Register</Link></li>
                        <li className="mb-2"><Link to="/" className="hover:underline">Cart</Link></li>
                        <li className="mb-2"><Link to="/" className="hover:underline">Wishlist</Link></li>
                        <li className="mb-2"><Link to="/" className="hover:underline">Shop</Link></li>
                    </ul>
                </div>

                <div>
                    <h2 className="mb-4 text-sm font-semibold uppercase">Quick Links</h2>
                    <ul className="text-gray-400">
                        <li className="mb-2"><Link to="/" className="hover:underline">Privacy Policy</Link></li>
                        <li className="mb-2"><Link to="/" className="hover:underline">Terms & Conditions</Link></li>
                        <li className="mb-2"><Link to="/" className="hover:underline">FAQ</Link></li>
                        <li className="mb-2"><Link to="/contact" className="hover:underline">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h2 className="mb-4 text-sm font-semibold uppercase">Download App</h2>
                    <p className="mb-2">Save ₹100 with App New User Only</p>
                    <div className="flex flex-wrap justify-center md:justify-start items-center space-x-2">
                        <img src="/icons/QRCode.png" alt="QR Code" className="w-18" />
                        <div>
                            <img src="/icons/GooglePlay.png" alt="Google Play" className="mb-1 w-24" />
                            <img src="/icons/appstore.png" alt="App Store" className="w-24" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} ShopVerse. All rights reserved.</p>
            </div>
        </footer>
    );
}
