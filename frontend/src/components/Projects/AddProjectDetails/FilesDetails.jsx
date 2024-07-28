import React from "react";

const FilesDetails = ({ register }) => (
  <div className="flex flex-wrap w-full gap-4 items-center justify-evenly p-2">
    <h1 className="text-3xl font-semibold text-text-blue mb-6 text-center">
      Add Project
    </h1>
    <div className="w-full flex gap-4">
      <div className="w-1/2">
        <label className="block text-home-black mb-2" htmlFor="videos">
          Upload Videos
        </label>
        <input
          id="videos"
          type="file"
          multiple
          {...register("videos")}
          className="w-full px-3 py-2 shadow-sm border-2 shadow-text-blue rounded-lg focus:outline-none focus:border-text-blue"
        />
      </div>

      <div className="w-1/2">
        <label className="block text-home-black mb-2" htmlFor="images">
          Upload Images
        </label>
        <input
          id="images"
          type="file"
          multiple
          {...register("images")}
          className="w-full px-3 py-2 shadow-sm border-2 shadow-text-blue rounded-lg focus:outline-none focus:border-text-blue"
        />
      </div>
    </div>

    <div className="w-full">
      <label className="block text-home-black mb-2" htmlFor="thumbnail">
        Upload thumbnail
      </label>
      <input
        id="thumbnail"
        type="file"
        {...register("thumbnail")}
        className="w-full px-3 py-2 shadow-sm border-2 shadow-text-blue rounded-lg focus:outline-none focus:border-text-blue"
      />
    </div>
  </div>
);

export default FilesDetails;
