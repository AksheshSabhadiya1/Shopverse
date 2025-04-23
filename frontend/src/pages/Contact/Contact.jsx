import React, { useContext, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";
import Swal from "sweetalert2";
import UserDataContext from "../../context/UserData/UserDataContextProvider";

export default function Contact() {

  const { currentUser } = useContext(UserDataContext);

  const form = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      message: '',
    },
    mode: 'all',
  })

  const { register, formState, handleSubmit, reset, trigger } = form
  const { errors } = formState

  const submitContactData = async (data) => {
    try {
      Swal.fire({
        title: "Do you want to send message?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then(async(result) => {
        if (result.isConfirmed) {
          await axios.post('http://localhost:5000/contact', data, { withCredentials: true })
            .then(() => Swal.fire("Message Sent Successfully!!", "We will contact you Shortly...", "success"), reset())
        } else if (result.isDenied) {
          Swal.fire("Message Not Send", "", "info");
        } else {
          Swal.fire("Cancel Operation", "", "error");
        }
      });
    } catch (error) {
      console.log("Data Not Send");
    }
  }

  useEffect(() => {
    reset({
      firstname: currentUser?.firstname,
      lastname: currentUser?.lastname,
      email: currentUser?.email,
      mobile: currentUser?.mobile,
      message: '',
    })
  }, [currentUser])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])


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

      <div className="w-full md:w-1/2 lg:w-2/3 mt-10 p-0">
        <form onSubmit={handleSubmit(submitContactData)} className="bg-white rounded-lg p-6">
          <div className='w-full flex justify-center items-center mb-2'>
            <div className="w-full me-2">
              <input
                type="text"
                name="firstname"
                id="firstname"
                {...register("firstname", { required: "Firstname is required" })}
                placeholder="First Name"
                required
                className="w-full p-3 bg-gray-100 rounded focus:outline-none"
              /><p className="error ml-2 text-red-500">{errors.firstname?.message}</p>
            </div>
            <div className="w-full mx-2">
              <input
                type="text"
                name="lastname"
                id="lastname"
                {...register("lastname", { required: "Lastname is required" })}
                placeholder="Last Name"
                required
                className="w-full p-3 bg-gray-100 rounded focus:outline-none"
              /><p className="error ml-2 text-red-500">{errors.lastname?.message}</p>
            </div>
          </div>

          <div className="mb-2">
            <input
              type="email"
              name="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              required
              className="w-full p-3 bg-gray-100 rounded focus:outline-none"
            /><p className="error ml-2 text-red-500">{errors.email?.message}</p>
          </div>

          <div className="mb-2">
            <input
              type="number"
              name="mobile"
              id="mobile"
              {...register("mobile", { required: "Mobile Number is required" })}
              placeholder="Mobile Number"
              required
              className="w-full p-3 bg-gray-100 rounded focus:outline-none"
            /><p className="error ml-2 text-red-500">{errors.mobile?.message}</p>
          </div>

          <div className="">
            <textarea
              name="message"
              placeholder="Enter Your Message"
              {...register("message", { required: "Message is required" })}
              className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="6"
            ></textarea><p className="error ml-2 text-red-500">{errors.message?.message}</p>
          </div>

          <div className="flex justify-end">
            <button onClick={() => trigger()} className="mt-4 bg-[#DB4444] cursor-pointer text-white py-2 px-6 rounded hover:bg-orange-800 transition-all">
              Send Message
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
