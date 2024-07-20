import React, { useEffect, useState } from 'react';
import TimeAgo  from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


TimeAgo.addLocale(en);
// navigate(`user/${pathUsername}/projects/${name}`)
const CardDefault = ({ project }) => {
  const {username} = useParams()
  const pathUsername = username
  const { thumbnail, name, description, updatedAt, url } = project;
  const [timeAgo, setTimeAgo] = useState('');
  const navigate = useNavigate()

  const handleProjectClick = () => {
    navigate(`${name}/`)
  }

  useEffect(() => {
    const timeAgoInstance = new TimeAgo('en-US');
    const formattedTime = timeAgoInstance.format(new Date(updatedAt));

    setTimeAgo(formattedTime);
  }, [updatedAt]);

  const handleButton = () => {
    console.log(url);
    <Link to={url}>Let's see the project!</Link>
  }

  return (
    <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-md md:flex-row m-5 border-home-gold border-2">
      <img
        className="h-96 w-1/2 rounded-t-lg object-cover md:h-72 md:w-48 md:rounded-none md:rounded-l-lg"
        src={thumbnail}
        alt=""
      />
      <div className="flex flex-col justify-start p-6">
        <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
          {name}
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {description}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-300">
          Last updated {timeAgo}
        </p>
        {/* <a href={url} target="_blank" rel="noopener noreferrer"> */}
        <button 
          className='m-10 w-36 h-10 border-2 border-black text-sm' 
          onClick={handleProjectClick}
        >
          Let's see the project!
          
        </button>
        {/* </a> */}
      </div>
    </div>
  );
};

export default CardDefault;
