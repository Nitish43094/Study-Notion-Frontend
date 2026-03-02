import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
import { useEffect, useState } from "react";
import GetAvgRating from "../../../utils/avgRating";

const CourseCard = ({ course, height }) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course?.ratingAndReviews || []);
        setAvgReviewCount(count);
    }, [course]);

    return (
        <Link to={`/course/${course.courseName}/${course?._id}`} className="w-full">
            <div className="group relative bg-richblack-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

                {/* Bestseller Badge */}
                <span className="absolute top-3 left-3 z-10 text-xs bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold shadow">
                    Bestseller
                </span>

                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                    <img
                        src={course?.thumbnail}
                        alt={course?.courseName}
                        className={`${height || "h-[220px]"} w-full object-cover group-hover:scale-110 transition-transform duration-500`}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                    {/* Course Title */}
                    <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-yellow-50 transition">
                        {course?.courseName}
                    </h3>

                    {/* Instructor */}
                    <p className="text-sm text-richblack-300">
                        {course?.instructor?.firstName} {course?.instructor?.lastName}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-yellow-50 font-semibold">
                            {avgReviewCount || 0}
                        </span>

                        <RatingStars Review_Count={avgReviewCount} />

                        <span className="text-richblack-400">
                            ({course?.ratingAndReviews?.length || 0})
                        </span>
                    </div>

                    {/* Price Row */}
                    <div className="flex items-center justify-between pt-3">
                        <p className="text-xl font-bold text-yellow-50">
                            ₹{course?.price}
                        </p>

                        <span className="text-xs text-richblack-300">
                            Lifetime Access
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;