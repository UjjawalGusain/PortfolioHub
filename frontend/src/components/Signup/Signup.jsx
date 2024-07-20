import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/auth/authThunks.js";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector(
    (state) => state.auth.auth || {}
  );

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

    dispatch(signup(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/signup/verify-otp");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-fit p-10 flex items-center justify-center bg-black text-white">
      <div className="border-2 border-home-gold p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-lg mb-2">Username</label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="w-full p-3 rounded-md border-2 border-home-gold bg-black text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
              />
              {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username.message}</p>}
            </div>

            <div>
              <label className="block text-lg mb-2">Full Name</label>
              <input
                type="text"
                {...register("fullname", { required: "Full name is required" })}
                className="w-full p-3 rounded-md border-2 border-home-gold bg-black text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
              />
              {errors.fullname && <p className="text-red-500 text-sm mt-2">{errors.fullname.message}</p>}
            </div>

            <div>
              <label className="block text-lg mb-2">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full p-3 rounded-md border-2 border-home-gold bg-black text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-lg mb-2">GitHub ID</label>
              <input
                type="text"
                {...register("githubId", { required: "GitHub ID is required" })}
                className="w-full p-3 rounded-md border-2 border-home-gold bg-black text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
              />
              {errors.githubId && <p className="text-red-500 text-sm mt-2">{errors.githubId.message}</p>}
            </div>

            <div>
              <label className="block text-lg mb-2">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-3 rounded-md border-2 border-home-gold bg-black text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
              />
              {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-lg mb-2">Profile Picture</label>
              <input
                type="file"
                {...register("profilePic")}
                className="w-full bg-black text-white"
              />
              {errors.profilePic && <p className="text-red-500 text-sm mt-2">{errors.profilePic.message}</p>}
            </div>

            <div>
              <label className="block text-lg mb-2">Cover Image</label>
              <input
                type="file"
                {...register("coverImg")}
                className="w-full bg-black text-white"
              />
              {errors.coverImg && <p className="text-red-500 text-sm mt-2">{errors.coverImg.message}</p>}
            </div>

            <div>
              <label className="block text-lg mb-2">Description</label>
              <textarea
                {...register("description")}
                className="w-full p-3 rounded-md border-2 border-home-gold bg-black text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
                rows="4"
              />
              {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block text-lg mb-2">Position</label>
              <select
                {...register("position", { required: "Position is required" })}
                className="w-full p-3 rounded-md border-2 border-home-gold bg-black text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
              >
                <option value="">Select your position</option>
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
              {errors.position && <p className="text-red-500 text-sm mt-2">{errors.position.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md border-2 border-home-gold bg-black text-white font-bold hover:bg-home-gold hover:text-black transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
