import React from "react";

export default function Paragraph({ heading, reverse, para1, para2, imgSrc }) {
  return (
    <div
      className={`flex flex-col md:flex-row justify-center items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full md:w-2/5 flex flex-col gap-5 px-4">
        <h3 className="text-3xl md:text-4xl font-medium text-gray-700 text-center md:text-left">
          {heading}
        </h3>
        <div className="flex flex-col gap-3 font-light text-center md:text-left">
          <p>{para1}</p>
          <p>{para2}</p>
        </div>
      </div>
      <div className="w-full md:w-2/5 h-64 md:h-80 shadow-lg mt-5 md:mt-0">
        <img src={imgSrc} alt="ac" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

