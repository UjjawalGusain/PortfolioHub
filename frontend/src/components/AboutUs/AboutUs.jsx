import React from "react";
import Footer from "../Footer/Footer";
import Paragraph from "./Paragraph/Paragraph";

function AboutUs() {
  // Mission
  const mHeading = "What Is Our Mission?";
  const m1 =
    "At PortfolioHub, our mission is to empower individuals and teams by providing a dynamic platform that showcases their projects and fosters meaningful connections. We aim to bridge the gap between creativity and collaboration, enabling users to not only present their work but also engage with a vibrant community of like-minded professionals.";
  const m2 =
    "Through our innovative portfolio and project management tools, we strive to support your journey towards achieving your goals and making impactful contributions in your field.";
  const mImg = "/front-page.png";

  // Story
  const sHeading = "What Is Our Story?";
  const s1 =
    "PortfolioHub was born from the need for a dedicated space where creators, developers, and professionals can showcase their work and connect with others. Our founders, from diverse backgrounds in technology and design, aimed to build a platform that highlights individual projects and fosters collaboration.";
  const s2 =
    "Through dedication and community feedback, PortfolioHub has evolved into a comprehensive tool for project and portfolio management. Today, it's a vibrant community where creativity meets collaboration, continually supporting the ambitions of our users.";
  const sImg = "/story.jpg";

  // Needs
  const nHeading = "Who Is Our App For?";
  const n1 =
    "PortfolioHub is designed for busy professionals who want to effectively showcase their work without spending excessive time building a portfolio. Whether you are a developer, designer, entrepreneur, or any other professional, this app helps you present your projects and achievements in a polished and organized manner.";
  const n2 =
    "It's perfect for those who want to represent themselves professionally, network with like-minded individuals, and explore new opportunities, all without the hassle of creating and maintaining a portfolio from scratch. With PortfolioHub, your work gets the attention it deserves, allowing you to focus on what you do best.";
  const nImg = "/software-eng.jpg";

  return (
    <div className="h-full w-full px-4 md:px-0">
      <div className="h-full flex flex-col items-center justify-center gap-10 pb-28">
        <div className="w-full max-w-5xl flex flex-col items-center justify-center my-10 gap-10">
          <h1 className="text-3xl md:text-5xl text-balance text-center font-medium text-gray-800">
            We help you share your Art - So you can focus on creating it!
          </h1>
          <p className="font-light text-center">
            PortfolioHub helps you create and maintain your custom portfolio,
            making us one of the first to ever do it.
          </p>
        </div>

        <div className="w-full max-w-5xl flex flex-col gap-20">
          <Paragraph
            heading={mHeading}
            para1={m1}
            para2={m2}
            imgSrc={mImg}
            reverse={false}
          />
          <Paragraph
            heading={sHeading}
            para1={s1}
            para2={s2}
            imgSrc={sImg}
            reverse={true}
          />
          <Paragraph
            heading={nHeading}
            para1={n1}
            para2={n2}
            imgSrc={nImg}
            reverse={false}
          />
        </div>

        <hr className="border-t-2 border-gray-300 my-4 w-full max-w-4xl" />

        <h1 className="text-2xl md:text-4xl font-medium text-gray-700 mb-4">
          Creators
        </h1>
        <div className="flex flex-col justify-center items-center gap-3 font-thin">
          <img
            src="/ujjawal-gusain-img.png"
            alt="my-img"
            className="rounded-full shadow-button-red shadow-md w-32 h-32 md:w-40 md:h-40 object-cover"
          />
          <h1 className="text-lg md:text-xl">Ujjawal Gusain</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
