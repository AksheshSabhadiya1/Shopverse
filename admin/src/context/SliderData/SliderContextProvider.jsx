import React, { useState } from "react";
import SliderContext from "./SliderContext";


const SliderContextProvider = ({children}) => {

    const [sliderOpen, setSliderOpen] = useState(true)

    return(
        <SliderContext.Provider value={{sliderOpen, setSliderOpen}} >
            {children}
        </SliderContext.Provider>
    )
}

export default SliderContextProvider