import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetails } from "../../../services/operations/courseDetaiilsAPI";
import RatingStars from "../../common/RatingStars";
import { FaRegClock, FaShareFromSquare } from "react-icons/fa6";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import GetAvgRating from "../../../utils/avgRating";
import { buyCourse } from "../../../services/operations/studentFeaturesAPI";
import { addToCart } from "../../../slices/cartSlice";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile)

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const res = await getCourseDetails(courseId);
        setCourse(res?.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchCourse();
  }, [courseId, token]);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews || []);
    setAvgReviewCount(count);
  }, [course]);

  const handleByCourse = () => {
    if (token) {
      buyCourse([courseId], token, { userDetails: user }, navigate, dispatch);
      return;
    }
  }
  console.log("In Course details -< ",course)
  if (loading || !course) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-richblack-900 text-white">
      <div className="max-w-[1200px] mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-8">

          {/* Course Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{course?.courseName}</h1>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-yellow-50 font-semibold">
                {avgReviewCount || 0}
              </span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-300">
                ({course?.ratingAndReviews?.length || 0} Reviews) •{" "}
                {course?.studentsEnrolled?.length || 0} Students Enrolled
              </span>
            </div>

            <p className="text-richblack-200">
              Created By{" "}
              <span className="text-yellow-50 font-medium">
                {course?.instructor?.firstName}{" "}
                {course?.instructor?.lastName}
              </span>
            </p>

            <div className="flex items-center gap-2 text-richblack-300 text-sm">
              <FaRegClock />
              <span>
                Created At:{" "}
                {new Date(course?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* What You Will Learn */}
          <div className="bg-richblack-800 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">
              What You Will Learn
            </h2>
            <p className="text-richblack-200">
              {course?.whatYouWillLearn}
            </p>
          </div>

          {/* Course Content */}
          <div className="bg-richblack-800 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Course Content</h2>
              <span className="text-sm text-richblack-300">
                {course?.courseContent?.length || 0} Sections
              </span>
            </div>

            <div className="space-y-3">
              {course?.courseContent?.map((section, i) => (
                <div
                  key={i}
                  className="border border-richblack-600 rounded-lg p-4"
                >
                  <p className="font-medium">{section?.sectionName}</p>
                  <p className="text-sm text-richblack-300">
                    {section?.subSection?.length || 0} Lectures
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Author */}
          <div className="bg-richblack-800 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Author</h2>

            <div className="flex items-center gap-4">
              <img
                src={course?.instructor?.image}
                alt="author"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">
                  {course?.instructor?.firstName}{" "}
                  {course?.instructor?.lastName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PURCHASE CARD */}
        <div className="lg:sticky lg:top-20 h-fit">
          <div className="bg-richblack-800 rounded-xl overflow-hidden shadow-lg">

            <img
              src={course?.thumbnail}
              alt="thumbnail"
              className="w-full h-48 object-cover"
            />

            <div className="p-6 space-y-4">
              <h2 className="text-3xl font-bold text-yellow-50">
                ₹ {course?.price}
              </h2>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleByCourse(course?._id)}
                  className="bg-yellow-50 text-black font-semibold py-2 rounded-lg hover:scale-95 transition">
                  Buy Now
                </button>

                <button
                  onClick={() => dispatch(addToCart(course))}
                  className="border border-yellow-50 text-yellow-50 py-2 rounded-lg hover:bg-yellow-50 hover:text-black transition">
                  Add to Cart
                </button>
              </div>

              <p className="text-sm text-richblack-300">
                30-Day Money-back Guarantee
              </p>

              <div>
                <h3 className="font-semibold mb-2">
                  This Course Includes:
                </h3>

                <div className="space-y-2 text-sm text-richblack-200">
                  <p className="flex items-center gap-2">
                    <IoMdArrowDroprightCircle /> Full Lifetime Access
                  </p>
                  <p className="flex items-center gap-2">
                    <IoMdArrowDroprightCircle /> Certificate of Completion
                  </p>
                  <p className="flex items-center gap-2">
                    <IoMdArrowDroprightCircle /> Mobile & TV Access
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-2 text-yellow-50 text-sm hover:underline">
                <FaShareFromSquare />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;