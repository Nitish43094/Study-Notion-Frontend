import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetCourseState, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import { useNavigate } from "react-router-dom";
import { editCourse } from "../../../../../services/operations/courseDetaiilsAPI";
import {COURSE_STATUS} from '../../../../../utils/constants'
const PublishCourse = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm()
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    useEffect(()=>{
        if(course?.state === COURSE_STATUS.PUBLISHED){
            setValue('public',true)
        }
    },[])

    const goToCourse = () =>{
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async() =>{
        if(course?.data?.status === COURSE_STATUS.PUBLISHED && getValues('bublic') === true ||
        (course?.data?.status === COURSE_STATUS.DRAFT && getValues('public') === false)){
            // no updatin in form
            // no need to make api call
            goToCourse ();
            return;
        }

        // if from update huaa hai 
        const formData = new FormData();
        formData.append("courseId",course?.data?._id)
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status",courseStatus)
        setLoading(true)
        const result = await editCourse(formData,token)
        if(result){
            goToCourse();
        }
        setLoading(false)
    }

    const onSubmit = () => {
        handleCoursePublish();
    }

    const goBack = () => {
        dispatch(setStep(2));
        // dispatch(setEditCourse(true));
    };
    return (
        <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6 sm:p-8 shadow-lg w-full max-w-2xl">

            {/* Heading */}
            <h2 className="text-lg sm:text-xl font-semibold text-richblack-5 mb-4">
                Publish Course
            </h2>

            <p className="text-sm text-richblack-300 mb-6">
                Make your course visible to students by publishing it.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        id="public"
                        {...register("public")}
                        className="h-4 w-4 rounded border-richblack-500 bg-richblack-700 text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className="text-richblack-100 text-sm sm:text-base">
                        Make this course public
                    </span>
                </label>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-richblack-700">

                    <button
                        type="button"
                        disabled={loading}
                        onClick={goBack}
                        className="px-5 py-2 rounded-md bg-richblack-700 hover:bg-richblack-600 transition text-sm font-medium"
                    >
                        Back
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-2 rounded-md bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition text-sm"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>

                </div>
            </form>
        </div>

    )
}

export default PublishCourse;