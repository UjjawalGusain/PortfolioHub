import React from "react";

const MainDetails = ({ register, errors }) => (
  <div className="flex flex-wrap w-full gap-4 items-center justify-center p-2 ">
    <h1 className="text-3xl font-semibold text-text-blue mb-6 text-center">
      Add Project
    </h1>
    <div className="w-full flex gap-4">
      <div className="w-1/2">
        <label className="block text-home-black mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          {...register("name", { required: true })}
          className="w-full px-3 py-2 shadow-sm border-2 shadow-text-blue rounded-lg focus:outline-none focus:border-text-blue"
        />
        {errors.name && <span className="text-red-500">Name is required</span>}
      </div>
      <div className="w-1/2">
        <label className="block text-home-black mb-2" htmlFor="domain">
          Domain
        </label>
        <input
          type="text"
          id="domain"
          placeholder="Domain"
          {...register("domain", { required: true })}
          className="w-full px-3 py-2 shadow-sm border-2 shadow-text-blue rounded-lg focus:outline-none focus:border-text-blue"
        />
        {errors.repoId && (
          <span className="text-red-500">Domain is required</span>
        )}
      </div>
    </div>

      <div className="w-full">
        <label className="block text-home-black mb-2" htmlFor="url">
          URL
        </label>
        <input
          type="url"
          id="url"
          placeholder="URL"
          {...register("url", { required: true })}
          className="w-full px-3 py-2 shadow-sm border-2 shadow-text-blue rounded-lg focus:outline-none focus:border-text-blue"
        />
        {errors.url && <span className="text-red-500">URL is required</span>}
      </div>
      
  </div>
);

export default MainDetails;
