import React from "react";

const OptionalDetails = ({ register, errors }) => (
  <div className="flex flex-wrap w-full gap-4 items-center justify-center p-2">
    <h1 className="text-3xl font-semibold text-text-blue mb-6 text-center">
          Add Project
        </h1>
    <div className="w-full flex gap-4">
      <div className="w-full">
        <label className="block text-home-black mb-2" htmlFor="techStack">
          Tech Stack(Comma Seperated)
        </label>
        <input
          type="text"
          id="techStack"
          placeholder="Tech Stack"
          {...register("techStack", { required: true })}
          className="w-full px-3 py-2 shadow-sm border-2 shadow-text-blue rounded-lg focus:outline-none focus:border-text-blue"
        />
        {errors.techStack && (
          <span className="text-red-500">Tech Stack is required</span>
        )}
      </div>
    </div>

    <div className="w-full flex gap-4">
      <div className="w-full">
        <label className="block text-home-black mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Description"
          {...register("description", { required: true })}
          className="w-full px-3 py-2 shadow-sm border-2 shadow-text-blue rounded-lg focus:outline-none focus:border-text-blue"
        />
        {errors.description && (
          <span className="text-red-500">Description is required</span>
        )}
      </div>
    </div>

    <div className="w-full flex gap-4">
      <div className="w-full">
        <label className="block text-home-black mb-2" htmlFor="ownersUsernames">
          Owner Usernames(comma seperated)
        </label>
        <input
          type="text"
          id="ownersUsernames"
          placeholder="Owner Usernames(comma separated)"
          {...register("ownersUsernames", { required: true })}
          className="w-full px-3 py-2 shadow-sm border-2 shadow-text-blue rounded-lg focus:outline-none focus:border-text-blue"
        />
        {errors.ownersUsernames && (
          <span className="text-red-500">Owner Usernames is required</span>
        )}
      </div>
    </div>

  </div>
);

export default OptionalDetails;
