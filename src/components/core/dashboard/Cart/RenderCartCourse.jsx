import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../../../slices/cartSlice";

const RenderCartCourse = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (!cart?.length) return null;

  return (
    <div className="space-y-4">
      {cart.map((course) => (
        <div
          key={course?._id}
          className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-md shadow-slate-900/40 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Left: Thumbnail + info */}
          <div className="flex gap-4">
            <img
              src={course?.thumbnail}
              alt={course?.courseName || "Course thumbnail"}
              className="h-20 w-32 rounded-lg object-cover border border-slate-800"
            />
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-lg font-semibold text-white line-clamp-2">
                  {course?.courseName}
                </p>
                <p className="text-sm text-slate-400">
                  {course?.category?.name}
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
                <span className="font-semibold text-indigo-100">4.8</span>
                <ReactStars
                  count={5}
                  size={18}
                  edit={false}
                  activeColor="#fbbf24"
                  emptyIcon={<IoStarOutline />}
                  fullIcon={<IoStar />}
                  isHalf={true}
                  value={4.8}
                />
                <span className="text-slate-400">
                  ({course?.ratingAndReviews?.length || 0})
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions + price */}
          <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <MdDelete className="text-base" />
              <span>Remove</span>
            </button>
            <p className="text-base font-semibold text-indigo-100">
              \$ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourse;