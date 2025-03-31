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
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            {Object.entries(time).map(([unit, value], index) => (
                <div key={index} className="flex p-2 bg-neutral rounded-box text-neutral-content">
                    <div className="flex flex-col">
                        {unit}
                        <span className="countdown font-mono text-5xl">
                            {value}
                        </span>
                    </div>
                    {
                        unit !== 'Seconds' && <span className="text-5xl py-4 relative text-[#DB4444] left-5">:</span>
                    }
                </div>
            ))}
        </div>
    )
}