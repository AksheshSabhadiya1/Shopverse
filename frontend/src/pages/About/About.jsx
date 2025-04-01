import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function About() {

  const teamMembers = [
    { name: "Tom Cruise", position: "Founder & Chairman", image: "/images/person-1.png" },
    { name: "Robert Downey", position: "CEO & Co-founder", image: "/images/person-2.png" },
    { name: "Scarlett Johansson", position: "Marketing Head", image: "/images/person-3.png" },
    { name: "Robert Downey", position: "CEO & Co-founder", image: "/images/person-2.png" },
  ];

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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mb-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">

          <div className="w-full max-w-3xs min-h-50 p-4 border border-gray-300 bg-gray-100 rounded hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/icons/Services-icon-1.png"
                alt="Fast Delivery"
                className="w-18 h-18 object-contain"
              />
            </div>
            <h3 className="uppercase text-center mb-2 font-bold text-xl sm:text-2xl">10.5k</h3>
            <p className="text-gray-500 text-xs sm:text-sm text-center">Sellers active on our site</p>
          </div>

          <div className="w-full max-w-3xs min-h-50 p-4 border border-gray-300 bg-red-500 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/icons/Services-icon-2.png"
                alt="Fast Delivery"
                className="w-18 h-18 object-contain"
              />
            </div>
            <h3 className="uppercase text-center text-white mb-2 font-bold text-xl sm:text-2xl">33k</h3>
            <p className="text-xs text-white sm:text-sm text-center">Monthly Product Sale</p>
          </div>

          <div className="w-full max-w-3xs min-h-50 p-4 border border-gray-300 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/icons/Services-icon-3.png"
                alt="Fast Delivery"
                className="w-18 h-18 object-contain"
              />
            </div>
            <h3 className="uppercase text-center mb-2 font-bold text-xl sm:text-2xl">45.5k</h3>
            <p className="text-gray-500 text-xs sm:text-sm text-center">Customers active on our site</p>
          </div>

          <div className="w-full max-w-3xs min-h-50 p-4 border border-gray-300 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/icons/Services-icon-4.png"
                alt="Fast Delivery"
                className="w-18 h-18 object-contain"
              />
            </div>
            <h3 className="uppercase text-center mb-2 font-bold text-xl sm:text-2xl">25k</h3>
            <p className="text-gray-500 text-xs sm:text-sm text-center">Annual Gross Sale</p>
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mb-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <div className="w-full max-w-xs p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <img
                src="icons/truck-icon.png"
                alt="Fast Delivery"
                className="w-18 h-18 object-contain"
              />
            </div>
            <h3 className="uppercase font-bold text-sm md:text-base text-center mb-2">FREE AND FAST DELIVERY</h3>
            <p className="text-gray-500 text-xs sm:text-sm text-center">Free delivery for all orders over $140</p>
          </div>

          <div className="w-full max-w-xs p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <img
                src="icons/support-icon.png"
                alt="Fast Delivery"
                className="w-18 h-18 object-contain"
              />
            </div>
            <h3 className="uppercase font-bold text-sm md:text-base text-center mb-2">24/7 CUSTOMER SERVICE</h3>
            <p className="text-gray-500 text-xs sm:text-sm text-center">Friendly 24/7 customer support</p>
          </div>

          <div className="w-full max-w-xs p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <img
                src="icons/tick-icon.png"
                alt="Fast Delivery"
                className="w-18 h-18 object-contain"
              />
            </div>
            <h3 className="uppercase font-bold text-sm md:text-base text-center mb-2">MONEY BACK GUARANTEE</h3>
            <p className="text-gray-500 text-xs sm:text-sm text-center">We reurn money within 30 days</p>
          </div>
        </div>
      </div>

    </div>
  )
}