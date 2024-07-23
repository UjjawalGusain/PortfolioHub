import React, { useState, useEffect } from 'react';
import { SlArrowUpCircle } from 'react-icons/sl';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <a href="#projects">
      <button
        className={`fixed top-24 right-14 text-home-black z-30 text-5xl font-normal rounded-full hover:bg-slate-300 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <SlArrowUpCircle />
      </button>
    </a>
  );
};

export default ScrollToTopButton;
