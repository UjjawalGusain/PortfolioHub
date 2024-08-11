import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { SETTINGS_ENDPOINTS } from "../../../services/apiService";

const Settings = () => {
  // Settings form
  const {
    register: settingsRegister,
    handleSubmit: handleSettingsSubmit,
    formState: { errors: settingsErrors },
  } = useForm();

  // Password form
  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm();

  const onSettingsSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("fullname", data.fullname);
    formData.append("position", data.position);

    // Handle file inputs correctly
    if (data.profilePic && data.profilePic.length > 0) {
      formData.append("profilePic", data.profilePic[0]);
    }

    if (data.coverImg && data.coverImg.length > 0) {
      formData.append("coverImg", data.coverImg[0]);
    }

    try {
      await axios.post(SETTINGS_ENDPOINTS.CHANGE_USER_SETTINGS, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Settings updated successfully");
    } catch (error) {
      console.error(error);
      alert("Error updating settings");
    }
  };

  const onPasswordSubmit = async (data) => {
    try {
      await axios.post(SETTINGS_ENDPOINTS.CHANGE_PASSWORD, data);
      alert("Password changed successfully");
    } catch (error) {
      console.error(error);
      alert("Error changing password");
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full bg-home-white p-10">
      <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-4xl font-semibold text-text-blue mb-8 text-center">
          Settings
        </h1>

        {/* Update Settings Form */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Update Settings</h2>
          <form
            onSubmit={handleSettingsSubmit(onSettingsSubmit)}
            className="px-5 flex flex-col items-center gap-5 p-5"
          >
            <div className="w-full flex flex-col gap-4 my-5">
              <div className="flex gap-2 flex-col">
                <label className="text-lg font-semibold">Change Username</label>
                <input
                  type="text"
                  {...settingsRegister("username")}
                  className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                />
                {settingsErrors.username && (
                  <p className="text-red-500 text-sm">
                    {settingsErrors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 my-5">
              <div className="flex gap-2 flex-col">
                <label className="text-lg font-semibold">Change Full Name</label>
                <input
                  type="text"
                  {...settingsRegister("fullname")}
                  className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                />
                {settingsErrors.fullname && (
                  <p className="text-red-500 text-sm">
                    {settingsErrors.fullname.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 my-5">
              <div className="flex gap-2 flex-col">
                <label className="text-lg font-semibold">Change Position</label>
                <input
                  type="text"
                  {...settingsRegister("position")}
                  className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                />
                {settingsErrors.position && (
                  <p className="text-red-500 text-sm">
                    {settingsErrors.position.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 my-5">
              <div className="flex gap-2 flex-col">
                <label className="text-lg font-semibold">Change Description</label>
                <textarea
                  {...settingsRegister("description")}
                  className="w-full h-24 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                  rows="4"
                />
                {settingsErrors.description && (
                  <p className="text-red-500 text-sm">
                    {settingsErrors.description.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 my-5">
              <div className="flex gap-2 flex-col">
                <label className="text-lg font-semibold">Change Profile Picture</label>
                <input
                  type="file"
                  {...settingsRegister("profilePic")}
                  className="w-full focus:outline-none"
                />
                {settingsErrors.profilePic && (
                  <p className="text-red-500 text-sm">
                    {settingsErrors.profilePic.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 my-5">
              <div className="flex gap-2 flex-col">
                <label className="text-lg font-semibold">Change Cover Image</label>
                <input
                  type="file"
                  {...settingsRegister("coverImg")}
                  className="w-full focus:outline-none"
                />
                {settingsErrors.coverImg && (
                  <p className="text-red-500 text-sm">
                    {settingsErrors.coverImg.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
            >
              Update Settings
            </button>
          </form>
        </div>

        {/* Change Password Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
          <form
            onSubmit={handlePasswordSubmit(onPasswordSubmit)}
            className="px-5 flex flex-col items-center gap-5 p-5"
          >
            <div className="w-full flex flex-col gap-4 my-5">
              <div className="flex gap-2 flex-col">
                <label className="text-lg font-semibold">Current Password</label>
                <input
                  type="password"
                  {...passwordRegister("oldPassword", {
                    required: "Current password is required",
                  })}
                  className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                />
                {passwordErrors.oldPassword && (
                  <p className="text-red-500 text-sm">
                    {passwordErrors.oldPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 my-5">
              <div className="flex gap-2 flex-col">
                <label className="text-lg font-semibold">New Password</label>
                <input
                  type="password"
                  {...passwordRegister("newPassword", {
                    required: "New password is required",
                  })}
                  className="w-full h-12 border-2 rounded-lg border-grey-300 focus:outline-none focus:border-gray-400 p-3"
                />
                {passwordErrors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {passwordErrors.newPassword.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
