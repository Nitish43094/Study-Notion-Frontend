import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { AiFillTwitterCircle } from "react-icons/ai";
import { GrInstagram } from "react-icons/gr";

const Footer = () => {
    return (
        <footer className="w-full bg-richblack-800 text-richblack-400">

            {/* MAIN FOOTER */}
            <div className="mx-auto w-11/12 max-w-maxContent py-12 flex flex-col gap-10">

                {/* TOP SECTION */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* LEFT PART */}
                    <div className="flex flex-col sm:flex-row gap-10 flex-wrap lg:w-1/2">

                        {/* COMPANY */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-richblack-50 font-bold text-lg">Company</h2>
                            <a href="#">About</a>
                            <a href="#">Careers</a>
                            <a href="#">Affiliates</a>

                            {/* SOCIAL ICONS */}
                            <div className="flex gap-4 mt-3 text-2xl text-richblack-200">
                                <FaFacebook className="hover:text-blue-500 cursor-pointer transition" />
                                <SiGithub className="hover:text-white cursor-pointer transition" />
                                <AiFillTwitterCircle className="hover:text-sky-400 cursor-pointer transition" />
                                <GrInstagram className="hover:text-pink-500 cursor-pointer transition" />
                            </div>
                        </div>

                        {/* RESOURCES */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-richblack-50 font-bold text-lg">Resources</h2>
                            <a href="#">Articles</a>
                            <a href="#">Blog</a>
                            <a href="#">Cheat Sheets</a>
                            <a href="#">Code Challenges</a>
                            <a href="#">Projects</a>
                            <a href="#">Videos</a>
                        </div>

                        {/* PLANS */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-richblack-50 font-bold text-lg">Plans</h2>
                            <a href="#">Paid Membership</a>
                            <a href="#">For Students</a>
                            <a href="#">Business Solutions</a>
                        </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="hidden lg:block w-[1px] bg-richblack-700"></div>

                    {/* RIGHT PART */}
                    <div className="flex flex-col sm:flex-row gap-10 flex-wrap lg:w-1/2">

                        {/* SUBJECTS */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-richblack-50 font-bold text-lg">Subjects</h2>
                            <a href="#">AI</a>
                            <a href="#">Cloud Computing</a>
                            <a href="#">Cybersecurity</a>
                            <a href="#">Data Science</a>
                            <a href="#">DevOps</a>
                            <a href="#">Web Development</a>
                        </div>

                        {/* LANGUAGES */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-richblack-50 font-bold text-lg">Languages</h2>
                            <a href="#">C / C++</a>
                            <a href="#">Java</a>
                            <a href="#">JavaScript</a>
                            <a href="#">Python</a>
                            <a href="#">PHP</a>
                            <a href="#">SQL</a>
                        </div>

                        {/* CAREER */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-richblack-50 font-bold text-lg">Career Building</h2>
                            <a href="#">Career Paths</a>
                            <a href="#">Interview Prep</a>
                            <a href="#">Certifications</a>
                            <a href="#">Full Catalog</a>
                        </div>

                    </div>
                </div>

                {/* HORIZONTAL LINE */}
                <div className="h-[1px] bg-richblack-700"></div>

                {/* BOTTOM BAR */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center text-sm text-richblack-200">
                    <div className="flex gap-4">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Cookie Policy</a>
                        <a href="#">Terms</a>
                    </div>
                    <p className="text-center">
                        Made with ❤️ by Nitish | © 2024 StudyNotion
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
