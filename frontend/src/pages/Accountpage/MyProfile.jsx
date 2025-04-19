import AddressBook from "./AddressBook";
import PaymentMethods from "./PaymentMethods";
import React, { useEffect } from "react"
import EditProfile from "./EditProfile";


export default function MyProfile() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    return (
        <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <EditProfile />
            <AddressBook />
            <PaymentMethods />
        </div>
    )
}