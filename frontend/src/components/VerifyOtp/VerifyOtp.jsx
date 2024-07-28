import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { USER_ENDPOINTS } from "../../services/apiService.js";
import axios from 'axios'; 
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { clearPassword } from "../../redux/auth/authSlice.js";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("userData in VerifyOtp:", userData);
  }, [userData]);

  const onSubmit = async () => {
    if (otp.length !== 6) {
      setError("otp", {
        type: "manual",
        message: "OTP must be 6 digits long",
      });
    } else {
      clearErrors("otp");
      setLoading(true);
      try {
        console.log(userData);
        const response = await axios.post(USER_ENDPOINTS.VERIFY_OTP, { otp, userData });
        console.log("Verification Response:", response.data);
  
        if (response.data.success) {
          console.log("New User Data: ");
          console.log(userData);
          navigate("/login");
        } else {
          console.log("OTP verification failed:", response.data.error);
          setError("otp", {
            type: "manual",
            message: response.data.error || "OTP verification failed",
          });
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        setError("otp", {
          type: "manual",
          message: "An error occurred while verifying the OTP",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={{ color: "black", border: "1px solid #ccc", borderRadius: "4px", width: "40px", height: "40px", margin: "0 12px", fontSize: "16px" }}
            renderInput={(props) => (
              <input
                {...props}
                className="border border-gray-300 p-2 rounded-md w-12 text-center"
              />
            )}
          />
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
