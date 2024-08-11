import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/signup/verify-otp");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center h-full bg-home-white p-20">
      <div className="h-4/5 w-3/5 border-4 shadow-xl shadow-button-red rounded-3xl flex flex-col py-4">
        <div className="h-1/4 flex justify-center items-center">
          <h1 className="text-4xl font-light text-center text-gray-600">
            Register
          </h1>
        </div>
        <div className="flex h-3/4">
          <div className="w-full h-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-5 flex flex-col items-center gap-5"
            >
              <div className="w-full flex flex-col gap-4 my-5">
                <div className="flex gap-2 ">
                  <div className="w-1/2">
                    <label className="text-sm font-light">Username</label>
                    <input
                      type="text"
                      {...register("username", {
                        required: "Username is required",
                      })}
                      className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  <div className="w-1/2">
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

                <div className="flex gap-2 ">
                  <div className="w-1/2">
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

                  <div className="w-1/2">
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

                <div className="flex gap-2 ">
                  <div className="w-1/2">
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

                  <div className="w-1/2">
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

                <div className="flex">
                  <div className="w-full">
                    <label className="text-sm font-light">Description</label>
                    <textarea
                      {...register("description")}
                      className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                      rows="4"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="text-sm font-light">
                      Profile Picture
                    </label>
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

                  <div className="w-1/2">
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
              </div>

              <button
                type="submit"
                className="w-32 text-center bg-button-red text-white px-3 py-1 rounded-sm border-2 hover:bg-home-white hover:text-button-red hover:border-button-red"
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
    </div>
  ); 
}

export default Signup;

// (
//   <div className="h-fit p-10 flex items-center justify-center bg-black text-white">
//     <div className="border-2 border-home-gold p-8 rounded-lg shadow-lg max-w-lg w-full">
//       <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
//       <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">
//         <div className="space-y-4">
//           <div>
//             <label className="block text-lg mb-2">Username</label>
//             <input
//               type="text"
//               {...register("username", { required: "Username is required" })}
//               className="w-full p-3 rounded-md border-2 border-home-gold bg-black text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
//             />
//             {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username.message}</p>}
//           </div>

// <div>
//   <label className="block text-lg mb-2">Full Name</label>
//   <input
//     type="text"
//     {...register("fullname", { required: "Full name is required" })}
//     className="w-full p-3 rounded-md border-2 border-home-gold bg-black text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
//   />
//   {errors.fullname && <p className="text-red-500 text-sm mt-2">{errors.fullname.message}</p>}
// </div>
//           <div>
//             <label className="block text-lg mb-2">Email</label>
//             <input
//               type="email"
//               {...register("email", { required: "Email is required" })}
//               className="w-full p-3 rounded-md border-2 border-home-gold bg-black text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
//           </div>
//           <div>
//             <label className="block text-lg mb-2">GitHub ID</label>
//             <input
//               type="text"
//               {...register("githubId", { required: "GitHub ID is required" })}
//               className="w-full p-3 rounded-md border-2 border-home-gold bg-black text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
//             />
//             {errors.githubId && <p className="text-red-500 text-sm mt-2">{errors.githubId.message}</p>}
//           </div>
//           <div>
//             <label className="block text-lg mb-2">Password</label>
//             <input
//               type="password"
//               {...register("password", { required: "Password is required" })}
//               className="w-full p-3 rounded-md border-2 border-home-gold bg-black text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
//             />
//             {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
//           </div>

{
  /* <div>
  <label className="block text-lg mb-2">Profile Picture</label>
  <input
    type="file"
    {...register("profilePic")}
    className="w-full bg-black text-white"
  />
  {errors.profilePic && <p className="text-red-500 text-sm mt-2">{errors.profilePic.message}</p>}
</div> */
}

//           <div>
//             <label className="block text-lg mb-2">Cover Image</label>
//             <input
//               type="file"
//               {...register("coverImg")}
//               className="w-full bg-black text-white"
//             />
//             {errors.coverImg && <p className="text-red-500 text-sm mt-2">{errors.coverImg.message}</p>}
//           </div>

//           <div>
//   <label className="block text-lg mb-2">Description</label>
//   <textarea
//     {...register("description")}
//     className="w-full p-3 rounded-md border-2 border-home-gold bg-black text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
//     rows="4"
//   />
//   {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>}
// </div>

//           <div>
//   <label className="block text-lg mb-2">Position</label>
//   <select
//     {...register("position", { required: "Position is required" })}
//     className="w-full p-3 rounded-md border-2 border-home-gold bg-black text-white focus:outline-none focus:ring-2 focus:ring-home-gold"
//   >
//     <option value="">Select your position</option>
//     {positions.map((position) => (
//       <option key={position} value={position}>
//         {position}
//       </option>
//     ))}
//   </select>
//   {errors.position && <p className="text-red-500 text-sm mt-2">{errors.position.message}</p>}
// </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 rounded-md border-2 border-home-gold bg-black text-white font-bold hover:bg-home-gold hover:text-black transition-colors duration-300"
//         >
//           Sign Up
//         </button>
//       </form>
// <p className="text-center mt-4">
//   Already have an account?{" "}
//   <span
//     className="text-blue-500 underline cursor-pointer"
//     onClick={() => navigate("/login")}
//   >
//     Log In
//   </span>
// </p>
//     </div>
//   </div>
// );
