import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { CircleDollarSign, CircleUserRound, Headset, ShieldCheck, Truck, Warehouse } from "lucide-react";
import { TbMoneybag } from "react-icons/tb";

export default function About() {

  const teamMembers = [
    { name: "Tom Cruise", position: "Founder & Chairman", image: "/images/person-1.png" },
    { name: "Robert Downey", position: "CEO & Co-founder", image: "/images/person-2.png" },
    { name: "Scarlett Johansson", position: "Marketing Head", image: "/images/person-3.png" },
    { name: "Robert Downey", position: "CEO & Co-founder", image: "/images/person-2.png" },
  ];

  useEffect(()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  },[])

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row items-center justify-end gap-4 lg:gap-10">
          <div className="w-full lg:w-1/2 xl:w-[45%]">
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-6 text-center lg:text-left">
              Our Story
            </h1>

            <div className="space-y-4 sm:space-y-6 text-base">
              <p className="text-center lg:text-left leading-relaxed">
                Launched in 2015, <strong className="font-semibold text-gray-800">Exclusive</strong> is South Asia's premier online shopping marketplace with a strong presence in <strong className="font-semibold text-gray-800">India</strong>. Supported by a wide range of tailored marketing, data, and service solutions, Exclusive boasts 10,500 sellers, 300 brands, and serves over 3 million customers across the region.
              </p>
              <p className="text-center lg:text-left leading-relaxed">
                With a rapidly growing catalog of over 1 million products, Exclusive offers a diverse assortment across various categories, ranging from consumer electronics to lifestyle essentials.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 xl:w-[45%] flex justify-center lg:justify-end">
            <img
              src="/images/about-side-image.png"
              alt="Exclusive Marketplace"
              className="w-full max-w-md lg:max-w-none xl:w-[650px] h-auto object-contain rounded-lg shadow-sm"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10 sm:py-12 mb-0">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
      
                <div className="lg:w-60 max-w-xs p-6 hover:shadow-md hover:bg-[#DB4444] rounded-lg hover:text-white transition-shadow">
                  <div className="w-full flex-col items-center justify-center">
                    <div className="flex justify-center items-center">
                    <div className="w-18 h-18 bg-gray-300 rounded-full flex justify-center items-center">
                      <div className=" w-13 h-13 bg-black rounded-full text-white flex items-center justify-center ">
                        <Warehouse className="w-8 h-8" />
                      </div>
                    </div>
                    </div>
                    <h3 className="uppercase font-bold text-sm md:text-base text-center mt-4">10.5k</h3>
                    <p className="opacity-80 text-xs sm:text-sm text-center">Sellers active on our site</p>
                  </div>
                </div>
      
                <div className="lg:w-60 max-w-xs p-6 hover:shadow-md hover:bg-[#DB4444] rounded-lg hover:text-white transition-shadow">
                  <div className="w-full flex-col items-center justify-center">
                    <div className="flex justify-center items-center">
                    <div className="w-18 h-18 bg-gray-300 rounded-full flex justify-center items-center">
                      <div className=" w-13 h-13 bg-black rounded-full text-white flex items-center justify-center ">
                        <CircleDollarSign className="w-8 h-8" />
                      </div>
                    </div>
                    </div>
                    <h3 className="uppercase font-bold text-sm md:text-base text-center mt-4">33k</h3>
                  <p className="opacity-80 text-xs sm:text-sm text-center">Monthly Product Sale</p>
                  </div>
                </div>
      
                <div className="lg:w-60 max-w-xs p-6 hover:shadow-md hover:bg-[#DB4444] rounded-lg hover:text-white transition-shadow">
                  <div className="w-full flex-col items-center justify-center">
                    <div className="flex justify-center items-center">
                    <div className="w-18 h-18 bg-gray-300 rounded-full flex justify-center items-center">
                      <div className=" w-13 h-13 bg-black rounded-full text-white flex items-center justify-center ">
                        <CircleUserRound className="w-8 h-8" />
                      </div>
                    </div>
                    </div>
                    <h3 className="uppercase font-bold text-sm md:text-base text-center mt-4">45.5k</h3>
                  <p className="opacity-80 text-xs sm:text-sm text-center">Customers active on our site</p>
                  </div>
                </div>

                <div className="lg:w-60 max-w-xs p-6 hover:shadow-md hover:bg-[#DB4444] rounded-lg hover:text-white transition-shadow">
                  <div className="w-full flex-col items-center justify-center">
                    <div className="flex justify-center items-center">
                    <div className="w-18 h-18 bg-gray-300 rounded-full flex justify-center items-center">
                      <div className=" w-13 h-13 bg-black rounded-full text-white flex items-center justify-center ">
                        <TbMoneybag className="w-8 h-8" />
                      </div>
                    </div>
                    </div>
                    <h3 className="uppercase font-bold text-sm md:text-base text-center mt-4">25k</h3>
                  <p className="opacity-80 text-xs sm:text-sm text-center">Annual Gross Sale</p>
                  </div>
                </div>
      
              </div>
            </div>

      <div className="flex flex-wrap m-10 justify-center items-center mb-0">
        <div className="w-full container mx-auto px-2 sm:px-2 md:px-6 lg:px-10 xl:px-12 py-10">
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 15
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 30
              }
            }}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            modules={[Autoplay]}
            className="w-full team-swiper"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center p-4 sm:p-6 rounded-lg transition-all duration-300">
                  <div className="w-full max-w-xl h-80 sm:h-110 bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-cover mt-10"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center mt-5 w-full">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">{member.position}</p>
                    <div className="flex justify-center space-x-4 mt-4 sm:mt-5">
                      <a href="#" className="hover:opacity-80 transition-opacity">
                        <img
                          src="/icons/icon-Twitter.png"
                          alt="Twitter"
                          className="w-6 h-6 sm:w-7 sm:h-7"
                        />
                      </a>
                      <a href="#" className="hover:opacity-80 transition-opacity">
                        <img
                          src="/icons/icon-instagram.png"
                          alt="Instagram"
                          className="w-6 h-6 sm:w-7 sm:h-7"
                        />
                      </a>
                      <a href="#" className="hover:opacity-80 transition-opacity">
                        <img
                          src="/icons/icon-Linkedin.png"
                          alt="LinkedIn"
                          className="w-6 h-6 sm:w-7 sm:h-7"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-0 sm:py-12 mb-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">

          <div className="w-full max-w-xs p-6 hover:shadow-md hover:bg-[#DB4444] rounded-lg hover:text-white transition-shadow">
            <div className="w-full flex-col items-center justify-center">
              <div className="flex justify-center items-center">
              <div className="w-18 h-18 bg-gray-300 rounded-full flex justify-center items-center">
                <div className=" w-13 h-13 bg-black rounded-full text-white flex items-center justify-center ">
                  <Truck className="w-8 h-8" />
                </div>
              </div>
              </div>
              <h3 className="uppercase font-bold text-sm md:text-base text-center mt-4">FREE AND FAST DELIVERY</h3>
              <p className="opacity-80 text-xs sm:text-sm text-center">Free delivery for all orders over $140</p>
            </div>
          </div>

          <div className="w-full max-w-xs p-6 hover:shadow-md hover:bg-[#DB4444] rounded-lg hover:text-white transition-shadow">
            <div className="w-full flex-col items-center justify-center">
              <div className="flex justify-center items-center">
              <div className="w-18 h-18 bg-gray-300 rounded-full flex justify-center items-center">
                <div className=" w-13 h-13 bg-black rounded-full text-white flex items-center justify-center ">
                  <Headset className="w-8 h-8" />
                </div>
              </div>
              </div>
              <h3 className="uppercase font-bold text-sm md:text-base text-center mt-4">24/7 CUSTOMER SERVICE</h3>
            <p className="opacity-80 text-xs sm:text-sm text-center">Friendly 24/7 customer support</p>
            </div>
          </div>

          <div className="w-full max-w-xs p-6 hover:shadow-md hover:bg-[#DB4444] rounded-lg hover:text-white transition-shadow">
            <div className="w-full flex-col items-center justify-center">
              <div className="flex justify-center items-center">
              <div className="w-18 h-18 bg-gray-300 rounded-full flex justify-center items-center">
                <div className=" w-13 h-13 bg-black rounded-full text-white flex items-center justify-center ">
                  <ShieldCheck className="w-8 h-8" />
                </div>
              </div>
              </div>
              <h3 className="uppercase font-bold text-sm md:text-base text-center mt-4">MONEY BACK GUARANTEE</h3>
            <p className="opacity-80 text-xs sm:text-sm text-center">We reurn money within 30 days</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}