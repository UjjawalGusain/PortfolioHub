import React from "react";
// import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className="h-32 text-home-black flex flex-col justify-center items-center p-4 sm:p-8 z-20 sticky bottom-0 bg-white">
      <div className="flex w-full sm:w-1/2 pt-5 pb-2 border-t-2 text-3xl justify-center items-center gap-10 sm:gap-20">
        <a
          href="https://github.com/UjjawalGusain/" //change it later on
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/logo_bw.png"
            alt="Logo"
            className="w-20 h-16"
          />
        </a>
        <a
          href="https://x.com/UjjawalGusain31"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://github.com/UjjawalGusain/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/ujjawal-gusain/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineLinkedin />
        </a>
      </div>
      <h3 className="text-black">Copyright &copy;2024 All rights reserved</h3>
    </div>
  );
}

export default Footer;
