import React, { useEffect, useState } from "react";
import AdminDataContext from "./AdminDataContext";
import axios from "axios";
import Cookies from 'js-cookie'

const AdminDataContextProvider = ({children}) => {

    const [currentAdmin, setCurrentAdmin] = useState(null)

    useEffect(()=>{
        const token = Cookies.get('adminToken')

        if(token){
            axios.get('http://localhost:5000/admin/currentAdmin',{ withCredentials: true })
            .then(res => setCurrentAdmin(res.data))
            .catch(()=> setCurrentAdmin(null))
        }
    },[])

    return(
        <AdminDataContext.Provider value={{currentAdmin, setCurrentAdmin}} >
            {children}
        </AdminDataContext.Provider>
    )
}

export default AdminDataContextProvider