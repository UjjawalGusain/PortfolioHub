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
        withCredentials: true,
      });
      console.log("Login Response:", res);
      navigate(`/user/${res.data.data.user.username}/home`);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-home-white">
      <div className="h-4/5 w-1/3 border-4 shadow-xl shadow-button-red rounded-3xl flex flex-col py-4">
        <div className="h-1/4 flex justify-center items-center">
          <h1 className="text-4xl font-light text-center text-gray-600">
            Sign In with your Email
          </h1>
        </div>
        <div className="flex h-3/4">
          <div className="w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-5 flex flex-col items-center gap-5"
            >
              <div className="w-full flex flex-col gap-4 my-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-light">Username</label>
                  <input
                    type="text"
                    {...register("username", {
                      required: "Username or Email is required",
                    })}
                    className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-light">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-light">Password</label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-32 text-center bg-button-red text-white px-3 py-1 rounded-sm border-2 hover:bg-home-white hover:text-button-red hover:border-button-red"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

{
  /* <div className="flex justify-center items-center h-screen bg-black">
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
  </div> */
}
