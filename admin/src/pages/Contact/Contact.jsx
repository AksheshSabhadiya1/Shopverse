import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { CalendarDays, Mail, User, Phone  } from "lucide-react";
import SliderContext from "../../context/SliderData/SliderContextProvider";
import EmptyContact from "../../Error/EmptyContact";

export default function Contact() {
    const { sliderOpen } = useContext(SliderContext);
    const [contactData, setContactData] = useState([]);

    const fetchContactData = async () => {
        try {
            await axios.get('http://localhost:5000/admin/contact', { withCredentials: true })
                .then(res => setContactData(res.data));
        } catch (error) {
            console.log("contactData fetching error", error);
        }
    };

    useEffect(() => {
        fetchContactData();
    }, []);

    return contactData.length > 0 ? (
        <div className={`pt-16 sm:pt-20 ${sliderOpen ? "pl-0 sm:pl-64" : "pl-0"} transition-all duration-300 bg-gradient-to-br from-black via-gray-900 to-black`}>
            <div className="min-h-screen flex flex-col items-center px-4 py-8 sm:py-10 lg:py-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Contact Messages</h1>
                <div className="w-full max-w-7xl border-t border-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {contactData.length > 0 ? (
                        contactData.map((item) => (
                            <div
                                key={item.id}
                                className="relative flex flex-col justify-between mt-10 p-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg shadow-md hover:scale-102 transition-transform duration-300"
                            >
                                <div className="flex-1 w-full mb-3">
                                    <p className="text-start text-lg font-semibold text-yellow-400 mb-3">{item.message}</p>
                                    <h4 className="text-sm font-medium text-gray-300 mb-1">Message From:</h4>
                                    <div className="space-y-1 text-sm text-gray-200">
                                        <div className="flex items-center space-x-2">
                                        <User className="text-white" /> <span className="capitalize">{item.firstname} {item.lastname}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                        <Mail className="text-white" /> <span className="capitalize">{item.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                        <Phone  className="text-white" /> <span className="capitalize">{item.mobile}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                        <CalendarDays className="text-white" /> <span className="capitalize">{new Date(item.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 text-lg col-span-full">No contact messages available.</p>
                    )}
                </div>
            </div>
        </div>
    ) : <EmptyContact />
}