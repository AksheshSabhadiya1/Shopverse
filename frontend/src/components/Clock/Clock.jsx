import React, {useState, useEffect} from "react";

export default function Clock() {
    const date = new Date().getTime() + 4 * 24 * 60 * 60 * 1000

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
        <div className="grid grid-flow-col gap-2 sm:gap-4 text-center auto-cols-max">
          {Object.entries(time).map(([unit, value], index) => (
            <div key={index} className="p-2 bg-neutral font-semibold rounded-lg flex flex-col items-center">
              <p className="text-xs sm:text-sm text-start">{unit}</p>
              <span className="countdown text-2xl sm:text-3xl md:text-5xl">{value}
                {unit !== "Seconds" && (
                <span className="text-xl font-medium relative left-3 sm:text-2xl md:text-5xl text-[#DB4444]">:</span>
              )}
              </span>

            </div>
          ))}
        </div>
    )
}