import React, { useState } from "react";

const SliderContext = React.createContext()

export const SliderContextProvider = ({children}) => {

    const [sliderOpen, setSliderOpen] = useState(true)

    return(
        <SliderContext.Provider value={{sliderOpen, setSliderOpen}} >
            {children}
        </SliderContext.Provider>
    )
}

export default SliderContext