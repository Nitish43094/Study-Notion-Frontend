import React from "react";
import { Link } from "react-router-dom";
import HighlightTest from "../HomePage/HighlightTest";
const LearningGridArray = [
    {
        order: -1,
        heading: "world-Class Learning for",
        heighlight: "Anyone, Anywhere",
        description: "Studynotion partners with more than 275+ Leading universities and companies to bring flexible,affordable, job-relevant online learning to individual and organization worldwide",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description: "Save time and money! the Belajar currculum is made to be easer to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description: "Studynotion partners with morethan 275 leading unversities and campanies to bring.",
    },
    {
        order: 3,
        heading: "Certification",
        description: "Studynotion partners with morethan 275 leading unversities and campanies to bring.",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description: "Studynotion partners with more then 275+ leading universities and campanies to bring",
    },
    {
        order: 5,
        heading: "Ready to work",
        description: "Studynotion partners with more then 275+ leading universities and campanies to bring",
    },
]
const LearningGrid = () => {
    return (
        <div className="mx-auto w-11/12 max-w-maxContent py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-white">

                {LearningGridArray.map((data, ind) => (
                    <div
                        key={ind}
                        className={`
                flex flex-col gap-3 p-6 transition
                ${ind === 0 ? "lg:col-span-2" : ""}
                ${data.order === 3 ? "lg:col-start-2" : ""}
                ${data.order % 2 === 0 ? "bg-richblack-800" : "bg-richblack-700"}
                ${data.order < 0 && "bg-transparent"}
                `}
                    >
                        <h1 className="text-lg lg:text-xl font-semibold">
                            {data.heading}{" "}
                            {data.order === -1 && (
                                <HighlightTest text={data.heighlight} />
                            )}
                        </h1>

                        <p className="text-sm text-richblack-200">
                            {data.description}
                        </p>

                        {data.order === -1 && (
                            <Link
                                to={data.BtnLink}
                                className="mt-4 w-fit rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-richblack-900 hover:bg-yellow-300 transition"
                            >
                                {data.BtnText}
                            </Link>
                        )}
                    </div>
                ))}

            </div>
        </div>

    )
}

export default LearningGrid;