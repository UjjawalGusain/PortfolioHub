import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { USER_ENDPOINTS } from "../../services/apiService";
import axios from 'axios';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const positions = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Data Analyst",
    "Data Scientist",
    "DevOps Engineer",
    "Product Manager",
    "UI/UX Designer",
    "AI Engineer",
    "ML Engineer",
    "Software Engineer",
    "QA Engineer",
    "Security Specialist",
    "Mobile Developer",
    "Cloud Engineer",
    "Systems Architect",
    "Database Administrator",
    "Network Engineer",
    "IT Support Specialist",
    "Business Analyst",
    "Scrum Master",
    "Technical Writer",
    "Solutions Architect",
    "Hardware Engineer",
    "Site Reliability Engineer",
    "Cybersecurity Analyst",
    "IT Manager",
    "Project Coordinator",
    "Systems Analyst",
    "Technical Support Engineer",
  ];

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("fullname", data.fullname);
      formData.append("email", data.email);
      formData.append("githubId", data.githubId);
      formData.append("password", data.password);
      formData.append("description", data.description);
      formData.append("position", data.position);
      formData.append("profilePic", data.profilePic[0]);
      formData.append("coverImg", data.coverImg[0]);

      const response = await axios.post(USER_ENDPOINTS.REGISTER, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        navigate("/signup/verify-otp");
      } else {
        console.error("Signup failed", response.data);
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-home-white p-4 sm:p-8 lg:p-20">
      <div className="w-full max-w-3xl border-4 shadow-xl shadow-button-red rounded-3xl flex flex-col py-4">
        <div className="flex justify-center items-center py-4">
          <h1 className="text-3xl sm:text-4xl font-light text-center text-gray-600">
            Register
          </h1>
        </div>
        <div className="px-4 sm:px-8 flex flex-col gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-light">Username</label>
                <input
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="text-sm font-light">Full Name</label>
                <input
                  type="text"
                  {...register("fullname", {
                    required: "Full name is required",
                  })}
                  className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.fullname.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-light">Email</label>
                <input
                  type="text"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="text-sm font-light">GitHub ID</label>
                <input
                  type="text"
                  {...register("githubId", {
                    required: "GitHub ID is required",
                  })}
                  className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                />
                {errors.githubId && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.githubId.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-light">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="text-sm font-light">Position</label>
                <select
                  {...register("position", {
                    required: "Position is required",
                  })}
                  className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                >
                  <option value="">Select your position</option>
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
                {errors.position && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.position.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-light">Description</label>
              <textarea
                {...register("description")}
                className="w-full border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                rows="4"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-light">Profile Picture</label>
                <input
                  type="file"
                  {...register("profilePic")}
                  className="w-full h-12 border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                />
                {errors.profilePic && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.profilePic.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="text-sm font-light">Cover Image</label>
                <input
                  type="file"
                  {...register("coverImg")}
                  className="w-full h-12 border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                />
                {errors.coverImg && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.coverImg.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-32 text-center bg-button-red text-white px-3 py-1 rounded-sm border-2 hover:bg-home-white hover:text-button-red hover:border-button-red"
            >
              Register
            </button>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <span
                className="text-blue-500 underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Log In
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
