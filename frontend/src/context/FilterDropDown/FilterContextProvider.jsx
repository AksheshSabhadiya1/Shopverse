import React, { useState } from "react";

const FilterContext = React.createContext()


export const FilterContextProvider = ({children}) => {

    const [filterMenu, setFilterMenu] = useState(false)

    return (
        <FilterContext.Provider value={{filterMenu, setFilterMenu}} >
            {children}
        </FilterContext.Provider>
    )
}


export default FilterContext