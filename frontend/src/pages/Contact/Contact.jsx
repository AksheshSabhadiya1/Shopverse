import React from "react";

export default function Contact() {
  return (
    <div className="flex flex-wrap justify-center items-center py-10 px-4 md:px-10 lg:px-16 max-w-screen-lg mx-auto">
      <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <img src="/icons/phone-icon.png" alt="Phone Icon" className="w-8 h-8" />
            <p className="px-2 py-2 font-bold text-xl">Call To Us</p>
          </div>
          <p className="mb-2 text-gray-600 font-semibold">We are available 24/7, 7 days a week.</p>
          <p className="mb-2 text-gray-600 font-semibold">Phone: +8801611112222</p>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center mb-4">
            <img src="/icons/mail-icon.png" alt="Mail Icon" className="w-8 h-8" />
            <p className="px-2 py-2 font-bold text-xl">Write To Us</p>
          </div>
          <p className="mb-2 text-gray-600 font-semibold">Fill out our form and we will contact you within 24 hours.</p>
          <p className="mb-2 text-gray-600 font-semibold">Email: customer@shopverse.com</p>
          <p className="mb-2 text-gray-600 font-semibold">Email: support@shopverse.com</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 lg:w-2/3 p-6">
        <form className="bg-white rounded-lg p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name*"
              className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email*"
              className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="number"
              name="phoneNo"
              placeholder="Your Phone*"
              className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mt-4">
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="6"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button className="mt-4 bg-[#DB4444] cursor-pointer text-white py-2 px-6 rounded hover:bg-orange-800 transition-all">
              Send Message
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
