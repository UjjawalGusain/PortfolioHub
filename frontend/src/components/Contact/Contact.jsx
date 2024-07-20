import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { USER_ENDPOINTS } from "../../services/apiService";
import { useParams } from "react-router-dom";

function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { username } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        USER_ENDPOINTS.SEND_EMAIL.replace(':username', username), 
        data 
      );
      setSuccessMessage("Email sent successfully!");
      setErrorMessage('');
    } catch (error) {
      console.error('Error sending email:', error);
      setErrorMessage('Error sending email. Please try again later.');
      setSuccessMessage(''); 
    }
  };

  return (
    <div className="h-screen w-full bg-home-black flex flex-col items-center text-white relative">
      <div className="border-home-gold border-2 p-8 rounded-lg shadow-lg max-w-md w-full mt-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Contact Me</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">First Name</label>
              <input
                type="text"
                {...register("firstName", { required: "First Name is required" })}
                className="w-full p-3 rounded-md border-2 bg-black border-home-gold text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-2">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-white mb-2">Last Name</label>
              <input
                type="text"
                {...register("lastName", { required: "Last Name is required" })}
                className="w-full p-3 rounded-md border-2 bg-black border-home-gold text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-2">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 rounded-md border-2 bg-black border-home-gold text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-white mb-2">Message</label>
            <textarea
              {...register("message", { required: "Message is required" })}
              className="w-full p-3 rounded-md border-2 bg-black border-home-gold text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
              rows="4"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-2">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md border-2 bg-black border-home-gold text-white font-bold hover:bg-home-gold hover:text-black transition-colors duration-300"
          >
            Submit
          </button>
        </form>
        
        {successMessage && (
          <p className="text-green-500 mt-4 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default Contact;
