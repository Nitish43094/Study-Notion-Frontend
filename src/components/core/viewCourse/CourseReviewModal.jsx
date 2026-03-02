import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { createRating } from "../../../services/operations/courseDetaiilsAPI";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, [setValue]);

  const handleRating = (value) => {
    setRating(value);
    setValue("courseRating", value, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    if (!courseEntireData?._id) return;

    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );

    setReviewModal(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-black/40 backdrop-blur-sm">
      <div className="w-11/12 max-w-[600px] rounded-lg border border-richblack-400 bg-richblack-800 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 px-6 py-4">
          <p className="text-xl font-semibold text-richblack-5">
            Add Review
          </p>
          <button
            onClick={() => setReviewModal(false)}
            className="rounded-full p-2 text-richblack-400 hover:bg-richblack-600 hover:text-richblack-5"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <div className="p-6">

          {/* User Info */}
          <div className="mb-6 flex items-center gap-4">
            <img
              src={user?.image}
              alt="User"
              className="aspect-square w-12 rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-400">
                Posting publicly
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* ⭐ Custom Star Rating */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={32}
                    onClick={() => handleRating(star)}
                    className={`cursor-pointer transition-all ${
                      star <= rating
                        ? "text-yellow-400 scale-110"
                        : "text-richblack-500"
                    }`}
                  />
                ))}
              </div>

              {errors.courseRating && (
                <span className="text-sm text-pink-200">
                  Please select a rating
                </span>
              )}

              <span className="text-sm text-richblack-400">
                Click to rate
              </span>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-richblack-5">
                Add Your Experience <span className="text-pink-200">*</span>
              </label>

              <textarea
                {...register("courseExperience", { required: true })}
                placeholder="Share your experience..."
                className="min-h-[130px] w-full resize-none rounded-lg border border-richblack-600 bg-richblack-700 p-3 text-richblack-5"
              />

              {errors.courseExperience && (
                <span className="text-sm text-pink-200">
                  Please add your experience
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="rounded-lg bg-richblack-700 px-5 py-2 text-richblack-5"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-yellow-50 px-5 py-2 text-richblack-900"
              >
                Save
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;