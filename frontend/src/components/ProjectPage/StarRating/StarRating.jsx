import React from "react";
import ReactStars from "react-stars";

const handleStarRating = (rating) => {
  console.log(rating);
};

function StarRating({ project }) {
  return (
    <>
      <h2 className="text-xl font-bold mb-5">Rate this Project</h2>
      <div className="flex justify-start">
        <ReactStars
          count={5}
          size={50}
          color2={"#ffd700"}
          onChange={handleStarRating}
        />
      </div>
    </>
  );
}

export default StarRating;
