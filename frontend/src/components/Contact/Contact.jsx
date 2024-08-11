import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { USER_ENDPOINTS } from "../../services/apiService";
import { useParams } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileData } from "../../redux/profile/profileThunks.js";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { username } = useParams();
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(null);
  const userData = useSelector((state) => state.profile?.profile);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileDataFunc = async () => {
      if (!userData) {
        try {
          await dispatch(fetchProfileData(username)).unwrap();
          setLoading(false);
        } catch (err) {
          console.error("Error fetching profile user data:", err);
          setError(err.message);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchProfileDataFunc();
  }, [userData, dispatch, username]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        USER_ENDPOINTS.SEND_EMAIL.replace(":username", username),
        data
      );
      setSuccessMessage("Email sent successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage("Error sending email. Please try again later.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="h-full w-full bg-home-white flex flex-col items-center pb-20">
      <div className="p-5 flex flex-col items-center gap-3 text-center">
        <a href="#contact-section">
          <button className="border-2 rounded px-5 py-2 bg-button-red hover:bg-home-white hover:border-button-red w-full max-w-md text-home-white hover:text-button-red transition-colors duration-300 ease-in-out">
            Get in Touch
          </button>
        </a>
        <p className="text-2xl md:text-3xl font-semibold">I'd Love to Hear From You</p>
        <p className="text-sm md:text-base font-normal text-gray-600">
          Feel free to reach out. I'm always up for a chat!
        </p>
      </div>

      <div className="p-5 flex flex-col md:flex-row items-center w-full max-w-4xl justify-center gap-10 my-10">
        <div className="flex flex-col justify-center items-center text-center w-full max-w-xs">
          <MdOutlineEmail className="text-2xl rounded-full bg-blue-100 w-10 h-10 p-2" />
          <h3 className="text-md font-semibold">Email</h3>
          <p className="text-xs">Send an email</p>
          <a
            className="mt-3 text-sm text-blue-500 hover:underline font-medium"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </div>

        <div className="flex flex-col justify-center items-center text-center w-full max-w-xs">
          <FaPhoneAlt className="text-2xl rounded-full bg-blue-100 w-10 h-10 p-2" />
          <h3 className="text-md font-semibold">Phone</h3>
          <p className="text-xs">Ring my phone</p>
          <p className="mt-3 text-sm text-blue-500 hover:underline font-medium">
            +(91) 1234567890
          </p>
        </div>
        
        <div className="flex flex-col justify-center items-center text-center w-full max-w-xs">
          <CiLinkedin className="text-2xl rounded-full bg-blue-100 w-10 h-10 p-2" />
          <h3 className="text-md font-semibold">LinkedIn</h3>
          <p className="text-xs">Connect here</p>
          <a
            className="mt-3 text-sm text-blue-500 hover:underline font-medium"
            href="https://www.linkedin.com/in/ujjawal-gusain/"
          >
            /ujjawal-gusain/
          </a>
        </div>
      </div>

      <hr className="bg-black w-full max-w-4xl mx-auto" />

      <p className="mt-10 text-2xl md:text-3xl font-bold text-center">Get in touch</p>
      <p className="text-sm md:text-base font-normal text-gray-600 text-center my-4">
        Fill out the form for queries!
      </p>

      <form onSubmit={handleSubmit(onSubmit)} id="contact-section" className="space-y-6 w-full max-w-lg px-4">
        <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
          <div className="w-full sm:w-1/2">
            <label className="block text-black mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName", { required: "First Name is required" })}
              className="w-full rounded-md border-2 bg-home-white text-sm p-2"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="w-full sm:w-1/2">
            <label className="block text-black mb-2">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
              className="w-full rounded-md border-2 bg-home-white text-sm p-2"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        
        <div className="w-full">
          <label className="block text-black mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full rounded-md border-2 bg-home-white text-sm p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-black mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("message", { required: "Message is required" })}
            className="w-full h-24 rounded-md border-2 bg-home-white text-sm p-2"
            placeholder="Leave us a message..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-2">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="border-2 rounded px-5 py-2 bg-button-red hover:bg-home-white hover:border-button-red w-full text-home-white hover:text-button-red transition-colors duration-300 ease-in-out"
        >
          Send Message
        </button>
      </form>
      
      {successMessage && (
        <p className="text-button-red mt-4 text-center">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-button-red mt-4 text-center">{errorMessage}</p>
      )}
    </div>
  );
}

export default Contact;
