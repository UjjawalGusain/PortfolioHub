import React from 'react';

const FilesDetails = ({ register }) => (
  <div className="flex flex-wrap w-full gap-4 items-center justify-evenly p-5">
    <div className="w-[48%]">
      <input
        type="file"
        multiple
        {...register('videos')}
        className="p-2 rounded-sm bg-gray-900 text-white w-full"
      />
    </div>
    <div className="w-[48%]">
      <input
        type="file"
        multiple
        {...register('images')}
        className="p-2 rounded-sm bg-gray-900 text-white w-full"
      />
    </div>
    <div className="w-full">
      <input
        type="file"
        {...register('thumbnail')}
        className="p-2 rounded-sm bg-gray-900 text-white w-full"
      />
    </div>
  </div>
);

export default FilesDetails;
