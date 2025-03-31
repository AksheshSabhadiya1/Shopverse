import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
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

  useEffect(()=> {
  fetch('https://api.escuelajs.co/api/v1/products').then(res=> console.log(res))
  
  },[])

  return (
    <div className="lg:ml-40 lg:mr-30">
      <div className="flex flex-col lg:flex-row " >
        <div className="relative h-auto mb-10 border-r border-gray-200 w-full lg:w-64 bg-white text-black divide-y divide-gray-100 transition-all duration-300">
          <div className="py-1 space-y-1">
            {[
              "Woman's Fashion",
              "Men's Fashion",
              "Electronics",
              "Home & Lifestyle",
              "Medicine",
              "Sports & Outdoor",
              "Baby's & Toys",
              "Groceries & Pets",
              "Health & Beauty"
            ].map((category, index) => (
              <Link
                key={index}
                to="#"
                className="flex justify-between lg:-ml-5 items-center px-4 py-2 hover:bg-[#DB4444] hover:text-white transition"
              >
                <p>{category}</p>
                <img src="/icons/arrow-left-icon.png" className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full mb-10 flex justify-center items-center bg-black text-white p-6 lg:ml-10 sm:p-10">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center py-2">
              <img src="/icons/apple_logo 1.png" alt="Apple Logo" className="w-12 h-12" />
              <p className="ml-4">iPhone 14 Series</p>
            </div>
            <p className="text-3xl sm:text-5xl font-semibold text-center sm:text-left max-w-xs">
              Up to 10% off Voucher
            </p>
            <Link to="/" className="mt-4 text-lg flex items-center">
              <span className="ml-2 mx-2 underline">Shop Now </span> 🡢
            </Link>
          </div>
          <div className="hidden sm:block">
            <img src="/images/iphone.png" alt="iPhone" className="w-60 sm:w-80 mt-4" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-start items-center">
          <div className="w-5 h-10 rounded bg-[#DB4444]"></div>
          <span className="ml-2 text-[#DB4444] font-semibold">Today's</span>
        </div>
      </div>
      <div className="flex items-center space-x-20">
        <p className="text-4xl font-semibold py-2">Flash Sales</p>
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

        <div className="flex space-x-2 mx-auto">
          <div className="bg-gray-200 w-10 h-10 text-center hover:text-[#DB4444] hover:scale-110 rounded-full">
              <button className="font-bold p-2">🡠</button>
          </div>
          <div className="bg-gray-200 w-10 h-10 text-center hover:text-[#DB4444] hover:scale-110 rounded-full">
              <button className="font-bold p-2">🡢</button>
          </div>
        </div>

      </div>

    </div>
  );
}
