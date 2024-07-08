import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/auth/authThunks.js";

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.auth.auth || {});

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("githubId", data.githubId);
    formData.append("password", data.password);
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
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div>
          <label>Username</label>
          <input type="text" {...register("username", { required: "Username is required" })} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label>Full Name</label>
          <input type="text" {...register("fullname", { required: "Full name is required" })} />
          {errors.fullname && <p>{errors.fullname.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register("email", { required: "Email is required" })} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>GitHub ID</label>
          <input type="text" {...register("githubId", { required: "GitHub ID is required" })} />
          {errors.githubId && <p>{errors.githubId.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...register("password", { required: "Password is required" })} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label>Profile Picture</label>
          <input type="file" {...register("profilePic")} />
          {errors.profilePic && <p>{errors.profilePic.message}</p>}
        </div>

        <div>
          <label>Cover Image</label>
          <input type="file" {...register("coverImg")} />
          {errors.coverImg && <p>{errors.coverImg.message}</p>}
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <a href="/login">Log In</a>
      </p>
    </div>
  );
}

export default Signup;
