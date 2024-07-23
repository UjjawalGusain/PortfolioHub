import React from "react";
import Footer from "../Footer/Footer";
function AboutUs() {
  return (
    <div className="h-full w-full">
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-3/5 flex flex-col items-center justify-center m-10 gap-10">
          <h1 className="text-5xl text-balance text-center font-medium text-gray-800">
            We help you share your Art - So you can focus on creating it !
          </h1>
          <p className="font-light text-center">
            PortfolioHub helps you create and maintain your custom portfolio,
            making us one of the first to ever do it.
          </p>
        </div>

        <div className="w-4/5 flex flex-col gap-20">
          <div className="flex justify-evenly items-center">
            <div className="w-2/5">
              <h3 className="text-2xl font-semibold mb-8">
                What Is Our <span className="font-bold">Mission</span>?{" "}
              </h3>
              <p>
                At PortfolioHub, our mission is to empower individuals and teams
                by providing a dynamic platform that showcases their projects
                and fosters meaningful connections. We aim to bridge the gap
                between creativity and collaboration, enabling users to not only
                present their work but also engage with a vibrant community of
                like-minded professionals.
              </p>
              <p>
                Through our innovative portfolio and project management tools,
                we strive to support your journey towards achieving your goals
                and making impactful contributions in your field.
              </p>
            </div>
            <div className="w-2/5 h-64 shadow-lg">
              <img
                src="/front-page.png"
                alt="ac"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-row-reverse justify-evenly items-center">
            <div className="w-2/5">
              <h3 className="text-2xl font-semibold mb-8">
                What Is Our <span className="font-bold">Story</span>?{" "}
              </h3>
              <p>
                PortfolioHub was born from the need for a dedicated space where
                creators, developers, and professionals can showcase their work
                and connect with others. Our founders, from diverse backgrounds
                in technology and design, aimed to build a platform that
                highlights individual projects and fosters collaboration.
              </p>
              <p>
                Through dedication and community feedback, PortfolioHub has
                evolved into a comprehensive tool for project and portfolio
                management. Today, it's a vibrant community where creativity
                meets collaboration, continually supporting the ambitions of our
                users.
              </p>
            </div>
            <div className="w-2/5 h-64 shadow-lg">
              <img
                src="/story.jpg"
                alt="ac"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex justify-evenly items-center">
            <div className="w-2/5">
              <h3 className="text-2xl font-semibold mb-8">
                Who <span className="font-bold">Needs</span> This App?{" "}
              </h3>
              <p>
                PortfolioHub is designed for busy professionals who want to
                effectively showcase their work without spending excessive time
                building a portfolio. Whether you are a developer, designer,
                entrepreneur, or any other professional, this app helps you
                present your projects and achievements in a polished and
                organized manner.
              </p>
              <p>
                It's perfect for those who want to represent themselves
                professionally, network with like-minded individuals, and
                explore new opportunities, all without the hassle of creating
                and maintaining a portfolio from scratch. With PortfolioHub,
                your work gets the attention it deserves, allowing you to focus
                on what you do best.
              </p>
            </div>
            <div className="w-2/5 h-64 shadow-lg">
              <img
                src="/software-eng.jpg"
                alt="ac"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
