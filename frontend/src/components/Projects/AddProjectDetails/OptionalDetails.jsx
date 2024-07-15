import React from 'react';

const OptionalDetails = ({ register, errors }) => (
  <div className="flex flex-wrap w-full gap-4 items-center justify-evenly p-5">
    <div className="w-[48%]">
      <input
        type="text"
        placeholder="Tech Stack (comma seperated)"
        {...register('techStack', { required: true })}
        className="p-2 rounded-sm bg-gray-900 text-white w-full"
      />
      {errors.techStack && <span className="text-red-500">Tech Stack is required</span>}
    </div>
    <div className="w-[48%]">
      <input
        type="number"
        placeholder="Stars"
        {...register('stars', { required: true })}
        className="p-2 rounded-sm bg-gray-900 text-white w-full"
      />
      {errors.stars && <span className="text-red-500">Stars are required</span>}
    </div>
    <div className="w-full">
      <textarea
        placeholder="Description"
        {...register('description', { required: true })}
        className="p-2 rounded-sm bg-gray-900 text-white w-full"
      />
      {errors.description && <span className="text-red-500">Description is required</span>}
    </div>
    <div className="w-full">
      <input
        type="text"
        placeholder="Owner Usernames (comma separated)"
        {...register('ownersUsernames', { required: true })}
        className="p-2 rounded-sm bg-gray-900 text-white w-full"
      />
      {errors.ownersUsernames && <span className="text-red-500">Owner usernames are required</span>}
    </div>
  </div>
);

export default OptionalDetails;
