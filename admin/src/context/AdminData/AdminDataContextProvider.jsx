import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

const AdminDataContext = React.createContext()

export const AdminDataContextProvider = ({children}) => {

    const [currentAdmin, setCurrentAdmin] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        const token = Cookies.get('adminToken')

        if(!token) return navigate('/admin/signin')

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

export default AdminDataContext