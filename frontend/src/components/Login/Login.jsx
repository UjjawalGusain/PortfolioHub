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
      navigate(`/user/${res.data.data.user.username}`)
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input
            type="text"
            {...register("username", {
              required: "Username or Email is required",
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
