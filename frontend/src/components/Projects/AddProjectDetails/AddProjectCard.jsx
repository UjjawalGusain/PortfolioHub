import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { USER_ENDPOINTS } from "../../../services/apiService";
import MainDetails from "./MainDetails";
import OptionalDetails from "./OptionalDetails";
import FilesDetails from "./FilesDetails";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

function AddProjectCard({ setShowAddProject }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const clickBackButton = () => {
    setShowAddProject(false);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true); // Set loading state to true

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("repoId", data.repoId);
    formData.append("url", data.url);
    formData.append("description", data.description);
    formData.append("domain", data.domain);
    formData.append("techStack", data.techStack);
    formData.append("stars", data.stars);
    formData.append("ownersUsernames", data.ownersUsernames);

    for (let i = 0; i < data.videos.length; i++) {
      formData.append("videos", data.videos[i]);
    }

    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    if (data.thumbnail[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    try {
      const response = await axios.post(USER_ENDPOINTS.ADD_PROJECT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("Project added successfully:", response.data);
    } catch (error) {
      console.error("Error adding project:", error);
    } finally {
      setIsSubmitting(false); // Set loading state to false
    }
  };

  const clickNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3)); 
  };

  const clickPrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div className="flex w-full h-full justify-center items-center my-5 px-4">
      <div className="flex flex-col w-full max-w-md border-2 rounded-md items-center justify-center transform p-6 relative">
        <button
          className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 top-2 left-2 absolute text-button-red hover:bg-button-red hover:text-home-white transition-colors duration-300 ease-in-out"
          onClick={clickBackButton}
        >
          <IoArrowBackCircleSharp className="w-full h-full " />
        </button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full p-5 gap-5 h-[33rem] md:h-[36rem] relative"
        >
          {currentStep === 1 && (
            <MainDetails register={register} errors={errors} />
          )}
          {currentStep === 2 && (
            <OptionalDetails register={register} errors={errors} />
          )}
          {currentStep === 3 && <FilesDetails register={register} />}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={clickPrevStep}
              disabled={currentStep === 1 || isSubmitting}
              className="w-8 h-8 md:w-10 md:h-10 flex justify-center items-center border-2 rounded-full bg-button-red hover:bg-home-white hover:text-button-red hover:border-button-red z-30 transition-colors duration-300 ease-in-out text-home-white disabled:bg-gray-400"
            >
              <GrFormPrevious />
            </button>
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault(); 
                  clickNextStep();
                }}
                disabled={isSubmitting}
                className="w-8 h-8 md:w-10 md:h-10 flex justify-center items-center border-2 rounded-full bg-button-red hover:bg-home-white hover:text-button-red hover:border-button-red z-30 transition-colors duration-300 ease-in-out text-home-white"
              >
                <GrFormNext />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="border-2 rounded px-4 py-2 md:px-5 md:py-2 bg-button-red hover:bg-home-white hover:text-button-red hover:border-button-red z-30 transition-colors duration-300 ease-in-out text-home-white"
              >
                {isSubmitting ? "Adding..." : "Add Project"}
              </button>
            )}
          </div>

          <div className="flex w-full justify-center gap-3 md:gap-5 items-center mt-4 absolute bottom-4 ">
            <div
              className={`rounded-full w-2 h-2 md:w-3 md:h-3 border border-black ${
                currentStep === 1 ? "bg-button-red" : ""
              }`}
            ></div>
            <div
              className={`rounded-full w-2 h-2 md:w-3 md:h-3 border border-black ${
                currentStep === 2 ? "bg-button-red" : ""
              }`}
            ></div>
            <div
              className={`rounded-full w-2 h-2 md:w-3 md:h-3 border border-black ${
                currentStep === 3 ? "bg-button-red" : ""
              }`}
            ></div>
          </div>
        </form>

        {/* Loading spinner */}
        {isSubmitting && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-20">
            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-t-4 border-t-button-red border-gray-300 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProjectCard;
