import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { USER_ENDPOINTS } from "../../services/apiService";
import { useParams } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

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

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.post(
          USER_ENDPOINTS.FETCH_USER_DATA,
          {},
          {
            withCredentials: true,
          }
        );
        console.log(response.data.data);
        setEmail(response.data.data.email);
      } catch (error) {
        console.error("Error fetching username:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);

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
      <div className="p-5 flex flex-col items-center gap-3">
        <a href="#contact-section">
          <button className="border-2 rounded px-5 py-2 bg-button-red hover:bg-home-white hover:border-button-red w-full text-home-white hover:text-button-red">
            Get in Touch
          </button>
        </a>
        <p className="text-3xl font-semibold">I'd Love to Hear From You</p>
        <p className="text-sm font-normal text-gray-600 text-center">
          Feel free to reach out. I'm always up for a chat!
        </p>
      </div>

      <div className="p-5 flex items-center w-3/5 justify-evenly gap-10 my-10">
        <div className="flex flex-col justify-center items-center">
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

        <div className="flex flex-col justify-center items-center">
          <FaPhoneAlt className="text-2xl rounded-full bg-blue-100 w-10 h-10 p-2" />
          <h3 className="text-md font-semibold">Phone</h3>
          <p className="text-xs">Ring my phone</p>
          <p className="mt-3 text-sm text-blue-500 hover:underline font-medium">
            +(91) 1234567890
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
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

      <hr className="bg-black w-3/5" />

      <p className="mt-10 text-2xl font-bold">Get in touch</p>
      <p className="text-sm font-normal text-gray-600 text-center my-4">
        Fill out the form for queries!
      </p>

      <form onSubmit={handleSubmit(onSubmit)} id="contact-section" className="space-y-6">
        <div className="flex gap-5">
          <div>
            <label className="block text-black mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName", { required: "First Name is required" })}
              className="w-full rounded-md border-2 bg-home-white text-sm p-1"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-black mb-2">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
              className="w-full rounded-md border-2 bg-home-white text-sm p-1"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-full">
            <label className="block text-black mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full rounded-md border-2 bg-home-white text-sm p-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full">
          <label className="block text-black mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("message", { required: "Message is required" })}
            className="w-full h-24 rounded-md border-2 bg-home-white text-sm p-1"
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
          className="border-2 rounded px-5 py-2 bg-button-red hover:bg-home-white hover:border-button-red w-full text-home-white hover:text-button-red"
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
