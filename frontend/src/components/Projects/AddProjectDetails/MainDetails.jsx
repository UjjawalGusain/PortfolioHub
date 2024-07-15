import React from 'react';

const MainDetails = ({ register, errors }) => (
  <div className="flex flex-wrap w-full gap-4 items-center justify-center p-5">
    <div className="w-2/5 flex">
      <input
        type="text"
        placeholder="Name"
        {...register('name', { required: true })}
        className="p-2 rounded-sm bg-gray-900 text-white w-full h-full"
      />
      {errors.name && <span className="text-red-500">Name is required</span>}
    </div>
    <div className="w-2/5 flex ">
      <input
        type="text"
        placeholder="Repo ID"
        {...register('repoId', { required: true })}
        className="p-2 rounded-sm bg-gray-900 text-white w-full h-full"
      />
      {errors.repoId && <span className="text-red-500">Repo ID is required</span>}
    </div>
    <div className="w-2/5">
      <input
        type="url"
        placeholder="URL"
        {...register('url', { required: true })}
        className="p-2 rounded-sm bg-gray-900 text-white w-full"
      />
      {errors.url && <span className="text-red-500">URL is required</span>}
    </div>
    <div className="w-2/5">
      <input
        type="text"
        placeholder="Domain"
        {...register('domain', { required: true })}
        className="p-2 rounded-sm bg-gray-900 text-white w-full"
      />
      {errors.domain && <span className="text-red-500">Domain is required</span>}
    </div>
  </div>
);

export default MainDetails;
