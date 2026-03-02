import { useEffect, useState } from "react";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetaiilsAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { IoIosTimer } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import ConfirmationModal from "../../../common/ConfirmationModal";

const CourseView = () => {
  const [courses, setCourse] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [confirmaModal, setConfirmationModal] = useState(null)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAllCourse = async () => {
    try {
      const response = await fetchInstructorCourses(token);
      setCourse(response);
    } catch (error) {
      console.log("Not Any Course");
    }
  };

  async function handleDeliteCourse(courseId) {
    try {
      console.log("Course Id->", courseId)
      setLoading(true);
      const response = await deleteCourse(courseId, token)
      if (response) {
        const response = await fetchInstructorCourses(token);
        setCourse(response);
      }
      setConfirmationModal(null)
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) getAllCourse();
  }, [token]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 text-white">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          My Courses
        </h1>
        <button onClick={() => navigate('/dashboard/add-course')} className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition">
          + Add Course
        </button>
      </div>

      {/* Table Header - Desktop Only */}
      <div className="hidden md:grid grid-cols-12 bg-slate-800 p-4 rounded-t-lg text-sm font-semibold text-slate-300">
        <p className="col-span-6">Course</p>
        <p className="col-span-2">Duration</p>
        <p className="col-span-2">Price</p>
        <p className="col-span-2 text-center">Action</p>
      </div>

      {/* Course List */}
      {courses && courses.length > 0 ? (
        <div className="space-y-4 md:space-y-0">
          {courses.map((course, ind) => (
            <div
              key={ind}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-800 md:rounded-none rounded-xl p-4 md:border-t border-slate-700 hover:bg-slate-700 transition"
            >
              {/* Course Info */}
              <div className="md:col-span-6 flex gap-4">
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {course.courseName}
                  </h2>
                  <p className="text-sm text-slate-400 line-clamp-2">
                    {course.courseDescription}
                  </p>
                  <p>Created At: {course.createAt}</p>
                  <p>
                    {
                      course.status === "Published" ? (
                        <p className="bg-yellow-400 p-1 w-fit text-black  rounded-md font-bold text-[10px] flex items-center gap-2">
                          <FaRegCheckCircle className="text-sm" />{course.status}
                        </p>
                      )
                        :
                        (
                          <p className="bg-pink-500 p-1 w-fit text-black  rounded-md font-bold text-sm text-[10px] flex items-center gap-2">
                            <IoIosTimer className="text-sm" />{course.status}
                          </p>
                        )
                    }
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="md:col-span-2 flex items-center text-sm">
                <span className="md:hidden font-semibold mr-2">Duration:</span>
                {course.totalDuration || "N/A"}
              </div>

              {/* Price */}
              <div className="md:col-span-2 flex items-center text-sm font-semibold text-yellow-400">
                <span className="md:hidden font-semibold text-white mr-2">
                  Price:
                </span>
                ₹ {course.price}
              </div>

              {/* Actions */}
              <div className="md:col-span-2 flex md:justify-center xl:items-center gap-3">
                <button
                disabled={loading}
                onClick={()=>
                  navigate(`/dashboard/edit-course/${course._id}`)
                }
                className="text-2xl h-fit p-2 rounded-md hover:bg-blue-400 transition">
                  <FiEdit3 />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      test1: "Do you want to delete this course",
                      text2: "All the data related to this course will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancek",
                      btn1Handler: !loading ? () => handleDeliteCourse(course._id) : () => { },
                      btn2Handler: !loading ? () => setConfirmationModal(null) : () => { }
                    })
                  }
                  className="text-white text-3xl h-fit p-2 rounded-md hover:bg-blue-400 transition">
                  <MdOutlineDeleteForever />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-slate-400">
          You have not created any course yet.
        </div>
      )}
      {
        confirmaModal && (
          <ConfirmationModal
            modalData={confirmaModal}
          />
        )
      }
    </div>
  );
};

export default CourseView;
