import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { USER_ENDPOINTS } from "../../../services/apiService";

function AddCertification({ setAddCertificationVisible }) {
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlebackButton = () => {
    setAddCertificationVisible(false);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true); 

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("certificateImg", data.certificateImg[0]);

    try {
      const res = await axios.post(USER_ENDPOINTS.ADD_CERTIFICATION, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("Certification added:", res.data);
    } catch (error) {
      console.error("Error adding certification:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full bg-home-white p-10">
      <div className="w-1/3 p-8 rounded-lg shadow-lg relative">
        <h1 className="text-3xl font-semibold text-text-blue mb-6 text-center">
          Add Certification
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-home-black mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-3 py-2 shadow-sm border-2 shadow-text-blue rounded-lg focus:outline-none focus:border-text-blue"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-home-black mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-3 py-2 shadow-sm border-2 shadow-text-blue rounded-lg focus:outline-none focus:border-text-blue"
              rows="4"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-home-black mb-2"
              htmlFor="certificateImg"
            >
              Certificate Image
            </label>
            <input
              id="certificateImg"
              type="file"
              {...register("certificateImg", {
                required: "Certificate image is required",
              })}
              className="w-full px-3 py-2 shadow-sm border-2 shadow-text-blue rounded-lg focus:outline-none focus:border-text-blue"
            />
            {errors.certificateImg && (
              <p className="text-red-500 text-sm">
                {errors.certificateImg.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting} // Disable button while submitting
            className="w-full py-2 bg-button-red text-home-white rounded-lg hover:bg-home-white hover:text-button-red hover:border-button-red border-2 transition-colors duration-300 ease-in-out"
          >
            {isSubmitting ? "Adding..." : "Add Certificate"} {/* Show loading text */}
          </button>
        </form>
        <button
          className="w-10 h-10 rounded-full border-2 top-2 left-2 absolute text-button-red hover:bg-button-red hover:text-home-white transition-colors duration-300 ease-in-out"
          onClick={handlebackButton}
        >
          <IoArrowBackCircleSharp className="w-full h-full " />
        </button>

        {/* Loading spinner */}
        {isSubmitting && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-20">
            <div className="w-16 h-16 border-4 border-t-4 border-t-button-red border-gray-300 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div> 
  );
}

export default AddCertification;
