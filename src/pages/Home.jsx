import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightTest from "../components/core/HomePage/HighlightTest";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from '../assets/Images/banner.mp4'
import Codeblocks from "../components/core/HomePage/CodeBlock";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import compareImage from '../assets/Images/Compare_with_others.svg'
import progressImage from '../assets/Images/Know_your_progress.svg'
import planLessionImg from '../assets/Images/Plan_your_lessons.svg'
import instructor from '../assets/Images/Instructor.png'
import UnlockPower from "../components/core/HomePage/UnlockPower";
import Footer from '../components/common/Footer'
import ReviewSlider from "../components/common/ReviewSlider";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../utils/constants";

const Home = () => {
    const { user } = useSelector((state) => state.profile)
    return (
        <div>
            {/* Section 1 */}
            <div className="relative mx-auto flex w-full max-w-maxContent flex-col items-center justify-between gap-6 px-4 sm:px-6 lg:px-0 text-white">

                {/* Become Instructor */}
                {
                    user !== null ? (
                        <Link to={"/about"}>
                            <div className="group mt-12 sm:mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 shadow-lg w-fit">
                                <div className="flex flex-row gap-2 items-center rounded-full px-6 sm:px-10 py-2 group-hover:bg-richblue-900">
                                    <p className="text-sm sm:text-base">Become an Instructor</p>
                                    <FaArrowRight />
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <Link to={"/signup"}>
                            <div className="group mt-12 sm:mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 shadow-lg w-fit">
                                <div className="flex flex-row gap-2 items-center rounded-full px-6 sm:px-10 py-2 group-hover:bg-richblue-900">
                                    <p className="text-sm sm:text-base">Become an Instructor</p>
                                    <FaArrowRight />
                                </div>
                            </div>
                        </Link>
                    )
                }

                {/* Heading */}
                <div className="text-center text-2xl sm:text-4xl lg:text-5xl font-semibold mt-4">
                    Empower Your Future With
                    <HighlightTest text={"Coding Skills"} />
                </div>

                {/* Sub Heading */}
                <div className="w-full sm:w-[90%] lg:w-[70%] text-center text-sm sm:text-base lg:text-lg font-medium text-richblack-300 mt-2">
                    StudyNotion is an online learning platform offering interactive courses in various subjects,
                    helping users gain skills through flexible, self-paced lessons, quizzes, and expert-led content
                    for all levels.
                </div>

                {/* CTA Buttons */}
                {
                    user !== null ? (
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-7 mt-6">
                            <CTAButton linkto={"/about"} active={true}>
                                Learn More
                            </CTAButton>
                            <CTAButton linkto={"/catalog/Python"} active={false}>
                                Book Demo
                            </CTAButton>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-7 mt-6">
                            <CTAButton linkto={"/signup"} active={true}>
                                Learn More
                            </CTAButton>
                            <CTAButton linkto={"/login"} active={false}>
                                Book Demo
                            </CTAButton>
                        </div>
                    )
                }

                {/* Video Section */}
                <div className="shadow-blue-200 my-10 sm:my-12 w-full sm:w-[90%] bg-white shadow-2xl rounded-lg overflow-hidden">
                    <video muted loop autoPlay className="w-full h-auto object-cover">
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/* Code Section */}
                <div className="w-full sm:w-[90%] flex flex-col gap-20">
                    <Codeblocks
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                                Unlock Your
                                <HighlightTest text={"coding potential"} />
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge."
                        }
                        ctabtn1={{
                            btntext: "Try it yourself",
                            linkto: `${user !== null ? "/catalog/Python" : "/signup"}`,
                            active: true,
                        }}
                        ctabtn2={{
                            btntext: "Learn More",
                            linkto: `${user !== null ? "/about" : "/signup"}`,
                            active: false,
                        }}
                        codeblocks={`<!doctype html>
                                    <html lang="en">
                                    <head>
                                    <meta charset="UTF-8" />
                                    <meta name="viewport" content="width=device-width" />
                                    <title>myapp</title>
                                    </head>
                                    <body>
                                    <div id="root"></div>
                                    </body>
                                    </html>`}
                        backgroundGradient="shadow-[1px_1px_50px_50px_#e53e3e] bg-[#e53e3e]"
                        codeColor="text-yellow-25"
                    />

                    <Codeblocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                                Start
                                <HighlightTest text={"coding in seconds"} />
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={{
                            btntext: "Continue Lesson",
                            linkto: `${user !== null && user.accountType === "Student" ? "/dashboard/enrolled-courses" : "/signup"}`,
                            active: true,
                        }}
                        ctabtn2={{
                            btntext: "Learn More",
                            linkto: `${user !== null ? "/about" : "/signup"}`,
                            active: false,
                        }}
                        codeblocks={`<!doctype html>
                                    <html lang="en">
                                    <head>
                                    <meta charset="UTF-8" />
                                    <meta name="viewport" content="width=device-width" />
                                    <title>myapp</title>
                                    </head>
                                    <body>
                                    <div id="root"></div>
                                    </body>
                                    </html>`}
                        backgroundGradient="shadow-[1px_1px_50px_50px_#3182ce] bg-[#3182ce]"
                        codeColor="text-pink-100"
                    />
                </div>

                {/* Unlock Power */}
                <div className="w-full sm:w-[90%] lg:w-[80%] mt-10">
                    <UnlockPower />
                </div>
            </div>


            {/* Section 2 */}
            <div className="w-full bg-[#f5fff4] text-black pt-24 sm:pt-32 lg:pt-40">
                <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center gap-14">

                    {/* Top CTA */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-7">
                        <CTAButton linkto="/catalog/Python" active={true}>
                            Explore Full Catalog
                        </CTAButton>

                        <CTAButton linkto="/about" active={false}>
                            <span className="text-white">Learn More</span>
                        </CTAButton>
                    </div>

                    {/* Skills Section */}
                    <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-16 w-full mt-10">
                        <div className="text-black w-full lg:w-1/2 text-2xl sm:text-3xl font-semibold text-center lg:text-left">
                            Get the skills you need for a{" "}
                            <HighlightTest text={"job that is in demand"} />
                        </div>

                        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-5 text-center lg:text-left">
                            <p className="text-black text-base sm:text-lg">
                                The modern StudyNotion dictates its own terms. Today, to be a
                                competitive specialist requires more than professional skills.
                            </p>

                            <CTAButton active={true} linkto="/about">
                                Learn More
                            </CTAButton>
                        </div>
                    </div>

                    {/* Timeline */}
                    <TimeLineSection />

                    {/* Language Learning Section */}
                    <div className="flex flex-col items-center gap-8 mt-10 w-full">
                        <div className="text-center w-full lg:w-10/12">
                            <h1 className="text-3xl sm:text-4xl font-semibold">
                                Your Swiss knife for{" "}
                                <HighlightTest text={"learning any language"} />
                            </h1>
                            <p className="mt-3 text-base sm:text-lg">
                                Using spin makes learning multiple languages easy with 20+ languages,
                                realistic voice-overs, progress tracking, custom schedules, and more.
                            </p>
                        </div>

                        {/* Images */}
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">
                            <img
                                className="w-[90%] sm:w-[70%] lg:w-auto lg:mr-[-120px]"
                                src={progressImage}
                                alt="Progress"
                            />
                            <img
                                className="w-[90%] sm:w-[70%] lg:w-auto z-10"
                                src={compareImage}
                                alt="Compare"
                            />
                            <img
                                className="w-[90%] sm:w-[70%] lg:w-auto lg:ml-[-150px]"
                                src={planLessionImg}
                                alt="Plan Lesson"
                            />
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mb-10">
                        <CTAButton linkto="/about" active={true}>
                            Learn More
                        </CTAButton>
                    </div>
                </div>
            </div>

            {/* Section 3 */}
            <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 py-16">

                {/* Left Image */}
                <div className="w-full lg:w-[55%] bg-white rounded-xl p-3">
                    <img
                        className="rounded-lg w-full object-cover"
                        src={instructor}
                        alt="Become an Instructor"
                    />
                </div>

                {/* Right Content */}
                <div className="flex flex-col gap-6 text-center lg:text-left lg:w-[45%]">
                    <h1 className="text-3xl sm:text-4xl font-semibold text-white">
                        Become an <HighlightTest text={"Instructor"} />
                    </h1>

                    <p className="text-richblack-200 text-base sm:text-lg leading-relaxed">
                        Instructors from around the world teach millions of students on
                        StudyNotion. We provide the tools and skills you need to teach what you
                        love.
                    </p>

                    <div className="w-fit mx-auto lg:mx-0">
                        <CTAButton active={true} linkto={`${user !== null && user.accountType === ACCOUNT_TYPE.INSTRUCTOR ? "/dashboard/enrolled-courses" : "/signup"}`}>
                            Start Teaching Today
                        </CTAButton>
                    </div>
                </div>

            </div>

            {/* section 4 */}
            <div className="text-white mx-auto w-10/12 max-w-maxContent text-center text-4xl font-bold mb-10">
                <p>Review from other Learners</p>
                <ReviewSlider />
            </div>
            <Footer />
        </div>
    )
}

export default Home;