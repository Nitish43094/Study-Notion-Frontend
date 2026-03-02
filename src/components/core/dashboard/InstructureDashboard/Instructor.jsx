import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetaiilsAPI";
import { getInstructorData } from '../../../../services/operations/profileAPI'
import { Link } from "react-router-dom";
import InstructorChat from "./InstructorChat";
const Instructor = () => {

    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null);
    const [course, setCourse] = useState([])
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

    useEffect(() => {
        const getCourseDataWithState = async () => {
            setLoading(true)
            const instructorApiData = await getInstructorData(token)
            console.log("Instructor Calculated Data->", instructorApiData)

            const result = await fetchInstructorCourses(token);
            console.log("Instructor course Data->", result)

            if (instructorApiData?.data?.length) {
                setInstructorData(instructorApiData?.data)
            }

            if (result) {
                setCourse(result)
            }

            setLoading(false)
        }
        getCourseDataWithState()
    }, [])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)
    const totalStudent = instructorData?.reduce((acc, curr) => acc + curr.totalEnrolledStudent, 0)
    console.log("Course Data -> ", instructorData)
    return (
        <div className="text-white px-4 sm:px-6 lg:px-10 py-6 w-full">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">
                    Hi, {user?.firstName} 👋
                </h1>
                <p className="text-gray-400 mt-1 text-sm sm:text-base">
                    Let’s start something new today
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <p className="text-lg animate-pulse">Loading...</p>
                </div>
            ) : course.length > 0 ? (
                <div className="space-y-8">

                    {/* Top Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Chart Section */}
                        <div className="lg:col-span-2 bg-richblack-800 rounded-xl p-5 shadow-md">
                            <InstructorChat courses={instructorData} />
                        </div>

                        {/* Statistics Cards */}
                        <div className="bg-richblack-800 rounded-xl p-5 shadow-md space-y-4">
                            <p className="text-lg font-semibold">Statistics</p>

                            <div className="flex justify-between items-center bg-richblack-700 p-4 rounded-lg">
                                <p>Total Courses</p>
                                <p className="font-bold text-yellow-400">{course.length}</p>
                            </div>

                            <div className="flex justify-between items-center bg-richblack-700 p-4 rounded-lg">
                                <p>Total Students</p>
                                <p className="font-bold text-blue-400">{totalStudent || 0}</p>
                            </div>

                            <div className="flex justify-between items-center bg-richblack-700 p-4 rounded-lg">
                                <p>Total Income</p>
                                <p className="font-bold text-green-400">
                                    ₹ {totalAmount || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Courses Section */}
                    <div className="bg-richblack-800 rounded-xl p-5 shadow-md">

                        <div className="flex justify-between items-center mb-6">
                            <p className="text-lg font-semibold">Your Courses</p>
                            <Link
                                to="/dashboard/my-courses"
                                className="text-yellow-400 hover:underline text-sm"
                            >
                                View All
                            </Link>
                        </div>

                        {/* Course Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {course.slice(0, 3).map((course, ind) => (
                                <div
                                    key={ind}
                                    className="bg-richblack-700 rounded-lg overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-md"
                                >
                                    <img
                                        src={course?.thumbnail}
                                        alt={course?.courseName}
                                        className="h-40 w-full object-cover"
                                    />

                                    <div className="p-4 space-y-3">
                                        <p className="font-semibold text-base line-clamp-2">
                                            {course?.courseName}
                                        </p>

                                        <div className="flex justify-between text-sm text-gray-300">
                                            <p>
                                                {course?.studentsEnrolled?.length || 0} Students
                                            </p>
                                            <p className="font-semibold text-yellow-400">
                                                ₹ {course?.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center bg-richblack-800 rounded-xl p-10 text-center space-y-4">
                    <p className="text-lg font-semibold">
                        You have not created any course yet
                    </p>
                    <Link
                        to="/dashboard/add-course"
                        className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-300 transition"
                    >
                        Create a Course
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Instructor;