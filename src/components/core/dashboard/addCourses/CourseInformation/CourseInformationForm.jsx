import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
    addCourseDetails,
    editCourse,
    fetchCourseCategories,
} from "../../../../../services/operations/courseDetaiilsAPI"
import { RiMoneyRupeeCircleFill } from "react-icons/ri"
import RequirementField from "./RequirementField"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import toast from "react-hot-toast"
import ChipInput from "./ChipInput"
import Upload from "./Upload"

const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm()

    const { token } = useSelector((state) => state.auth)
    const { course, editCourse: isEdit } = useSelector((state) => state.course)
    console.log("Course Data ->", course)
    console.log("Set Edit Course ->", isEdit)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])

    // ================= Fetch Categories =================
    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            const categories = await fetchCourseCategories()
            if (categories) setCourseCategories(categories)
            setLoading(false)
        }
        console.log("IS Course ->", course)
        if (isEdit && course) {
            setValue("courseTitle", course?.data?.courseName)
            setValue("courseShortDesc", course?.data?.courseDescription)
            setValue("coursePrice", course?.data?.price)
            setValue("courseBenefits", course?.data?.whatYouWillLearn)
            setValue("courseCategory", course?.data?.category?._id)
            setValue("courseRequirements", course?.data?.instructions || [])
            setValue("courseTags", course?.data?.tag || [])
            setValue("courseImage", course?.data?.thumbnail)
        }

        getCategories()
    }, [])


    // ================= Submit Handler =================
    const onSubmit = async (data) => {
        setLoading(true);
        // console.log("DATA IS ", data);

        try {
            const formData = new FormData();

            // If editing, include courseId
            if (isEdit) {
                formData.append("courseId", course?.data?._id);
            }

            // Basic course info
            formData.append("courseName", data.courseTitle);
            formData.append("courseDescription", data.courseShortDesc);
            formData.append("price", data.coursePrice);
            formData.append("whatYouWillLearn", data.courseBenefits);
            formData.append("category", data.courseCategory);
            formData.append("instructions", JSON.stringify(data.courseRequirements));
            formData.append("tag", JSON.stringify(data.courseTags));
            formData.append("thumbnailImage", data.courseImage);

            // Call API
            let result;
            if (isEdit) {
                result = await editCourse(formData, token);
            } else {
                result = await addCourseDetails(formData, token);
            }

            // Success handling
            if (result) {
                dispatch(setCourse(result));
                dispatch(setStep(2));
                toast.success(isEdit ? "Course Updated" : "Course Created");
            }

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    // ================= UI =================
    return (
        <div className="w-full lg:px-8 py-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-5xl mx-auto bg-richblack-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl space-y-8"
            >
                <h2 className="text-xl sm:text-2xl font-semibold text-richblack-5">
                    {isEdit ? "Edit Course Information" : "Create Course Information"}
                </h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Course Title */}
                    <div className="flex flex-col gap-2 lg:col-span-2">
                        <label className="text-sm text-richblack-5">
                            Course Title <sup className="text-pink-200">*</sup>
                        </label>
                        <input
                            type="text"
                            {...register("courseTitle", { required: true })}
                            className="form-style w-full bg-richblack-700 p-2 rounded-md"
                            placeholder="Enter Course Title"
                        />
                        {errors.courseTitle && (
                            <span className="text-xs text-pink-200">
                                Course title is required
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2 lg:col-span-2">
                        <label className="text-sm text-richblack-5">
                            Course Description <sup className="text-pink-200">*</sup>
                        </label>
                        <textarea
                            {...register("courseShortDesc", { required: true })}
                            className="form-style min-h-[130px] w-full bg-richblack-700 p-2 rounded-md"
                            placeholder="Enter Description"
                        />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-2 relative">
                        <label className="text-sm text-richblack-5">
                            Course Price <sup className="text-pink-200">*</sup>
                        </label>
                        <input
                            type="number"
                            {...register("coursePrice", { required: true })}
                            className="form-style pl-10 w-full bg-richblack-700 p-2 rounded-md"
                            placeholder="Enter Price"
                        />
                        <RiMoneyRupeeCircleFill className="absolute left-3 top-10 text-lg text-richblack-400" />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-richblack-5">
                            Course Category <sup className="text-pink-200">*</sup>
                        </label>
                        <select
                            {...register("courseCategory", { required: true })}
                            className="form-style w-full bg-richblack-700 p-2 rounded-md"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Choose Category
                            </option>
                            {!loading &&
                                courseCategories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Tags */}
                    <div className="lg:col-span-2">
                        <ChipInput
                            label="Tags"
                            name="courseTags"
                            placeholder="Enter tag & press Enter"
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            getValues={getValues}
                        />
                    </div>

                    {/* Thumbnail */}
                    <div className="lg:col-span-2">
                        <Upload
                            name="courseImage"
                            label="Course Thumbnail"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            editData={isEdit ? course?.data?.thumbnail : null}
                        />
                    </div>

                    {/* Benefits */}
                    <div className="flex flex-col gap-2 lg:col-span-2">
                        <label className="text-sm text-richblack-5">
                            Course Benefits <sup className="text-pink-200">*</sup>
                        </label>
                        <input
                            type="text"
                            {...register("courseBenefits", { required: true })}
                            className="form-style w-full bg-richblack-700 p-2 rounded-md"
                            placeholder="Enter course benefits"
                        />
                    </div>

                    {/* Requirements */}
                    <div className="lg:col-span-2">
                        <RequirementField
                            name="courseRequirements"
                            label="Requirements"
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            watch={watch}
                        />

                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-richblack-700">
                    {isEdit && (
                        <button
                            type="button"
                            onClick={() => dispatch(setStep(2))}
                            className="w-full sm:w-auto px-6 py-2 rounded-lg bg-richblack-300 text-richblack-900 hover:bg-richblack-200 transition"
                        >
                            Continue Without Saving
                        </button>
                    )}

                    <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2 rounded-lg bg-yellow-50 text-richblack-900 font-medium hover:bg-yellow-100 transition"
                    >
                        {isEdit ? "Save Changes" : "Next"}
                    </button>
                </div>
            </form>
        </div>
    )

}

export default CourseInformationForm
