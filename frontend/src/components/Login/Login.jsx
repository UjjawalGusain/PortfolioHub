import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authThunks";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      console.log("Data: ", data);
      
      const user = await dispatch(login(data)).unwrap();
      console.log("User: ", user);
      
      navigate(`/user/${user.username}/home`);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-home-white px-4">
      <div className="h-4/5 max-w-md w-full border-4 shadow-xl shadow-button-red rounded-3xl flex flex-col py-4 mx-auto">
        <div className="h-1/4 flex justify-center items-center">
          <h1 className="text-3xl md:text-4xl font-light text-center text-gray-600">
            Sign In with your Email
          </h1>
        </div>
        <div className="flex flex-col h-3/4 px-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-5"
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
  );
}

export default Login;
