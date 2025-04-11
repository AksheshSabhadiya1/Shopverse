import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Error() {
    const {pathname} = useLocation()
    const path = pathname.split('/').filter(Boolean)
    console.log(path);

    return (
        <div className="flex flex-col bg-gradient-to-br from-black via-gray-900 to-black items-center justify-center h-screen text-center">
            <div className="w-full rounded-2xl">
                <h1 className="text-5xl font-bold text-white mb-4">404 Page Not Found</h1>
                <p className="text-white/60 mb-5">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link
                    to="/admin/signin"
                    className="bg-[#DB4444] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-orange-700 transition duration-300"
                >
                    Go to Signin
                </Link>
            </div>
        </div>
    );
}
