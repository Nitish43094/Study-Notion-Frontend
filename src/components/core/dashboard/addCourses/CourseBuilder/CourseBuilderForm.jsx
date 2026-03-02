import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  updateSecction,
} from "../../../../../services/operations/courseDetaiilsAPI";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [editSection, setEditSection] = useState(null);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // ================= Submit =================
  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSection) {
      result = await updateSecction(
        {
          sectionName: data.sectionName,
          sectionId: editSection,
          courseId: course?.data?._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course?.data?._id,
        },
        token
      );
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSection(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  };

  // ================= Helpers =================
  const cancelEdit = () => {
    setEditSection(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course?.data?.courseContent?.length === 0) {
      toast.error("Please add at least one section");
      return;
    }

    if (
      course?.data?.courseContent?.some(
        (section) => section.subSection.length === 0
      )
    ) {
      toast.error("Please add at least one lecture in each section");
      return;
    }

    dispatch(setStep(3));
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSection === sectionId) {
      cancelEdit();
      return;
    }
    setEditSection(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="w-full space-y-6 rounded-xl bg-richblack-800 p-4 sm:p-6 md:p-8 shadow-lg">

      {/* ================= Title ================= */}
      <p className="text-xl sm:text-2xl font-semibold text-richblack-5">
        Course Builder
      </p>

      {/* ================= Form ================= */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="sectionName"
            className="text-sm text-richblack-5"
          >
            Section Name <sup className="text-pink-200">*</sup>
          </label>

          <input
            type="text"
            id="sectionName"
            placeholder="Add Section Name"
            className="p-2 rounded-md bg-richblack-600 pl-2"
            {...register("sectionName", { required: true })}
          />

          {errors.sectionName && (
            <span className="text-xs text-pink-200">
              Section name is required
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-yellow-50 px-5 py-2 font-medium text-richblack-900 hover:bg-yellow-100 transition"
          >
            {loading
              ? "Saving..."
              : editSection
                ? "Update Section"
                : "Create Section"}
          </button>

          {editSection && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* ================= Nested View ================= */}
      {course?.data?.courseContent?.length > 0 && (
        <NestedView
          handleChangeEditSectionName={handleChangeEditSectionName}
        />
      )}

      {/* ================= Navigation Buttons ================= */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
        <button
          onClick={goBack}
          className="rounded-md border border-richblack-600 px-6 py-2 text-richblack-200 hover:bg-richblack-700 transition"
        >
          Back
        </button>

        <button
          onClick={goToNext}
          className="rounded-md bg-yellow-50 px-6 py-2 font-medium text-richblack-900 hover:bg-yellow-100 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
