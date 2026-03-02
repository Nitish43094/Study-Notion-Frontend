import React from "react";
import HighlightTest from "../components/core/HomePage/HighlightTest";
import about1 from '../assets/Images/aboutus1.webp'
import about2 from '../assets/Images/aboutus2.webp'
import about3 from '../assets/Images/aboutus3.webp'
import image from '../assets/Images/FoundingStory.png'
import LearningGrid from "../components/core/About/LearningGrid";
import ContactFormSection from "../components/core/About/ContactFormSection";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
const info = [
    {
        heading: "5K+",
        subHeading: "Active Students",
    },
    {
        heading: "10+",
        subHeading: "Mentors",
    },
    {
        heading: "200K+",
        subHeading: "Courses",
    },
    {
        heading: "50+",
        subHeading: "Awards",
    },

]
const About = () => {
    return (
        <div>
            <section className="bg-richblack-800">
                <div className="relative mx-auto text-white flex w-10/12 max-w-maxContent flex-col items-center gap-10 lg:gap-10 py-16">
                    <div className="text-center">
                        <h1 className="text-center text-4xl font-bold">Driving Innovation in online Education for a</h1>
                        <div className="text-center text-4xl font-bold">
                            <HighlightTest text={"Brighter Future"} />
                        </div>
                    </div>
                    <div className="text-center w-7/12">
                        StudyNoation is at the forefront of deiving innovation in online education. we are passionate about creating a briting future by offering cutting-edge courses, leveragain emerging technologies, and nurturing a vibrant learning community.
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-[-150px]">
                        <img src={about1} alt="" className="w-[90%] rounded-md shadow-md shadow-pink-200" />
                        <img src={about2} alt="" className="w-[90%] rounded-md shadow-md shadow-pink-200" />
                        <img src={about3} alt="" className="w-[90%] rounded-md shadow-md shadow-pink-200" />
                    </div>
                </div>

            </section>
            <div className="mx-auto text-white w-8/12 max-w-maxContent py-16 mt-28 text-3xl text-center font-semibold">
                We are passionate about revolutionizing the way we learn. Our innovative platform <span className="text-blue-300">combines technology</span>, <span className="text-pink-400">expertise</span> and community to create an <span className="text-yellow-100">unparalleled educational experience.</span>
            </div>

            <div className="mx-auto w-11/12 max-w-maxContent py-12 lg:py-20 text-white">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">

                    {/* TEXT */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        <h1 className="text-2xl lg:text-4xl font-bold">
                            Our Founding Story
                        </h1>
                        <p className="text-sm lg:text-base text-richblack-200">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo dolores
                            inventore molestiae consectetur officia. Possimus nulla enim deserunt
                            reprehenderit consequatur dolorum provident eius omnis repudiandae.
                        </p>
                        <p className="text-sm lg:text-base text-richblack-200">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eius
                            libero exercitationem ratione minima mollitia? Suscipit praesentium
                            repudiandae officia dolores maxime.
                        </p>
                    </div>

                    {/* IMAGE */}
                    <div className="w-full lg:w-1/2">
                        <img
                            src={image}
                            alt="Founding Story"
                            className="w-full rounded-lg object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="mx-auto w-11/12 max-w-maxContent py-12 lg:py- text-white">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

                    {/* VISION */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-3">
                        <h1 className="text-2xl lg:text-3xl font-bold text-pink-400">
                            Our Vision
                        </h1>
                        <p className="text-sm lg:text-base text-richblack-200">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae omnis doloribus
                            voluptatem modi esse nesciunt magni ut reiciendis aperiam, error nisi optio
                            laboriosam iusto consequuntur suscipit at dicta adipisci labore beatae illo quia
                            explicabo? Fugiat facere accusantium consectetur modi odit.
                        </p>
                    </div>

                    {/* MISSION */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-3">
                        <h1 className="text-2xl lg:text-3xl font-bold text-blue-300">
                            Our Mission
                        </h1>
                        <p className="text-sm lg:text-base text-richblack-200">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia enim officiis quos
                            ipsa tempore itaque porro natus adipisci. Iste quas quis hic quam quos harum autem
                            fugiat tempore similique esse voluptate, quod itaque odit minima vitae provident.
                            Laborum repellat sunt hic.
                        </p>
                    </div>

                </div>
            </div>

            <div className="bg-richblack-800">
                <div className="mx-auto w-11/12 max-w-maxContent py-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
                        {
                            info.map((data, ind) => (
                                <div className="flex flex-col gap-2" key={ind}>
                                    <h1 className="text-3xl lg:text-4xl font-bold text-yellow-400">
                                        {data.heading}
                                    </h1>
                                    <p className="text-sm lg:text-base text-richblack-200">
                                        {data.subHeading}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="mx-auto w-11/12 flex flex-col items-center justify-between max-w-maxContent py-12 lg:py- text-white">
                <LearningGrid />
                <ContactFormSection />
            </div>
            <div className="text-white mx-auto w-10/12 max-w-maxContent text-center text-4xl font-bold mb-10">
                <p>Review from other Learners</p>
                <ReviewSlider/>
            </div>
            <Footer />
        </div>
    )
}

export default About;