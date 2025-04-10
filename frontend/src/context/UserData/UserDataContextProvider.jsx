import React, { useState } from "react";
import UserDataContext from "./UserDataContext";

const UserDataContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState()

    return(
        <UserDataContext.Provider value={{currentUser, setCurrentUser}} >
            {children}
        </UserDataContext.Provider>
    )
}

export default UserDataContextProvider