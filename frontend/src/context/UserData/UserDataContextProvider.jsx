import React, { useEffect, useState } from "react";
import UserDataContext from "./UserDataContext";
import axios from "axios";
import Cookies from 'js-cookie'

const UserDataContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(()=>{
        const token = Cookies.get('userToken')

        if(token){
            axios.get('http://localhost:5000/user',{ withCredentials: true })
            .then(res => setCurrentUser(res.data))
            .catch(()=> setCurrentUser(null))
        }
    },[])

    return(
        <UserDataContext.Provider value={{currentUser, setCurrentUser}} >
            {children}
        </UserDataContext.Provider>
    )
}

export default UserDataContextProvider