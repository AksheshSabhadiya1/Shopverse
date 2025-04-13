import React, { useState, useEffect } from "react";

export default function Clock() {
    const [time, setTime] = useState({ Days: 0, Hours: 0, Minutes: 0, Seconds: 0 });

    useEffect(() => {
        let timerdata = localStorage.getItem("timer");

        if (!timerdata) {
            const futureTime = new Date().getTime() + 4 * 24 * 60 * 60 * 1000;
            localStorage.setItem("timer", futureTime);
            timerdata = futureTime;
        }

        const calculateTime = () => {
            const now = new Date().getTime();
            const diff = timerdata - now;

            if (diff <= 0) {
                setTime({ Days: 0, Hours: 0, Minutes: 0, Seconds: 0 });
                clearInterval(timer);
                return;
            }

            setTime({
                Days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                Hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                Minutes: Math.floor((diff / (1000 * 60)) % 60),
                Seconds: Math.floor((diff / 1000) % 60),
            });
        };

        const timer = setInterval(calculateTime, 1000);
        calculateTime();

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="grid grid-flow-col gap-2 sm:gap-4 text-center auto-cols-max">
            <div className="p-2 bg-neutral font-semibold rounded-lg flex space-x-6 items-center">
                {["Days", "Hours", "Minutes", "Seconds"].map((unit, i) => (
                    <div key={unit} className="flex-col">
                        <p className="text-xs sm:text-sm text-start">{unit}</p>
                        <span className="countdown text-2xl sm:text-3xl md:text-5xl">
                            {time[unit]}
                            {unit !== 'Seconds' && (
                                <span className="text-xl font-medium relative left-3 sm:text-2xl md:text-5xl text-[#DB4444]">
                                    :
                                </span>
                            )}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
