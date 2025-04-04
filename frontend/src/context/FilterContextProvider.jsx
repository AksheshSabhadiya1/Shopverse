import React, { useState } from "react";
import FilterContext from "./FilterContext";


const FilterContextProvider = ({children}) => {

    const [filterMenu, setFilterMenu] = useState(false)

    return (
        <FilterContext.Provider value={{filterMenu, setFilterMenu}} >
            {children}
        </FilterContext.Provider>
    )
}


export default FilterContextProvider