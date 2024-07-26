import React from "react";

export default function Paragraph({ heading, reverse, para1, para2, imgSrc }) {
  return (
    <div
      className={`flex justify-evenly items-center  ${
        reverse ? "flex-row-reverse" : ""
      }`}
    >
      <div className="w-2/5 flex flex-col gap-5">
        <h3 className="text-4xl font-medium text-gray-700">{heading}</h3>
        <div className="flex flex-col gap-3 font-light">
          <p>{para1}</p>
          <p>{para2}</p>
        </div>
      </div>
      <div className="w-2/5 h-64 shadow-lg">
        <img src={imgSrc} alt="ac" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
