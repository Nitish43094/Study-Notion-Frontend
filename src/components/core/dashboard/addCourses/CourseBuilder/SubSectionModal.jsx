import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetaiilsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import Upload from "../CourseInformation/Upload";
import { ImCross } from "react-icons/im";

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();

        return (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        );
    };

    const handleEditSubSection = async () => {
        const currentValues = getValues();
        console.log("Modal Data -> ",modalData)
        console.log("Current Value ->",currentValues)

        const formData = new FormData();
        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);
        formData.append("courseId",course?.data?._id)

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }
        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("videoFile", currentValues.lectureVideo);
        }else{
            formData.append("videoFile", null);
        }

        setLoading(true);
        const result = await updateSubSection(formData, token);

        if (result) dispatch(setCourse(result));

        setModalData(null);
        setLoading(false);
    };

    const onSubmit = async (data) => {
        if (view) return;

        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No Changes Made");
                return;
            }
            handleEditSubSection();
            return;
        }

        const formData = new FormData();
        formData.append("courseId",course?.data?._id);
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("videoFile", data.lectureVideo);

        setLoading(true);
        const result = await createSubSection(formData, token);

        if (result) dispatch(setCourse(result));

        setModalData(null);
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            {/* Modal */}
            <div className="w-full max-w-2xl rounded-xl bg-richblack-800 shadow-xl max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-center border-b p-4">
                    <p className="text-lg font-semibold">
                        {view && "Viewing Lecture"}
                        {add && "Add Lecture"}
                        {edit && "Edit Lecture"}
                    </p>

                    <button
                        onClick={() => (!loading ? setModalData(null) : {})}
                        className="text-gray-500 hover:text-red-500"
                    >
                        <ImCross />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 p-4"
                >
                    {/* Upload */}
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />

                    {/* Title */}
                    <div>
                        <label className="text-sm font-medium">
                            Lecture Title <sup className="text-red-500">*</sup>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter lecture title"
                            {...register("lectureTitle", { required: true })}
                            className="w-full mt-1 bg-richblack-700 border rounded-md p-2"
                            disabled={view}
                        />
                        {errors.lectureTitle && (
                            <span className="text-xs text-red-500">
                                Lecture Title is required
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm font-medium">
                            Lecture Description <sup className="text-red-500">*</sup>
                        </label>
                        <textarea
                            {...register("lectureDesc", { required: true })}
                            className="w-full mt-1 border rounded-md bg-richblack-700 p-2 min-h-[120px]"
                            disabled={view}
                        />
                        {errors.lectureDesc && (
                            <span className="text-xs text-red-500">
                                Lecture Description is required
                            </span>
                        )}
                    </div>

                    {/* Buttons */}
                    {!view && (
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setModalData(null)}
                                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
                            >
                                {loading
                                    ? "Saving..."
                                    : edit
                                        ? "Save Changes"
                                        : "Save Lecture"}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SubSectionModal;
