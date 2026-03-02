import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourse } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

const EnrolledCourse = () => {
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourse, setEnrolledCourse] = useState(null);
    const navigate = useNavigate();
    const getEnrolledCourse = async () => {
        try {
            const response = await getUserEnrolledCourse(token);
            setEnrolledCourse(response);
        } catch (error) {
            console.log("Unable to fetch Enrolled Course");
        }
    };

    useEffect(() => {
        if (token) getEnrolledCourse();
    }, [token]);
    console.log(enrolledCourse)
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 text-white">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">
                Enrolled Courses
            </h2>

            {/* Loading */}
            {!enrolledCourse && (
                <div className="text-center py-10 text-slate-300">
                    Loading...
                </div>
            )}

            {/* Empty */}
            {enrolledCourse && enrolledCourse.length === 0 && (
                <p className="text-center text-slate-400">
                    You have not enrolled in any course yet
                </p>
            )}

            {/* Courses */}
            {enrolledCourse && enrolledCourse.length > 0 && (
                <div className="space-y-4">
                    {/* Header - hidden on mobile */}
                    <div className="hidden md:grid grid-cols-12 text-slate-400 text-sm font-semibold px-4">
                        <p className="col-span-6">Course Name</p>
                        <p className="col-span-3">Duration</p>
                        <p className="col-span-3">Progress</p>
                    </div>

                    {enrolledCourse?.map((course, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-800 rounded-xl p-4 hover:bg-slate-700 transition"
                        >
                            {/* Course Info */}
                            <div 
                            className="md:col-span-6 flex gap-4"
                            onClick={()=>{
                                navigate(`/view-course/${course._id}/section/${course?.courseContent?.[0]?._id}/subSection/${course?.courseContent?.[0]?.subSection?.[0]?._id}`)
                            }}
                            >
                                <img
                                    src={course.thumbnail}
                                    alt={course.courseName}
                                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                                />
                                <div>
                                    <p className="font-semibold text-base sm:text-lg">
                                        {course.courseName}
                                    </p>
                                    <p className="text-sm text-slate-400 line-clamp-2">
                                        {course.courseDescription}
                                    </p>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="md:col-span-3 flex items-center text-sm sm:text-base">
                                {course?.totalDuration || "N/A"}
                            </div>

                            {/* Progress */}
                            <div className="md:col-span-3">
                                <p className="text-sm mb-1">
                                    Progress {course.progressPercentage || 0}%
                                </p>
                                <ProgressBar
                                    completed={course.progressPercentage || 0}
                                    height="8px"
                                    isLabelVisible={false}
                                    bgColor="#22c55e"
                                    baseBgColor="#334155"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnrolledCourse;
