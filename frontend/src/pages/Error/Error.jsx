import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
    return (
        <div className="flex flex-col items-center justify-center h-100 text-center">
            <div className="w-full rounded-2xl">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">404 Page Not Found</h1>
                <p className="text-gray-500 mb-5">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-orange-700 transition duration-300"
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
}
