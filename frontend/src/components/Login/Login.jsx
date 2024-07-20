import React from "react";
import { useForm } from "react-hook-form";
import { USER_ENDPOINTS } from "../../services/apiService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; //
import { useEffect } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await axios.post(USER_ENDPOINTS.LOGIN, data, {
        withCredentials: true
      });
      console.log("Login Response:", res);
      navigate(`/user/${res.data.data.user.username}/home`)
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
  <div className="flex justify-center items-center h-screen bg-black">
    <div className="border-2 border-home-gold p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-white mb-2">Username</label>
          <input
            type="text"
            {...register("username", {
              required: "Username or Email is required",
            })}
            className="w-full p-3 border-2 border-home-gold rounded-md bg-black text-home-gold focus:outline-none focus:ring-2 focus:ring-home-gold"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-2">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-white mb-2">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-3  border-2 border-home-gold rounded-md bg-black text-home-gold focus:outline-none focus:ring-2 focus:ring-home-gold"
          />
        </div>

        <div>
          <label className="block text-white mb-2">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-3 rounded-md bg-black border-2 border-home-gold text-home-gold focus:outline-none focus:ring-2 focus:ring-home-gold"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-md bg-black text-home-gold font-bold hover:bg-home-gold hover:text-black transition-colors duration-300"
        >
          Login
        </button>
      </form>
    </div>
  </div>
);
}

export default Login;
