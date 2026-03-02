import React from "react";
import CTAButton from "./CTAButton";
import { TypeAnimation } from "react-type-animation";

const Codeblocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblocks,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div
      className={`flex flex-col ${position} my-14 lg:my-20 items-center lg:items-start justify-between gap-10`}
    >
      {/* LEFT SECTION */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6 text-center lg:text-left">
        {heading}

        <p className="text-richblack-300 font-medium text-sm sm:text-base">
          {subheading}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 justify-center lg:justify-start">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            {ctabtn1.btntext}
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btntext}
          </CTAButton>
        </div>
      </div>

      {/* RIGHT SECTION (CODE) */}
      <div className="relative h-fit w-full lg:w-[45%] flex flex-row text-xs sm:text-sm bg-richblack-900 border-2 border-richblack-800 p-3 rounded-md overflow-hidden">
        
        {/* Line Numbers */}
        <div className="hidden sm:flex w-[8%] flex-col items-center mr-4 text-richblack-400 font-bold">
          {Array.from({ length: 13 }).map((_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Background Gradient */}
        <div
          className={`absolute w-[200px] sm:w-[250px] h-[120px] sm:h-[150px] 
          left-10 top-8 rounded-full ${backgroundGradient} opacity-20`}
        />

        {/* Code Animation */}
        <div
          className={`relative w-full font-mono font-bold ${codeColor}`}
        >
          <TypeAnimation
            sequence={[codeblocks, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Codeblocks;
