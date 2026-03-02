import React from "react";
import ContactUsForm from "../components/ContactPage/ContactUsForm";
import { IoIosChatboxes } from "react-icons/io";
import { IoEarth } from "react-icons/io5";
import { BiPhoneCall } from "react-icons/bi";

const info = [
    {
        heading: "Chat with us",
        subHeading: "Our friendly team is here to help.\ninfo@studynotion.com",
        icon: IoIosChatboxes,
    },
    {
        heading: "Visit us",
        subHeading:
            "Come and say hello at our office HQ.\nAkshya Nagar 1st Block 1st Cross, Rammurthy Nagar, Bangalore-560016",
        icon: IoEarth,
    },
    {
        heading: "Call us",
        subHeading: "Mon - Fri From 8am to 5pm\n+123 456 7869",
        icon: BiPhoneCall,
    },
];

const ContactUs = () => {
    return (
        <div className="w-11/12 max-w-maxContent mx-auto text-white py-16 flex flex-col lg:flex-row gap-10">

            {/* LEFT INFO SECTION */}
            <div className="w-full lg:w-[35%] flex flex-col gap-6">
                {info.map((data, ind) => {
                    const Icon = data.icon;
                    return (
                        <div
                            key={ind}
                            className="bg-richblack-800 p-6 rounded-xl shadow-md 
                     hover:shadow-yellow-400/20 transition duration-300"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <Icon className="text-3xl text-yellow-400" />
                                <h1 className="text-lg sm:text-xl font-semibold">
                                    {data.heading}
                                </h1>
                            </div>
                            <p className="text-richblack-300 whitespace-pre-line text-sm sm:text-base">
                                {data.subHeading}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* RIGHT FORM SECTION */}
            <div className="w-full lg:w-[50%] rounded-xl p-6 sm:p-8 md:p-10 shadow-lg border border-richblack-600">

                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                        Got an idea? We've got the skills.
                    </h1>
                    <p className="text-richblack-300 text-sm sm:text-base">
                        Tell us more about yourself and what you have in mind.
                    </p>
                </div>

                <ContactUsForm />
            </div>
        </div>

    );
};

export default ContactUs;
