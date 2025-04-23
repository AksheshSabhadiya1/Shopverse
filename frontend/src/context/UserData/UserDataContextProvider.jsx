import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie'

const UserDataContext = React.createContext()


export const UserDataContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null)

    const fetchCurrentUserData = () => {
        try {
            const token = Cookies.get('userToken')

            if(token){
                axios.get('http://localhost:5000/user',{ withCredentials: true })
                .then(res => setCurrentUser(res.data || []))
                .catch(()=> setCurrentUser(null))
            }
        } catch (error) {
            console.log("User Not Found!!");
        }
    }

    useEffect(()=>{
        fetchCurrentUserData()
    },[])

    return(
        <UserDataContext.Provider value={{currentUser, setCurrentUser, fetchCurrentUserData}} >
            {children}
        </UserDataContext.Provider>
    )
}

export default UserDataContext