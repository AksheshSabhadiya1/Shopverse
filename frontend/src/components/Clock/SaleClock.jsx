import React, { useState, useEffect } from "react";

export default function SaleClock() {
    const date = new Date().getTime() + 3 * 24 * 60 * 60 * 1000

    const calculateTime = () => {
        const currentDate = new Date()
        const diff = date - currentDate

        return {
            Days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            Hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            Minutes: Math.floor((diff / (1000 * 60)) % 60),
            Seconds: Math.floor(diff / (1000) % 60),
        }
    }

    const [time, setTime] = useState(calculateTime())


    useEffect(() => {
        const timer = setInterval(() => {
            setTime(calculateTime())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div>
        <div className="grid grid-flow-col gap-2 sm:gap-4 text-center auto-cols-max">
            {Object.entries(time).map(([unit, value], index) => (
                <div key={index} className="w-18 mt-4 p-3 bg-white text-black font-semibold rounded-full flex flex-col items-center">
                    <span className="countdown text-2xl sm:text-xl md:text-2xl">{value}
                        <p className="text-xs sm:text-sm">{unit}</p>
                    </span>
                </div>
            ))}
        </div>
        </div>
    )
}