import React from "react";
import logo1 from "../../../assets/TimeLineLogo/logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/logo4.svg";
import TimelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    logo: logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    logo: logo2,
    heading: "Responsibility",
    Description: "Ownership and accountability at every step",
  },
  {
    logo: logo3,
    heading: "Flexibility",
    Description: "Adaptable learning for modern professionals",
  },
  {
    logo: logo4,
    heading: "Solve the problem",
    Description: "Focused on practical solutions",
  },
];

const TimeLineSection = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-16 items-center w-full">

      {/* Left Side */}
      <div className="w-full lg:w-[45%] flex flex-col gap-8">
        {timeline.map((data, ind) => (
          <div className="flex gap-4 sm:gap-5" key={ind}>
            <div className="flex flex-col items-center">
              <img
                src={data.logo}
                alt={data.heading}
                className="w-10 h-10"
              />
              {ind !== timeline.length - 1 && (
                <div className="w-[2px] h-12 bg-caribbeangreen-400 mt-2"></div>
              )}
            </div>

            <div>
              <h1 className="font-semibold text-base sm:text-lg">
                {data.heading}
              </h1>
              <p className="text-sm sm:text-base text-richblack-600">
                {data.Description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-[45%] flex flex-col items-center relative">
        <img
          className="rounded-lg shadow-lg w-full max-w-md"
          src={TimelineImage}
          alt="Timeline"
        />

        {/* Stats Card */}
        <div className="w-[90%] sm:w-[80%] bg-caribbeangreen-700 flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-0 p-6 rounded-lg shadow-lg mt-[-40px]">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-semibold text-white">
              10
            </h1>
            <p className="text-caribbeangreen-200 text-sm sm:text-base">
              Years of Experience
            </p>
          </div>

          <div className="hidden sm:block w-[2px] h-10 bg-caribbeangreen-400"></div>

          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-semibold text-white">
              250
            </h1>
            <p className="text-caribbeangreen-200 text-sm sm:text-base">
              Types of Courses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;
