import React from "react";
import { useState, useEffect } from "react";

function Title({ project }) {
  const [createdAt, setCreatedAt] = useState(null);

  let monthName = "";
  let year = "";
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (project && project.createdAt) {
      setCreatedAt(new Date(project.createdAt));
    }
  }, [project]);

  if (createdAt) {
    year = createdAt.getFullYear();
    monthName = monthNames[createdAt.getMonth()];
  }
  return (
    <>
      <h1 className=" w-full text-5xl font-bold mb-4 text-left">
        {project.name}
      </h1>
      <div className="flex gap-6 items-center py-5 mb-10">
        {createdAt && (
          <h3 className="text-white font-bold bg-button-red w-fit px-3 py-1 rounded-xl">
            {monthName}, {year}
          </h3>
        )}
        <h3 className="font-semibold text-xl">{project.domain}</h3>
      </div>
    </>
  );
}

export default Title;
