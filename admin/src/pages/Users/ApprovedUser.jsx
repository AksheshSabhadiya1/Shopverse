import React, { useState, useContext, useEffect } from "react";
import SliderContext from "../../context/Slidercontext";
import axios from "axios";

export default function ApprovedUser() {
    const [users, setUsers] = useState([]);

    const {sliderOpen} = useContext(SliderContext)

    const fetchApprovedUser = async() => {
        try {
            const {data} = await axios.get('http://localhost:5000/admin/users', {
                withCredentials: true
            })
            const result = data.filter(user => user.approved_status === 1)
            result.length > 0 ?  setUsers(result) : []
        } catch (error) {
            console.log("Error while fetching approved user data");
        }
    }

    useEffect(()=>{
        fetchApprovedUser()
    },[])


    return (
        <div className={`pt-15 ${sliderOpen ? "pl-64" : "pl-0"}`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex flex-col items-center p-6">
            <h2 className="text-3xl font-bold text-white mb-6">Approved Users</h2>

            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="relative h-full flex flex-col justify-between p-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl shadow-md hover:scale-105 transition-all duration-300 text-center"
                        >
                            <div>
                                <img
                                    src={`${user.gender === 'male' ? "http://localhost:5000/uploads/users/male_profile.png" : "http://localhost:5000/uploads/users/female_profile.png" }`}
                                    alt="profile picture"
                                    className="w-30 h-24 object-contain mx-auto mb-3"
                                />
                                <h3 className="text-lg font-semibold">{user.firstname} {user.lastname}</h3>
                                <p className="text-sm font-semibold text-gray-300">{user.email}</p>
                                <p className="mt-2 text-sm font-semibold">{user.login_status ? "Login" : "Not Login"}</p>
                            </div>

                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                {user.approved_status ? "Approved" : "Not Approved"}
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-300 w-full col-span-4">
                        Approved Users not available.
                    </p>
                )}
            </div>
        </div>
    </div>
    );
}
