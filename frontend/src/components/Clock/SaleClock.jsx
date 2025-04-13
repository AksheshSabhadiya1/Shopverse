import React, { useState, useEffect } from "react";

export default function SaleClock() {

    const [time, setTime] = useState({Days:0, Hours:0, Minutes:0, Seconds:0})

    useEffect(() => {

        let timerdata = localStorage.getItem('saletimer')
        if(!timerdata){
            const futuretime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000
            localStorage.setItem('saletimer',futuretime)
            timerdata = futuretime
        }

        const calculateTime = () => {
            const currentDate = new Date()
            const diff = timerdata - currentDate

            if(diff <= 0){
                setTime({Days:0, Hours:0, Minutes:0, Seconds:0})
                clearInterval(timer)
            }
    
            setTime({
                Days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                Hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                Minutes: Math.floor((diff / (1000 * 60)) % 60),
                Seconds: Math.floor(diff / (1000) % 60),
            })
        }

        const timer = setInterval(() => {
            calculateTime()
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div>
        <div className="grid grid-flow-col gap-2 sm:gap-4 text-center auto-cols-max">
            {["Days", "Hours", "Minutes", "Seconds"].map((unit, i) => (
                <div key={unit} className="w-18 mt-4 p-3 bg-white text-black font-semibold rounded-full flex flex-col items-center">
                    <span className="countdown text-2xl sm:text-xl md:text-2xl">{time[unit]}
                        <p className="text-xs sm:text-sm">{unit}</p>
                    </span>
                </div>
            ))}
        </div>
        </div>
    )
}